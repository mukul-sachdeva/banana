export interface CityInfo {
  slug: string;
  name: string;
  region: string;
  localContext: string;
  popularRoads: string;
}

export interface BrandInfo {
  slug: string;
  name: string;
  tagline: string;
  overview: string;
  evaluationAdvice: string[];
}

export interface EvaluationPoint {
  title: string;
  advice: string;
}

export interface ModelEditorial {
  slug: string;
  brandSlug: string;
  name: string;
  bodyType: string;
  seating: string;
  idealFor: string;
  keyEvaluationPoint: string;
  heroSubtitle: string;
  evaluationPoints: EvaluationPoint[];
  whoShouldConsider: {
    suits: string[];
    tradeOffs: string[];
  };
  competingModelSlugs: string[];
  chandigarhContext: string;
  homeDriveContext: string;
  modelFaqs: SeoFaq[];
}

export interface SeoFaq {
  question: string;
  answer: string;
}

// 1. Supported Cities
export const SUPPORTED_CITIES: Record<string, CityInfo> = {
  chandigarh: {
    slug: 'chandigarh',
    name: 'Chandigarh',
    region: 'UT',
    localContext: 'Testing a car in Chandigarh lets you experience how it navigates broad avenues, grid-based city traffic, roundabouts, and residential sector parking. A test drive helps evaluate low-speed maneuverability, turning radius, and cabin visibility in real urban conditions.',
    popularRoads: 'Madhya Marg, Jan Marg, and Sector residential roads',
  },
  mohali: {
    slug: 'mohali',
    name: 'Mohali',
    region: 'Punjab',
    localContext: 'In Mohali, test driving allows you to evaluate vehicle performance across expanding urban corridors, sector roads, and mixed road surfaces. You can test suspension compliance over speed breakers and highway stability along airport road stretches.',
    popularRoads: 'Airport Road (PR7), Sector 70/71 corridors, and residential sectors',
  },
  panchkula: {
    slug: 'panchkula',
    name: 'Panchkula',
    region: 'Haryana',
    localContext: 'Panchkula provides a mix of gentle gradients near the Shivalik foothills, sector roads, and highway connectors. A local test drive is ideal for evaluating hill-climb engine responsiveness, braking feel, and suspension comfort over varying terrain.',
    popularRoads: 'Kalka Highway stretch, Sector 20/21 arterial roads, and foothill bypasses',
  },
  kharar: {
    slug: 'kharar',
    name: 'Kharar',
    region: 'Punjab',
    localContext: 'Kharar feature mixed traffic density, highway flyovers, and tight suburban street navigation. A test drive here helps you assess low-end torque for stop-and-go commuting, side mirror visibility, and turning ease in tight spaces.',
    popularRoads: 'Kharar-Landran road, NH-21 flyovers, and residential colonies',
  },
  ludhiana: {
    slug: 'ludhiana',
    name: 'Ludhiana',
    region: 'Punjab',
    localContext: 'Ludhiana presents high-density city driving, industrial bypass roads, and crowded market access. A test drive in Ludhiana gives you a realistic feel for air conditioning effectiveness, clutch/gearbox smoothness in traffic, and tight-space parking.',
    popularRoads: 'Ferozepur Road, Mall Road corridors, and GT Road bypass',
  },
};

