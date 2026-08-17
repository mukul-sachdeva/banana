import { CarVariant, CityPricingConfig, VariantCostBreakdown } from '../components/GoldStandardCarPage';

export type CretaVariant = CarVariant;
export type CityPricingBreakdown = CityPricingConfig;
export type VariantOnRoadCost = VariantCostBreakdown;

// Official Hyundai Creta Variant Lineup & Ex-Showroom Pricing (INR)
export const CRETA_VARIANTS: CretaVariant[] = [
  {
    id: 'creta-e-petrol',
    name: 'Creta E 1.5 Petrol MT',
    fuel: 'Petrol',
    transmission: 'Manual',
    engineSize: '1.5L MPi Petrol (115 PS)',
    exShowroom: 1100000,
    idealFor: 'Budget-conscious buyers looking for an entry-level midsize SUV with essential safety and solid space.',
    verdict: 'Great starting point if you plan to customize accessories aftermarket. Includes 6 airbags, ABS, and rear disc brakes.',
  },
  {
    id: 'creta-ex-petrol',
    name: 'Creta EX 1.5 Petrol MT',
    fuel: 'Petrol',
    transmission: 'Manual',
    engineSize: '1.5L MPi Petrol (115 PS)',
    exShowroom: 1221000,
    idealFor: 'Value seekers who want a factory 8-inch touchscreen infotainment system with Android Auto & Apple CarPlay.',
    verdict: 'The sweet spot for sensible family buyers. Adds steering-mounted controls, 8-inch touchscreen, and shark fin antenna.',
  },
  {
    id: 'creta-s-petrol',
    name: 'Creta S 1.5 Petrol MT',
    fuel: 'Petrol',
    transmission: 'Manual',
    engineSize: '1.5L MPi Petrol (115 PS)',
    exShowroom: 1343000,
    idealFor: 'Buyers looking for added convenience like LED DRLs, rear camera, automatic climate control, and rear sunshades.',
    verdict: 'Recommended for daily family commuting. Adds automatic headlamps, rear parking camera, and rear door sunshades.',
  },
  {
    id: 'creta-s-o-ivt',
    name: 'Creta S(O) 1.5 Petrol IVT',
    fuel: 'Petrol',
    transmission: 'IVT (CVT)',
    engineSize: '1.5L MPi Petrol (115 PS)',
    exShowroom: 1586000,
    idealFor: 'City commuters seeking an ultra-smooth, stress-free automatic gearbox with panoramic sunroof and electronic parking brake.',
    verdict: 'BEST VALUE AUTOMATIC: Highly recommended for urban Chandigarh/Tricity driving. Ultra-smooth CVT shiftless acceleration.',
  },
  {
    id: 'creta-sx-tech-petrol',
    name: 'Creta SX Tech 1.5 Petrol MT',
    fuel: 'Petrol',
    transmission: 'Manual',
    engineSize: '1.5L MPi Petrol (115 PS)',
    exShowroom: 1598000,
    idealFor: 'Buyers wanting Level-2 ADAS safety technology, Bose premium sound, and 10.25-inch dual screen setup without paying top-tier price.',
    verdict: 'High-tech value pick. Includes Hyundai SmartSense ADAS (Lane Keep Assist, Forward Collision Warning) and Bose 8-speaker audio.',
  },
  {
    id: 'creta-sx-o-ivt',
    name: 'Creta SX(O) 1.5 Petrol IVT',
    fuel: 'Petrol',
    transmission: 'IVT (CVT)',
    engineSize: '1.5L MPi Petrol (115 PS)',
    exShowroom: 1741000,
    idealFor: 'Luxury seekers who want ventilated front seats, leatherette upholstery, 360-degree camera, and full ADAS suite.',
    verdict: 'Top-of-the-line petrol automatic luxury. Ventilated front seats are a game-changer in North Indian summer heat.',
  },
  {
    id: 'creta-s-o-diesel-at',
    name: 'Creta S(O) 1.5 Diesel AT',
    fuel: 'Diesel',
    transmission: 'Automatic (AT)',
    engineSize: '1.5L U2 CRDi Diesel (116 PS)',
    exShowroom: 1732000,
    idealFor: 'High-mileage highway commuters and frequent inter-city travelers who demand strong diesel torque and 6-speed torque-converter reliability.',
    verdict: 'BEST DIESEL AUTOMATIC: Effortless mid-range torque for highway overtakes combined with outstanding fuel efficiency.',
  },
  {
    id: 'creta-sx-o-turbo-dct',
    name: 'Creta SX(O) 1.5 Turbo DCT',
    fuel: 'Petrol',
    transmission: 'DCT',
    engineSize: '1.5L Turbo GDi Petrol (160 PS)',
    exShowroom: 2015000,
    idealFor: 'Performance enthusiasts who want 160 PS punchy acceleration, lightning-fast 7-speed dual-clutch shifts, and full luxury feature set.',
    verdict: 'Flagship performance variant. 160 PS turbo petrol delivers enthusiastic acceleration with paddle shifters.',
  },
];

