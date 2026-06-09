import type { GameData } from "./types";

/**
 * Japan Traffic Jeopardy — game content.
 *
 * Focus: practical knowledge for foreign riders touring Japan by motorcycle.
 * Clues are written as Jeopardy "answers" (statements); responses are phrased
 * as questions ("What is...?"). The `note` is shown after the reveal so the
 * host can explain the real rule.
 *
 * Sources: JAF (Japan Automobile Federation), Japan National Police Agency,
 * Tokyo Metropolitan Police, and NEXCO. Laws as of 2024-2026 — always confirm
 * current rules before you ride.
 */
export const gameData: GameData = {
  categories: [
    {
      name: "Rules of the Road",
      clues: [
        {
          value: 200,
          clue: "In Japan the steering wheel is on the right because traffic moves on THIS side of the road.",
          response: "What is the left?",
          note: "Japan drives on the left; keep-left is the basic rule and you overtake on the right.",
        },
        {
          value: 400,
          clue: "Unlike back home, at a red light in Japan you may NEVER make this maneuver — you must wait for green or a green arrow.",
          response: "What is a (left) turn on red?",
          note: "There is no 'turn on red' in Japan. Only a green light or green-arrow signal lets you proceed.",
        },
        {
          value: 600,
          clue: "When no speed-limit sign is posted on an ordinary road, this is the statutory maximum speed in km/h.",
          response: "What is 60 km/h?",
          note: "The statutory default is 60 km/h on ordinary roads (and 100 km/h on expressways). Posted signs override it.",
        },
        {
          value: 800,
          clue: "Even with the gates up and no train in sight, every rider must do THIS at every railroad crossing.",
          response: "What is come to a complete stop?",
          note: "A full stop is mandatory at all railroad crossings — then look and listen before crossing.",
        },
        {
          value: 1000,
          clue: "At an intersection with no signals, a rider turning must always yield to THESE two groups of road users.",
          response: "What are pedestrians and cyclists?",
          note: "Turning vehicles must yield to pedestrians and cyclists crossing, and to traffic on the priority road.",
        },
      ],
    },
    {
      name: "License to Ride",
      clues: [
        {
          value: 200,
          clue: "To legally ride in Japan, most foreign tourists must carry this internationally recognized permit alongside their home license.",
          response: "What is an International Driving Permit (IDP)?",
          note: "An IDP plus your original home license are both required — the IDP is invalid on its own.",
        },
        {
          value: 400,
          clue: "Japan only honors an IDP issued under THIS 1949 convention — not the 1968 Vienna one.",
          response: "What is the Geneva Convention (on Road Traffic, 1949)?",
          note: "The IDP's cover must read 'CONVENTION ON ROAD TRAFFIC 1949'. Many countries issue the 1968 version, which Japan rejects.",
        },
        {
          value: 600,
          clue: "Counting from your date of entry into Japan, this is how long you're allowed to drive on a valid IDP.",
          response: "What is one year?",
          note: "You may ride for up to 1 year from your date of entry (the IDP is also valid 1 year from issue).",
        },
        {
          value: 800,
          clue: "Riders from Switzerland, Germany, France, Belgium, Monaco and Taiwan can't use an IDP at all — instead they need their home license plus THIS, available from JAF for about ¥6,000.",
          response: "What is an official Japanese translation of their license?",
          note: "These six countries' licenses aren't covered by the Geneva IDP, so an official JAF (or embassy) translation is required.",
        },
        {
          value: 1000,
          clue: "To rent a bike, shops require your IDP (or translation), your home license, your passport, and THIS — used to hold a ¥20,000-plus security deposit.",
          response: "What is a credit card?",
          note: "Rental shops need all four documents; many also set their own minimum age (often 20 or 25) for larger bikes.",
        },
      ],
    },
    {
      name: "Two-Wheel Law",
      clues: [
        {
          value: 200,
          clue: "On every motorcycle in Japan this safety item is legally required for BOTH rider and passenger, no matter the engine size.",
          response: "What is a helmet?",
          note: "Helmets are mandatory nationwide and should carry a PSC, SG, or JIS approval mark.",
        },
        {
          value: 400,
          clue: "To legally use a Japanese expressway, your motorcycle's engine must be larger than this displacement.",
          response: "What is 125cc?",
          note: "Bikes 125cc and under are banned from expressways — you need over 125cc to get on.",
        },
        {
          value: 600,
          clue: "To carry a passenger on an ordinary road, a rider must have held their license for at least this long.",
          response: "What is one year?",
          note: "Tandem riding on ordinary roads requires 1 year of license experience (and a bike over 50cc with proper footpegs).",
        },
        {
          value: 800,
          clue: "Carrying a passenger on an EXPRESSWAY is stricter: the rider must be at least this old AND have this many years of experience.",
          response: "What is 20 years old and 3 years of experience?",
          note: "Two-up on expressways has only been legal since 2005, and some Tokyo Shuto sections still ban it entirely.",
        },
        {
          value: 1000,
          clue: "Squeezing slowly between lanes of stopped cars has THIS legal status in Japan — no law clearly permits or bans it.",
          response: "What is a legal gray area?",
          note: "Slow filtering is generally tolerated, but aggressive weaving (or crossing solid lines) can be cited as reckless driving — it's officer discretion.",
        },
      ],
    },
    {
      name: "Don't Drink & Ride",
      clues: [
        {
          value: 200,
          clue: "Japan is famous for having essentially a 'zero tolerance' policy toward driving after consuming THIS.",
          response: "What is alcohol?",
          note: "Penalties are severe and the legal threshold is very low — the safest amount before riding is none.",
        },
        {
          value: 400,
          clue: "Using one of these while riding (unless it's hands-free) costs you a fine and demerit points.",
          response: "What is a mobile phone?",
          note: "Penalties were sharply increased in Dec 2019; phone use that causes danger means an instant suspension.",
        },
        {
          value: 600,
          clue: "This is the breath-alcohol level, in mg per liter, at which a rider is legally 'with alcohol' and can be jailed up to 3 years.",
          response: "What is 0.15 mg per liter?",
          note: "0.15 mg/L of breath (about 0.03% BAC) is the legal threshold under the Road Traffic Act.",
        },
        {
          value: 800,
          clue: "For the most serious drunk-driving charge, a rider faces imprisonment of up to this many years.",
          response: "What is 5 years?",
          note: "Driving while genuinely intoxicated (酒酔い) carries up to 5 years in prison or a ¥1,000,000 fine.",
        },
        {
          value: 1000,
          clue: "Beyond the drunk rider, Japanese law also punishes THESE three groups — including anyone who poured the drinks or lent the bike.",
          response: "What are the passenger, the alcohol provider, and the vehicle provider?",
          note: "Under 'joint responsibility,' passengers and alcohol-givers face up to 3 yrs/¥500,000, and vehicle-providers up to 5 yrs/¥1,000,000.",
        },
      ],
    },
    {
      name: "Signs & Signals",
      clues: [
        {
          value: 200,
          clue: "Written 止まれ on an upside-down red triangle, this sign tells you to do exactly this.",
          response: "What is stop?",
          note: "Japan's stop sign is an inverted red triangle reading 'tomare' — unusual versus the global octagon.",
        },
        {
          value: 400,
          clue: "A round road sign with a BLUE background generally gives you this kind of instruction.",
          response: "What is a mandatory instruction (something you must do)?",
          note: "Blue circles = mandatory/instruction; a white circle with a red border = a prohibition.",
        },
        {
          value: 600,
          clue: "A red circle crossed by a single horizontal white bar delivers THIS command to a rider.",
          response: "What is 'Do Not Enter' (no entry / one-way against you)?",
          note: "It marks a closed road or the wrong way of a one-way street.",
        },
        {
          value: 800,
          clue: "A number like 50 inside a red-bordered white circle tells you THIS.",
          response: "What is the maximum speed limit (50 km/h)?",
          note: "Speed limits are posted as a black number in a red-bordered white circle, in km/h.",
        },
        {
          value: 1000,
          clue: "On major roads and in cities, Japanese signs increasingly appear in two languages: Japanese and THIS one.",
          response: "What is English?",
          note: "Bilingual Japanese/English signage is now common; expressway route shields are green, ordinary-road shields blue.",
        },
      ],
    },
    {
      name: "The Open Road",
      clues: [
        {
          value: 200,
          clue: "Unlike most ordinary roads, Japan's expressways require riders to pay THESE.",
          response: "What are tolls?",
          note: "Expressways (高速道路) are tolled; motorcycle tolls run roughly 20% cheaper than cars.",
        },
        {
          value: 400,
          clue: "This three-letter electronic system lets you roll through toll gates without stopping (slow to 20 km/h).",
          response: "What is ETC (Electronic Toll Collection)?",
          note: "Motorcycle ETC users can also buy flat-rate regional 'Touring Plan' passes for multi-day trips.",
        },
        {
          value: 600,
          clue: "On most Japanese expressways this is the standard maximum speed limit in km/h.",
          response: "What is 100 km/h?",
          note: "The standard expressway limit is 100 km/h; a few Shin-Tomei and Tohoku sections allow 120.",
        },
        {
          value: 800,
          clue: "On a multi-lane road you should cruise in the leftmost lane and use the right lanes only for THIS.",
          response: "What is passing / overtaking?",
          note: "Keep left and pass on the right; sitting in the right lane is improper lane use.",
        },
        {
          value: 1000,
          clue: "In town, parking your bike on the sidewalk risks a fine and towing — instead look on Google Maps for one of these, marked 二輪駐車場.",
          response: "What is designated motorcycle parking?",
          note: "Illegal-parking fines run about ¥9,000-¥12,000; cities enforce strictly, so use 二輪 parking.",
        },
      ],
    },
  ],
  finalJeopardy: {
    category: "Japanese Driving Culture",
    clue: "Flashing your hazard lights two or three times after a driver lets you merge is this polite, unofficial gesture known by a katakana-English name.",
    response: "What is the 'thank-you hazard' (サンキューハザード)?",
    note: "It's etiquette, not law — a quick way to say thanks (or sorry) to other drivers. Honking, by contrast, is considered rude.",
  },
};

export default gameData;
