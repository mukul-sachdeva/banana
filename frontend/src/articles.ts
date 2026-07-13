export interface ArticleSection {
  id: string;
  heading: string;
  content: string;
  showCTA?: boolean;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  readingTime: number;
  heroImageAlt: string;
  sections: ArticleSection[];
  relatedSlugs: string[];
}

export const ARTICLES: Article[] = [
  // ─── Article 1: Home vs Dealer ───
  {
    slug: 'home-vs-dealer-test-drive',
    title: 'Home Test Drive vs Dealer Test Drive: Which is Better?',
    description: 'Compare home and dealer test drives across convenience, pressure, and real-world driving conditions. Find out which option suits you best.',
    readingTime: 5,
    heroImageAlt: 'Home test drive vs dealership test drive comparison',
    relatedSlugs: ['why-home-test-drives-save-time', 'test-drive-checklist'],
    sections: [
      {
        id: 'convenience',
        heading: 'Convenience and Time',
        content: `<p>A dealership test drive typically requires you to travel to the showroom, wait for a sales representative, and then drive on an unfamiliar route chosen by the dealer. Depending on traffic, this can consume half a day.</p>
<p>A home test drive flips this. The car comes to you. You skip the commute, the waiting room, and the paperwork shuffle. For families with young children or professionals with packed schedules, this difference is significant.</p>
<p>Most home test drive appointments in India can be scheduled within 48 hours through platforms like Flowzap, with flexible morning and evening slots.</p>`,
      },
      {
        id: 'driving-conditions',
        heading: 'Real-World Driving Conditions',
        content: `<p>Dealer test drive routes are usually short, smooth, and carefully selected. They rarely reflect the roads you actually drive on every day.</p>
<p>When the car arrives at your home, you drive it on <strong>your roads</strong> — the speed breakers near your colony, the narrow lane to your office, the highway stretch you take on weekends. This gives you a far more honest sense of how the car handles in your life.</p>
<p>If ride comfort and suspension matter to you (and they should), there is no substitute for testing on familiar terrain.</p>`,
        showCTA: true,
      },
      {
        id: 'pressure',
        heading: 'Sales Pressure',
        content: `<p>Let's be honest — dealership visits come with a certain amount of sales pressure. The executive has targets. There will be questions about your budget, your trade-in, your financing plans. None of this is unreasonable, but it can feel overwhelming when you simply want to experience the car.</p>
<p>Home test drives remove most of this pressure. The focus stays on the vehicle. You can take your time, discuss with family in private, and make a decision without someone standing next to you with a brochure.</p>`,
      },
      {
        id: 'vehicle-condition',
        heading: 'Vehicle Condition and Availability',
        content: `<p>Dealership test drive cars are usually well-maintained demo vehicles, sometimes in a specific variant or colour. You may not always get to test the exact variant you are considering.</p>
<p>Home test drive vehicles are typically drawn from the same demo fleet, so the condition is comparable. The main advantage is that you can request a specific variant in advance and the dealer will try to accommodate it.</p>`,
      },
      {
        id: 'verdict',
        heading: 'So Which Should You Choose?',
        content: `<p>Both formats have genuine value. If you want to see the full showroom experience, explore accessories, and talk financing face-to-face, a dealership visit makes sense.</p>
<p>If you want to <strong>focus purely on how the car drives</strong> in your daily conditions, with minimal pressure and maximum convenience, a home test drive is the better choice.</p>
<p>The best approach? Do both. Start with a home test drive to shortlist, then visit the dealership to finalize. Flowzap makes the first step easy.</p>`,
        showCTA: true,
      },
    ],
  },

  // ─── Article 2: Test Drive Checklist ───
  {
    slug: 'test-drive-checklist',
    title: '7 Things to Check During a Test Drive',
    description: 'A practical checklist of what to evaluate during your next test drive — from driving position to cabin noise. Don\'t miss these.',
    readingTime: 6,
    heroImageAlt: 'Test drive checklist — what to evaluate',
    relatedSlugs: ['home-vs-dealer-test-drive', 'should-you-test-drive-multiple-cars'],
    sections: [
      {
        id: 'driving-position',
        heading: 'Driving Position and Seat Comfort',
        content: `<p>Before you even start the engine, adjust the seat and steering wheel to your natural driving position. Check whether the seat offers enough thigh support, whether the steering reaches you comfortably, and whether you can see all the instruments clearly.</p>
<p>If you're tall, pay attention to headroom. If you're short, check whether the seat raises high enough for good visibility. This is something no review can tell you — it depends entirely on your body.</p>`,
      },
      {
        id: 'visibility',
        heading: 'Visibility',
        content: `<p>Check all three mirrors and look over your shoulders. How large are the blind spots? Can you see the bonnet edges clearly for judging gaps in tight lanes? Is the rear windshield large enough for confident reversing?</p>
<p>In India, where lane discipline is variable and two-wheelers appear from unexpected angles, visibility is not a luxury — it's a safety requirement.</p>`,
        showCTA: true,
      },
      {
        id: 'steering-feel',
        heading: 'Steering Feel',
        content: `<p>Turn the steering wheel at low speeds (parking) and at higher speeds (open road). Does it feel light enough for city driving? Does it weigh up confidently at highway speeds?</p>
<p>Some cars have adjustable steering modes (Comfort, Normal, Sport). Try all of them. The difference can be significant, and you may prefer one mode over what the reviews recommend.</p>`,
      },
      {
        id: 'braking',
        heading: 'Braking',
        content: `<p>Test the brakes at various speeds. Does the car stop smoothly and predictably? Is there any pulling to one side? How does the brake pedal feel — is it spongy or firm?</p>
<p>Try a slightly harder stop from 60 km/h. This simulates an emergency scenario and tells you how much confidence the braking system inspires. Most modern cars in the ₹10-20 lakh range offer disc brakes on all four wheels, but the calibration varies.</p>`,
      },
      {
        id: 'suspension',
        heading: 'Suspension and Ride Comfort',
        content: `<p>Drive over speed breakers, rough patches, and expansion joints. Does the car absorb bumps smoothly or do you feel every imperfection? Is there any secondary bounce after a bump?</p>
<p><strong>This is the single most important thing to test on Indian roads.</strong> A car that feels smooth on a dealership route may feel harsh on your daily commute. Always test on roads you know.</p>`,
        showCTA: true,
      },
      {
        id: 'cabin-noise',
        heading: 'Cabin Noise',
        content: `<p>Turn off the music and the AC for a minute. Listen. How much road noise enters the cabin at 60 km/h? At 80? Can you hear the engine clearly, or is it well insulated?</p>
<p>Wind noise around the mirrors and A-pillars becomes noticeable at highway speeds. If you do a lot of highway driving, this matters more than most people realise.</p>`,
      },
      {
        id: 'infotainment',
        heading: 'Infotainment and Daily Usability',
        content: `<p>Connect your phone via Bluetooth or Android Auto / Apple CarPlay. Does the system pair quickly? Is the touchscreen responsive? Can you operate basic functions without taking your eyes off the road for too long?</p>
<p>Check the USB ports, the cup holders, the door pockets, the glovebox. These small things define your daily experience far more than horsepower figures. A car you live with every day should feel effortless in the mundane moments.</p>`,
        showCTA: true,
      },
    ],
  },

  // ─── Article 3: Best SUVs Under ₹20 Lakhs ───
  {
    slug: 'best-suvs-under-20-lakhs',
    title: 'Best SUVs Under ₹20 Lakhs in 2025',
    description: 'The top compact SUVs you can buy in India under ₹20 lakhs — Creta, Nexon, Seltos, Brezza, XUV 3XO, and Curvv compared.',
    readingTime: 7,
    heroImageAlt: 'Best SUVs under 20 lakhs in India 2025',
    relatedSlugs: ['tata-curvv-vs-hyundai-creta', 'test-drive-checklist'],
    sections: [
      {
        id: 'overview',
        heading: 'The Compact SUV Boom',
        content: `<p>The sub-₹20 lakh SUV segment is the most competitive space in the Indian car market. Nearly every major manufacturer has a strong contender, and the differences between them are often subtle — which is exactly why test driving matters more here than in any other segment.</p>
<p>Here are six SUVs that deserve your attention in 2025, each with distinct strengths.</p>`,
      },
      {
        id: 'creta',
        heading: 'Hyundai Creta',
        content: `<p>The Creta has been India's best-selling SUV for years, and for good reason. It offers a polished cabin, a smooth ride, and a feature list that rivals cars costing significantly more.</p>
<ul>
<li><strong>Strengths:</strong> Premium interior quality, excellent infotainment system, strong diesel engine, high resale value.</li>
<li><strong>Watch out for:</strong> Ride can feel slightly firm on broken roads in the lower variants. The base variants miss key features.</li>
<li><strong>Price range:</strong> ₹11.00 – ₹20.30 lakh (ex-showroom)</li>
</ul>`,
        showCTA: true,
      },
      {
        id: 'nexon',
        heading: 'Tata Nexon',
        content: `<p>The Nexon is the safety benchmark in this segment — it was the first Indian car to score a 5-star Global NCAP rating. It's also one of the most affordable options here.</p>
<ul>
<li><strong>Strengths:</strong> 5-star safety, punchy turbo petrol, competitive pricing, strong build quality.</li>
<li><strong>Watch out for:</strong> Cabin materials in lower variants feel a step behind the Creta. AMT gearbox is adequate but not as smooth as a DCT.</li>
<li><strong>Price range:</strong> ₹8.10 – ₹15.50 lakh (ex-showroom)</li>
</ul>`,
      },
      {
        id: 'seltos-brezza',
        heading: 'Kia Seltos & Maruti Suzuki Brezza',
        content: `<p>The <strong>Seltos</strong> shares its platform with the Creta but offers a sportier design and an equally impressive feature set. The turbo petrol with DCT is one of the best powertrain combinations in the segment.</p>
<p>The <strong>Brezza</strong> is the practical choice — light, easy to drive in the city, excellent fuel efficiency, and backed by Maruti's unmatched service network. It may not be the most exciting car here, but it's one of the most sensible.</p>
<ul>
<li><strong>Seltos price:</strong> ₹10.90 – ₹20.35 lakh (ex-showroom)</li>
<li><strong>Brezza price:</strong> ₹8.34 – ₹14.14 lakh (ex-showroom)</li>
</ul>`,
        showCTA: true,
      },
      {
        id: 'xuv3xo-curvv',
        heading: 'Mahindra XUV 3XO & Tata Curvv',
        content: `<p>The <strong>XUV 3XO</strong> is Mahindra's value proposition — it packs segment-leading features (panoramic sunroof, ADAS, large touchscreen) at aggressive prices. The ride quality, particularly with the diesel engine, is impressive.</p>
<p>The <strong>Tata Curvv</strong> is the newest entrant and the only SUV-coupé in this segment. If you want something that looks genuinely different on the road, the Curvv delivers. The interior space is surprisingly good despite the sloping roofline.</p>
<ul>
<li><strong>XUV 3XO price:</strong> ₹7.79 – ₹15.49 lakh (ex-showroom)</li>
<li><strong>Curvv price:</strong> ₹10.00 – ₹19.00 lakh (ex-showroom)</li>
</ul>`,
      },
      {
        id: 'how-to-decide',
        heading: 'How to Decide',
        content: `<p>Spec sheets will only get you so far. Every car in this list is competent on paper. The differences become clear only when you drive them — how the steering feels in your hands, how the seat supports your back on a long drive, how the suspension handles the road outside your home.</p>
<p>The best way to shortlist? Test drive your top two or three picks back to back. Flowzap lets you book multiple test drives so you can compare with the experience fresh in your mind.</p>`,
        showCTA: true,
      },
    ],
  },

  // ─── Article 4: Curvv vs Creta ───
  {
    slug: 'tata-curvv-vs-hyundai-creta',
    title: 'Tata Curvv vs Hyundai Creta: Which Should You Test Drive?',
    description: 'A fair comparison of the Tata Curvv and Hyundai Creta across design, engines, features, and daily drivability.',
    readingTime: 6,
    heroImageAlt: 'Tata Curvv vs Hyundai Creta comparison',
    relatedSlugs: ['best-suvs-under-20-lakhs', 'should-you-test-drive-multiple-cars'],
    sections: [
      {
        id: 'design',
        heading: 'Design and Presence',
        content: `<p>The Creta follows a conventional SUV shape — upright, broad, and immediately recognisable. The 2024 facelift sharpened the front end and added connected LED elements. It looks premium without trying too hard.</p>
<p>The Curvv is the opposite philosophy. The SUV-coupé silhouette is bold and polarising. The sloping roofline, flush door handles, and connected tail lights give it a concept-car feel. On the road, it turns heads — whether that matters to you is personal.</p>
<p>Neither design is objectively better. But if you value road presence and a unique silhouette, the Curvv has the edge. If you prefer a proven, understated shape, the Creta delivers.</p>`,
      },
      {
        id: 'engines',
        heading: 'Engine and Driving Experience',
        content: `<p>Both cars offer turbo petrol and diesel options. The Creta's 1.5L turbo petrol with 7-speed DCT is refined and well-suited to city driving. The diesel is smooth and fuel-efficient.</p>
<p>The Curvv's engines are similarly capable. The 1.2L turbo petrol is peppy, and the 1.5L diesel is shared with the Nexon — proven and punchy. Where the Curvv differs is in its slightly sportier suspension tuning, which trades a small amount of plushness for better body control in corners.</p>
<p>The only way to know which driving character you prefer is to drive both. Specifications alone cannot convey the difference between "comfortable" and "engaging."</p>`,
        showCTA: true,
      },
      {
        id: 'features',
        heading: 'Features and Technology',
        content: `<p>Both cars are loaded with features in their top variants — 10.25" touchscreens, wireless charging, ventilated seats, panoramic sunroofs, ADAS, and connected car technology.</p>
<p>The Creta's infotainment system is arguably more polished and responsive. Hyundai's BlueLink connected car suite is mature and reliable.</p>
<p>The Curvv counters with a larger 12.3" touchscreen, an Arcade.ev-inspired UI, and JBL speakers in the top variant. Its ADAS suite is comprehensive and one of the best in the segment.</p>`,
      },
      {
        id: 'space-practicality',
        heading: 'Space and Practicality',
        content: `<p>The Creta offers generous rear seat space — headroom, legroom, and under-thigh support are all excellent. The boot is 433 litres, which is adequate for a family of four.</p>
<p>The Curvv's sloping roofline raises obvious questions about rear headroom. In practice, anyone under 5'10" will be comfortable. Taller passengers may notice the roofline. The boot, however, is a class-leading 500 litres.</p>
<p>If you frequently carry rear passengers taller than 5'10", sit in the back seat of both cars before deciding.</p>`,
        showCTA: true,
      },
      {
        id: 'verdict',
        heading: 'The Verdict: Test Drive Both',
        content: `<p>The Creta is the safer, more proven choice — it does everything well and has years of market trust behind it. The Curvv is the more exciting, newer option that sacrifices nothing significant while offering a distinctive design and modern tech.</p>
<p>This is not a comparison where one car is clearly better. It is a comparison where <strong>your preferences decide</strong>. And the only way to discover your preferences is to experience both cars on your roads, in your driving conditions.</p>
<p>Book test drives for both on Flowzap. Compare them back to back. The right car will be obvious once you've driven them.</p>`,
        showCTA: true,
      },
    ],
  },

  // ─── Article 5: Multiple Cars ───
  {
    slug: 'should-you-test-drive-multiple-cars',
    title: 'Should You Test Drive Multiple Cars Before Buying?',
    description: 'Why test driving 2-3 cars back to back reveals preferences that reviews and specs never will. Here\'s how to do it right.',
    readingTime: 4,
    heroImageAlt: 'Comparing multiple cars through test drives',
    relatedSlugs: ['test-drive-checklist', 'tata-curvv-vs-hyundai-creta'],
    sections: [
      {
        id: 'why-multiple',
        heading: 'Why One Test Drive Is Never Enough',
        content: `<p>When you test drive a single car, everything feels new and impressive. The seats feel comfortable. The engine feels responsive. The features feel modern. It's almost impossible to be objective when you have nothing to compare against.</p>
<p>When you test drive a second car the same day or the next day, something shifts. You start noticing differences you wouldn't have noticed otherwise — the steering in Car A felt lighter, the seats in Car B supported your back better, the cabin of Car A was quieter on rough roads.</p>
<p><strong>Comparison is the engine of good decision-making.</strong> No amount of YouTube reviews can replicate the clarity that comes from driving two cars back to back.</p>`,
      },
      {
        id: 'how-many',
        heading: 'How Many Cars Should You Test Drive?',
        content: `<p>Two is the minimum. Three is ideal. More than three can lead to decision fatigue.</p>
<p>Start by shortlisting based on your budget and requirements. Narrow it down to 2-3 genuine contenders using online research. Then test drive all of them within a short window — ideally the same week, so the impressions stay fresh.</p>
<p>If you're deciding between a Creta and a Seltos, for example, driving both on consecutive days will tell you more than a month of watching comparison videos.</p>`,
        showCTA: true,
      },
      {
        id: 'what-to-compare',
        heading: 'What to Compare Between Cars',
        content: `<p>Focus on the things that specs can't capture:</p>
<ul>
<li><strong>Ride quality:</strong> Which car felt smoother on your roads?</li>
<li><strong>Driving position:</strong> Which seat felt more natural after 20 minutes?</li>
<li><strong>Cabin experience:</strong> Which car felt quieter and more comfortable inside?</li>
<li><strong>Daily usability:</strong> Which controls were easier to use without looking?</li>
<li><strong>Gut feeling:</strong> Which car did you enjoy driving more?</li>
</ul>
<p>Keep notes after each drive. Even a few bullet points on your phone will help when you're making the final decision days later.</p>`,
      },
      {
        id: 'flowzap-makes-it-easy',
        heading: 'Making It Easy with Flowzap',
        content: `<p>The traditional way to test drive multiple cars means visiting multiple dealerships on different days, coordinating with different sales teams, and spending entire weekends on showroom visits.</p>
<p>Flowzap simplifies this. You can book test drives for multiple cars in a few taps, choose time slots that work for your schedule, and have the cars brought to your home. This makes back-to-back comparison not just possible but practical.</p>
<p>The goal isn't to test drive every car on the market. It's to test drive enough cars to make a confident decision. Two or three drives, done right, are all you need.</p>`,
        showCTA: true,
      },
    ],
  },

  // ─── Article 6: Home Test Drives Save Time ───
  {
    slug: 'why-home-test-drives-save-time',
    title: 'Why Home Test Drives Save Time and Reduce Pressure',
    description: 'Home test drives eliminate dealership commutes, sales pressure, and wasted weekends. Here\'s why they\'re the smarter way to choose a car.',
    readingTime: 4,
    heroImageAlt: 'Home test drive — car delivered to your doorstep',
    relatedSlugs: ['home-vs-dealer-test-drive', 'should-you-test-drive-multiple-cars'],
    sections: [
      {
        id: 'time-saved',
        heading: 'The Hidden Time Cost of Dealership Visits',
        content: `<p>A typical dealership test drive in an Indian metro takes 3-4 hours when you account for travel, waiting, the drive itself, and the obligatory sales conversation. In cities like Bangalore, Delhi, or Hyderabad, traffic alone can consume an hour each way.</p>
<p>A home test drive takes 30-45 minutes of your actual time. The car arrives at your door. You drive it. You're done. There is no commute, no waiting room, and no one asking you to "just look at the on-road price."</p>
<p>For most working professionals, this difference is the difference between testing a car on a weekday evening and sacrificing an entire Saturday.</p>`,
      },
      {
        id: 'familiar-roads',
        heading: 'Your Roads, Your Conditions',
        content: `<p>Dealership test routes are optimised to make every car feel good — smooth tarmac, minimal traffic, short distance. They rarely include the speed breakers near your home, the narrow parking spot at your office, or the potholed shortcut you take every morning.</p>
<p>When the car comes to you, you drive it exactly where you'll drive it every day. The ride quality you experience during a home test drive is the ride quality you'll live with. No surprises after purchase.</p>
<p>This is especially important for SUVs in the ₹10-20 lakh range, where suspension tuning varies significantly between models — some are firm and sporty, others are soft and absorbent. The difference is immediately obvious on real roads.</p>`,
        showCTA: true,
      },
      {
        id: 'no-pressure',
        heading: 'Drive Without the Sales Pitch',
        content: `<p>Dealership sales executives are professionals doing their job, and most of them are genuinely helpful. But the environment is inherently transactional. There will be questions about your budget, your timeline, your exchange car. You may feel nudged toward a specific variant or financing option.</p>
<p>During a home test drive, the dynamic is different. The focus stays on the car. You can discuss freely with your family, take a phone call, or simply sit in the car for ten minutes feeling the seat. Nobody is watching the clock or steering you toward a decision.</p>
<p>This space to think without pressure leads to better decisions. You choose the car because it felt right — not because someone convinced you in the moment.</p>`,
      },
      {
        id: 'family-involvement',
        heading: 'Involve Your Family Naturally',
        content: `<p>Car purchases in India are family decisions. But bringing your entire family to a dealership — especially with young children — is logistically challenging and exhausting.</p>
<p>When the car arrives at your home, everyone can participate naturally. Your partner can sit in the driver's seat. Your parents can check the rear seat comfort. Your kids can test whether their school bags fit. The whole evaluation happens in a relaxed, familiar setting.</p>
<p>This is not a minor advantage. The person who spends the most time in the rear seat should have a say in how comfortable it is.</p>`,
        showCTA: true,
      },
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return ARTICLES.find(a => a.slug === slug);
}

export function getRelatedArticles(slugs: string[]): Article[] {
  return slugs.map(s => ARTICLES.find(a => a.slug === s)).filter(Boolean) as Article[];
}
