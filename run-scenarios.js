// Run 4 real-world house scenarios through the ductulator wizard
// Each scenario has proper room sizes → CFM ratios based on Manual J approximations
// Atlanta climate zone: ~25 BTU/sqft cooling, ~400 CFM/ton, ~1 CFM/sqft typical

// ====== SCENARIO DEFINITIONS ======

const SCENARIOS = [
  // ============================================================
  // SCENARIO 1: Ranch — Crawlspace, metal trunks + flex branches
  // 3-ton (1200 CFM), 1800 sqft, vented crawl
  // ============================================================
  {
    name: "Scenario 1: Ranch — Crawlspace Install",
    desc: "3-ton, metal trunks + flex branches, floor boots, filter at unit",
    ductLocation: "vented_crawl",
    bootPosition: "floor",
    insulation: "R6",
    esp: 0.50,
    coilPD: 0.07,
    safetyMargin: 10,
    // Plenum types
    supplyPlenumType: "tapered",
    returnPlenumType: "box",
    // System filter at unit
    systemFilter: true,
    filterMfg: "generic",
    filterModel: "4in-M8",
    filterGrille: "20x25",
    trunks: [
      { label: "Supply Trunk 1 (Left)", airPath: "supply", shape: "round", size: 10, length: 30, material: "sheet_metal", compression: 0, fittings: ["elbow90","elbow90"], plenumType: "tapered" },
      { label: "Supply Trunk 2 (Right)", airPath: "supply", shape: "round", size: 8, length: 20, material: "sheet_metal", compression: 0, fittings: ["elbow90"], plenumType: "tapered" },
      { label: "Supply Trunk 3 (Kitchen)", airPath: "supply", shape: "round", size: 8, length: 15, material: "sheet_metal", compression: 0, fittings: [], plenumType: "tapered" },
      { label: "Return Trunk 1", airPath: "return", shape: "round", size: 14, length: 20, material: "sheet_metal", compression: 0, fittings: ["elbow90"], plenumType: "box" },
    ],
    branches: [
      // OFF SUPPLY TRUNK 1 (Left wing)
      // Living Room: 14x18 = 252 sqft → ~200 CFM (well insulated, interior walls)
      { num:1, room:"Living Room (252sqft)", cfm:200, trunkIdx:0, size:6, material:"flex", compression:8, length:15, fittings:[{type:"elbow90"}], bootType:"straight", takeoffType:"conical" },
      // Master Bedroom: 14x16 = 224 sqft → ~180 CFM (2 exterior walls)
      { num:2, room:"Master BR (224sqft)", cfm:180, trunkIdx:0, size:6, material:"flex", compression:6, length:20, fittings:[], bootType:"straight", takeoffType:"wye" },
      // Master Bath: 8x10 = 80 sqft → ~80 CFM (exhaust fan helps)
      { num:3, room:"Master Bath (80sqft)", cfm:80, trunkIdx:0, size:5, material:"flex", compression:8, length:12, fittings:[], bootType:"straight", takeoffType:"conical" },

      // OFF SUPPLY TRUNK 2 (Right wing)
      // Bedroom 2: 12x12 = 144 sqft → ~120 CFM
      { num:4, room:"Bedroom 2 (144sqft)", cfm:120, trunkIdx:1, size:6, material:"flex", compression:8, length:18, fittings:[{type:"elbow90"}], bootType:"straight", takeoffType:"conical" },
      // Bedroom 3: 11x12 = 132 sqft → ~120 CFM
      { num:5, room:"Bedroom 3 (132sqft)", cfm:120, trunkIdx:1, size:5, material:"flex", compression:10, length:22, fittings:[], bootType:"straight", takeoffType:"wye" },
      // Office: 10x12 = 120 sqft → ~100 CFM
      { num:6, room:"Office (120sqft)", cfm:100, trunkIdx:1, size:5, material:"flex", compression:6, length:14, fittings:[], bootType:"straight", takeoffType:"conical" },

      // OFF SUPPLY TRUNK 3 (Kitchen area)
      // Kitchen: 12x15 = 180 sqft → ~150 CFM (appliance heat)
      { num:7, room:"Kitchen (180sqft)", cfm:150, trunkIdx:2, size:6, material:"flex", compression:6, length:10, fittings:[], bootType:"straight", takeoffType:"tee" },
      // Dining Room: 12x14 = 168 sqft → ~130 CFM
      { num:8, room:"Dining (168sqft)", cfm:130, trunkIdx:2, size:6, material:"flex", compression:8, length:16, fittings:[{type:"elbow90"}], bootType:"straight", takeoffType:"conical" },

      // RETURNS OFF RETURN TRUNK 1
      // Central Hall Return: serves ~700sqft → ~500 CFM
      { num:9, room:"Hall Return", cfm:500, trunkIdx:3, size:10, material:"flex", compression:6, length:8, fittings:[], bootType:"straight", takeoffType:"tee" },
      // Master Return: serves ~300sqft → ~400 CFM
      { num:10, room:"Master Return", cfm:400, trunkIdx:3, size:8, material:"flex", compression:6, length:12, fittings:[], bootType:"straight", takeoffType:"conical" },
    ]
  },

  // ============================================================
  // SCENARIO 2: Two-Story — All Flex, Attic System
  // 4-ton (1600 CFM), 2400 sqft, sealed attic
  // ============================================================
  {
    name: "Scenario 2: Two-Story — Attic System",
    desc: "4-ton, all flex, ceiling boots, filter at unit",
    ductLocation: "encap_attic",
    bootPosition: "ceiling",
    insulation: "R8",
    esp: 0.50,
    coilPD: 0.10,
    safetyMargin: 15,
    supplyPlenumType: "extended",
    returnPlenumType: "tapered",
    systemFilter: true,
    filterMfg: "honeywell",
    filterModel: "FC100A1037",
    filterGrille: "20x25",
    trunks: [
      { label: "Supply Trunk 1 (Downstairs)", airPath: "supply", shape: "round", size: 12, length: 15, material: "flex", compression: 10, fittings: [], plenumType: "extended" },
      { label: "Supply Trunk 2 (Upstairs)", airPath: "supply", shape: "round", size: 10, length: 20, material: "flex", compression: 12, fittings: [], plenumType: "extended" },
      { label: "Supply Trunk 3 (Bonus)", airPath: "supply", shape: "round", size: 8, length: 12, material: "flex", compression: 8, fittings: [], plenumType: "extended" },
      { label: "Return Trunk 1", airPath: "return", shape: "round", size: 16, length: 12, material: "flex", compression: 8, fittings: [], plenumType: "tapered" },
    ],
    branches: [
      // SUPPLY TRUNK 1 — Downstairs (Great room, kitchen, dining)
      // Great Room: 18x20 = 360 sqft → 250 CFM (high ceiling, lots of windows)
      { num:1, room:"Great Room (360sqft)", cfm:250, trunkIdx:0, size:8, material:"flex", compression:8, length:25, fittings:[{type:"elbow90"}], bootType:"90deg", takeoffType:"wye" },
      // Kitchen: 14x16 = 224 sqft → 180 CFM
      { num:2, room:"Kitchen (224sqft)", cfm:180, trunkIdx:0, size:6, material:"flex", compression:10, length:20, fittings:[], bootType:"90deg", takeoffType:"conical" },
      // Dining: 12x14 = 168 sqft → 150 CFM
      { num:3, room:"Dining (168sqft)", cfm:150, trunkIdx:0, size:6, material:"flex", compression:8, length:18, fittings:[{type:"elbow90"}], bootType:"90deg", takeoffType:"conical" },

      // SUPPLY TRUNK 2 — Upstairs bedrooms
      // Master BR: 16x18 = 288 sqft → 200 CFM
      { num:4, room:"Master BR (288sqft)", cfm:200, trunkIdx:1, size:6, material:"flex", compression:10, length:22, fittings:[{type:"elbow90"}], bootType:"90deg", takeoffType:"wye" },
      // Master Bath: 8x10 = 80 sqft → 80 CFM
      { num:5, room:"Master Bath (80sqft)", cfm:80, trunkIdx:1, size:5, material:"flex", compression:8, length:15, fittings:[], bootType:"90deg", takeoffType:"conical" },
      // Bedroom 2: 12x14 = 168 sqft → 150 CFM
      { num:6, room:"Bedroom 2 (168sqft)", cfm:150, trunkIdx:1, size:6, material:"flex", compression:10, length:18, fittings:[], bootType:"90deg", takeoffType:"conical" },
      // Bedroom 3: 11x12 = 132 sqft → 120 CFM
      { num:7, room:"Bedroom 3 (132sqft)", cfm:120, trunkIdx:1, size:5, material:"flex", compression:12, length:20, fittings:[{type:"elbow90"}], bootType:"90deg", takeoffType:"conical" },
      // Bedroom 4: 11x12 = 132 sqft → 120 CFM
      { num:8, room:"Bedroom 4 (132sqft)", cfm:120, trunkIdx:1, size:5, material:"flex", compression:10, length:16, fittings:[], bootType:"90deg", takeoffType:"wye" },

      // SUPPLY TRUNK 3 — Bonus room
      // Bonus Room: 16x18 = 288 sqft → 200 CFM
      { num:9, room:"Bonus Room (288sqft)", cfm:200, trunkIdx:2, size:7, material:"flex", compression:8, length:14, fittings:[], bootType:"90deg", takeoffType:"conical" },

      // RETURNS
      // Downstairs return: 600 CFM
      { num:10, room:"Downstairs Return", cfm:600, trunkIdx:3, size:12, material:"flex", compression:6, length:10, fittings:[], bootType:"straight", takeoffType:"tee" },
      // Upstairs hall return: 500 CFM
      { num:11, room:"Upstairs Return", cfm:500, trunkIdx:3, size:10, material:"flex", compression:8, length:12, fittings:[], bootType:"straight", takeoffType:"conical" },
      // Master return: 350 CFM
      { num:12, room:"Master Return", cfm:350, trunkIdx:3, size:8, material:"flex", compression:8, length:15, fittings:[], bootType:"straight", takeoffType:"wye" },
    ]
  },

  // ============================================================
  // SCENARIO 3: Condo — Filter Grills, OVER BUDGET (intentional)
  // 2-ton (800 CFM), 1100 sqft, conditioned space
  // ============================================================
  {
    name: "Scenario 3: Condo — Filter Grills (Over Budget)",
    desc: "2-ton, filter grills on returns, bad fittings, high compression — SHOULD FAIL",
    ductLocation: "conditioned",
    bootPosition: "wall",
    insulation: "none",
    esp: 0.40,
    coilPD: 0.08,
    safetyMargin: 10,
    supplyPlenumType: "90_vanes",
    returnPlenumType: "90_square",  // Terrible choice: 120ft EQ
    systemFilter: false,  // NO filter at unit — filter grills instead
    trunks: [
      { label: "Supply Trunk 1", airPath: "supply", shape: "round", size: 8, length: 20, material: "sheet_metal", compression: 0, fittings: ["elbow90","elbow90"], plenumType: "90_vanes" },
      { label: "Return Trunk 1", airPath: "return", shape: "round", size: 10, length: 15, material: "sheet_metal", compression: 0, fittings: ["elbow90"], plenumType: "90_square" },
    ],
    branches: [
      // SUPPLY
      // Living Room: 16x18 = 288 sqft → 250 CFM
      { num:1, room:"Living (288sqft)", cfm:250, trunkIdx:0, size:6, material:"flex", compression:15, length:18, fittings:[{type:"elbow90"},{type:"elbow90"}], bootType:"straight", takeoffType:"straight90" },
      // Kitchen/Dining: 14x16 = 224 sqft → 200 CFM
      { num:2, room:"Kitchen (224sqft)", cfm:200, trunkIdx:0, size:6, material:"flex", compression:12, length:15, fittings:[{type:"elbow90"}], bootType:"straight", takeoffType:"tee" },
      // Master BR: 12x15 = 180 sqft → 150 CFM
      { num:3, room:"Master BR (180sqft)", cfm:150, trunkIdx:0, size:5, material:"flex", compression:20, length:22, fittings:[{type:"elbow90"}], bootType:"straight", takeoffType:"straight90" },
      // Bedroom 2: 11x12 = 132 sqft → 120 CFM
      { num:4, room:"Bedroom 2 (132sqft)", cfm:120, trunkIdx:0, size:5, material:"flex", compression:15, length:16, fittings:[], bootType:"straight", takeoffType:"jbox" },

      // RETURNS with FILTER GRILLS
      // Hall Return: serves 500 sqft → 400 CFM, MERV 13 in 1" = high PD
      { num:5, room:"Hall Return (filter grill)", cfm:400, trunkIdx:1, size:8, material:"flex", compression:10, length:12, fittings:[], bootType:"straight", takeoffType:"tee",
        hasFilterGrill:true, filterDepth:"1", grillSize:"16x25", grillMerv:"13" },
      // Master Return: serves 300 sqft → 300 CFM, MERV 13 in 1" 
      { num:6, room:"Master Return (filter grill)", cfm:300, trunkIdx:1, size:8, material:"flex", compression:12, length:10, fittings:[], bootType:"straight", takeoffType:"straight90",
        hasFilterGrill:true, filterDepth:"1", grillSize:"14x20", grillMerv:"13" },
    ]
  },

  // ============================================================
  // SCENARIO 4: Large Custom Home — 5-ton, Complex
  // 5-ton (2000 CFM), 3200 sqft, encapsulated crawl
  // ============================================================
  {
    name: "Scenario 4: Large Custom — 5-ton",
    desc: "5-ton, 3 supply + 3 return trunks, metal trunks, flex branches, well-designed",
    ductLocation: "encap_crawl",
    bootPosition: "floor",
    insulation: "R6",
    esp: 0.60,
    coilPD: 0.08,
    safetyMargin: 10,
    supplyPlenumType: "tapered",
    returnPlenumType: "tapered",
    systemFilter: true,
    filterMfg: "aprilaire",
    filterModel: "413",
    filterGrille: "20x25",
    trunks: [
      { label: "Supply Trunk 1 (Main)", airPath: "supply", shape: "round", size: 12, length: 35, material: "sheet_metal", compression: 0, fittings: ["elbow90","elbow90"], plenumType: "tapered" },
      { label: "Supply Trunk 2 (Master)", airPath: "supply", shape: "round", size: 10, length: 25, material: "sheet_metal", compression: 0, fittings: ["elbow90"], plenumType: "tapered" },
      { label: "Supply Trunk 3 (Bedrooms)", airPath: "supply", shape: "round", size: 10, length: 30, material: "sheet_metal", compression: 0, fittings: ["elbow90"], plenumType: "tapered" },
      { label: "Return Trunk 1", airPath: "return", shape: "round", size: 16, length: 20, material: "sheet_metal", compression: 0, fittings: ["elbow90"], plenumType: "tapered" },
      { label: "Return Trunk 2", airPath: "return", shape: "round", size: 12, length: 18, material: "sheet_metal", compression: 0, fittings: [], plenumType: "tapered" },
      { label: "Return Trunk 3", airPath: "return", shape: "round", size: 10, length: 22, material: "sheet_metal", compression: 0, fittings: ["elbow90"], plenumType: "tapered" },
    ],
    branches: [
      // SUPPLY TRUNK 1 — Main level
      // Great Room: 20x22 = 440 sqft → 300 CFM (vaulted, lots of glass)
      { num:1, room:"Great Room (440sqft)", cfm:300, trunkIdx:0, size:8, material:"flex", compression:6, length:20, fittings:[], bootType:"straight", takeoffType:"wye" },
      // Kitchen: 14x16 = 224 sqft → 200 CFM
      { num:2, room:"Kitchen (224sqft)", cfm:200, trunkIdx:0, size:6, material:"flex", compression:6, length:15, fittings:[], bootType:"straight", takeoffType:"conical" },
      // Dining: 12x16 = 192 sqft → 150 CFM
      { num:3, room:"Dining (192sqft)", cfm:150, trunkIdx:0, size:6, material:"flex", compression:8, length:18, fittings:[{type:"elbow90"}], bootType:"straight", takeoffType:"conical" },
      // Foyer: 10x12 = 120 sqft → 100 CFM
      { num:4, room:"Foyer (120sqft)", cfm:100, trunkIdx:0, size:5, material:"flex", compression:6, length:12, fittings:[], bootType:"straight", takeoffType:"conical" },
      // Laundry: 8x10 = 80 sqft → 80 CFM
      { num:5, room:"Laundry (80sqft)", cfm:80, trunkIdx:0, size:5, material:"flex", compression:6, length:10, fittings:[], bootType:"straight", takeoffType:"conical" },

      // SUPPLY TRUNK 2 — Master wing
      // Master BR: 16x20 = 320 sqft → 250 CFM
      { num:6, room:"Master BR (320sqft)", cfm:250, trunkIdx:1, size:7, material:"flex", compression:6, length:22, fittings:[{type:"elbow90"}], bootType:"straight", takeoffType:"wye" },
      // Master Bath: 10x12 = 120 sqft → 100 CFM
      { num:7, room:"Master Bath (120sqft)", cfm:100, trunkIdx:1, size:5, material:"flex", compression:6, length:16, fittings:[], bootType:"straight", takeoffType:"conical" },
      // Master Closet: 8x10 = 80 sqft → 60 CFM
      { num:8, room:"Master Closet (80sqft)", cfm:60, trunkIdx:1, size:4, material:"flex", compression:8, length:10, fittings:[], bootType:"straight", takeoffType:"conical" },

      // SUPPLY TRUNK 3 — Bedroom wing
      // Bedroom 2: 12x14 = 168 sqft → 120 CFM
      { num:9, room:"Bedroom 2 (168sqft)", cfm:120, trunkIdx:2, size:6, material:"flex", compression:6, length:20, fittings:[], bootType:"straight", takeoffType:"conical" },
      // Bedroom 3: 12x14 = 168 sqft → 120 CFM
      { num:10, room:"Bedroom 3 (168sqft)", cfm:120, trunkIdx:2, size:6, material:"flex", compression:8, length:22, fittings:[], bootType:"straight", takeoffType:"wye" },
      // Bedroom 4: 11x13 = 143 sqft → 120 CFM
      { num:11, room:"Bedroom 4 (143sqft)", cfm:120, trunkIdx:2, size:5, material:"flex", compression:8, length:18, fittings:[], bootType:"straight", takeoffType:"conical" },
      // Bedroom 5: 10x12 = 120 sqft → 100 CFM
      { num:12, room:"Bedroom 5 (120sqft)", cfm:100, trunkIdx:2, size:5, material:"flex", compression:6, length:16, fittings:[], bootType:"straight", takeoffType:"conical" },
      // Media Room: 16x20 = 320 sqft → 200 CFM
      { num:13, room:"Media Room (320sqft)", cfm:200, trunkIdx:2, size:7, material:"flex", compression:6, length:25, fittings:[{type:"elbow90"}], bootType:"straight", takeoffType:"wye" },
      // Office: 10x14 = 140 sqft → 100 CFM
      { num:14, room:"Office (140sqft)", cfm:100, trunkIdx:2, size:5, material:"flex", compression:6, length:14, fittings:[], bootType:"straight", takeoffType:"conical" },

      // RETURNS
      // Return Trunk 1 — Great room/hall
      { num:15, room:"Great Room Return", cfm:600, trunkIdx:3, size:12, material:"flex", compression:6, length:8, fittings:[], bootType:"straight", takeoffType:"wye" },
      { num:16, room:"Hall Return", cfm:500, trunkIdx:3, size:10, material:"flex", compression:6, length:10, fittings:[], bootType:"straight", takeoffType:"conical" },
      // Return Trunk 2 — Master
      { num:17, room:"Master Return", cfm:400, trunkIdx:4, size:10, material:"flex", compression:6, length:12, fittings:[], bootType:"straight", takeoffType:"conical" },
      // Return Trunk 3 — Bedrooms
      { num:18, room:"Bedroom Wing Return", cfm:500, trunkIdx:5, size:10, material:"flex", compression:6, length:15, fittings:[], bootType:"straight", takeoffType:"tee" },
    ]
  }
];

// Export for use
if (typeof module !== 'undefined') module.exports = SCENARIOS;