// 2. Supported Brands
export const SUPPORTED_BRANDS: Record<string, BrandInfo> = {
  hyundai: {
    slug: 'hyundai',
    name: 'Hyundai',
    tagline: 'Refined performance, intuitive technology, and high urban drivability.',
    overview: 'Hyundai vehicles are known for light steering controls, smooth engine refinement, feature-rich interiors, and effortless city maneuverability. A test drive is the best way to evaluate ergonomics and cabin noise insulation.',
    evaluationAdvice: [
      'Evaluate light steering effort during U-turns and low-speed parking maneuverability.',
      'Test clutch engagement or automatic transmission shift smoothness in bumper-to-bumper traffic.',
      'Check rear-seat knee room, under-thigh support, and rear AC vent effectiveness.',
      'Assess infotainment screen responsiveness and camera clarity under daylight.',
    ],
  },
  mahindra: {
    slug: 'mahindra',
    name: 'Mahindra',
    tagline: 'Commanding seating position, strong diesel torque, and robust road presence.',
    overview: 'Mahindra SUVs offer high ground clearance, upright driving posture, and strong mid-range pull. Experiencing a Mahindra behind the wheel reveals how well the suspension isolates cabin occupants from unpaved or uneven road patches.',
    evaluationAdvice: [
      'Pay attention to all-round visibility and bonnet edge estimation from the driver seat.',
      'Test ride stability over rumble strips, expansion joints, and speed bumps.',
      'Assess engine refinement (NVH levels) at idle and during mid-range acceleration.',
      'Evaluate third-row ingress/egress and boot space practicality if considering 7-seater variants.',
    ],
  },
  tata: {
    slug: 'tata',
    name: 'Tata',
    tagline: 'High structural safety, solid high-speed stability, and expressive design.',
    overview: 'Tata cars feature heavy-duty suspension tuning, high crash-test safety ratings, and planted highway manners. A test drive helps you experience steering weight feedback and cabin shock absorption first hand.',
    evaluationAdvice: [
      'Feel steering weight feedback at city speeds versus highway cruising.',
      'Check how the suspension handles sharp bumps without thudding into the cabin.',
      'Inspect digital cluster readability and drive mode changes (Eco/City/Sport).',
      'Verify second-row shoulder room for three adult passengers.',
    ],
  },
  kia: {
    slug: 'kia',
    name: 'Kia',
    tagline: 'Modern styling, tech-laden cockpits, and responsive powertrain choices.',
    overview: 'Kia vehicles combine sharp exterior styling with well-equipped interiors and precise steering dynamics. Driving a Kia allows you to gauge firm ride control and ergonomics.',
    evaluationAdvice: [
      'Test suspension firmness on rough patches versus high-speed cornering stability.',
      'Experience blind-spot monitor integration and 360-degree camera feed clarity.',
      'Check front seat bolster support and driving posture adjustment range.',
      'Test brake pedal modulation and stopping power during progressive braking.',
    ],
  },
  honda: {
    slug: 'honda',
    name: 'Honda',
    tagline: 'Engine refinement, spacious interior packaging, and clear outward visibility.',
    overview: 'Honda cars excel in rev-happy petrol engines, low cowl height for expansive forward visibility, and clever interior space management. A test drive reveals CVT smoothness and seat comfort.',
    evaluationAdvice: [
      'Assess forward and side visibility through slim A-pillars and low dashboard cowl.',
      'Experience i-VTEC petrol engine responsiveness across low and mid RPM ranges.',
      'Check rear-seat legroom and rear seatback recline angle for long-distance comfort.',
      'Test steering precision during quick lane changes and tight turns.',
    ],
  },
  'maruti-suzuki': {
    slug: 'maruti-suzuki',
    name: 'Maruti Suzuki',
    tagline: 'High fuel efficiency, light controls, and hassle-free city commuting.',
    overview: 'Maruti Suzuki vehicles prioritize ease of driving, light clutch action, fuel economy, and wide service accessibility. Test driving helps confirm daily commute comfort.',
    evaluationAdvice: [
      'Check light clutch travel and effort in city traffic conditions.',
      'Evaluate engine smoothness at idle and during low-speed pick-up.',
      'Inspect cabin space utilization, cup holder placement, and storage spots.',
      'Test turning radius agility in narrow streets and tight parking spaces.',
    ],
  },
  toyota: {
    slug: 'toyota',
    name: 'Toyota',
    tagline: 'Proven reliability, strong resale value, and durable hybrid performance.',
    overview: 'Toyota models are built for long-term endurance, smooth hybrid efficiency, and comfortable long-distance touring. A test drive highlights hybrid battery seamless transition.',
    evaluationAdvice: [
      'Experience EV-to-petrol engine transitions in hybrid models.',
      'Assess seating cushion comfort for long journey endurance.',
      'Test air conditioning performance in peak cabin heat.',
      'Verify body roll control on highway curves and cloverleaf ramps.',
    ],
  },
  volkswagen: {
    slug: 'volkswagen',
    name: 'Volkswagen',
    tagline: 'German engineering, TSI turbocharged power, and European driving dynamics.',
    overview: 'Volkswagen sedans and SUVs feature strong TSI turbo-petrol acceleration, weighted steering, and solid door-thud build quality. A test drive demonstrates enthusiastic performance.',
    evaluationAdvice: [
      'Experience TSI engine turbo boost response from 2000 RPM onward.',
      'Feel high-speed chassis composure and lane-change stability.',
      'Assess steering wheel grip, pedal placement, and driver ergonomics.',
      'Check boot capacity depth and rear seat split-fold practicality.',
    ],
  },
  mg: {
    slug: 'mg',
    name: 'MG',
    tagline: 'Plush cabin materials, panoramic views, and internet-connected convenience.',
    overview: 'MG vehicles focus on plush leatherette cabin upholstery, large panoramic sunroofs, and generous interior room. Driving an MG allows you to evaluate suspension plushness.',
    evaluationAdvice: [
      'Evaluate soft suspension absorption over deep road dips and speed humps.',
      'Check panoramic sunroof operation and cabin ambient light feel.',
      'Test touchscreen interface response time and voice command controls.',
      'Assess rear seat recline comfort and flat floor foot space for middle passengers.',
    ],
  },
};