// 5 Active City Configurations & Authentic RTO Tax Breakdown
export const CITY_PRICING_CONFIGS: Record<string, CityPricingBreakdown> = {
  chandigarh: {
    citySlug: 'chandigarh',
    cityName: 'Chandigarh',
    stateUt: 'Chandigarh UT',
    rtoPercent: 0.06, // 6% RTO for cars under 20L in UT
    rtoNote: 'UT Chandigarh RTO tax slab (6% for personal petrol/diesel vehicles under ₹20 Lakh ex-showroom).',
    lastUpdated: 'August 2026',
    localDrivingContext: {
      title: 'Chandigarh Driving Reality: Grid Sectors & Roundabouts',
      description: 'Navigating Chandigarh requires testing low-speed steering agility across Sector roundabouts, evaluating suspension absorption over sector road speed breakers, and verifying how easily the Creta fits into residential sector parking spaces.',
      keyRoads: 'Madhya Marg, Jan Marg, Himalayan Marg, and Sector 17/22/35 residential corridors.',
      testFocus: 'Focus on low-speed turning radius during roundabouts, side mirror visibility in grid traffic, and parking camera clarity.',
    },
  },
  mohali: {
    citySlug: 'mohali',
    cityName: 'Mohali',
    stateUt: 'Punjab',
    rtoPercent: 0.08, // 8% RTO in Punjab for vehicles up to 15L, 9% above 15L
    rtoNote: 'Punjab State RTO tax slab (8% up to ₹15L, 9% above ₹15L ex-showroom).',
    lastUpdated: 'August 2026',
    localDrivingContext: {
      title: 'Mohali Driving Reality: PR7 Airport Road & Expanding Corridors',
      description: 'Mohali driving involves a mix of fast PR7 Airport Road stretches, sector junctions (Sector 70/71/80), and mixed road surfaces. A test drive helps evaluate high-speed engine refinement alongside low-speed suspension compliance.',
      keyRoads: 'Airport Road (PR7), Sector 70/71 main arterial roads, and Landran bypass connectors.',
      testFocus: 'Test mid-range acceleration along Airport Road, evaluate ride composure over expansion joints, and check cabin NVH quietness.',
    },
  },
  panchkula: {
    citySlug: 'panchkula',
    cityName: 'Panchkula',
    stateUt: 'Haryana',
    rtoPercent: 0.08, // 8% RTO in Haryana for vehicles under 10L, 9% up to 20L
    rtoNote: 'Haryana State RTO tax slab (8% for vehicles up to ₹10L, 9% up to ₹20L ex-showroom).',
    lastUpdated: 'August 2026',
    localDrivingContext: {
      title: 'Panchkula Driving Reality: Shivalik Foothills & Sector Gradients',
      description: 'Panchkula provides unique gentle gradients near the Shivalik foothills, Sector 20/21 arterial traffic, and Kalka highway connectors. Testing here reveals engine hill-climb responsiveness and brake modulation.',
      keyRoads: 'Kalka Highway stretch, Sector 20/21 main roads, and Nada Sahib road connectors.',
      testFocus: 'Evaluate hill-hold assist on incline starts, automatic transmission downshift speed, and brake pedal progressive feel.',
    },
  },
  kharar: {
    citySlug: 'kharar',
    cityName: 'Kharar',
    stateUt: 'Punjab',
    rtoPercent: 0.08, // 8% RTO in Punjab
    rtoNote: 'Punjab State RTO tax slab (8% up to ₹15L, 9% above ₹15L ex-showroom).',
    lastUpdated: 'August 2026',
    localDrivingContext: {
      title: 'Kharar Driving Reality: High Traffic Density & Stop-and-Go Crawling',
      description: 'Kharar presents high traffic density, NH-21 flyover approaches, and narrow market turnarounds. A test drive here is vital for evaluating low-speed creep in automatic variants and light clutch travel in manuals.',
      keyRoads: 'Kharar-Landran road, NH-21 flyover corridor, and Sunny Enclave residential roads.',
      testFocus: 'Assess low-end engine torque during heavy stop-and-go commuting, tight U-turn maneuverability, and air conditioning cooling speed.',
    },
  },
  ludhiana: {
    citySlug: 'ludhiana',
    cityName: 'Ludhiana',
    stateUt: 'Punjab',
    rtoPercent: 0.08, // 8% RTO in Punjab
    rtoNote: 'Punjab State RTO tax slab (8% up to ₹15L, 9% above ₹15L ex-showroom).',
    lastUpdated: 'August 2026',
    localDrivingContext: {
      title: 'Ludhiana Driving Reality: Dense Urban Arterials & Market Commuting',
      description: 'Ludhiana presents high-density city traffic along Ferozepur Road and Mall Road market access. Test driving in Ludhiana helps you assess cabin thermal insulation in summer heat, horn placement, and tight parking ease.',
      keyRoads: 'Ferozepur Road, Mall Road, Model Town corridors, and GT Road bypass.',
      testFocus: 'Check AC cooling efficiency under heavy traffic, rear window sunshade utility, and steering lightness during crowded market parking.',
    },
  },
};

