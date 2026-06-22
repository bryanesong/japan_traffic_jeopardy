import type { QuestionBank, SourceRef } from "./types";

/**
 * Japan Traffic Jeopardy — question bank.
 *
 * A POOL of clues for foreign riders touring Japan by motorcycle. Each category
 * holds many clues across the dollar tiers; lib/board.ts samples one per tier
 * per game, so every game is a different board (the "New Board" / "New Game"
 * buttons reshuffle). Clues are Jeopardy "answers" (statements); responses are
 * questions ("What is...?"). `note` explains the real rule on reveal, `source`
 * links the authoritative page so any answer can be fact-checked, and `image`
 * is an optional Irasutoya filename in /public/illustrations.
 *
 * Laws as of 2024-2026 — always confirm current rules before you ride.
 */

// Reusable sources (verified to resolve as of June 2026).
const SRC = {
  jafRules: { label: "JAF — Rules of the Road", url: "https://english.jaf.or.jp/driving-in-japan/rules-of-the-road" },
  jafTraffic: { label: "JAF — Traffic Rules in Japan", url: "https://english.jaf.or.jp/driving-in-japan/traffic-rules" },
  jafForeign: { label: "JAF — Driving with a foreign license", url: "https://english.jaf.or.jp/use-jaf-more/drive-in-japan" },
  jafSafe: { label: "JAF — Driving a Motor Vehicle in Japan", url: "https://english.jaf.or.jp/safe-driving/traffic-rules-in-japan" },
  nexcoBike: { label: "NEXCO Central — Motorcycle ETC & expressway guide", url: "https://www.c-nexco.co.jp/en/inbound-en/etc/etc_guide/bike/" },
  nexcoTouring: { label: "NEXCO EAST — Touring Plan for ETC motorcycles", url: "https://www.e-nexco.co.jp/en/pressroom/head_office/2025/0325/00014798.html" },
  shutokoETC: { label: "Shutoko — ETC guide", url: "https://www.shutoko.co.jp/en/index/driving/etc/" },
  npaAlcohol: { label: "Japan National Police Agency — Eradication of Drinking and Driving", url: "https://www.npa.go.jp/english/bureau/traffic/document/01_EradicationofDrinkingandDriving.pdf" },
  npaPedestrians: { label: "Japan National Police Agency — Pedestrians First at Road Crossings", url: "https://www.npa.go.jp/english/bureau/traffic/document/06_PedestriansFirstatRoadCrossings.pdf" },
  npaSignals: { label: "Japan National Police Agency — Traffic Lights", url: "https://www.npa.go.jp/english/bureau/traffic/traffic-light_english.pdf" },
  oistAlcohol: { label: "OIST — Drunk Driving (penalties & joint liability)", url: "https://www.oist.jp/resource-center/drunk-driving" },
  lawDriving: { label: "Japanese Law Translation — Act on Punishment of Driving Causing Death/Injury", url: "https://www.japaneselawtranslation.go.jp/en/laws/view/2965/en" },
  japanTimes2024: { label: "The Japan Times — Revised Road Traffic Law (2024)", url: "https://www.japantimes.co.jp/news/2024/10/20/japan/crime-legal/revised-road-traffic-law/" },
  japanTodayCycle: { label: "Japan Today — Drunk cycling can suspend your license", url: "https://japantoday.com/category/crime/drunk-cycling-can-result-in-an-instantly-suspended-driver%E2%80%99s-license-in-japan" },
  wikiSigns: { label: "Wikipedia — Road signs in Japan", url: "https://en.wikipedia.org/wiki/Road_signs_in_Japan" },
  wikiSpeed: { label: "Wikipedia — Speed limits in Japan", url: "https://en.wikipedia.org/wiki/Speed_limits_in_Japan" },
  wikiLargeBike: { label: "Wikipedia — Large two-wheel motor vehicle (Japan)", url: "https://en.wikipedia.org/wiki/Large_two-wheel_motor_vehicle_(Japan)" },
  wikiStdBike: { label: "Wikipedia — Standard two-wheel motor vehicle (Japan)", url: "https://en.wikipedia.org/wiki/Standard_two-wheel_motor_vehicle_(Japan)" },
  cotoSigns: { label: "Coto Academy — How to Read Japanese Road Signs", url: "https://cotoacademy.com/street-road-sign-in-japan-guide/" },
  tsunaguSigns: { label: "tsunagu Japan — Guide to Japanese Road Signs", url: "https://www.tsunagujapan.com/wow_02312/" },
  mlitNumbering: { label: "MLIT — Japan's Expressway Numbering System", url: "https://www.mlit.go.jp/road/sign/numbering/en/about/index.html" },
  liveJapanMoto: { label: "LIVE JAPAN — Motorcycle Riding in Japan", url: "https://livejapan.com/en/article-a0000201/" },
  ninjaLane: { label: "The Ninja Rider — Lane Splitting in Japan", url: "https://theninjarider.com/lane-splitting-japan/" },
  ninjaRules: { label: "The Ninja Rider — Motorcycle Laws & Rules for Foreign Riders", url: "https://theninjarider.com/motorcycle-rules-japan/" },
  mototours: { label: "Moto Tours Japan — Traffic Rules", url: "https://www.mototoursjapan.com/user_guide/traffic_rules.html" },
  rental819: { label: "Rental819 — Traffic Rules in Japan", url: "https://rental819.com/doc/traffic_rules" },
  team819: { label: "Team819S — Rules of the Road Japan: Helmets", url: "https://www.team819s.com/ride/rules-of-the-road-japan-helmets" },
  japanFAQ: { label: "The Japan Biker FAQ — Motorcycle Classes", url: "https://www.thejapanfaq.com/bikerfaq-classes.html" },
  unR41: { label: "UNECE — Motorcycle noise regulation in Japan (UN R41)", url: "https://unece.org/DAM/trans/doc/2017/wp29grb/GRB-66-08e.pdf" },
  jnc: { label: "Japanese Nostalgic Car — Illegal Exhaust Awareness Month", url: "https://japanesenostalgiccar.com/news-june-is-illegal-exhaust-awareness-month-in-japan/" },
  usEmbassy: { label: "U.S. Embassy Japan — Driving in Japan", url: "https://jp.usembassy.gov/services/driving-in-japan/" },
  japanLivingGuide: { label: "Japan Living Guide — License Classifications", url: "https://www.japanlivingguide.com/expatinfo/driving/drivers-license-classifications/" },
  ziplusGaimen: { label: "ZipLus Road Ready — License Conversion (Gaimen Kirikae 2025)", url: "https://ziplus.jp/road-ready/article_list/license-conversion/license-conversion-in-japan-a-guide-to-gaimen-kirikae-2025/" },
  timesCar: { label: "Times Car Rental — Traffic Rules in Japan", url: "https://www.timescar-rental.com/en/japan/rules.html" },
  plazaChildSeat: { label: "PLAZA HOMES — Child Car Seat Safety in Japan", url: "https://www.realestate-tokyo.com/living-in-tokyo/driving/child-seat-safety/" },
  jntoMichi: { label: "JNTO — Michi-no-Eki Roadside Stations", url: "https://www.japan.travel/en/guide/michi-no-eki/" },
  nipponSA: { label: "Nippon.com — Expressway Service & Parking Areas", url: "https://www.nippon.com/en/features/jg00002/" },
  funJapan: { label: "FUN! JAPAN — DOs and DON'Ts of Driving in Japan", url: "https://www.fun-japan.jp/en/articles/8307" },
  thankYou: { label: "Top Gear Philippines — How Japanese drivers say 'thank you'", url: "https://www.topgear.com.ph/features/feature-articles/japan-thank-you-driving-a00187-20180818" },
} satisfies Record<string, SourceRef>;

