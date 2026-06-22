// Automated Irasutoya illustration fetcher.
//
// For each filename the game expects, this searches irasutoya.com (via the
// `irasutoya` npm package) and downloads the first matching illustration into
// public/illustrations/. Run it where irasutoya.com is reachable:
//
//   npm install --no-save irasutoya
//   node scripts/fetch-illustrations.mjs
//
// or trigger the "Fetch Illustrations" GitHub Action (runs this on GitHub's
// servers and opens a branch you can PR). Already-present files are skipped, so
// it's safe to re-run. Pass --force to overwrite existing images.
//
// Illustrations are © Irasutoya / Takashi Mifune, free for non-commercial use.
// See public/illustrations/README.md for license details.

import { mkdir, writeFile, access } from "node:fs/promises";
import { constants } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";
import path from "node:path";

const FORCE = process.argv.includes("--force");
const OUT = path.join(process.cwd(), "public", "illustrations");

// filename -> Irasutoya search query (kept in sync with public/illustrations/README.md)
const MAP = [
  // categories
  ["cat_rules.png", "車 運転"],
  ["cat_license.png", "運転免許証"],
  ["cat_motorcycle.png", "バイク"],
  ["cat_alcohol.png", "ビール 乾杯"],
  ["cat_signs.png", "信号機"],
  ["cat_expressway.png", "高速道路"],
  // clues
  ["drive_left.png", "運転 ハンドル"],
  ["red_light.png", "信号 赤"],
  ["speedometer.png", "スピードメーター"],
  ["railroad_crossing.png", "踏切"],
  ["crosswalk.png", "横断歩道"],
  ["intl_permit.png", "国際運転免許証"],
  ["globe.png", "地球"],
  ["calendar.png", "カレンダー"],
  ["translation.png", "翻訳"],
  ["credit_card.png", "クレジットカード"],
  ["helmet.png", "バイク ヘルメット"],
  ["motorcycle_highway.png", "バイク 高速道路"],
  ["tandem.png", "バイク 二人乗り"],
  ["tandem_highway.png", "タンデム バイク"],
  ["traffic_jam_bike.png", "渋滞 バイク"],
  ["beer.png", "ビール"],
  ["phone_driving.png", "ながら運転"],
  ["breathalyzer.png", "飲酒検査"],
  ["handcuffs.png", "手錠"],
  ["police.png", "警察官"],
  ["stop_sign.png", "止まれ 標識"],
  ["blue_sign.png", "道路標識 青"],
  ["no_entry.png", "進入禁止 標識"],
  ["speed_sign.png", "制限速度 標識"],
  ["road_sign.png", "道路標識 案内"],
  ["tollgate.png", "料金所"],
  ["etc_gate.png", "ETC"],
  ["expressway.png", "高速道路 車"],
  ["highway_lanes.png", "高速道路 車線"],
  ["parking.png", "駐輪場"],
  ["thank_you_driving.png", "車 ありがとう"],
  // extras
  ["touring.png", "ツーリング バイク"],
  ["rider.png", "バイク 男性"],
  ["teams.png", "グループ 人々"],
];

async function exists(p) {
  try {
    await access(p, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function loadClient() {
  try {
    const mod = await import("irasutoya");
    return mod.default ?? mod;
  } catch {
    console.error(
      "Missing dependency 'irasutoya'. Install it first:\n  npm install --no-save irasutoya",
    );
    process.exit(1);
  }
}

async function main() {
  const client = await loadClient();
  await mkdir(OUT, { recursive: true });

  let saved = 0;
  let skipped = 0;
  let failed = 0;

  for (const [file, query] of MAP) {
    const dest = path.join(OUT, file);
    if (!FORCE && (await exists(dest))) {
      console.log(`= ${file} (already present, skipping)`);
      skipped++;
      continue;
    }
    try {
      const results = await client.search(query);
      const hit = Array.isArray(results)
        ? results.find((r) => r && r.imageUrl)
        : null;
      if (!hit) {
        console.warn(`! ${file} — no result for "${query}"`);
        failed++;
      } else {
        const res = await fetch(hit.imageUrl);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        await writeFile(dest, Buffer.from(await res.arrayBuffer()));
        console.log(`+ ${file}  ←  ${hit.title}`);
        saved++;
      }
    } catch (err) {
      console.warn(`! ${file} — ${err.message}`);
      failed++;
    }
    await sleep(800); // be polite to the server
  }

  console.log(`\nDone. ${saved} saved, ${skipped} skipped, ${failed} missed.`);
  if (saved === 0 && failed > 0) {
    console.error(
      "\nNothing was downloaded. The upstream scraper may be outdated, or the\n" +
        "site was unreachable. Falling back to the manual pick-list in\n" +
        "public/illustrations/README.md is always an option.",
    );
    process.exitCode = 1;
  }
}

main();