// Helper: Calculate On-Road Price & Flowzap Price Intelligence for any variant in any city
export function calculateCityVariantOnRoad(variant: CretaVariant, cityConfig: CityPricingBreakdown): VariantOnRoadCost {
  const ex = variant.exShowroom;

  // 1. Mandatory Charges
  const rtoRate = (cityConfig.stateUt === 'Punjab' && ex > 1500000) ? 0.09 : (cityConfig.stateUt === 'Haryana' && ex > 1000000) ? 0.09 : cityConfig.rtoPercent;
  const rtoCost = Math.round(ex * rtoRate);
  
  // Insurance Estimate (IRDAI 1-year Own Damage + 3-year Third Party)
  const insuranceCost = Math.round(ex * 0.038); // approx 3.8% of ex-showroom
  
  // FASTag (₹500) + Statutory Registration & Hypothecation Fee (₹1,500) + TCS 1% (if > 10L)
  const tcs = ex >= 1000000 ? Math.round(ex * 0.01) : 0;
  const statutoryCharges = 2000 + tcs;

  const mandatoryOnRoad = ex + rtoCost + insuranceCost + statutoryCharges;

  // 2. Optional / Dealer-Added Charges (Estimates)
  const accessoriesEstimate = 12500; // Basic mats, mudflaps, cover
  const extendedWarrantyEstimate = 18500; // 4th & 5th year warranty
  const rsaEstimate = 3500; // 3-year Roadside Assistance

  const totalEstimatedOnRoad = mandatoryOnRoad + accessoriesEstimate + extendedWarrantyEstimate + rsaEstimate;

  // 3. Flowzap Price Intelligence Calculator
  // Fair price ceiling represents mandatory on-road + reasonable dealer accessories with typical 2-3% negotiation margin
  const fairPriceLow = mandatoryOnRoad; // Strict mandatory on-road with zero dealer markups
  const fairPriceHigh = Math.round(mandatoryOnRoad + (accessoriesEstimate * 0.75) + 5000);

  const stealThreshold = fairPriceLow + 2000; // Below this is a Steal deal
  const goodDealMax = fairPriceHigh; // Within this is a Good Deal

  return {
    variantId: variant.id,
    variantName: variant.name,
    fuel: variant.fuel,
    transmission: variant.transmission,
    exShowroom: ex,
    rtoCost,
    insuranceCost,
    statutoryCharges,
    mandatoryOnRoad,
    accessoriesEstimate,
    extendedWarrantyEstimate,
    rsaEstimate,
    totalEstimatedOnRoad,
    fairPriceLow,
    fairPriceHigh,
    stealThreshold,
    goodDealMax,
  };
}