export const questionBank: QuestionBank = {
  categories: [
    {
      name: "Rules of the Road",
      image: "cat_rules.png",
      clues: [
        { value: 200, clue: "In Japan the steering wheel is on the right because traffic moves on THIS side of the road.", response: "What is the left?", note: "Japan drives on the left; keep-left is the basic rule and you overtake on the right.", source: SRC.jafRules, image: "drive_left.png" },
        { value: 200, clue: "In a Japanese car this restraint is mandatory for the driver and EVERY passenger — including everyone in the back seats.", response: "What is a seatbelt?", note: "Japan requires seatbelts for all occupants, front and rear.", source: SRC.timesCar, image: "seatbelt.png" },
        { value: 400, clue: "Unlike back home, at a red light in Japan you may NEVER make this maneuver — you must wait for green or a green arrow.", response: "What is a turn on red?", note: "There is no 'turn on red' in Japan. Only a green light or green-arrow signal lets you proceed.", source: SRC.jafTraffic, image: "red_light.png" },
        { value: 400, clue: "Japanese law requires a child safety seat for any passenger younger than this single-digit age.", response: "What is 6 (years old)?", note: "Children under 6 must ride in an appropriate child seat; from 6 they may use the adult belt.", source: SRC.plazaChildSeat, image: "child_car_seat.png" },
        { value: 600, clue: "When no speed-limit sign is posted on an ordinary road, this is the statutory maximum speed in km/h.", response: "What is 60 km/h?", note: "The statutory default is 60 km/h on ordinary roads (and 100 km/h on expressways). Posted signs override it.", source: SRC.jafTraffic, image: "speedometer.png" },
        { value: 600, clue: "You must pull to the left and, at an intersection, clear it and wait — giving way to THIS kind of siren-equipped vehicle.", response: "What is an emergency vehicle?", note: "Drivers must yield to approaching emergency vehicles, pulling left and clearing intersections.", source: SRC.jafSafe, image: "emergency_vehicle.png" },
        { value: 800, clue: "Even with the gates up and no train in sight, every rider must do THIS at every railroad crossing.", response: "What is come to a complete stop?", note: "A full stop is mandatory at all railroad crossings — then look and listen before crossing.", source: SRC.jafTraffic, image: "railroad_crossing.png" },
        { value: 800, clue: "At an unsignaled striped crosswalk with a pedestrian waiting to cross, the law requires you to do exactly THIS.", response: "What is come to a stop?", note: "Vehicles must stop for pedestrians at or about to use an unsignaled crosswalk.", source: SRC.npaPedestrians, image: "crosswalk_pedestrian.png" },
        { value: 1000, clue: "At an intersection with no signals, a rider turning must always yield to THESE two groups of road users.", response: "What are pedestrians and cyclists?", note: "Turning vehicles must yield to pedestrians and cyclists crossing, and to traffic on the priority road.", source: SRC.jafRules, image: "crosswalk.png" },
        { value: 1000, clue: "Since a 2020 rule aimed at dusk crashes, all NEW cars sold in Japan must automatically switch these on as light fades.", response: "What are headlights?", note: "From April 2020, new passenger cars must be fitted with automatic headlights.", source: SRC.jafSafe, image: "car_headlights.png" },
      ],
    },
    {
      name: "License to Ride",
      image: "cat_license.png",
      clues: [
        { value: 200, clue: "To legally ride in Japan, most foreign tourists must carry this internationally recognized permit alongside their home license.", response: "What is an International Driving Permit (IDP)?", note: "An IDP plus your original home license are both required — the IDP is invalid on its own.", source: SRC.jafForeign, image: "intl_permit.png" },
        { value: 200, clue: "Besides a credit card, rental shops check this photo travel document that proves your entry date — and police expect you to carry it while riding.", response: "What is your passport?", note: "Carry your passport while riding; it proves your entry date, which starts the IDP's one-year clock.", source: SRC.usEmbassy, image: "passport_travel.png" },
        { value: 400, clue: "Japan only honors an IDP issued under THIS 1949 convention — not the 1968 Vienna one.", response: "What is the Geneva Convention (on Road Traffic, 1949)?", note: "The IDP's cover must read 'CONVENTION ON ROAD TRAFFIC 1949'. Many countries issue the 1968 version, which Japan rejects.", source: SRC.jafForeign, image: "globe.png" },
        { value: 400, clue: "This is the minimum age to first earn a moped or ordinary motorcycle license in Japan.", response: "What is 16 (years old)?", note: "16 for the moped and ordinary motorcycle licenses; 18 for the large class.", source: SRC.japanLivingGuide, image: "age_sixteen.png" },
        { value: 600, clue: "Counting from your date of entry into Japan, this is how long you're allowed to drive on a valid IDP.", response: "What is one year?", note: "You may ride for up to one year from your date of entry (the IDP is also valid one year from issue).", source: SRC.jafForeign, image: "calendar.png" },
        { value: 600, clue: "Residents swap a foreign license for a Japanese one through this process nicknamed gaimen kirikae — a document check, a written test, and usually a driving exam.", response: "What is converting your license (gaimen kirikae)?", note: "外免切替: document screening, a knowledge test, and (for most) a practical driving test.", source: SRC.jafForeign, image: "license_conversion.png" },
        { value: 800, clue: "Riders from Switzerland, Germany, France, Belgium, Monaco and Taiwan can't use an IDP at all — instead they need their home license plus THIS, available from JAF for about ¥6,000.", response: "What is an official Japanese translation of their license?", note: "These six countries' licenses aren't covered by the Geneva IDP, so an official JAF (or embassy) translation is required.", source: SRC.jafForeign, image: "translation.png" },
        { value: 800, clue: "Mopeds can't carry anyone, so this is the smallest license class — covering bikes up to 125cc — that legally lets you take a passenger.", response: "What is the small motorcycle license (小型二輪)?", note: "≤50cc mopeds carry no passenger; the ≤125cc small class is the entry license that allows one (after the 1-year rule).", source: SRC.japanFAQ, image: "small_license.png" },
        { value: 1000, clue: "To rent a bike, shops require your IDP (or translation), your home license, your passport, and THIS — used to hold a ¥20,000-plus security deposit.", response: "What is a credit card?", note: "Rental shops need all four documents; many also set their own minimum age (often 20 or 25) for larger bikes.", source: SRC.liveJapanMoto, image: "credit_card.png" },
        { value: 1000, clue: "Since October 2025, the gaimen kirikae written exam ballooned from 10 questions to THIS many, with the pass bar raised to 90%.", response: "What is 50?", note: "From Oct 1 2025 the conversion knowledge test is 50 questions needing 90% (45/50) to pass.", source: SRC.ziplusGaimen, image: "written_test.png" },
      ],
    },
    {
      name: "Two-Wheel Law",
      image: "cat_motorcycle.png",
      clues: [
        { value: 200, clue: "On every motorcycle in Japan this head-protecting safety item is legally required for BOTH rider and passenger, no matter the engine size.", response: "What is a helmet?", note: "Helmets are mandatory nationwide and should carry a PSC, SG, or JIS approval mark.", source: SRC.liveJapanMoto, image: "helmet.png" },
        { value: 200, clue: "A 50cc moped (gentsuki) may never exceed THIS speed in km/h, even where cars may legally go faster.", response: "What is 30 km/h?", note: "50cc mopeds are capped at 30 km/h regardless of the posted limit.", source: SRC.mototours, image: "moped_30kmh.png" },
        { value: 400, clue: "To legally use a Japanese expressway, your motorcycle's engine must be larger than this displacement.", response: "What is 125cc?", note: "Bikes 125cc and under are banned from expressways — you need over 125cc to get on.", source: SRC.nexcoBike, image: "motorcycle_highway.png" },
        { value: 400, clue: "A road-legal motorcycle helmet should bear one of these three-letter approval marks — PSC, SG, or JIS; name one.", response: "What is PSC (or SG / JIS)?", note: "These marks certify a helmet is safety-approved for road use.", source: SRC.team819, image: "helmet_marks.png" },
        { value: 600, clue: "To carry a passenger on an ordinary road, a rider must have held their license for at least this long.", response: "What is one year?", note: "Tandem riding on ordinary roads requires one year of license experience (and a bike over 50cc with proper footpegs).", source: SRC.liveJapanMoto, image: "tandem.png" },
        { value: 600, clue: "At a big intersection of three or more lanes, a moped can't sweep across; it must make THIS maneuver, also called a 'hook turn.'", response: "What is a two-stage right turn?", note: "Mopeds must do a two-stage (hook) right turn where there are 3+ lanes, unless a sign forbids it.", source: SRC.rental819, image: "two_stage_turn.png" },
        { value: 800, clue: "Carrying a passenger on an EXPRESSWAY is stricter: the rider must be at least this old AND have this many years of experience.", response: "What is 20 years old and 3 years of experience?", note: "Two-up on expressways has only been legal since 2005, and some Tokyo Shuto sections still ban it entirely.", source: SRC.liveJapanMoto, image: "tandem_highway.png" },
        { value: 800, clue: "Above the moped and small classes, THIS license is the minimum needed for a bike over 125cc and up to 400cc.", response: "What is the ordinary motorcycle license (普通二輪)?", note: "普通二輪 covers bikes from above 125cc up to 400cc; above that needs the large license.", source: SRC.wikiStdBike, image: "ordinary_license.png" },
        { value: 1000, clue: "Squeezing slowly between lanes of stopped cars has THIS legal status in Japan — no law clearly permits or bans it.", response: "What is a legal gray area?", note: "Slow filtering is generally tolerated, but aggressive weaving (or crossing solid lines) can be cited as reckless driving.", source: SRC.ninjaLane, image: "traffic_jam_bike.png" },
        { value: 1000, clue: "During June's nationwide crackdown, police specifically target this loud, illegal exhaust offense — gutting or removing the silencer.", response: "What is (illegal) muffler modification?", note: "Modifying the muffler is illegal; bikes built since April 2010 need the original or a certified one. June is 'illegal exhaust awareness' month.", source: SRC.jnc, image: "illegal_muffler.png" },
      ],
    },
    {
      name: "Don't Drink & Ride",
      image: "cat_alcohol.png",
      clues: [
        { value: 200, clue: "Japan is famous for having essentially a 'zero tolerance' policy toward driving after consuming THIS.", response: "What is alcohol?", note: "Penalties are severe and the legal threshold is very low — the safest amount before riding is none.", source: SRC.npaAlcohol, image: "beer.png" },
        { value: 200, clue: "A 2024 update to the Road Traffic Act made it a crime, with fines up to ¥1,000,000, to ride THIS pedal-powered vehicle drunk.", response: "What is a bicycle?", note: "From Nov 2024, drunk cycling carries up to 5 years or a ¥1M fine for serious impairment; the same 0.15 mg/L limit applies.", source: SRC.japanTimes2024, image: "drunk_cyclist.png" },
        { value: 400, clue: "Holding one of these handheld devices to talk or look at a screen while riding — unless it's hands-free — costs you a fine and demerit points.", response: "What is a mobile phone?", note: "Penalties were sharply increased in Dec 2019; phone use that causes danger means an instant suspension.", source: SRC.jafTraffic, image: "phone_driving.png" },
        { value: 400, clue: "Besides alcohol, riding impaired by THESE two things — illegal substances or severe drowsiness — counts as dangerous driving; name either.", response: "What are drugs or fatigue?", note: "Driving under the influence of drugs or in a fatigued/drowsy state is covered by Japan's dangerous-driving law.", source: SRC.lawDriving, image: "drowsy_rider.png" },
        { value: 600, clue: "This is the breath-alcohol level, in mg per liter, at which a rider is legally 'with alcohol' and can be jailed up to 3 years.", response: "What is 0.15 mg per liter?", note: "0.15 mg/L of breath (about 0.03% BAC) is the legal threshold under the Road Traffic Act.", source: SRC.npaAlcohol, image: "breathalyzer.png" },
        { value: 600, clue: "A 0.15 mg/L breath reading adds 13 of THESE to your record; a 0.25 mg/L reading adds 25.", response: "What are demerit (penalty) points?", note: "13 points at ≥0.15 mg/L and 25 points at ≥0.25 mg/L on Japan's demerit-point system.", source: SRC.oistAlcohol, image: "demerit_points.png" },
        { value: 800, clue: "For the most serious drunk-driving charge, a rider faces imprisonment of up to this many years.", response: "What is 5 years?", note: "Driving while genuinely intoxicated (酒酔い) carries up to 5 years in prison or a ¥1,000,000 fine.", source: SRC.npaAlcohol, image: "handcuffs.png" },
        { value: 800, clue: "Hitting 25 demerit points at the 0.25 mg/L tier triggers THIS — the most severe loss of your license, for at least two years.", response: "What is license revocation?", note: "25 points means revocation with a disqualification period of at least 2 years for a clean-record driver.", source: SRC.oistAlcohol, image: "license_revoked.png" },
        { value: 1000, clue: "Beyond the drunk rider, Japanese law also punishes THESE three groups — including anyone who poured the drinks or lent the bike.", response: "What are the passenger, the alcohol provider, and the vehicle provider?", note: "Under 'joint responsibility,' passengers and alcohol-givers face up to 3 yrs/¥500,000, and vehicle-providers up to 5 yrs/¥1,000,000.", source: SRC.oistAlcohol, image: "police.png" },
        { value: 1000, clue: "Cause death or injury while drunk, then drink more or flee to hide your impairment, and the sentence can reach THIS many years.", response: "What is 12 years?", note: "The 'evasion of detection' provision raises a dangerous-driving sentence up to 12 years.", source: SRC.lawDriving, image: "evasion.png" },
      ],
    },
    {
      name: "Signs & Signals",
      image: "cat_signs.png",
      clues: [
        { value: 200, clue: "Written 止まれ on an upside-down red triangle, this sign tells you to do exactly this.", response: "What is stop?", note: "Japan's stop sign is an inverted red triangle reading 'tomare' — unusual versus the global octagon.", source: SRC.wikiSigns, image: "stop_sign.png" },
        { value: 200, clue: "A lit arrow of THIS color lets you proceed in its direction even while the main light is red.", response: "What is green?", note: "A green arrow permits movement in the arrow's direction even when the main signal is red.", source: SRC.npaSignals, image: "green_arrow.png" },
        { value: 400, clue: "A round road sign with a BLUE background tells you this is something you are required to do, rather than something prohibited.", response: "What is mandatory (a mandatory instruction)?", note: "Blue circles = mandatory/instruction; a white circle with a red border = a prohibition.", source: SRC.wikiSigns, image: "blue_sign.png" },
        { value: 400, clue: "Treat a Japanese traffic light flashing THIS color exactly like a stop sign: full stop, then go when clear.", response: "What is red?", note: "A flashing red signal means stop completely, then proceed when safe.", source: SRC.npaSignals, image: "flashing_red.png" },
        { value: 600, clue: "A red circle crossed by a single horizontal white bar delivers THIS command to a rider.", response: "What is 'Do Not Enter' (no entry / one-way against you)?", note: "It marks a closed road or the wrong way of a one-way street.", source: SRC.wikiSigns, image: "no_entry.png" },
        { value: 600, clue: "Japanese signs warning of hazards like curves or animals all share THIS background color and a diamond shape.", response: "What is yellow?", note: "Warning (caution) signs are yellow diamonds with black symbols.", source: SRC.wikiSigns, image: "yellow_warning.png" },
        { value: 800, clue: "A number like 50 inside a red-bordered white circle tells you THIS.", response: "What is the maximum speed limit (50 km/h)?", note: "Speed limits are posted as a black number in a red-bordered white circle, in km/h.", source: SRC.wikiSigns, image: "speed_sign.png" },
        { value: 800, clue: "On guide signs, an expressway route number sits on a shield of THIS color, unlike the blue used for ordinary national routes.", response: "What is green?", note: "Expressway guide signs use a green background; ordinary-road guide signs use blue.", source: SRC.wikiSigns, image: "green_shield.png" },
        { value: 1000, clue: "On major roads and in cities, Japanese signs increasingly appear in two languages: Japanese and THIS one.", response: "What is English?", note: "Bilingual Japanese/English signage is now common; expressway route shields are green, ordinary-road shields blue.", source: SRC.wikiSigns, image: "road_sign.png" },
        { value: 1000, clue: "Since 2017, to help visitors, Japan's expressway route numbers carry THIS single capital letter, as in 'E1'.", response: "What is E?", note: "Expressways are numbered with an 'E' prefix (e.g., E1 Tomei).", source: SRC.mlitNumbering, image: "e_number.png" },
      ],
    },
    {
      name: "The Open Road",
      image: "cat_expressway.png",
      clues: [
        { value: 200, clue: "Unlike most ordinary roads, Japan's expressways require riders to pay THESE.", response: "What are tolls?", note: "Expressways (高速道路) are tolled; motorcycle tolls run roughly 20% cheaper than cars.", source: SRC.nexcoBike, image: "tollgate.png" },
        { value: 200, clue: "Over 1,000 government-designated roadside stations with free parking, toilets, and local goods make great rider rest stops; name them.", response: "What are michi-no-eki (roadside stations)?", note: "道の駅: 1,000+ government-designated roadside rest stops.", source: SRC.jntoMichi, image: "michi_no_eki.png" },
        { value: 400, clue: "This three-letter electronic system lets you roll through toll gates without stopping (slow to 20 km/h).", response: "What is ETC (Electronic Toll Collection)?", note: "Motorcycle ETC users can also buy flat-rate regional 'Touring Plan' passes for multi-day trips.", source: SRC.nexcoBike, image: "etc_gate.png" },
        { value: 400, clue: "Spaced about every 50 km with restaurants, shops, and fuel, this larger expressway rest stop is abbreviated 'SA'.", response: "What is a Service Area?", note: "Service Areas (SA) are the larger rest stops (~every 50 km) with food, shops, and gas.", source: SRC.nipponSA, image: "service_area.png" },
        { value: 600, clue: "On most Japanese expressways this is the standard maximum speed limit in km/h.", response: "What is 100 km/h?", note: "The standard expressway limit is 100 km/h; a few Shin-Tomei and Tohoku sections allow 120.", source: SRC.jafTraffic, image: "expressway.png" },
        { value: 600, clue: "Too slow is illegal too: most expressways set a MINIMUM speed of THIS in km/h.", response: "What is 50 km/h?", note: "The standard expressway minimum is 50 km/h; vehicles that can't reach it (e.g. mopeds) are barred.", source: SRC.wikiSpeed, image: "minimum_speed.png" },
        { value: 800, clue: "On a multi-lane road you should cruise in the leftmost lane and use the right lanes only for THIS.", response: "What is passing / overtaking?", note: "Keep left and pass on the right; sitting in the right lane is improper lane use.", source: SRC.jafRules, image: "highway_lanes.png" },
        { value: 800, clue: "On the safest sections of the Shin-Tomei and Tohoku expressways, the top limit was raised above 100 to THIS in km/h.", response: "What is 120 km/h?", note: "Select expressway sections now allow a 120 km/h maximum.", source: SRC.wikiSpeed, image: "speed_120.png" },
        { value: 1000, clue: "In town, leaving your bike on the sidewalk risks a fine and towing — so instead seek out one of these dedicated two-wheeler lots, signposted 二輪駐車場.", response: "What is designated motorcycle parking?", note: "Illegal-parking fines run about ¥9,000-¥12,000; cities enforce strictly, so use 二輪 parking.", source: SRC.ninjaRules, image: "parking.png" },
        { value: 1000, clue: "Seasonal for ETC-equipped bikes, this NEXCO flat-rate deal gives unlimited hop-on/off of set expressways for a day or more at about half price.", response: "What is the (ETC motorcycle) Touring Plan?", note: "The Touring Plan is a flat-rate, multi-day, unlimited-use motorcycle expressway discount.", source: SRC.nexcoTouring, image: "touring_plan.png" },
      ],
    },
  ],
  finals: [
    {
      category: "Japanese Driving Culture",
      clue: "Flashing your hazard lights two or three times after a driver lets you merge is this polite, unofficial gesture known by a katakana-English name.",
      response: "What is the 'thank-you hazard' (サンキューハザード)?",
      note: "It's etiquette, not law — a quick way to say thanks (or sorry) to other drivers. Honking, by contrast, is considered rude.",
      source: SRC.thankYou,
      image: "thank_you_driving.png",
    },
    {
      category: "Japanese Driving Culture",
      clue: "Japanese drivers consider this common noisemaker rude except for genuine danger, which is part of why the streets stay so notably quiet.",
      response: "What is the horn (honking)?",
      note: "Honking is reserved for real warnings; casual use is considered impolite.",
      source: SRC.funJapan,
      image: "no_honking.png",
    },
  ],
};

export default questionBank;