// 3. Model Level Editorial Guides
export const MODEL_EDITORIALS: Record<string, ModelEditorial> = {
  creta: {
    slug: 'creta',
    brandSlug: 'hyundai',
    name: 'Hyundai Creta',
    bodyType: 'Mid-Size SUV',
    seating: '5 Seater',
    idealFor: 'Buyers seeking a refined, easy-to-drive family SUV with light controls, plush low-speed ride quality, and a feature-loaded cabin.',
    keyEvaluationPoint: 'Focus on low-speed steering effort, speed breaker absorption, and rear-seat knee room behind your normal driving posture.',
    heroSubtitle: "Thinking about the Creta? Specifications cannot tell you how natural the driving position feels, how the suspension handles broken sector roads, or whether the rear bench comfortably fits your family. Experience it behind the wheel before you decide.",
    evaluationPoints: [
      {
        title: 'Driving Position & Outward Visibility',
        advice: 'Adjust the electric driver seat and tilt/telescopic steering to your exact driving position. Pay attention to forward cowl height, side mirror coverage, and A-pillar thickness when estimating corners in tight traffic.',
      },
      {
        title: 'Suspension & Low-Speed Ride Plushness',
        advice: 'Take the Creta over speed bumps, rumble strips, and broken asphalt patches. Observe whether the suspension absorbs sharp edges silently or transmits road thuds into the cabin floor.',
      },
      {
        title: 'Engine Refinement & Transmission Crawl',
        advice: 'In stop-and-go traffic, test automatic shift smoothness or manual clutch lightness. At idle, check cabin quietness and vibration isolation through the steering wheel and pedals.',
      },
      {
        title: 'Light Steering Effort & City Turning Radius',
        advice: 'Perform a full U-turn and parallel parking maneuver. The Creta is designed for light low-speed steering effort — evaluate whether it feels effortless and natural for daily city commuting.',
      },
      {
        title: 'Rear-Seat Comfort & Family Ergonomics',
        advice: 'Sit in the second row with the front driver seat adjusted to your height. Check thigh support, backrest angle, window line height for kids, and rear AC vent airflow in summer heat.',
      },
      {
        title: 'Cabin NVH & Sound Insulation at Speed',
        advice: 'Accelerate smoothly to 60–80 km/h with the audio system turned off. Check tyre roar, wind noise around wing mirrors, and engine acoustic insulation.',
      },
      {
        title: 'Highway Composure & High-Speed Stability',
        advice: 'If you frequently travel on open highways outside the city, test high-speed lane stability and braking confidence under progressive pedal pressure.',
      },
    ],
    whoShouldConsider: {
      suits: [
        'Families seeking a plush 5-seater SUV with effortless city drivability.',
        'Commuters wanting light steering controls and smooth automatic options.',
        'Buyers prioritizing a feature-rich interior with panoramic views and clean ergonomics.',
      ],
      tradeOffs: [
        'If you prioritize firm, sport-focused cornering dynamics over plush low-speed ride quality, evaluate German alternatives like the Taigun.',
        'If you require 7 seats or extreme off-road 4x4 capability, evaluate full-size ladder-frame SUVs.',
      ],
    },
    competingModelSlugs: ['seltos', 'elevate', 'harrier', 'xuv700'],
    chandigarhContext: 'When evaluating the Creta in Chandigarh, use your test drive to test low-speed U-turns across Sector avenues, test speed bump absorption on residential sector roads, and verify how easily the vehicle fits into your home driveway or parking spot.',
    homeDriveContext: 'A home test drive lets you park the Creta in your actual residential driveway, test entry/exit angles, load family luggage in the boot, and let family members evaluate rear-seat comfort in familiar surroundings.',
    modelFaqs: [
      {
        question: 'Can I request a Hyundai Creta test drive in Chandigarh through Flowzap?',
        answer: 'Yes. You can request a free test drive for the Hyundai Creta through Flowzap. We connect your request directly with relevant dealership representatives who confirm your preferred date and time slot.',
      },
      {
        question: 'Can I request a home test drive for the Creta?',
        answer: 'Home test drive availability depends on certified dealership inventory and distance within supported locations (Chandigarh, Mohali, Panchkula, Kharar, Ludhiana). You can specify your location preference when submitting your request.',
      },
      {
        question: 'What specific things should I evaluate during a Creta test drive?',
        answer: 'Focus on 5 key areas: driver seat visibility and ergonomics, low-speed suspension absorption over broken roads, steering lightness during U-turns, rear-seat legroom for family members, and cabin quietness (NVH) with the audio system switched off.',
      },
      {
        question: 'Should I test drive the Hyundai Creta against competing SUVs?',
        answer: 'Yes. Testing the Creta back-to-back with alternatives like the Kia Seltos, Honda Elevate, or Tata Harrier is the most effective way to compare real-world seating posture, ride firmness, and steering feedback.',
      },
      {
        question: 'Is there any fee or hidden charge to book a Creta test drive on Flowzap?',
        answer: 'No. Requesting a test drive through Flowzap is 100% free with zero booking fees or hidden charges.',
      },
    ],
  },
  xuv700: {
    slug: 'xuv700',
    brandSlug: 'mahindra',
    name: 'Mahindra XUV700',
    bodyType: 'Premium 5/7-Seater SUV',
    seating: '5 / 7 Seater',
    idealFor: 'Families needing strong diesel/petrol engine performance, high-speed stability, and spacious 3-row capability.',
    keyEvaluationPoint: 'Experience strong mid-range torque pull during overtakes and high-speed chassis composure.',
    heroSubtitle: "Considering the XUV700? Experience its strong powertrain, elevated seating posture, and suspension stability before you commit. Test drive it in real conditions.",
    evaluationPoints: [
      {
        title: 'Bonnet Visibility & Driving Position',
        advice: 'Adjust the elevated seating position and check bonnet edge visibility for confident placement in urban traffic.',
      },
      {
        title: 'Engine Refinement & Torque Delivery',
        advice: 'Test acceleration responsiveness and engine NVH levels at low speeds and during mid-range overtakes.',
      },
      {
        title: 'Ride Quality & Shock Absorption',
        advice: 'Observe frequency-selective dampening suspension performance over rough road patches and expansion joints.',
      },
      {
        title: '3rd Row Access & Seating Space',
        advice: 'Check 2nd row one-touch tumble ease and evaluate 3rd row legroom for family members if opting for 7 seats.',
      },
      {
        title: 'Digital Cockpit & 360 Camera',
        advice: 'Inspect twin screen clarity under direct sunlight and test 360-degree camera feed accuracy during tight parking.',
      },
    ],
    whoShouldConsider: {
      suits: [
        'Families requiring spacious 7-seater seating capacity.',
        'Drivers who prioritize highway cruising power and planted stability.',
        'Buyers wanting modern tech features like twin screens and ADAS options.',
      ],
      tradeOffs: [
        'Larger dimensions require checking tight home parking spaces before purchase.',
      ],
    },
    competingModelSlugs: ['harrier', 'creta', 'seltos'],
    chandigarhContext: 'Test the XUV700 across open avenues and sector corridors to evaluate vehicle dimensions, turning radius, and high-speed road composure.',
    homeDriveContext: 'Use a home test drive to verify how comfortably the XUV700 fits in your home garage or residential sector parking lane.',
    modelFaqs: [
      {
        question: 'Can I request a Mahindra XUV700 test drive?',
        answer: 'Yes. Request a free test drive on Flowzap and we connect your request directly to relevant dealership representatives.',
      },
      {
        question: 'Is a home test drive available for the XUV700?',
        answer: 'Home test drive availability depends on dealership inventory and location within supported pilot cities.',
      },
    ],
  },
  harrier: {
    slug: 'harrier',
    brandSlug: 'tata',
    name: 'Tata Harrier',
    bodyType: 'Mid-Size Premium SUV',
    seating: '5 Seater',
    idealFor: 'Drivers prioritizing heavy-duty road presence, solid build feel, and planted highway touring capability.',
    keyEvaluationPoint: 'Experience steering feel at highway speeds and OMEGA-Arc platform suspension robustness.',
    heroSubtitle: "Evaluating the Tata Harrier? Feel its planted chassis stability, solid build quality, and heavy-duty road presence behind the wheel.",
    evaluationPoints: [
      {
        title: 'Road Presence & Commanding Stance',
        advice: 'Check driving height and side mirror visibility across city avenues.',
      },
      {
        title: 'Drive Modes & Engine Pull',
        advice: 'Switch between Eco, City, and Sport modes to evaluate throttle response.',
      },
      {
        title: 'Suspension Heavy-Duty Damping',
        advice: 'Feel how the OMEGA-Arc platform absorbs sharp potholes without cabin harshness.',
      },
    ],
    whoShouldConsider: {
      suits: [
        'Buyers prioritizing solid build quality and high structural safety.',
        'Long-distance highway travelers seeking high stability.',
      ],
      tradeOffs: [
        'Slightly heavier steering effort at low parking speeds compared to lighter petrol SUVs.',
      ],
    },
    competingModelSlugs: ['xuv700', 'creta', 'seltos'],
    chandigarhContext: 'Evaluate Harrier suspension damping over rumble strips and sector speed breakers.',
    homeDriveContext: 'Test home parking entry and garage clearance.',
    modelFaqs: [
      {
        question: 'How do I book a Tata Harrier test drive?',
        answer: 'Submit your request on Flowzap for a free test drive booking.',
      },
    ],
  },
  seltos: {
    slug: 'seltos',
    brandSlug: 'kia',
    name: 'Kia Seltos',
    bodyType: 'Mid-Size SUV',
    seating: '5 Seater',
    idealFor: 'Buyers looking for sharp handling, modern interior layout, and crisp dual-screen infotainment.',
    keyEvaluationPoint: 'Compare firm, controlled cornering dynamics against low-speed ride over sharp road edges.',
    heroSubtitle: "Considering the Kia Seltos? Test drive its sharp steering handling, modern interior layout, and tech features before you decide.",
    evaluationPoints: [
      {
        title: 'Steering Precision & Handling',
        advice: 'Test cornering stability and steering feedback on city curves.',
      },
      {
        title: 'Dual Screen & Camera Clarity',
        advice: 'Inspect infotainment screen response and blind-spot monitor integration.',
      },
    ],
    whoShouldConsider: {
      suits: [
        'Tech-savvy buyers wanting a stylish modern SUV.',
        'Drivers who enjoy precise steering control.',
      ],
      tradeOffs: [
        'Firm suspension setup — evaluate low-speed bump absorption on rough roads.',
      ],
    },
    competingModelSlugs: ['creta', 'elevate', 'harrier'],
    chandigarhContext: 'Test Seltos low-speed turning agility and parking camera clarity in urban areas.',
    homeDriveContext: 'Evaluate residential street navigation and driveway parking.',
    modelFaqs: [
      {
        question: 'Can I book a Kia Seltos test drive on Flowzap?',
        answer: 'Yes. Request a free test drive and dealer representatives will confirm your schedule.',
      },
    ],
  },
  elevate: {
    slug: 'elevate',
    brandSlug: 'honda',
    name: 'Honda Elevate',
    bodyType: 'Mid-Size SUV',
    seating: '5 Seater',
    idealFor: 'Buyers valuing 220mm high ground clearance, clean dashboard ergonomics, and smooth 1.5L i-VTEC engine.',
    keyEvaluationPoint: 'Notice expansive front visibility over the flat bonnet and plush suspension travel.',
    heroSubtitle: "Thinking of the Honda Elevate? Drive it to experience its 220mm ground clearance, clear bonnet visibility, and smooth i-VTEC engine.",
    evaluationPoints: [
      {
        title: 'Forward Visibility & Bonnet View',
        advice: 'Observe high seating posture and clear bonnet corners.',
      },
      {
        title: 'High Ground Clearance (220mm)',
        advice: 'Drive over high speed breakers without worrying about underbody scraping.',
      },
    ],
    whoShouldConsider: {
      suits: [
        'Buyers seeking no-nonsense reliability and high ground clearance.',
        'Drivers who prefer natural i-VTEC petrol refinement.',
      ],
      tradeOffs: [
        'No diesel or hybrid powertrain option available.',
      ],
    },
    competingModelSlugs: ['creta', 'seltos', 'harrier'],
    chandigarhContext: 'Test Elevate over high speed humps and sector roads.',
    homeDriveContext: 'Verify boot loading for family luggage at home.',
    modelFaqs: [
      {
        question: 'How to request a Honda Elevate test drive?',
        answer: 'Submit a free test drive request on Flowzap in under one minute.',
      },
    ],
  },
};

