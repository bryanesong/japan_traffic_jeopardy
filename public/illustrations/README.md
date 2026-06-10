# Illustrations (Irasutoya art)

Drop Irasutoya (いらすとや) PNGs into this folder using the **exact filenames**
below and they appear automatically across the game. Any slot whose file is
missing simply renders nothing (no broken images), so you can add as few or as
many as you like, in any order.

## How to add one

1. Go to <https://www.irasutoya.com/> and search the suggested term.
2. Open the illustration and save the image (right-click → Save image).
3. Rename it to the **Filename** in the tables below and put it in this folder
   (`public/illustrations/`). PNGs with a transparent background look best.
4. Commit & push — Vercel redeploys and the art shows up.

> Tip: you can also run the **`tattn/irasutoya`** Node tool locally to batch-
> download (it scrapes the live site, so run it on your own machine, not in CI,
> and only grab what you'll actually use).

## License & compliance (please read)

These illustrations are © Irasutoya / Takashi Mifune, offered free under their
[terms](https://www.irasutoya.com/p/terms.html):

- **Free for personal & commercial use; no attribution required.**
- **Commercial use is limited to 20 illustrations per project** (the 21st+
  needs a paid license, ~¥1,100 each). **This project is non-commercial, so the
  limit does not apply** — but if it ever becomes commercial, trim to ≤20 or buy
  a license.
- You may **not** redistribute the illustrations themselves as a downloadable
  asset pack, use them as the "main product," or use them indecently.
- Because this repo is public, treat the images as *used within the app*, not as
  a material collection for others to harvest.

## Filenames — categories (board headers)

| Filename | Search Irasutoya for | Used on |
|---|---|---|
| `cat_rules.png` | 車 運転 (driving) | "Rules of the Road" header |
| `cat_license.png` | 運転免許証 (driver's license) | "License to Ride" header |
| `cat_motorcycle.png` | バイク (motorcycle) | "Two-Wheel Law" header |
| `cat_alcohol.png` | ビール 乾杯 (beer / cheers) | "Don't Drink & Ride" header |
| `cat_signs.png` | 信号機 (traffic light) | "Signs & Signals" header |
| `cat_expressway.png` | 高速道路 (expressway) | "The Open Road" header |

## Filenames — clues

| Filename | Search Irasutoya for | Clue |
|---|---|---|
| `drive_left.png` | 運転 ハンドル (steering wheel) | Rules $200 — drive on the left |
| `red_light.png` | 信号 赤 (red light) | Rules $400 — no turn on red |
| `speedometer.png` | スピードメーター | Rules $600 — 60 km/h default |
| `railroad_crossing.png` | 踏切 (railroad crossing) | Rules $800 — full stop |
| `crosswalk.png` | 横断歩道 (crosswalk) | Rules $1000 — yield to pedestrians/cyclists |
| `intl_permit.png` | 国際運転免許証 (intl. permit) | License $200 — IDP |
| `globe.png` | 地球 (globe / world) | License $400 — Geneva Convention |
| `calendar.png` | カレンダー (calendar) | License $600 — one year |
| `translation.png` | 翻訳 (translation) | License $800 — JAF translation |
| `credit_card.png` | クレジットカード | License $1000 — rental deposit |
| `helmet.png` | バイク ヘルメット | Two-Wheel $200 — helmet |
| `motorcycle_highway.png` | バイク 高速道路 | Two-Wheel $400 — over 125cc |
| `tandem.png` | バイク 二人乗り (two-up) | Two-Wheel $600 — tandem, ordinary road |
| `tandem_highway.png` | バイク 二人乗り (two-up) | Two-Wheel $800 — tandem, expressway |
| `traffic_jam_bike.png` | 渋滞 (traffic jam) | Two-Wheel $1000 — lane filtering |
| `beer.png` | ビール (beer) | Drink $200 — alcohol |
| `phone_driving.png` | ながら運転 / スマホ 運転 | Drink $400 — mobile phone |
| `breathalyzer.png` | 飲酒検査 / アルコールチェッカー | Drink $600 — 0.15 mg/L |
| `handcuffs.png` | 手錠 (handcuffs) | Drink $800 — up to 5 years |
| `police.png` | 警察官 (police officer) | Drink $1000 — accomplice liability |
| `stop_sign.png` | 止まれ 標識 (stop sign) | Signs $200 — 止まれ |
| `blue_sign.png` | 道路標識 青 (blue sign) | Signs $400 — mandatory (blue circle) |
| `no_entry.png` | 進入禁止 標識 (do not enter) | Signs $600 — do not enter |
| `speed_sign.png` | 制限速度 標識 (speed limit) | Signs $800 — speed limit sign |
| `road_sign.png` | 道路標識 案内 (guide sign) | Signs $1000 — bilingual signs |
| `tollgate.png` | 料金所 (tollgate) | Open Road $200 — tolls |
| `etc_gate.png` | ETC | Open Road $400 — ETC |
| `expressway.png` | 高速道路 (expressway) | Open Road $600 — 100 km/h |
| `highway_lanes.png` | 高速道路 車線 (lanes) | Open Road $800 — keep left, pass right |
| `parking.png` | 駐輪場 / バイク 駐車 (parking) | Open Road $1000 — motorcycle parking |
| `thank_you_driving.png` | 車 ありがとう (thanks) | Final Jeopardy — thank-you hazard |

## Filenames — extras

| Filename | Search Irasutoya for | Used on |
|---|---|---|
| `touring.png` | ツーリング バイク (motorcycle touring) | Header, under the title |
| `rider.png` | バイク 人 (person riding) | Team avatars (falls back to the helmet icon) |
| `teams.png` | グループ 人々 (group of people) | Scoreboard "no teams yet" state |
