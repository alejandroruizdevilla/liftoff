window.SIMS = [
  {
    id: "kerbal-space-program",
    name: "Kerbal Space Program",
    tagline: "Build · Launch · Explode · Learn",
    glyph: "🚀",
    shortDesc: "The gateway drug to orbital mechanics. Strap green aliens to questionable engineering and discover Δv the hard way. Still the best on-ramp to real rocket science ever made.",
    longDesc: [
      "KSP is the simulator that taught a generation what an orbit actually is. You build rockets out of LEGO-like parts in a hangar, then fly them with a real Newtonian physics model — gravity, atmospheric drag, and the cruel arithmetic of the Tsiolkovsky rocket equation are all simulated honestly.",
      "What makes it special isn't realism alone (it's been beaten on that axis), but the loop: design, fail, iterate. Every catastrophic failure teaches something true about real spaceflight. NASA JPL and SpaceX engineers have publicly cited it as a useful intuition-builder.",
      "The mod scene is enormous and still alive. Real Solar System turns it into a hyper-realistic Earth-orbit simulator; kOS adds programmable autopilots; Realism Overhaul shifts every constant to real-world values. You can spend a thousand hours and still find new corners."
    ],
    developer: "Squad / Private Division",
    publisher: "Private Division",
    releaseYear: 2015,
    price: "Paid",
    priceDetail: "$39.99 (frequent sales to ~$10)",
    paid: true,
    platforms: "Win · macOS · Linux · PS4 · Xbox",
    systemReq: "Win 7+, 4GB RAM, OpenGL 3.0+ GPU",
    link: "https://www.kerbalspaceprogram.com/",
    stars: 5,
    ratings: { realism: 4, accessibility: 4, depth: 5, learningCurve: 3, community: 5 },
    pros: [
      "Best intuition-builder for real orbital mechanics, period",
      "Massive mod ecosystem — over a decade of community content",
      "Forgiving difficulty options for newcomers, brutal realism for veterans",
      "Endorsed by working aerospace engineers",
      "Career mode adds budgets, contracts, and progression"
    ],
    cons: [
      "Aging Unity engine — performance suffers with large craft",
      "KSP 2 development was cancelled, leaving sequel hopes in limbo",
      "UI feels dated and isn't great on first contact"
    ],
    bestFor: "Anyone who has ever wondered how rockets actually work, and wants to find out by blowing a few up.",
    quickFacts: [
      "Used by NASA JPL for educational outreach",
      "Real Δv calculations governed by the Tsiolkovsky equation",
      "Active modding community since 2011",
      "Career mode includes science, contracts, and budgets",
      "Multiplayer available via Dark Multiplayer mod"
    ],
    related: ["juno-new-origins", "spaceflight-simulator", "children-of-a-dead-earth"],
    tags: ["game", "space", "realistic"]
  },
  {
    id: "openrocket",
    name: "OpenRocket",
    tagline: "Free, open-source, deadly accurate",
    glyph: "🛰️",
    shortDesc: "The standard for hobby rocketry. Design a rocket, simulate flight with real atmospheric models, and predict apogee within meters. Used by clubs and competitions worldwide.",
    longDesc: [
      "OpenRocket is the model rocketry community's de facto design and simulation tool. Built in Java, free, and open-source, it provides 6-degree-of-freedom flight simulation with realistic aerodynamics, atmospheric models, and stability analysis using the Barrowman method.",
      "If you build cardboard-and-balsa rockets at the kitchen table — or fiberglass-and-composite high-power birds — OpenRocket is what you reach for first. The component library covers virtually every commercially available motor (CTI, Aerotech, Estes, Klima) and updates regularly via a community-maintained .ork file format.",
      "Launch clubs use it for prelaunch safety checks. National rocketry organisations recognise its predictions. Competition teams build their entire designs in it. The fact that it's free is genuinely surprising once you realise how much engineering work has gone in."
    ],
    developer: "Sampo Niskanen and contributors",
    publisher: "Open source (GPL)",
    releaseYear: 2009,
    price: "Free · OSS",
    priceDetail: "Free forever (GPLv3)",
    paid: false,
    platforms: "Win · macOS · Linux (Java 17+)",
    systemReq: "Java 17+, 2GB RAM",
    link: "https://openrocket.info/",
    stars: 5,
    ratings: { realism: 5, accessibility: 4, depth: 4, learningCurve: 3, community: 4 },
    pros: [
      "Free and open source — completely",
      "Predictive accuracy comparable to paid commercial tools",
      "Huge motor and component database, updated constantly",
      "Used in real launch certification flights worldwide",
      "Active development and CI builds available"
    ],
    cons: [
      "Java UI feels unfashionable on modern systems",
      "Documentation is community-driven — quality varies",
      "Doesn't simulate complex active control surfaces"
    ],
    bestFor: "Anyone building physical model or high-power rockets and needing real apogee/stability predictions.",
    quickFacts: [
      "GPLv3-licensed open source",
      "6-DoF flight simulation",
      "Recognised by Tripoli and NAR for prelaunch analysis",
      "Wind, atmospheric pressure, and Coriolis effects modeled",
      "Exports to RockSim format for cross-tool compatibility"
    ],
    related: ["rocksim", "rocketpy", "juno-new-origins"],
    tags: ["model", "free", "realistic"]
  },
  {
    id: "juno-new-origins",
    name: "Juno: New Origins",
    tagline: "SimpleRockets 2, all grown up",
    glyph: "🛸",
    shortDesc: "Build any rocket, plane, or rover with a part-by-part editor and Lua-scriptable engines. The sweet spot between KSP's chaos and OpenRocket's seriousness.",
    longDesc: [
      "Originally launched as SimpleRockets 2 in 2018, the game was renamed Juno: New Origins to reflect how far it's grown. Where KSP gives you predefined parts to bolt together, Juno hands you procedural everything — fuel tanks of any shape, custom-curve nose cones, fully designable engines with Lua-scriptable behaviour.",
      "It scratches a different itch from KSP. The vibe is engineer-first rather than goofy-failure-first. Solar systems are larger, planets bigger, and the craft you can build are genuinely huge. Juno also runs well on phones and tablets, which is rare for a sim of this depth.",
      "Multiplayer and a craft-sharing community keep it interesting after the campaign. If you find KSP charming but limiting, this is the sequel KSP 2 was supposed to be."
    ],
    developer: "Jundroo, LLC",
    publisher: "Jundroo, LLC",
    releaseYear: 2018,
    price: "Paid",
    priceDetail: "$24.99 PC · $4.99 mobile",
    paid: true,
    platforms: "Win · macOS · iOS · Android",
    systemReq: "Win 7+, 2GB RAM (low spec friendly)",
    link: "https://www.simplerockets.com/",
    stars: 4,
    ratings: { realism: 4, accessibility: 4, depth: 5, learningCurve: 3, community: 4 },
    pros: [
      "Procedural part design — build anything, any shape",
      "Lua scripting for engines, autopilots, and electronics",
      "Runs well on tablets and phones",
      "Active multiplayer and craft-sharing community",
      "Larger, more detailed solar system than KSP 1"
    ],
    cons: [
      "Smaller modding scene than KSP",
      "Some advanced features have a steeper UI than expected",
      "Mobile builds occasionally lag behind PC"
    ],
    bestFor: "Tinkerers who love designing every bolt and want their work to run on the train.",
    quickFacts: [
      "Procedural fuel tanks, nose cones, and engines",
      "Built-in Lua scripting environment",
      "Cross-platform craft sharing",
      "Real-scale solar system option",
      "Was renamed from SimpleRockets 2 in 2023"
    ],
    related: ["kerbal-space-program", "spaceflight-simulator", "openrocket"],
    tags: ["game", "space", "model"]
  },
  {
    id: "orbiter",
    name: "Orbiter 2024",
    tagline: "Cult-classic spaceflight sim",
    glyph: "🛰",
    shortDesc: "Newtonian physics, real spacecraft (Shuttle, Soyuz, Apollo), and a community that has been adding mods for two decades. Steep learning curve. Bottomless payoff.",
    longDesc: [
      "Orbiter started in 2000 as a one-person project by physicist Martin Schweiger. Two and a half decades later it's a cult standard — a free, hard-physics spaceflight sim where every spacecraft is a real one, every cockpit panel is functional, and every orbit is computed from honest Newtonian mechanics.",
      "The base sim ships modest content; the magic is in the addons. Communities have meticulously rebuilt the entire Apollo program, the Space Shuttle (with full systems), Soyuz, the ISS, and even the upcoming Artemis hardware. There's an addon for almost every real spacecraft ever flown.",
      "It's not a game in the conventional sense. There are no missions, no objectives, no scoring. You set up a scenario — say, a TLI burn from low Earth orbit — and you fly it. That sounds dry until you've spent six hours getting an Apollo CSM to lunar orbit by hand and the experience flips into something closer to a religious one."
    ],
    developer: "Martin Schweiger",
    publisher: "Open source community (since 2021)",
    releaseYear: 2000,
    price: "Free",
    priceDetail: "Free, open source",
    paid: false,
    platforms: "Windows",
    systemReq: "Win 7+, modest GPU",
    link: "http://orbit.medphys.ucl.ac.uk/",
    stars: 4,
    ratings: { realism: 5, accessibility: 2, depth: 5, learningCurve: 1, community: 4 },
    pros: [
      "Hard Newtonian physics, no shortcuts",
      "Free and open source since 2021",
      "Massive mod library covering nearly every real spacecraft",
      "Cult community with deep technical expertise",
      "Cockpit fidelity bordering on study-level"
    ],
    cons: [
      "Brutal learning curve — expect days, not hours",
      "Windows only",
      "Default content is minimal without mods",
      "UI is functional rather than polished"
    ],
    bestFor: "Spaceflight purists who want to fly real spacecraft on real physics, with no concessions.",
    quickFacts: [
      "Open-sourced in 2021",
      "Active community since 2000",
      "Apollo, Shuttle, Soyuz, and ISS addons available",
      "Realistic atmospheric reentry physics",
      "Compatible with virtual cockpit hardware"
    ],
    related: ["reentry", "children-of-a-dead-earth", "kerbal-space-program"],
    tags: ["space", "free", "realistic"]
  },
  {
    id: "rocksim",
    name: "RockSim",
    tagline: "Pro tool for high-power flights",
    glyph: "📐",
    shortDesc: "Apogee Components' commercial sim — the standard for Tripoli/NAR certification flights. Predicts stability, recovery, and altitude for serious hobby builds.",
    longDesc: [
      "RockSim is the longest-running commercial model rocket simulator, sold by Apogee Components since the late 1990s. Where OpenRocket is the free standard, RockSim is the paid one that many high-power rocketeers grew up using and still trust for certification flights.",
      "Strengths include a refined design workflow, an extensive (and curated) motor database, and good output for documenting flights to NAR/Tripoli safety officers. Many launch sites still ask to see RockSim files at check-in.",
      "It's not free, the UI shows its age, and OpenRocket has caught up on most fronts. But for hobbyists who already own it, or for clubs whose workflows are built around it, RockSim remains the safe pick."
    ],
    developer: "Apogee Components",
    publisher: "Apogee Components",
    releaseYear: 1998,
    price: "Paid",
    priceDetail: "$124 (RockSim 10 Pro)",
    paid: true,
    platforms: "Windows",
    systemReq: "Win 10+",
    link: "https://www.apogeerockets.com/Rocket_Software/RockSim",
    stars: 4,
    ratings: { realism: 5, accessibility: 3, depth: 4, learningCurve: 3, community: 3 },
    pros: [
      "Industry-standard for high-power certification documentation",
      "Polished motor database curated by Apogee",
      "Good design and output workflow",
      "Long history — well-known to flight safety officers"
    ],
    cons: [
      "Paid — and OpenRocket does most of what it does for free",
      "Windows only",
      "UI feels dated"
    ],
    bestFor: "High-power rocketeers who need polished documentation for L1/L2/L3 certification flights.",
    quickFacts: [
      "Used in NAR/Tripoli certification flights",
      "Curated commercial motor database",
      "Imports/exports OpenRocket files",
      "Continuous development since 1998"
    ],
    related: ["openrocket", "rocketpy"],
    tags: ["model", "realistic"]
  },
  {
    id: "spaceflight-simulator",
    name: "Spaceflight Simulator",
    tagline: "Pocket-sized rocketry",
    glyph: "🪐",
    shortDesc: "Start with a Mercury-Redstone, end up landing on Eeloo. Approachable on mobile but deeper than it looks — the free version is genuinely playable.",
    longDesc: [
      "Spaceflight Simulator is the unlikely mobile success story of indie rocket sims. Stefo Mai Morojna started it as a one-person Android project; it now has tens of millions of installs, a desktop release, and a deeply loyal community.",
      "The 2D presentation is deceptive. Underneath it sits a real patched-conic orbital mechanics engine with proper Δv accounting. You can fly Apollo-style lunar missions, drop landers on other planets, and design rockets with real fuel mass ratios — all on a phone, at a bus stop.",
      "The free version is generous. The paid DLC unlocks a richer solar system, more parts, and quality-of-life improvements. As an entry point for kids (or adults) who think KSP looks intimidating, it's hard to beat."
    ],
    developer: "Stefo Mai Morojna",
    publisher: "Stefo Mai Morojna",
    releaseYear: 2017,
    price: "Free / DLC",
    priceDetail: "Free · paid expansions ~$3 each",
    paid: false,
    platforms: "iOS · Android · Win",
    systemReq: "Modest mobile/desktop hardware",
    link: "https://spaceflightsimulator.app/",
    stars: 4,
    ratings: { realism: 3, accessibility: 5, depth: 3, learningCurve: 5, community: 4 },
    pros: [
      "Plays beautifully on phones and tablets",
      "Real orbital mechanics underneath the simple UI",
      "Generous free version",
      "Frequent updates and active discord",
      "Excellent on-ramp to the genre"
    ],
    cons: [
      "2D presentation limits some scenarios",
      "Less depth than KSP/Juno for power users",
      "Desktop port lags behind mobile features"
    ],
    bestFor: "Beginners, kids, and anyone who wants a real orbital sim while waiting in line.",
    quickFacts: [
      "Real patched-conic orbital mechanics",
      "Tens of millions of mobile installs",
      "Cross-platform craft sharing via codes",
      "2D side-on view with full solar system",
      "Built originally as a one-person project"
    ],
    related: ["juno-new-origins", "kerbal-space-program"],
    tags: ["game", "space", "free"]
  },
  {
    id: "reentry",
    name: "Reentry — Orbital Sim",
    tagline: "Mercury · Gemini · Apollo",
    glyph: "🌕",
    shortDesc: "If you have ever wanted to actually flip every breaker in a Lunar Module, this is your sim. Cockpit fidelity bordering on a study-level flight sim.",
    longDesc: [
      "Reentry is study-level spaceflight: Mercury, Gemini, Apollo, and a growing Space Shuttle module, simulated at switch-by-switch fidelity. The Lunar Module's circuit breakers, the Apollo Guidance Computer's noun/verb keypad, the Mercury periscope — they are all there and they all work.",
      "The campaign teaches you each program's history through scripted missions: Freedom 7, Friendship 7, Gemini IV's spacewalk, Apollo 11. You don't just watch — you fly the burns, key the AGC, manage cryo and fuel, and listen to mission control on radio loops.",
      "Compared to Orbiter it's much friendlier on entry, with built-in tutorials and a polished cockpit pipeline. Compared to KSP it's a different genre entirely — there's no creativity, only history, faithfully recreated."
    ],
    developer: "Wilhelmsen Studios",
    publisher: "Wilhelmsen Studios",
    releaseYear: 2018,
    price: "Paid",
    priceDetail: "$24.99 base · DLC for Shuttle",
    paid: true,
    platforms: "Windows",
    systemReq: "Win 10+, 8GB RAM, dedicated GPU",
    link: "https://reentrygame.com/",
    stars: 4,
    ratings: { realism: 5, accessibility: 3, depth: 5, learningCurve: 2, community: 3 },
    pros: [
      "Switch-level cockpit fidelity for real spacecraft",
      "Functional Apollo Guidance Computer",
      "Polished campaign with historical scripted missions",
      "Active solo developer with frequent updates",
      "Mercury, Gemini, Apollo, and Shuttle all covered"
    ],
    cons: [
      "Steep entry without prior flight-sim background",
      "Windows only",
      "Solo dev means slow content cadence"
    ],
    bestFor: "History buffs and study-sim devotees who want to actually fly the missions.",
    quickFacts: [
      "Functional Apollo Guidance Computer with noun/verb keypad",
      "Mercury, Gemini, and Apollo programs included",
      "Space Shuttle DLC available",
      "Voiced mission control loops",
      "Steam Workshop scenarios available"
    ],
    related: ["orbiter", "children-of-a-dead-earth"],
    tags: ["space", "realistic"]
  },
  {
    id: "children-of-a-dead-earth",
    name: "Children of a Dead Earth",
    tagline: "Hardest hard-sci-fi sim made",
    glyph: "🛡️",
    shortDesc: "Not strictly a rocket sim, but every weapon, engine, and orbit obeys real physics. If you want to feel small in front of the rocket equation — start here.",
    longDesc: [
      "Children of a Dead Earth is a solo-developed orbital warfare simulator that takes the rocket equation seriously enough to ruin science fiction for you forever. Every spacecraft, every engine, every weapon is built from real physics: real thermodynamics, real material properties, real orbital mechanics.",
      "You design your ships from the propulsion system out, balance specific impulse against thrust against waste heat, and then fly tactical engagements where everything from kinetic penetrators to coilguns behaves the way it would in vacuum. Engagements happen at orbital speeds. Energy budgets dominate everything.",
      "It's a niche game and proudly so. The developer's blog ('How to Murder Time with Space Engineering') is a small treasure of hard-sci-fi worldbuilding. Fans call it the antidote to Star Wars."
    ],
    developer: "Q Switched Productions",
    publisher: "Q Switched Productions",
    releaseYear: 2016,
    price: "Paid",
    priceDetail: "$19.99 (Steam)",
    paid: true,
    platforms: "Windows",
    systemReq: "Win 7+, 2GB RAM",
    link: "https://store.steampowered.com/app/476530/Children_of_a_Dead_Earth/",
    stars: 4,
    ratings: { realism: 5, accessibility: 2, depth: 5, learningCurve: 2, community: 3 },
    pros: [
      "Possibly the most physically honest space combat sim ever made",
      "Spacecraft designer is a real engineering exercise",
      "Outstanding developer blog as supporting documentation",
      "Active modding through real-data spreadsheets"
    ],
    cons: [
      "Brutal learning curve — assumes physics literacy",
      "Niche aesthetic and presentation",
      "Windows only, single dev"
    ],
    bestFor: "Engineers and hard-sci-fi readers who want a sim that argues back.",
    quickFacts: [
      "Real material properties for armor and projectiles",
      "Designer covers thermodynamics and waste heat",
      "Tactical combat at honest orbital speeds",
      "Inspired by Atomic Rockets reference",
      "Solo developer with deep technical blog"
    ],
    related: ["orbiter", "kerbal-space-program", "reentry"],
    tags: ["game", "space", "realistic"]
  },
  {
    id: "rocketpy",
    name: "RocketPy",
    tagline: "6-DoF simulation in Python",
    glyph: "🐍",
    shortDesc: "Open-source library used by university teams (Spaceport America Cup regulars). Scriptable Monte-Carlo dispersions, real wind models, ML-friendly outputs.",
    longDesc: [
      "RocketPy is what happens when university rocketry teams decide they want all the rigor of OpenRocket but inside a Python notebook. It's a 6-DoF flight simulator distributed as a pip package, with full atmospheric models, Monte-Carlo dispersion runs, and clean numerical outputs you can pipe into Pandas, NumPy, or PyTorch.",
      "It's used in earnest by collegiate teams competing at Spaceport America Cup and the European Rocketry Challenge. Validation against real flight data has been published in peer-reviewed papers. If your workflow already lives in Jupyter, this fits in like a glove.",
      "The interactive examples in the docs are first-rate. You can simulate a launch from a real weather forecast, run a thousand wind dispersions overnight, and have publication-quality plots by morning."
    ],
    developer: "RocketPy team (Projeto Jupiter et al.)",
    publisher: "Open source (MIT)",
    releaseYear: 2020,
    price: "Free · OSS",
    priceDetail: "Free (MIT license)",
    paid: false,
    platforms: "Python · Any OS",
    systemReq: "Python 3.9+, NumPy, SciPy",
    link: "https://docs.rocketpy.org/",
    stars: 5,
    ratings: { realism: 5, accessibility: 3, depth: 5, learningCurve: 3, community: 4 },
    pros: [
      "Pure-Python 6-DoF flight simulator — scriptable everything",
      "Monte-Carlo dispersion analysis built in",
      "Used by collegiate teams in international competitions",
      "Validated against real flight data in peer-reviewed work",
      "Clean integration with Pandas/NumPy/Jupyter"
    ],
    cons: [
      "Requires Python literacy — no GUI",
      "Steeper than OpenRocket for casual model rocketeers",
      "Some advanced atmospheric features still maturing"
    ],
    bestFor: "University teams, researchers, and anyone whose flight analysis lives in a notebook.",
    quickFacts: [
      "MIT-licensed open source",
      "6-DoF flight simulation in pure Python",
      "Built-in Monte-Carlo dispersion runs",
      "Real atmospheric data via NOAA forecasts",
      "Active use at Spaceport America Cup"
    ],
    related: ["openrocket", "rocksim"],
    tags: ["model", "free", "realistic"]
  }
];

window.SIM_BY_ID = Object.fromEntries(window.SIMS.map(s => [s.id, s]));
