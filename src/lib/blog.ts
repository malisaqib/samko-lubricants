// Blog data management - In a real app, this would be a database
// For now, we use a JSON file-based approach that can be easily migrated

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  publishedAt: string;
  updatedAt: string;
  readTime: string;
  image: string;
  featured: boolean;
  published: boolean;
  tags: string[];
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
}

// Default categories
export const defaultCategories: BlogCategory[] = [
  { id: "1", name: "Industry Trends", slug: "industry-trends", description: "Pakistan oil market updates and price analysis" },
  { id: "2", name: "Technical Guide", slug: "technical-guide", description: "Technical guides for vehicles and machinery" },
  { id: "3", name: "Maintenance", slug: "maintenance", description: "Practical maintenance tips for Pakistani conditions" },
  { id: "4", name: "Company News", slug: "company-news", description: "SAMKO company updates and announcements" },
];

// Default blog posts
export const defaultPosts: BlogPost[] = [
  {
    id: "1",
    title: "Petrol Prices in Pakistan: What Fleet Owners Should Know in 2025",
    slug: "petrol-prices-pakistan-fleet-owners-2025",
    excerpt: "Understanding how OGRA price changes affect your transport business and practical tips to reduce fuel costs for Pakistani fleet operators.",
    content: `<p>Every fortnight when OGRA announces new fuel prices, transport company owners across Pakistan hold their breath. Whether you're running a fleet of trucks on the GT Road or managing buses between Lahore and Karachi, fuel costs can make or break your business.</p>

<h2>The Current Reality</h2>
<p>Let's be honest - diesel prices have been unpredictable lately. One week you're calculating routes based on Rs. 280/litre, next week it's Rs. 295. For someone running 20 trucks between Karachi Port and Faisalabad's textile factories, even a Rs. 10 difference means lakhs of rupees monthly.</p>

<h2>What Smart Fleet Owners Are Doing</h2>
<p>I recently visited a transport company in Sargodha that's been in business for 30 years. Haji Munir Sahab shared some practical wisdom:</p>
<ul>
<li><strong>Regular oil changes</strong> - Using quality engine oil (not that cheap stuff from Lahore black market) actually improves mileage by 3-5%</li>
<li><strong>Proper tyre pressure</strong> - Under-inflated tyres burn more fuel. Simple physics.</li>
<li><strong>Driver training</strong> - Aggressive driving wastes diesel. Pay drivers based on efficiency, not just trips.</li>
</ul>

<h2>The Lubricant Factor Most Ignore</h2>
<p>Here's something most fleet owners don't calculate - using proper gear oil and engine oil can save you 2-4% on fuel consumption. When you're burning 50,000 litres of diesel monthly, that's 1,000-2,000 litres saved. Do the math at current prices.</p>

<p>At SAMKO, we've helped dozens of transport companies in Punjab optimize their lubrication. It's not marketing talk - we have the fuel consumption records to prove it.</p>

<h2>Looking Ahead</h2>
<p>With IMF conditions and global crude prices, expect more fluctuations. The companies that survive will be those who control every aspect of their costs - including choosing quality lubricants over cheap alternatives that damage engines.</p>

<p>Got questions about fleet lubrication? Visit our Sargodha office or call us. Real advice, no sales pressure.</p>`,
    category: "Industry Trends",
    author: "Usman Khalid",
    authorRole: "Sales Manager - Fleet Division",
    publishedAt: "2025-01-15T08:00:00Z",
    updatedAt: "2025-01-15T08:00:00Z",
    readTime: "6 min read",
    image: "/blog1.jpg",
    featured: true,
    published: true,
    tags: ["petrol-prices", "fleet", "pakistan", "transport"],
  },
  {
    id: "2",
    title: "Garmi Mein Gaari Ki Care: Summer Vehicle Maintenance for Pakistan",
    slug: "summer-vehicle-maintenance-pakistan",
    excerpt: "Practical summer car care tips for Pakistani weather. From coolant checks to engine oil grades - what your local mechanic might not tell you.",
    content: `<p>June in Multan. The sun is ruthless. Your car's temperature gauge is creeping up. Every Pakistani driver knows this feeling. Let's talk about what actually works to keep your vehicle running in our extreme summers.</p>

<h2>The Coolant Reality Check</h2>
<p>I see this mistake daily - people just adding plain water to their radiators. Yaar, our tap water in most Pakistani cities has minerals that cause deposits. Use proper coolant mixed 50:50 with distilled water. It costs a bit more but saves your radiator from damage.</p>

<h2>Engine Oil in 45°C Heat</h2>
<p>Here's the technical bit most local mechanics skip: when it's 45 degrees outside, your engine runs even hotter. That 5W-30 oil that works in Murree won't perform the same in Sukkur.</p>
<p>For most Pakistani summers, a 10W-40 or 15W-40 grade works better. But don't just take anyone's word - check your car's manual. A 2015 Corolla has different needs than a 2000 Mehran.</p>

<h2>Signs Your Oil Is Suffering</h2>
<ul>
<li>Engine sounds rougher than usual</li>
<li>That warning light comes on briefly then goes off</li>
<li>Oil level drops faster than normal</li>
<li>Oil looks milky (moisture contamination) or too black too quickly</li>
</ul>

<h2>The AC vs Fuel Debate</h2>
<p>People always ask - AC on or windows down? Simple answer: At city speeds under 60 km/h, windows down saves fuel. On motorway, AC is more efficient. The drag from open windows at 120 km/h uses more fuel than AC.</p>

<h2>Before That Long Eid Trip</h2>
<p>Planning to drive from Karachi to your village in Punjab? Check these before you leave:</p>
<ol>
<li>All fluid levels (oil, coolant, brake fluid)</li>
<li>Tyre pressure (including spare!)</li>
<li>AC filter (dust clogs them quickly here)</li>
<li>Battery terminals for corrosion</li>
</ol>

<p>Stay safe on the roads. And if you need lubricants before your trip, our Sargodha showroom stays open till 9 PM on weekends during summer.</p>`,
    category: "Maintenance",
    author: "Fahad Rasheed",
    authorRole: "Technical Advisor",
    publishedAt: "2025-01-10T08:00:00Z",
    updatedAt: "2025-01-10T08:00:00Z",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800",
    featured: true,
    published: true,
    tags: ["summer", "maintenance", "car-care", "pakistan"],
  },
  {
    id: "3",
    title: "Generator Oil: The Loadshedding Season Essential Guide",
    slug: "generator-oil-loadshedding-pakistan-guide",
    excerpt: "When bijli goes, your generator kicks in. But is your genset running on the right oil? Common mistakes Pakistani households and businesses make.",
    content: `<p>Load shedding is a Pakistani reality. Whether you're a textile mill in Faisalabad or a home in DHA Lahore, your generator is your lifeline. But here's what I've noticed visiting customers across Punjab - almost nobody maintains their generators properly until they break down.</p>

<h2>Why Generator Oil Is Different</h2>
<p>Your generator engine isn't like your car engine. It runs at constant high RPM, often for hours at a stretch. It needs oil that can handle:</p>
<ul>
<li>Sustained high temperatures</li>
<li>Heavy load conditions</li>
<li>Extended running periods</li>
</ul>

<h2>The "Use Bike Oil" Myth</h2>
<p>I've seen people pour motorcycle oil into their generators because "tel tel hota hai" (oil is oil). Please don't. Motorcycle oils have friction modifiers for wet clutches that generators don't need. Use proper 15W-40 diesel engine oil for diesel generators.</p>

<h2>Change Intervals Most People Ignore</h2>
<p>Your generator might run 6-8 hours daily during summer load shedding. That's like driving 500km every day. Would you wait 5000km for an oil change? Same logic applies:</p>
<ul>
<li><strong>Heavy use (6+ hours daily):</strong> Change every 100 running hours</li>
<li><strong>Moderate use (2-4 hours daily):</strong> Change every 150 hours</li>
<li><strong>Light use:</strong> At least once every 6 months, regardless of hours</li>
</ul>

<h2>Quick Maintenance Checklist</h2>
<ol>
<li>Check oil level BEFORE every use (cold engine)</li>
<li>Let generator cool 10 minutes before checking</li>
<li>Look for oil color - should be amber, not black</li>
<li>Clean air filter weekly during dusty season</li>
<li>Check coolant in water-cooled generators</li>
</ol>

<h2>A Word on Fake Oils</h2>
<p>The market is flooded with duplicate lubricants. A customer in Gujranwala recently showed me "branded" oil he bought cheap from a roadside shop. The viscosity was completely wrong - tested it ourselves. His generator seized within a month.</p>

<p>Buy from authorized dealers only. The few hundred rupees you save isn't worth a burnt generator worth lakhs.</p>

<p>Need genuine generator oil? SAMKO supplies to factories, hospitals, and housing societies across Pakistan. Bulk rates available for commercial customers.</p>`,
    category: "Technical Guide",
    author: "Rizwan Ahmed",
    authorRole: "Industrial Sales Head",
    publishedAt: "2025-01-05T08:00:00Z",
    updatedAt: "2025-01-05T08:00:00Z",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800",
    featured: false,
    published: true,
    tags: ["generator", "loadshedding", "maintenance", "industrial"],
  },
  {
    id: "4",
    title: "Tractor Engine Oil Guide: What Punjab Farmers Need to Know",
    slug: "tractor-engine-oil-punjab-farmers",
    excerpt: "From wheat harvesting to tube well operation - choosing the right oil for Pakistani tractors. Massey Ferguson, Fiat, and local assemblers covered.",
    content: `<p>Last month I visited a farmer near Okara. His Massey 240 had been running since 1992 - still going strong. Secret? He's religious about oil changes. "Beta, ye tractor meri rozi hai," he told me. That's the attitude every farmer should have.</p>

<h2>Pakistani Tractor Realities</h2>
<p>Our tractors work hard. Ploughing fields, pulling trolleys on village roads, running tube wells for hours. They're not pampered like city cars. But that doesn't mean you use any oil and pray.</p>

<h2>Which Oil for Which Tractor?</h2>
<p><strong>For Massey Ferguson (240, 260, 385):</strong></p>
<ul>
<li>Engine: SAE 15W-40 or 20W-50 depending on season</li>
<li>Transmission: Utto or universal tractor transmission oil</li>
<li>Hydraulic: Utto for combined systems, or separate hydraulic oil</li>
</ul>

<p><strong>For New Holland/Fiat 480, 640:</strong></p>
<ul>
<li>Similar grades work, but always check manual</li>
<li>Older Fiats may need slightly thicker oil</li>
</ul>

<h2>Seasonal Considerations</h2>
<p>Punjab summer at 45°C is different from Bahawalpur winter at 5°C. In peak summer, 20W-50 gives better protection. In winter, 15W-40 flows better at startup.</p>

<h2>The Tube Well Problem</h2>
<p>Tractors running tube wells face special challenges:</p>
<ul>
<li>Constant high RPM for hours</li>
<li>Dust and sand contamination</li>
<li>Limited cooling due to stationary operation</li>
</ul>
<p>Change oil more frequently - every 150-200 hours instead of standard 250-300.</p>

<h2>Buying Tips for Farmers</h2>
<ul>
<li>Buy from established dealers, not random shops</li>
<li>Check packaging seals - duplicates are common</li>
<li>SAMKO offers direct supply to villages - call for delivery</li>
<li>Bulk purchase with neighbors to save on transport</li>
</ul>

<p>We understand farming economics. That's why SAMKO prices are kept reasonable without compromising quality. Your tractor should last another 30 years if maintained properly.</p>`,
    category: "Technical Guide",
    author: "Majid Hussain",
    authorRole: "Agricultural Division Manager",
    publishedAt: "2024-12-28T08:00:00Z",
    updatedAt: "2024-12-28T08:00:00Z",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=800",
    featured: false,
    published: true,
    tags: ["tractor", "farming", "punjab", "agriculture"],
  },
  {
    id: "5",
    title: "Why Your Bike Mechanic Might Be Using Wrong Oil",
    slug: "motorcycle-oil-pakistan-guide",
    excerpt: "That Rs. 200 oil change at your local workshop could be destroying your motorcycle engine. Here's what every Honda, Yamaha, and CD70 owner should know.",
    content: `<p>Pakistan runs on motorcycles. From the CD70 carrying a family of four to the Yamaha YBR delivering food orders, bikes are everywhere. But the oil going into these engines? That's where problems start.</p>

<h2>The Roadside Workshop Reality</h2>
<p>I've surveyed motorcycle mechanics from Peshawar to Karachi. Most use whatever oil is cheapest. Some refill branded bottles with bulk low-grade oil. Your bike deserves better.</p>

<h2>Understanding Motorcycle Oil Grades</h2>
<p>For Pakistani conditions:</p>
<ul>
<li><strong>CD70, CG125 (air-cooled):</strong> 20W-50 works well year-round</li>
<li><strong>Yamaha YBR, Honda CB series:</strong> 10W-40 or 15W-50 semi-synthetic</li>
<li><strong>Sports bikes, heavy bikes:</strong> 10W-40 or 10W-50 full synthetic</li>
</ul>

<h2>Why Motorcycle Oil Is Special</h2>
<p>Unlike car engines, most motorcycle engines share oil between engine, gearbox, and clutch. Using car oil can cause:</p>
<ul>
<li>Clutch slipping (smooth car oil additives)</li>
<li>Gear shifting problems</li>
<li>Faster wear</li>
</ul>
<p>Always use oil marked "for motorcycles" or "JASO MA" certified.</p>

<h2>Change Interval Guide</h2>
<ul>
<li><strong>City commuting:</strong> Every 1500-2000 km</li>
<li><strong>Highway riding:</strong> Every 2000-2500 km</li>
<li><strong>Delivery/commercial use:</strong> Every 1000-1500 km</li>
</ul>

<h2>Signs Your Oil Is Finished</h2>
<ol>
<li>Engine sounds "thirsty" or louder</li>
<li>Gear changes feel rough</li>
<li>Oil level drops noticeably between changes</li>
<li>Reduced pickup, especially uphill</li>
</ol>

<h2>How to Protect Yourself</h2>
<ul>
<li>Buy your own oil and take it to the mechanic</li>
<li>Watch while oil is being changed</li>
<li>Ask for the empty bottle back</li>
<li>Note down odometer reading at each change</li>
</ul>

<p>SAMKO sells genuine motorcycle oil in consumer-friendly 1-litre packs. Available at our dealers across Punjab. Your bike will thank you.</p>`,
    category: "Maintenance",
    author: "Ali Hassan",
    authorRole: "Retail Sales Coordinator",
    publishedAt: "2024-12-20T08:00:00Z",
    updatedAt: "2024-12-20T08:00:00Z",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800",
    featured: false,
    published: true,
    tags: ["motorcycle", "bike", "oil-change", "maintenance"],
  },
  {
    id: "6",
    title: "SAMKO Opens New Distribution Center in Faisalabad",
    slug: "samko-faisalabad-distribution-center",
    excerpt: "Expanding our reach to serve Pakistan's textile capital better. Same day delivery now available for Faisalabad industrial area.",
    content: `<p>Alhamdulillah, we are pleased to announce the opening of our new distribution center in Faisalabad, strategically located in the Jhang Road industrial area.</p>

<h2>Why Faisalabad?</h2>
<p>Faisalabad is Pakistan's textile hub. Thousands of looms, spinning units, and processing factories operate 24/7. These machines need quality lubricants - and they need them fast. Downtime means lost production worth lakhs per hour.</p>

<h2>What This Means for Our Customers</h2>
<ul>
<li><strong>Same-day delivery</strong> within Faisalabad industrial zones</li>
<li><strong>Emergency stock</strong> available for critical requirements</li>
<li><strong>Technical support team</strong> based locally</li>
<li><strong>Bulk storage</strong> for major industrial accounts</li>
</ul>

<h2>Products Available</h2>
<p>The new center stocks our complete industrial range:</p>
<ul>
<li>Textile machine oils (spindle oils, loom oils)</li>
<li>Hydraulic oils (32, 46, 68 grades)</li>
<li>Gear oils for heavy machinery</li>
<li>Compressor oils</li>
<li>Coolants and cutting fluids</li>
</ul>

<h2>Location & Contact</h2>
<p><strong>Address:</strong> Plot 47, Block C, Jhang Road Industrial Area, Faisalabad</p>
<p><strong>Hours:</strong> 9 AM - 8 PM (Monday-Saturday)</p>
<p><strong>Contact:</strong> 041-XXXXXXX</p>

<h2>Special Launch Offer</h2>
<p>For the first month, all new industrial accounts get:</p>
<ul>
<li>Free oil analysis for first 3 samples</li>
<li>5% additional discount on bulk orders</li>
<li>Free technical consultation for machine lubrication</li>
</ul>

<p>This expansion is part of SAMKO's commitment to serving Pakistani industry. From our roots in Sargodha, we're growing to meet the needs of manufacturers across Punjab.</p>

<p>Visit us at the new center or call our Faisalabad team to set up your industrial account.</p>`,
    category: "Company News",
    author: "Tariq Mahmood",
    authorRole: "Director Operations",
    publishedAt: "2024-12-15T08:00:00Z",
    updatedAt: "2024-12-15T08:00:00Z",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?q=80&w=800",
    featured: false,
    published: true,
    tags: ["company", "expansion", "faisalabad", "industrial"],
  },
];

// Helper function to generate slug from title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

// Helper function to calculate read time
export function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const text = content.replace(/<[^>]*>/g, "");
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

// Helper function to generate unique ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