// 4. Practical FAQs (Matching real search intent, non-generic)
export const COMMON_TEST_DRIVE_FAQS: SeoFaq[] = [
  {
    question: 'How do I request a free test drive through Flowzap?',
    answer: 'Select your preferred vehicle, pick a date and time slot that works for you, and submit your request in under one minute. Flowzap sends your test-drive request to the relevant dealership representative for confirmation.',
  },
  {
    question: 'Is there any charge to request a test drive on Flowzap?',
    answer: 'No. Requesting a test drive through Flowzap is 100% free with zero hidden booking fees.',
  },
  {
    question: 'Can I request a home test drive in my city?',
    answer: 'Home test drive availability depends on location, certified dealership inventory, and distance within supported pilot cities (Ludhiana, Chandigarh, Mohali, Panchkula, Kharar). You can select your preferred location preference during request submission.',
  },
  {
    question: 'What documents should I keep ready for the test drive?',
    answer: 'You will need a valid Indian Driving Licence (original). Dealership representatives verify your licence before handing over steering controls for compliance and insurance purposes.',
  },
  {
    question: 'Can I evaluate multiple cars before deciding?',
    answer: 'Yes. Testing 2-3 competing vehicles back-to-back is the most reliable way to compare real-world seating comfort, steering effort, and driving position before making a purchase decision.',
  },
];

// 5. Relevant Internal Blog Links
export const INTERNAL_BLOG_LINKS = [
  {
    slug: 'home-vs-dealer-test-drive',
    title: 'Home Test Drive vs Dealer Test Drive: Which is Better?',
    description: 'Compare convenience, pressure, and vehicle evaluation conditions.',
  },
  {
    slug: 'test-drive-checklist',
    title: '7 Things to Check During a Test Drive',
    description: 'Practical checklist covering steering, braking, suspension, and cabin ergonomics.',
  },
  {
    slug: 'should-you-test-drive-multiple-cars',
    title: 'Should You Test Drive Multiple Cars Before Buying?',
    description: 'Why back-to-back test drives reveal crucial real-world preferences.',
  },
];