// Creta-Specific FAQs for City Landing Pages
export function getCretaCityFaqs(cityName: string) {
  return [
    {
      question: `What is the starting on-road price of Hyundai Creta in ${cityName}?`,
      answer: `In ${cityName}, the Hyundai Creta on-road price starts at approximately ₹12.60 Lakh for the entry-level E 1.5 Petrol MT variant (including RTO, 1-yr OD + 3-yr TP insurance, and statutory registration fees) and goes up to ₹23.40 Lakh for the top-end SX(O) 1.5 Turbo DCT variant.`,
    },
    {
      question: `What is the Flowzap Fair Price for a Hyundai Creta in ${cityName}?`,
      answer: `Flowzap Fair Price represents the true cost of the vehicle including mandatory RTO taxes, IRDAI-compliant insurance, and essential registration fees without unnegotiated dealer accessory bundles or logistics markups. In ${cityName}, a fair dealer quote should fall within our calculated Fair Price Range for your chosen variant.`,
    },
    {
      question: `Which Hyundai Creta variant offers the best value for money in ${cityName}?`,
      answer: `For manual buyers, the Creta EX 1.5 Petrol MT (Ex-showroom ₹12.21 Lakh) and S 1.5 Petrol MT (Ex-showroom ₹13.43 Lakh) offer the best value. For automatic buyers, the Creta S(O) 1.5 Petrol IVT (Ex-showroom ₹15.86 Lakh) is highly recommended for city driving due to its smooth CVT transmission and panoramic sunroof.`,
    },
    {
      question: `Can I request a free Hyundai Creta test drive in ${cityName} on Flowzap?`,
      answer: `Yes. Requesting a test drive through Flowzap is 100% free. Select your preferred Creta variant, pick your date and time slot, and submit your request. Flowzap forwards your request directly to relevant dealership representatives for confirmation.`,
    },
    {
      question: `Can I request a home test drive for the Creta in ${cityName}?`,
      answer: `Home test drive availability depends on certified dealership inventory and location distance within ${cityName} and the Tricity region. You can select your location preference when submitting your request on Flowzap.`,
    },
  ];
}

// Full Hyundai Creta Gold Standard Dataset Object for GoldStandardCarPage
export const CRETA_GOLD_STANDARD_DATA = {
  modelSlug: 'creta',
  modelName: 'Hyundai Creta',
  brandSlug: 'hyundai',
  brandName: 'Hyundai',
  heroImageUrl: '/cars/hyundai-creta-goldstandard.jpg',
  variants: CRETA_VARIANTS,
  cityPricingConfigs: CITY_PRICING_CONFIGS,
  calculateOnRoad: calculateCityVariantOnRoad,
  evaluationPoints: [
    { title: 'Driving Position & Outward Visibility', advice: 'Adjust seat height and tilt/telescopic steering. Check forward cowl height, wing mirror coverage, and A-pillar blind spots during tight turns.' },
    { title: 'Low-Speed Ride & Speed Bumps', advice: 'Drive over residential sector speed breakers and broken road edges. Observe whether the suspension absorbs bumps silently without transmitting harsh thuds.' },
    { title: 'Transmission Crawl & Traffic Refinement', advice: 'In bumper-to-bumper city traffic, evaluate IVT/AT crawl smoothness or manual clutch lightness and gate precision.' },
    { title: 'Light Steering & U-Turn Ease', advice: 'Perform a tight U-turn and parallel parking maneuver. Evaluate light steering effort at low speeds and check turning radius agility.' },
    { title: 'Rear Bench & Family Ergonomics', advice: 'Sit in the second row behind your normal driving position. Test knee room, thigh support, backrest recline angle, and rear AC vent cooling speed.' },
    { title: 'Cabin Quietness & NVH at Speed', advice: 'Turn off the audio system. Accelerate smoothly up to 60–80 km/h and observe tyre road noise, engine acoustic insulation, and wind noise.' },
    { title: 'Highway Stability & Overtaking Punch', advice: 'On open bypass roads, test high-speed lane stability, brake pedal modulation confidence, and mid-range acceleration punch for overtaking.' },
  ],
  whoShouldConsider: {
    suits: [
      'Families needing a spacious 5-seater SUV with plush low-speed ride quality.',
      'City commuters looking for a stress-free IVT automatic transmission.',
      'Buyers prioritizing modern tech like Level-2 ADAS, 360-degree camera, and Bose sound.',
    ],
    tradeOffs: [
      'Enthusiasts wanting firm European cornering feedback may prefer stiffer alternatives.',
      'Buyers needing a 3rd-row 7-seater layout should consider larger SUVs.',
    ],
  },
  variantAdvice: [
    {
      category: 'Best Value for Money Manual',
      title: 'Creta EX / S 1.5 Petrol MT',
      description: 'Includes 6 airbags, 8-inch touchscreen with Android Auto/Apple CarPlay, steering controls, and rear AC vents. Offers maximum value under ₹14 Lakh on-road.',
    },
    {
      category: 'Best City Automatic',
      title: 'Creta S(O) 1.5 Petrol IVT',
      description: 'The ideal automatic choice for urban commuting. Adds shiftless IVT smooth transmission, panoramic sunroof, electronic parking brake, and push-button start.',
    },
    {
      category: 'High-Mileage Highway Pick',
      title: 'Creta S(O) 1.5 Diesel AT',
      description: 'Combines 250 Nm strong diesel torque with a reliable 6-speed torque-converter automatic gearbox. Delivers excellent highway fuel economy for long-distance drivers.',
    },
  ],
  getCityFaqs: getCretaCityFaqs,
};

