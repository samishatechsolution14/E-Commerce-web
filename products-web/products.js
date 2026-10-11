export const categories = ['All', 'Mobiles', 'Electronics', 'Food', 'Fashion', 'Beauty', 'Home', 'Others'];

const seed = [
    { id: 'p1', title: 'Classic Cheeseburger Combo', brand: 'Burger House', category: 'Food', price: 249, oldPrice: 329, rating: 4.5, reviews: 1280, emoji: '🍔', description: 'Juicy grilled patty, fresh lettuce, tomato, cheese and crispy fries. Prepared fresh to order.', specs: { 'Type': 'Combo meal', 'Serving': '1 person', 'Diet': 'Contains dairy and gluten', 'Delivery': 'Usually 25–40 min' } },
    { id: 'p2', title: 'Pepperoni Pizza', brand: 'Oven Stories', category: 'Food', price: 399, oldPrice: 499, rating: 4.4, reviews: 842, emoji: '🍕', description: 'Stone-baked pizza with mozzarella, pepperoni and a rich tomato sauce.', specs: { 'Size': 'Medium, 8 slices', 'Crust': 'Classic hand-tossed', 'Diet': 'Contains dairy and gluten' } },
    { id: 'p3', title: 'Hydrating Face Moisturizer', brand: 'GlowLab', category: 'Beauty', price: 499, oldPrice: 699, rating: 4.6, reviews: 2350, emoji: '🧴', description: 'Lightweight daily moisturizer designed to leave skin feeling soft and hydrated.', specs: { 'Volume': '100 ml', 'Skin type': 'Normal to dry', 'Usage': 'AM / PM', 'Country of origin': 'India' } },
    { id: 'p4', title: 'Matte Lipstick Set', brand: 'ColorPop', category: 'Beauty', price: 799, oldPrice: 999, rating: 4.2, reviews: 619, emoji: '💄', description: 'A set of versatile matte shades for everyday wear and special occasions.', specs: { 'Pieces': '4', 'Finish': 'Matte', 'Form': 'Cream' } },
    { id: 'p5', title: 'Wireless Noise-Cancelling Headphones', brand: 'SoundPeak', category: 'Electronics', price: 2499, oldPrice: 3499, rating: 4.7, reviews: 4321, emoji: '🎧', description: 'Comfortable over-ear headphones with rich sound, wireless connectivity and active noise reduction.', specs: { 'Connectivity': 'Bluetooth 5.x', 'Battery': 'Up to 30 hours (claimed)', 'Charging': 'USB-C', 'Warranty': '1 year (check seller terms)' } },
    { id: 'p6', title: 'Smartphone 128 GB', brand: 'Nova Mobile', category: 'Mobiles', price: 18999, oldPrice: 21999, rating: 4.3, reviews: 1850, emoji: '📱', description: 'A daily-use smartphone with a vivid display, multi-camera system and all-day battery target.', specs: { 'Storage': '128 GB', 'Display': '6.5 inch (example)', 'Connectivity': '4G/5G varies by model', 'Warranty': 'Manufacturer terms apply' } },
    { id: 'p7', title: 'Everyday Running Shoes', brand: 'Stride', category: 'Fashion', price: 1599, oldPrice: 2299, rating: 4.1, reviews: 905, emoji: '👟', description: 'Lightweight everyday trainers with a cushioned sole for walking and casual workouts.', specs: { 'Upper': 'Mesh textile', 'Closure': 'Lace-up', 'Care': 'Wipe clean' } },
    { id: 'p8', title: 'Insulated Travel Bottle', brand: 'Terra', category: 'Home', price: 699, oldPrice: 899, rating: 4.5, reviews: 742, emoji: '🧃', description: 'Reusable bottle for commuting, travel and everyday hydration.', specs: { 'Capacity': '750 ml', 'Material': 'Stainless steel', 'Care': 'Hand wash recommended' } },
];

function buildCatalog() {
    function rng(s) { return function () { s |= 0; s = (s + 0x6D2B79F5) | 0; let t = Math.imul(s ^ (s >>> 15), 1 | s); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
    const rand = rng(20261011);
    const pick = (a) => a[Math.floor(rand() * a.length)];
    const sample = (a, n) => { const c = [...a], o = []; while (o.length < n && c.length) o.push(c.splice(Math.floor(rand() * c.length), 1)[0]); return o; };
    const tidy = (p) => p < 100 ? Math.max(9, Math.round(p / 5) * 5 - 1) : p < 1000 ? Math.round(p / 10) * 10 - 1 : p < 10000 ? Math.round(p / 50) * 50 - 1 : Math.round(p / 500) * 500 - 1;

    const out = [];
    let n = 0;
    function add(o) {
        const price = tidy(o.price);
        let old = tidy(price * (1.08 + rand() * 0.35));
        if (old <= price) old = tidy(price * 1.2) + 1;
        out.push({
            id: 'g' + (++n), title: o.title, brand: o.brand, category: o.category,
            price, oldPrice: old, rating: +(3.6 + rand() * 1.3).toFixed(1),
            reviews: Math.floor(20 + rand() * rand() * 9000),
            emoji: o.emoji, description: o.description, specs: o.specs,
        });
    }

    function fromTypes(category, brands, types, opts = {}) {
        const series = ['Lite', 'Pro', 'Plus', 'Air', 'Max', 'One', 'Neo', 'S', 'X', 'Prime'];
        for (const [name, emoji, lo, hi, desc, specs, variants, vk] of types) {
            for (const brand of brands) {
                const base = lo + (hi - lo) * Math.pow(rand(), 1.4);
                const chosen = sample(variants, Math.min(variants.length, opts.perVariant || 2));
                for (const [label, mult] of chosen) {
                    const spec = { Brand: brand };
                    for (const k in specs) spec[k] = pick(specs[k]);
                    if (vk && label) spec[vk] = label;
                    const model = opts.model ? ' ' + pick(series) : '';
                    add({
                        title: `${brand}${model} ${name}${label ? ' (' + label + ')' : ''}`,
                        brand, category, emoji, price: base * mult, description: desc, specs: spec,
                    });
                }
            }
        }
    }

    const COLORS = [['Black', 1], ['White', 1], ['Blue', 1], ['Grey', 1], ['Green', 1], ['Red', 1]];
    const SIZES_CLOTH = [['S', 1], ['M', 1], ['L', 1], ['XL', 1.03], ['XXL', 1.06]];

    const phones = `
Apple|iPhone 17 Pro Max|149900|12/256,12/512,12/1024|5G
Apple|iPhone 17 Pro|134900|12/256,12/512,12/1024|5G
Apple|iPhone Air|119900|12/256,12/512,12/1024|5G
Apple|iPhone 17|82900|8/256,8/512|5G
Apple|iPhone 16e|59900|8/128,8/256,8/512|5G
Apple|iPhone 16 Plus|89900|8/128,8/256,8/512|5G
Apple|iPhone 16|79900|8/128,8/256,8/512|5G
Apple|iPhone 15|69900|6/128,6/256,6/512|5G
Apple|iPhone 14|59900|6/128,6/256,6/512|5G
Apple|iPhone 13|49900|4/128,4/256,4/512|5G
Apple|iPhone SE (3rd gen)|43900|4/64,4/128,4/256|5G
Samsung|Galaxy S25 Ultra|129999|12/256,12/512,12/1024|5G
Samsung|Galaxy S25+|99999|12/256,12/512|5G
Samsung|Galaxy S25|80999|12/128,12/256,12/512|5G
Samsung|Galaxy S25 Edge|109999|12/256,12/512|5G
Samsung|Galaxy S25 FE|59999|8/128,8/256|5G
Samsung|Galaxy S24 Ultra|109999|12/256,12/512,12/1024|5G
Samsung|Galaxy S24 FE|54999|8/128,8/256|5G
Samsung|Galaxy Z Fold7|174999|12/256,12/512,16/1024|5G
Samsung|Galaxy Z Flip7|109999|12/256,12/512|5G
Samsung|Galaxy Z Flip7 FE|89999|8/128,8/256|5G
Samsung|Galaxy A56 5G|41999|8/128,8/256|5G
Samsung|Galaxy A36 5G|33999|8/128,8/256|5G
Samsung|Galaxy A26 5G|24999|8/128,8/256|5G
Samsung|Galaxy A17 5G|18999|6/128,8/256|5G
Samsung|Galaxy A07|8999|4/64,4/128,6/128|4G
Samsung|Galaxy M36 5G|22999|6/128,8/128,8/256|5G
Samsung|Galaxy M16 5G|12999|4/128,6/128,8/128|5G
Samsung|Galaxy M06 5G|9999|4/128,6/128|5G
Samsung|Galaxy F36 5G|17999|6/128,8/128,8/256|5G
Samsung|Galaxy F16 5G|13999|4/128,6/128|5G
Xiaomi|Xiaomi 15 Ultra|109999|16/512,16/1024|5G
Xiaomi|Xiaomi 15|64999|12/256,12/512|5G
Xiaomi|Xiaomi 14T Pro|44999|12/256,12/512|5G
Xiaomi|Xiaomi 14T|32999|8/256,12/256|5G
Redmi|Redmi Note 14 Pro+ 5G|29999|8/128,8/256,12/512|5G
Redmi|Redmi Note 14 Pro 5G|24999|8/128,8/256,12/256|5G
Redmi|Redmi Note 14 5G|17999|6/128,8/128,8/256|5G
Redmi|Redmi Note 13 Pro+ 5G|31999|8/256,12/256,12/512|5G
Redmi|Redmi 14C 5G|10999|4/128,6/128,8/128|5G
Redmi|Redmi 13 5G|13999|6/128,8/128,8/256|5G
Redmi|Redmi A4 5G|8499|4/64,4/128|5G
POCO|POCO F7|31999|12/256,12/512|5G
POCO|POCO F6|29999|8/256,12/512|5G
POCO|POCO X7 Pro 5G|27999|8/256,12/256,12/512|5G
POCO|POCO X7 5G|21999|8/256,12/256|5G
POCO|POCO M7 Pro 5G|14999|6/128,8/128,8/256|5G
POCO|POCO M7 Plus 5G|12999|6/128,8/128|5G
POCO|POCO C75 5G|7999|4/64,4/128,6/128|5G
Realme|Realme GT 7 Pro|59999|12/256,16/512|5G
Realme|Realme GT 7|39999|8/256,12/256,16/512|5G
Realme|Realme 15 Pro 5G|31999|8/128,8/256,12/256|5G
Realme|Realme 15 5G|25999|8/128,8/256,12/256|5G
Realme|Realme 14 Pro+ 5G|29999|8/128,8/256,12/256|5G
Realme|Realme 14 Pro 5G|24999|8/128,8/256|5G
Realme|Realme 14x 5G|14999|6/128,8/128,8/256|5G
Realme|Realme Narzo 80 Pro 5G|19999|8/128,8/256,12/256|5G
Realme|Realme Narzo 80x 5G|13999|6/128,8/128|5G
Realme|Realme P3 Pro 5G|23999|8/128,8/256,12/256|5G
Realme|Realme P3 5G|17999|6/128,8/128,8/256|5G
Realme|Realme C71|6999|4/64,4/128|4G
OnePlus|OnePlus 15|72999|12/256,16/512|5G
OnePlus|OnePlus 13|69999|12/256,16/512,24/1024|5G
OnePlus|OnePlus 13s|54999|12/256,12/512|5G
OnePlus|OnePlus 13R|42999|12/256,16/512|5G
OnePlus|OnePlus 12|64999|12/256,16/512|5G
OnePlus|OnePlus Nord 5|31999|8/256,12/256,12/512|5G
OnePlus|OnePlus Nord 4|29999|8/128,8/256,12/256|5G
OnePlus|OnePlus Nord CE5|24999|8/128,8/256|5G
OnePlus|OnePlus Nord CE4 Lite 5G|16999|8/128,8/256|5G
Vivo|Vivo X Fold5|149999|16/512|5G
Vivo|Vivo X200 Pro|94999|16/512|5G
Vivo|Vivo X200|65999|12/256,16/512|5G
Vivo|Vivo X200 FE|54999|12/256,16/512|5G
Vivo|Vivo V60 5G|36999|8/128,8/256,12/256|5G
Vivo|Vivo V50 5G|34999|8/128,8/256,12/512|5G
Vivo|Vivo V40 Pro|49999|8/256,12/512|5G
Vivo|Vivo V40|34999|8/128,8/256,12/512|5G
Vivo|Vivo T4 Ultra|37999|8/256,12/256,12/512|5G
Vivo|Vivo T4 5G|21999|8/128,8/256|5G
Vivo|Vivo T4x 5G|13999|6/128,8/128,8/256|5G
Vivo|Vivo Y400 Pro|24999|8/128,8/256|5G
Vivo|Vivo Y29 5G|13999|4/128,6/128,8/128|5G
Vivo|Vivo Y19 5G|10999|4/64,4/128,6/128|5G
Oppo|Oppo Find N5|149999|16/512|5G
Oppo|Oppo Find X8 Pro|99999|16/512|5G
Oppo|Oppo Find X8|69999|12/256,16/512|5G
Oppo|Oppo Reno14 Pro 5G|49999|12/256,12/512|5G
Oppo|Oppo Reno14 5G|37999|8/256,12/256,12/512|5G
Oppo|Oppo Reno13 Pro 5G|44999|12/256,12/512|5G
Oppo|Oppo Reno13 5G|37999|8/256,12/256|5G
Oppo|Oppo F29 Pro 5G|27999|8/128,8/256,12/256|5G
Oppo|Oppo F29 5G|23999|8/128,8/256|5G
Oppo|Oppo K13 5G|17999|8/128,8/256|5G
Oppo|Oppo A5 Pro 5G|17999|6/128,8/128,8/256|5G
Oppo|Oppo A5x 5G|12999|4/128,6/128|5G
Google|Pixel 10 Pro XL|124999|16/256,16/512,16/1024|5G
Google|Pixel 10 Pro|109999|16/256,16/512,16/1024|5G
Google|Pixel 10|79999|12/256,12/512|5G
Google|Pixel 9 Pro Fold|172999|16/256,16/512|5G
Google|Pixel 9a|49999|8/128,8/256|5G
Google|Pixel 8a|52999|8/128,8/256|5G
Motorola|Razr 60 Ultra|99999|16/512|5G
Motorola|Razr 60|49999|8/256|5G
Motorola|Edge 60 Pro|29999|8/256,12/256,12/512|5G
Motorola|Edge 60 Fusion|22999|8/256,12/256|5G
Motorola|Edge 60 Stylus|22999|8/256|5G
Motorola|Moto G96 5G|17999|8/128,8/256|5G
Motorola|Moto G86 Power 5G|17999|8/128,8/256|5G
Motorola|Moto G85 5G|17999|8/128,8/256|5G
Motorola|Moto G45 5G|10999|4/128,8/128|5G
Motorola|Moto G05|6999|4/64,4/128|4G
Nothing|Nothing Phone (3)|79999|12/256,16/512|5G
Nothing|Nothing Phone (3a) Pro|29999|8/128,8/256,12/256|5G
Nothing|Nothing Phone (3a)|24999|8/128,8/256,12/256|5G
Nothing|Nothing Phone (2a)|23999|8/128,8/256,12/256|5G
Nothing|CMF Phone 2 Pro|18999|8/128,8/256|5G
Nothing|CMF Phone 1|15999|6/128,8/128,8/256|5G
iQOO|iQOO 13|54999|12/256,16/512|5G
iQOO|iQOO 12|52999|12/256,16/512|5G
iQOO|iQOO Neo 10|33999|8/128,8/256,12/256|5G
iQOO|iQOO Neo 10R|26999|8/128,8/256,12/256|5G
iQOO|iQOO Z10|21999|8/128,8/256|5G
iQOO|iQOO Z10R 5G|19499|8/128,8/256|5G
iQOO|iQOO Z10x|13499|6/128,8/128,8/256|5G
Tecno|Tecno Pova 7 5G|14999|8/128,8/256|5G
Tecno|Tecno Pova 6 Pro 5G|21999|8/128,8/256,12/256|5G
Infinix|Infinix GT 30 Pro 5G|24999|8/256,12/256|5G
Infinix|Infinix Zero 40 5G|24999|8/256,12/256|5G
Infinix|Infinix Note 50x 5G|11499|6/128,8/128,8/256|5G
Infinix|Infinix Hot 60 5G+|11999|4/128,6/128,8/128|5G
Lava|Lava Agni 3 5G|20999|8/128,8/256|5G
Lava|Lava Blaze AMOLED 2 5G|14999|6/128,8/128|5G
Lava|Lava Storm 5G|12999|6/128,8/128|5G
Lava|Lava Yuva Star 2|6999|4/64,4/128|4G
Lava|Lava Bold N1|5999|3/64,4/64|4G
Sony|Sony Xperia 1 VII|139999|12/256,12/512|5G
Sony|Sony Xperia 10 VII|49999|8/128,8/256|5G
Asus|Asus ROG Phone 9 Pro|99999|16/512,24/1024|5G
Asus|Asus Zenfone 12 Ultra|69999|12/256,16/512|5G
Nokia|Nokia 110 4G|2299|—|4G
Nokia|Nokia 105 (2024)|1299|—|2G
Nokia|Nokia 130 Music|1999|—|2G
Itel|Itel Super Guru 4G|1399|—|4G
Jio|JioBharat J1 4G|1799|—|4G`.trim().split('\n');

    const PHONE_COLORS = ['Midnight Black', 'Ocean Blue', 'Silver', 'Titanium Grey', 'Mint Green', 'Lavender', 'Pearl White', 'Desert Gold', 'Crimson Red'];
    const STEP = [1, 1.12, 1.28, 1.5];
    for (const line of phones) {
        const [brand, model, base, vars, net] = line.split('|');
        const variants = vars === '—' ? [null] : vars.split(',');
        variants.forEach((v, i) => {
            for (const color of sample(PHONE_COLORS, vars === '—' ? 1 : 2)) {
                const spec = { Brand: brand, Model: model, Network: net };
                if (v) { const [ram, sto] = v.split('/'); spec['RAM'] = ram + ' GB'; spec['Storage'] = (sto === '1024' ? '1 TB' : sto + ' GB'); }
                spec['Colour'] = color;
                spec['Warranty'] = 'Manufacturer terms apply';
                add({
                    title: `${model}${v ? ' (' + v.split('/')[0] + 'GB/' + (v.split('/')[1] === '1024' ? '1TB' : v.split('/')[1] + 'GB') + ')' : ''} – ${color}`,
                    brand, category: 'Mobiles', emoji: '📱', price: +base * STEP[i],
                    description: `${model} from ${brand}. ${net === '5G' ? '5G-ready smartphone.' : net === '4G' ? '4G smartphone.' : 'Basic feature phone for calls and everyday use.'} Check the brand site for full specifications.`,
                    specs: spec,
                });
            }
        });
    }

    const EBR = ['SoundPeak', 'VoltEdge', 'NovaTech', 'ZenWave', 'PixelCraft', 'ByteCore', 'Aurion', 'Lumio', 'TechNest', 'Orbit One'];
    const conn = ['Bluetooth 5.3', 'Bluetooth 5.4'];
    fromTypes('Electronics', EBR, [
        ['Wireless Earbuds', '🎧', 799, 9999, 'True wireless earbuds with a compact charging case and clear calling.', { Connectivity: conn, Battery: ['Up to 24 h (claimed)', 'Up to 30 h (claimed)', 'Up to 40 h (claimed)'], ANC: ['Yes', 'No'], Charging: ['USB-C'] }, COLORS, 'Colour'],
        ['Over-ear Headphones', '🎧', 1299, 19999, 'Comfortable over-ear headphones with rich sound.', { Connectivity: conn, Battery: ['Up to 30 h (claimed)', 'Up to 50 h (claimed)'], ANC: ['Yes', 'No'], Charging: ['USB-C'] }, COLORS, 'Colour'],
        ['Neckband Earphones', '🎧', 499, 2499, 'Lightweight wireless neckband with fast charging.', { Connectivity: conn, Battery: ['Up to 30 h (claimed)', 'Up to 40 h (claimed)'], Charging: ['USB-C'] }, COLORS, 'Colour'],
        ['Wired Earphones', '🎧', 199, 1999, 'Wired in-ear earphones with mic and inline remote.', { Connector: ['3.5 mm', 'USB-C'], Mic: ['Yes'] }, COLORS, 'Colour'],
        ['Bluetooth Speaker', '🔊', 799, 14999, 'Portable speaker with punchy bass and splash resistance.', { Connectivity: conn, Playtime: ['Up to 12 h (claimed)', 'Up to 24 h (claimed)'], Rating: ['IPX5', 'IPX7'] }, COLORS, 'Colour'],
        ['Smartwatch', '⌚', 1299, 24999, 'Smartwatch with bright display, health tracking and notifications.', { Display: ['1.69"', '1.85"', '2.01" AMOLED'], Battery: ['Up to 7 days (claimed)', 'Up to 10 days (claimed)'], 'Water rating': ['IP67', '5 ATM'] }, COLORS, 'Strap colour'],
        ['Fitness Band', '⌚', 999, 4999, 'Slim fitness band for steps, sleep and heart-rate tracking.', { Display: ['AMOLED', 'LCD'], Battery: ['Up to 14 days (claimed)'], 'Water rating': ['5 ATM'] }, COLORS, 'Strap colour'],
        ['Laptop', '💻', 29999, 149999, 'Slim laptop for work, study and entertainment.', { RAM: ['8 GB', '16 GB', '32 GB'], Storage: ['256 GB SSD', '512 GB SSD', '1 TB SSD'], Display: ['14"', '15.6"', '16"'], OS: ['Windows 11', 'Windows 11', 'No OS'] }, [['Silver', 1], ['Grey', 1], ['Black', 1.02]], 'Colour'],
        ['Tablet', '📲', 9999, 79999, 'Tablet with a large display for reading, video and note-taking.', { Display: ['10.1"', '11"', '12.4"'], Storage: ['64 GB', '128 GB', '256 GB'], Network: ['Wi-Fi', 'Wi-Fi + 4G'] }, [['Wi-Fi', 1], ['Wi-Fi + 4G', 1.15]], 'Variant'],
        ['Smart TV', '📺', 12999, 129999, '4K smart TV with built-in streaming apps and voice remote.', { Panel: ['LED', 'QLED', 'OLED'], Resolution: ['Full HD', '4K UHD'], 'Operating system': ['Android TV', 'Google TV', 'Linux-based'] }, [['32"', 0.45], ['43"', 0.75], ['50"', 1], ['55"', 1.2], ['65"', 1.7]], 'Screen size'],
        ['Power Bank', '🔋', 599, 3499, 'Portable power bank with multiple ports.', { Ports: ['USB-A + USB-C', '2× USB-A + USB-C'], Charging: ['18 W', '22.5 W', '45 W'] }, [['10000 mAh', 1], ['20000 mAh', 1.6]], 'Capacity'],
        ['Fast Charger', '🔌', 399, 2999, 'Compact wall charger with safe multi-protocol fast charging.', { Ports: ['USB-C', 'USB-C + USB-A'], Protection: ['Over-heat & short-circuit'] }, [['33 W', 1], ['65 W', 1.7], ['100 W', 2.5]], 'Power'],
        ['Mirrorless Camera', '📷', 29999, 149999, 'Interchangeable-lens camera for photos and 4K video.', { Sensor: ['APS-C', 'Full-frame'], Video: ['4K 30p', '4K 60p'] }, [['Body only', 1], ['With kit lens', 1.2]], 'Kit'],
        ['Action Camera', '📷', 7999, 39999, 'Rugged action camera with stabilised video.', { Video: ['4K 30p', '4K 60p', '5.3K'], 'Water rating': ['Waterproof to 10 m'] }, COLORS.slice(0, 2), 'Colour'],
        ['Gaming Console', '🎮', 24999, 54999, 'Home gaming console with controller and HDMI cable.', { Storage: ['512 GB', '825 GB', '1 TB'], Output: ['1080p', '4K'] }, [['Standard', 1], ['Bundle with 2 games', 1.15]], 'Edition'],
        ['Wireless Mouse', '🖱️', 299, 3999, 'Ergonomic wireless mouse with adjustable DPI.', { Connectivity: ['2.4 GHz', 'Bluetooth + 2.4 GHz'], DPI: ['1600', '3200', '8000'] }, COLORS, 'Colour'],
        ['Mechanical Keyboard', '⌨️', 999, 9999, 'Mechanical keyboard with tactile switches and backlight.', { Layout: ['Full-size', 'TKL', '75%'], Switch: ['Blue', 'Red', 'Brown'], Backlight: ['RGB', 'White'] }, [['Wired', 1], ['Wireless', 1.3]], 'Type'],
        ['Monitor', '🖥️', 7999, 59999, 'Monitor with sharp colours and slim bezels.', { Panel: ['IPS', 'VA'], Resolution: ['Full HD', 'QHD', '4K'], 'Refresh rate': ['60 Hz', '75 Hz', '144 Hz'] }, [['24"', 1], ['27"', 1.45], ['32"', 1.9]], 'Size'],
        ['Wi-Fi Router', '📡', 999, 12999, 'Dual-band router for stable home Wi-Fi.', { Standard: ['Wi-Fi 5', 'Wi-Fi 6'], Bands: ['Dual-band'], Ports: ['4× LAN'] }, [['AC1200', 1], ['AX1800', 1.5], ['AX3000', 2.2]], 'Class'],
        ['Webcam', '📹', 999, 7999, 'Webcam with built-in mic for meetings and streaming.', { Resolution: ['1080p', '2K', '4K'], Connection: ['USB-A'] }, [['Standard', 1], ['With ring light', 1.25]], 'Version'],
        ['External SSD', '💾', 3499, 19999, 'Pocket-sized external SSD with fast transfers.', { Interface: ['USB 3.2', 'USB-C'], Speed: ['Up to 500 MB/s (claimed)', 'Up to 1000 MB/s (claimed)'] }, [['512 GB', 1], ['1 TB', 1.7], ['2 TB', 3]], 'Capacity'],
        ['Pen Drive', '💾', 299, 1999, 'Compact USB flash drive.', { Interface: ['USB 3.0', 'USB 3.2', 'USB-A + USB-C'] }, [['64 GB', 1], ['128 GB', 1.5], ['256 GB', 2.4]], 'Capacity'],
        ['Smart Home Camera', '📷', 1499, 5999, 'Indoor Wi-Fi security camera with night vision.', { Resolution: ['1080p', '2K'], Features: ['Motion alerts', 'Two-way audio'] }, [['Single', 1], ['Pack of 2', 1.9]], 'Pack'],
    ], { model: true });

    const REST = ['Burger House', 'Oven Stories', 'Spice Route', 'Tandoor Tales', 'Wrap Station', 'Momo Mania', 'Biryani Bazaar', 'Crispy Hub', 'Taco Town', 'Noodle Nest'];
    const SZ = [['Regular', 1], ['Large', 1.35]];
    const veg = { Diet: ['Vegetarian'] }, nv = { Diet: ['Non-vegetarian'] };
    const F = (name, emoji, lo, hi, desc, diet) => [name, emoji, lo, hi, desc, { ...diet, Serving: ['1 person'], Delivery: ['Usually 25–40 min'] }, SZ, 'Size'];
    fromTypes('Food', REST, [
        F('Cheeseburger Combo', '🍔', 189, 289, 'Grilled patty, cheese, lettuce and fries.', nv),
        F('Chicken Burger', '🍔', 169, 269, 'Crispy chicken fillet in a toasted bun.', nv),
        F('Veg Burger', '🍔', 129, 219, 'Crunchy veg patty with fresh veggies and sauce.', veg),
        F('Double Patty Burger', '🍔', 229, 349, 'Two juicy patties stacked with cheese.', nv),
        F('Pepperoni Pizza', '🍕', 299, 499, 'Mozzarella and pepperoni on a hand-tossed base.', nv),
        F('Margherita Pizza', '🍕', 199, 349, 'Classic tomato, basil and mozzarella.', veg),
        F('Farmhouse Pizza', '🍕', 279, 449, 'Loaded with capsicum, onion, mushroom and corn.', veg),
        F('Paneer Tikka Pizza', '🍕', 299, 469, 'Tandoori paneer and onions on a cheesy base.', veg),
        F('French Fries', '🍟', 79, 169, 'Golden crispy fries, lightly salted.', veg),
        F('Peri Peri Fries', '🍟', 99, 189, 'Fries tossed in spicy peri peri seasoning.', veg),
        F('Chicken Nuggets', '🍗', 129, 249, 'Crisp bite-size chicken nuggets with dip.', nv),
        F('Fried Chicken Bucket', '🍗', 299, 649, 'Crispy fried chicken pieces, bucket pack.', nv),
        F('Chicken Wings', '🍗', 199, 389, 'Saucy chicken wings with a spicy glaze.', nv),
        F('Veg Wrap', '🌯', 119, 219, 'Soft tortilla filled with veggies and sauce.', veg),
        F('Chicken Kathi Roll', '🌯', 149, 249, 'Spiced chicken rolled in flaky paratha.', nv),
        F('Paneer Roll', '🌯', 139, 239, 'Masala paneer rolled in paratha.', veg),
        F('Egg Roll', '🌯', 99, 189, 'Egg-wrapped paratha roll with onions and chutney.', nv),
        F('Club Sandwich', '🥪', 149, 259, 'Triple-layer sandwich with veggies and cheese.', veg),
        F('Grilled Sandwich', '🥪', 99, 189, 'Toasted sandwich with a cheesy filling.', veg),
        F('Hot Dog', '🌭', 109, 199, 'Sausage in a soft bun with mustard and onions.', nv),
        F('Steamed Momos', '🥟', 89, 189, 'Soft steamed dumplings with spicy chutney.', veg),
        F('Fried Momos', '🥟', 99, 199, 'Crispy fried dumplings with dip.', veg),
        F('Tandoori Momos', '🥟', 119, 229, 'Momos grilled with tandoori masala.', nv),
        F('Chicken Biryani', '🍛', 199, 399, 'Fragrant basmati rice layered with spiced chicken.', nv),
        F('Veg Biryani', '🍛', 159, 329, 'Aromatic rice cooked with vegetables and spices.', veg),
        F('Butter Chicken Meal', '🍛', 249, 449, 'Creamy butter chicken with rice and naan.', nv),
        F('Paneer Butter Masala Meal', '🍛', 219, 399, 'Rich paneer gravy with rice and naan.', veg),
        F('Chole Bhature', '🫓', 99, 199, 'Spicy chickpeas with fluffy fried bhature.', veg),
        F('Pav Bhaji', '🥘', 99, 189, 'Buttery mashed vegetable curry with soft pav.', veg),
        F('Vada Pav', '🥔', 29, 79, 'Mumbai-style potato fritter in a pav.', veg),
        F('Samosa (2 pcs)', '🥟', 29, 79, 'Crispy samosas with tangy chutney.', veg),
        F('Hakka Noodles', '🍜', 119, 229, 'Wok-tossed noodles with crunchy veggies.', veg),
        F('Schezwan Noodles', '🍜', 129, 249, 'Spicy schezwan-style noodles.', veg),
        F('Veg Manchurian', '🥡', 129, 239, 'Fried veg balls in a tangy manchurian sauce.', veg),
        F('Chilli Paneer', '🥡', 169, 289, 'Paneer cubes tossed in a spicy chilli sauce.', veg),
        F('White Sauce Pasta', '🍝', 149, 279, 'Penne in a creamy white sauce.', veg),
        F('Red Sauce Pasta', '🍝', 139, 259, 'Penne in a tangy tomato sauce.', veg),
        F('Tacos (2 pcs)', '🌮', 119, 229, 'Crunchy tacos with fresh salsa and cheese.', veg),
        F('Loaded Nachos', '🧀', 129, 249, 'Nachos with cheese sauce, salsa and jalapeños.', veg),
        F('Chocolate Shake', '🥤', 109, 219, 'Thick chocolate milkshake.', veg),
        F('Mango Shake', '🥤', 99, 199, 'Creamy mango milkshake.', veg),
        F('Cold Coffee', '☕', 99, 199, 'Chilled coffee blended with milk and ice.', veg),
        F('Lemon Iced Tea', '🍹', 79, 169, 'Refreshing iced tea with lemon.', veg),
        F('Ice Cream Sundae', '🍨', 99, 219, 'Vanilla ice cream with chocolate sauce and nuts.', veg),
        F('Brownie with Ice Cream', '🍫', 149, 269, 'Warm fudgy brownie with a scoop of ice cream.', veg),
        F('Donut Box (6 pcs)', '🍩', 249, 449, 'Assorted glazed donuts.', veg),
        F('Choco Lava Cake', '🍰', 79, 169, 'Warm cake with a molten chocolate centre.', veg),
        F('Garlic Bread', '🥖', 89, 179, 'Toasted garlic bread with herbs and cheese.', veg),
    ]);

    const FBR = ['Stride', 'UrbanThread', 'Loom & Co', 'Threadly', 'Cotton Crest', 'Nomad Wear', 'Velvet Lane', 'StreetKart'];
    const fb = (name, emoji, lo, hi, desc, specs, variants = COLORS, vk = 'Colour') => [name, emoji, lo, hi, desc, specs, variants, vk];
    fromTypes('Fashion', FBR, [
        fb('Cotton T-Shirt', '👕', 299, 1299, 'Soft everyday cotton tee.', { Fabric: ['100% cotton'], Fit: ['Regular', 'Slim'], Care: ['Machine wash'] }),
        fb('Polo T-Shirt', '👕', 499, 1799, 'Classic polo with ribbed collar.', { Fabric: ['Cotton blend'], Fit: ['Regular', 'Slim'] }),
        fb('Casual Shirt', '👔', 599, 2299, 'Easy casual shirt for everyday wear.', { Fabric: ['Cotton', 'Linen blend'], Fit: ['Regular', 'Slim'] }),
        fb('Formal Shirt', '👔', 699, 2599, 'Crisp formal shirt for office wear.', { Fabric: ['Cotton blend'], Fit: ['Slim', 'Regular'] }),
        fb('Slim Fit Jeans', '👖', 899, 3299, 'Stretch denim in a slim fit.', { Fabric: ['Stretch denim'], Fit: ['Slim'] }, [['Dark Blue', 1], ['Light Blue', 1], ['Black', 1]]),
        fb('Chinos', '👖', 799, 2799, 'Smart-casual cotton chinos.', { Fabric: ['Cotton twill'], Fit: ['Slim', 'Regular'] }),
        fb('Joggers', '👖', 599, 1899, 'Comfortable joggers with elastic cuffs.', { Fabric: ['Cotton fleece'], Fit: ['Relaxed'] }),
        fb('Hoodie', '🧥', 799, 2999, 'Cosy fleece hoodie with front pocket.', { Fabric: ['Cotton fleece'], Fit: ['Regular'] }),
        fb('Jacket', '🧥', 1299, 5999, 'Light jacket for cool weather.', { Fabric: ['Polyester', 'Denim'], Fit: ['Regular'] }),
        fb('Kurta', '👘', 499, 2499, 'Straight-fit kurta for festive and daily wear.', { Fabric: ['Cotton', 'Rayon'], Fit: ['Straight'] }),
        fb('Saree', '🥻', 799, 6999, 'Elegant saree with a matching blouse piece.', { Fabric: ['Silk blend', 'Georgette', 'Cotton'], Length: ['5.5 m + blouse piece'] }, COLORS, 'Colour'),
        fb('Kurti', '👗', 399, 1999, 'Printed kurti for everyday style.', { Fabric: ['Rayon', 'Cotton'], Fit: ['A-line', 'Straight'] }),
        fb('Dress', '👗', 799, 3999, 'Flowy dress for casual and party wear.', { Fabric: ['Crepe', 'Georgette'], Fit: ['A-line'] }),
        fb('Leggings', '👖', 249, 999, 'Stretchable leggings for all-day comfort.', { Fabric: ['Cotton lycra'] }),
        fb('Shorts', '🩳', 399, 1399, 'Easy shorts for summer and workouts.', { Fabric: ['Cotton', 'Dry-fit'] }),
        fb('Track Suit', '🏃', 999, 3499, 'Matching track jacket and pants set.', { Fabric: ['Polyester blend'] }),
        fb('Sneakers', '👟', 999, 5999, 'Everyday sneakers with cushioned sole.', { Upper: ['Mesh', 'Synthetic'], Closure: ['Lace-up'] }, [['Black', 1], ['White', 1], ['Grey', 1]]),
        fb('Running Shoes', '👟', 1299, 6999, 'Lightweight running shoes for daily workouts.', { Upper: ['Mesh textile'], Closure: ['Lace-up'] }, [['Black', 1], ['Blue', 1], ['Grey', 1]]),
        fb('Formal Shoes', '👞', 999, 4999, 'Classic formal shoes for office.', { Upper: ['Synthetic leather', 'Leather'], Closure: ['Lace-up', 'Slip-on'] }, [['Black', 1], ['Brown', 1]]),
        fb('Sandals', '🩴', 399, 1999, 'Comfortable sandals for daily use.', { Sole: ['EVA', 'Rubber'] }),
        fb('Heels', '👠', 699, 2999, 'Stylish heels for occasions.', { Heel: ['2 inch', '3 inch'] }, [['Black', 1], ['Beige', 1], ['Red', 1]]),
        fb('Cap', '🧢', 199, 799, 'Adjustable cotton cap.', { Fabric: ['Cotton'] }),
        fb('Backpack', '🎒', 599, 2999, 'Spacious backpack with laptop compartment.', { Capacity: ['25 L', '30 L', '35 L'], Material: ['Polyester'] }),
        fb('Handbag', '👜', 699, 3499, 'Stylish handbag with zip closure.', { Material: ['Faux leather'] }),
        fb('Wallet', '👛', 299, 1499, 'Slim wallet with card slots.', { Material: ['Faux leather', 'Leather'] }, [['Black', 1], ['Brown', 1], ['Tan', 1]]),
        fb('Leather Belt', '🪢', 299, 1299, 'Reversible belt with metal buckle.', { Material: ['Faux leather', 'Leather'] }, [['Black', 1], ['Brown', 1]]),
        fb('Sunglasses', '🕶️', 399, 2499, 'UV-protected sunglasses.', { Protection: ['UV400'], Frame: ['Plastic', 'Metal'] }, [['Black', 1], ['Brown', 1], ['Blue', 1]]),
        fb('Wrist Watch', '⌚', 799, 5999, 'Analog wrist watch with a stylish dial.', { Strap: ['Leather', 'Metal', 'Silicone'], 'Water rating': ['30 m'] }, [['Black', 1], ['Silver', 1], ['Rose Gold', 1.05]]),
        fb('Socks (Pack of 3)', '🧦', 149, 499, 'Soft breathable socks.', { Fabric: ['Cotton blend'] }, [['Black', 1], ['White', 1], ['Mixed', 1]]),
        fb('Winter Scarf', '🧣', 249, 999, 'Warm woollen scarf.', { Fabric: ['Wool blend', 'Acrylic'] }),
    ], { perVariant: 2 });

    const BBR = ['GlowLab', 'ColorPop', 'PureLeaf', 'Velvet Skin', 'Aura Beauty', 'RoseMist', 'Herbline', 'DermaPure'];
    const ml = (a, b) => [[a, 1], [b, 1.6]];
    const SHADE = [['Nude', 1], ['Rose', 1], ['Berry', 1], ['Red', 1], ['Coral', 1]];
    fromTypes('Beauty', BBR, [
        ['Face Moisturizer', '🧴', 249, 999, 'Lightweight moisturizer for soft, hydrated skin.', { 'Skin type': ['All skin types', 'Normal to dry', 'Oily'] }, ml('50 ml', '100 ml'), 'Volume'],
        ['Sunscreen SPF 50', '🧴', 299, 999, 'Broad-spectrum sunscreen with a light finish.', { 'Skin type': ['All skin types'], Finish: ['Non-greasy'] }, ml('50 g', '100 g'), 'Volume'],
        ['Face Wash', '🧼', 149, 599, 'Gentle daily face wash.', { 'Skin type': ['Oily', 'Dry', 'All skin types'] }, ml('100 ml', '150 ml'), 'Volume'],
        ['Vitamin C Serum', '🧪', 349, 1499, 'Brightening face serum with vitamin C.', { 'Skin type': ['All skin types'] }, ml('15 ml', '30 ml'), 'Volume'],
        ['Face Toner', '🧴', 199, 799, 'Refreshing toner to prep skin.', { 'Skin type': ['All skin types'] }, ml('100 ml', '200 ml'), 'Volume'],
        ['Sheet Mask (Pack of 5)', '🧖', 199, 699, 'Hydrating sheet masks.', { Pieces: ['5'] }, [['Hydrating', 1], ['Brightening', 1]], 'Type'],
        ['Matte Lipstick', '💄', 249, 1299, 'Long-wear matte lipstick.', { Finish: ['Matte'] }, SHADE, 'Shade'],
        ['Liquid Lipstick', '💄', 299, 1199, 'Smudge-resistant liquid lipstick.', { Finish: ['Matte', 'Glossy'] }, SHADE, 'Shade'],
        ['Lip Balm', '💋', 99, 399, 'Moisturising lip balm.', { Form: ['Stick'] }, [['Cherry', 1], ['Mint', 1], ['Strawberry', 1]], 'Flavour'],
        ['Kajal', '✏️', 99, 399, 'Smudge-proof kajal.', { Finish: ['Intense black'] }, [['Black', 1], ['Brown', 1]], 'Shade'],
        ['Mascara', '👁️', 249, 999, 'Volumising mascara.', { Finish: ['Waterproof', 'Regular'] }, [['Black', 1], ['Brown', 1]], 'Shade'],
        ['Eyeliner', '✒️', 149, 699, 'Precise liquid eyeliner.', { Finish: ['Waterproof'] }, [['Black', 1], ['Brown', 1]], 'Shade'],
        ['Eyeshadow Palette', '🎨', 399, 1999, 'Multi-shade eyeshadow palette.', { Shades: ['9', '12', '18'] }, [['Warm', 1], ['Cool', 1], ['Neutral', 1]], 'Tone'],
        ['Liquid Foundation', '🧴', 299, 1499, 'Medium-coverage foundation.', { Coverage: ['Medium', 'Full'] }, [['Fair', 1], ['Medium', 1], ['Dusky', 1]], 'Shade'],
        ['Compact Powder', '🪞', 199, 999, 'Oil-control compact.', { Finish: ['Matte'] }, [['Fair', 1], ['Medium', 1], ['Dusky', 1]], 'Shade'],
        ['Concealer', '🖌️', 249, 999, 'Creamy concealer for spots and dark circles.', { Coverage: ['High'] }, [['Light', 1], ['Medium', 1], ['Deep', 1]], 'Shade'],
        ['Blush', '🌸', 249, 999, 'Silky blush for a natural flush.', { Finish: ['Matte', 'Shimmer'] }, SHADE, 'Shade'],
        ['Nail Polish', '💅', 79, 399, 'Glossy nail colour.', { Volume: ['9 ml'] }, SHADE, 'Shade'],
        ['Shampoo', '🧴', 149, 799, 'Gentle shampoo for healthy-looking hair.', { 'Hair type': ['All', 'Dry', 'Oily'] }, ml('200 ml', '340 ml'), 'Volume'],
        ['Conditioner', '🧴', 149, 799, 'Smoothing conditioner.', { 'Hair type': ['All', 'Dry'] }, ml('200 ml', '340 ml'), 'Volume'],
        ['Hair Oil', '🫙', 149, 699, 'Nourishing hair oil.', { Type: ['Coconut', 'Almond', 'Onion'] }, ml('100 ml', '200 ml'), 'Volume'],
        ['Hair Serum', '🧴', 199, 899, 'Frizz-control hair serum.', { 'Hair type': ['All'] }, ml('50 ml', '100 ml'), 'Volume'],
        ['Body Lotion', '🧴', 199, 799, 'Daily body lotion.', { 'Skin type': ['Dry', 'All'] }, ml('200 ml', '400 ml'), 'Volume'],
        ['Perfume', '🌸', 299, 3999, 'Long-lasting fragrance.', { Family: ['Floral', 'Woody', 'Fresh', 'Oriental'] }, ml('50 ml', '100 ml'), 'Volume'],
        ['Deodorant', '🧴', 149, 499, 'All-day freshness deodorant.', { Type: ['Spray'] }, ml('150 ml', '250 ml'), 'Volume'],
        ['Makeup Brush Set', '🖌️', 299, 1499, 'Soft synthetic brush set.', { Pieces: ['8', '12', '15'] }, [['Standard', 1]], null],
        ['Beard Oil', '🧔', 199, 699, 'Softening beard oil.', { Type: ['Cedarwood', 'Sandalwood'] }, [['30 ml', 1], ['60 ml', 1.6]], 'Volume'],
    ]);

    const HBR = ['Terra', 'HomeNest', 'CasaLuxe', 'KitchenKing', 'Urban Haven', 'CozyCorner'];
    fromTypes('Home', HBR, [
        ['Insulated Bottle', '🧃', 399, 1299, 'Double-wall insulated bottle.', { Material: ['Stainless steel'], Care: ['Hand wash'] }, [['500 ml', 1], ['750 ml', 1.2], ['1 L', 1.4]], 'Capacity'],
        ['Lunch Box', '🍱', 299, 999, 'Leak-proof lunch box with compartments.', { Material: ['Stainless steel', 'BPA-free plastic'] }, [['2 containers', 1], ['3 containers', 1.3]], 'Set'],
        ['Cookware Set', '🍳', 1299, 5999, 'Non-stick cookware set.', { Material: ['Aluminium non-stick'], Compatible: ['Gas', 'Induction + gas'] }, [['3 pcs', 1], ['5 pcs', 1.6]], 'Set'],
        ['Non-stick Frying Pan', '🍳', 399, 1499, 'Durable non-stick pan.', { Material: ['Aluminium'] }, [['24 cm', 1], ['28 cm', 1.25]], 'Size'],
        ['Pressure Cooker', '🍲', 899, 2999, 'Safety-lid pressure cooker.', { Material: ['Aluminium', 'Stainless steel'] }, [['3 L', 1], ['5 L', 1.3]], 'Capacity'],
        ['Air Fryer', '🍟', 3499, 9999, 'Digital air fryer for low-oil cooking.', { Power: ['1400 W', '1500 W'], Controls: ['Digital'] }, [['4 L', 1], ['6 L', 1.35]], 'Capacity'],
        ['Mixer Grinder', '🥤', 1999, 5999, 'Multi-jar mixer grinder.', { Power: ['500 W', '750 W'], Jars: ['3', '4'] }, [['Standard', 1]], null],
        ['Electric Kettle', '🫖', 499, 1999, 'Auto cut-off electric kettle.', { Power: ['1500 W'] }, [['1 L', 1], ['1.5 L', 1.15], ['1.8 L', 1.25]], 'Capacity'],
        ['Induction Cooktop', '🔥', 1499, 3999, 'Touch-control induction cooktop.', { Power: ['2000 W'] }, [['Standard', 1]], null],
        ['Microwave Oven', '📦', 5999, 18999, 'Microwave for reheating and cooking.', { Type: ['Solo', 'Grill', 'Convection'] }, [['20 L', 1], ['28 L', 1.3]], 'Capacity'],
        ['Vacuum Cleaner', '🧹', 2999, 14999, 'Powerful vacuum cleaner for home.', { Type: ['Bagless', 'Cordless'] }, [['Standard', 1]], null],
        ['Table Lamp', '💡', 399, 1999, 'Modern table lamp.', { Bulb: ['LED'] }, [['Warm light', 1], ['Cool light', 1]], 'Light'],
        ['LED Bulb (Pack of 4)', '💡', 199, 699, 'Energy-efficient LED bulbs.', { Wattage: ['9 W', '12 W'] }, [['Warm white', 1], ['Cool white', 1]], 'Colour temp'],
        ['Cotton Bedsheet Set', '🛏️', 599, 2499, 'Soft cotton bedsheet with 2 pillow covers.', { Fabric: ['Cotton'] }, [['Single', 0.7], ['Double', 1], ['King', 1.3]], 'Size'],
        ['Pillow (Pack of 2)', '🛏️', 399, 1499, 'Soft fibre pillows.', { Fill: ['Microfibre'] }, [['Standard', 1]], null],
        ['Blanket', '🛏️', 699, 2999, 'Warm and soft blanket.', { Fabric: ['Fleece', 'Polyester'] }, [['Single', 0.8], ['Double', 1.2]], 'Size'],
        ['Curtains (Pair)', '🪟', 499, 2499, 'Printed curtains with eyelet rings.', { Fabric: ['Polyester'] }, [['5 ft', 0.8], ['7 ft', 1], ['9 ft', 1.25]], 'Length'],
        ['Towel Set', '🛁', 399, 1799, 'Absorbent cotton towels.', { Fabric: ['Cotton'] }, [['2 pcs', 1], ['4 pcs', 1.8]], 'Set'],
        ['Wall Clock', '🕰️', 299, 1499, 'Silent sweep wall clock.', { Power: ['AA battery'] }, [['12 inch', 1], ['14 inch', 1.2]], 'Size'],
        ['Photo Frame Set', '🖼️', 299, 1299, 'Wall photo frame set.', { Pieces: ['3', '5', '7'] }, [['Black', 1], ['Wood', 1.1]], 'Finish'],
        ['Storage Box', '📦', 199, 999, 'Stackable storage box with lid.', { Material: ['Plastic'] }, [['20 L', 1], ['40 L', 1.5]], 'Capacity'],
        ['Dinner Set', '🍽️', 999, 4999, 'Elegant dinner set.', { Material: ['Ceramic', 'Melamine'] }, [['18 pcs', 1], ['32 pcs', 1.6]], 'Set'],
        ['Coffee Mug (Set of 4)', '☕', 299, 999, 'Ceramic coffee mugs.', { Material: ['Ceramic'] }, [['Plain', 1], ['Printed', 1.1]], 'Style'],
        ['Plant Pot Set', '🪴', 249, 1299, 'Decorative planter pots.', { Material: ['Ceramic', 'Plastic'] }, [['Set of 2', 1], ['Set of 3', 1.4]], 'Set'],
        ['Door Mat', '🚪', 149, 699, 'Anti-slip door mat.', { Material: ['Coir', 'Rubber'] }, [['Standard', 1]], null],
        ['Cushion Covers (Pack of 5)', '🛋️', 299, 1299, 'Printed cushion covers.', { Size: ['16×16 inch'] }, [['Standard', 1]], null],
        ['Steam Iron', '🧺', 799, 2999, 'Steam iron with non-stick soleplate.', { Power: ['1200 W', '1600 W'] }, [['Standard', 1]], null],
        ['Ceiling Fan', '🌀', 1999, 5999, 'Energy-efficient ceiling fan.', { Sweep: ['1200 mm'], Speed: ['3-speed'] }, [['White', 1], ['Brown', 1]], 'Colour'],
        ['Room Heater', '♨️', 1299, 4999, 'Compact room heater.', { Power: ['1000 W', '2000 W'] }, [['Standard', 1]], null],
        ['Water Purifier', '🚰', 5999, 19999, 'RO + UV water purifier.', { Technology: ['RO + UV', 'RO + UV + TDS control'] }, [['7 L', 1], ['10 L', 1.15]], 'Capacity'],
    ]);

    const OBR = ['PlayPlus', 'FitMate', 'BookBay', 'PetPal', 'DriveSafe', 'NutriNest'];
    fromTypes('Others', OBR, [
        ['Notebook (Pack of 6)', '📓', 199, 599, 'Ruled notebooks.', { Pages: ['160', '200'] }, [['A4', 1.2], ['A5', 1]], 'Size'],
        ['Gel Pen (Pack of 20)', '🖊️', 99, 349, 'Smooth-writing gel pens.', { Ink: ['Blue', 'Black', 'Assorted'] }, [['Standard', 1]], null],
        ['Yoga Mat', '🧘', 399, 1499, 'Non-slip yoga mat.', { Thickness: ['6 mm', '8 mm', '10 mm'] }, COLORS.slice(0, 3), 'Colour'],
        ['Dumbbell Set', '🏋️', 799, 3999, 'Adjustable dumbbell set.', { Material: ['Vinyl', 'Rubber'] }, [['10 kg', 1], ['20 kg', 1.7]], 'Weight'],
        ['Cricket Bat', '🏏', 599, 4999, 'Willow cricket bat.', { Wood: ['Kashmir willow', 'English willow'] }, [['Short handle', 1], ['Full size', 1.1]], 'Size'],
        ['Football', '⚽', 399, 1499, 'Stitched football.', { Size: ['5'] }, [['Standard', 1]], null],
        ['Badminton Racket (Pair)', '🏸', 499, 2999, 'Lightweight badminton rackets.', { Material: ['Aluminium', 'Graphite'] }, [['With cover', 1]], null],
        ['Skipping Rope', '🪢', 99, 399, 'Adjustable skipping rope.', { Length: ['Adjustable'] }, [['Standard', 1]], null],
        ['Board Game', '🎲', 299, 1499, 'Family board game.', { Players: ['2–4', '2–6'], Age: ['6+', '8+'] }, [['Standard', 1]], null],
        ['Building Blocks Set', '🧱', 399, 2499, 'Creative building block set.', { Age: ['5+', '6+'] }, [['250 pcs', 1], ['500 pcs', 1.7]], 'Pieces'],
        ['Soft Toy', '🧸', 299, 1299, 'Cuddly soft toy.', { Material: ['Plush'] }, [['30 cm', 1], ['60 cm', 1.8]], 'Size'],
        ['Remote Control Car', '🚗', 499, 2999, 'Rechargeable RC car.', { Age: ['6+'] }, [['Red', 1], ['Blue', 1]], 'Colour'],
        ['Story Book Collection', '📚', 199, 899, 'Illustrated story books.', { Language: ['English', 'Hindi'] }, [['Set of 5', 1], ['Set of 10', 1.7]], 'Set'],
        ['Colouring Kit', '🖍️', 149, 699, 'Crayons, sketch pens and drawing pad.', { Age: ['4+'] }, [['Standard', 1]], null],
        ['Dog Food', '🐕', 399, 2499, 'Balanced dog food.', { Type: ['Dry', 'Wet'] }, [['1 kg', 1], ['3 kg', 2.6]], 'Pack'],
        ['Cat Toy Set', '🐈', 149, 599, 'Interactive cat toys.', { Pieces: ['6', '10'] }, [['Standard', 1]], null],
        ['Pet Leash & Collar', '🐕', 199, 899, 'Adjustable leash and collar set.', { Material: ['Nylon'] }, [['Small', 1], ['Medium', 1.1], ['Large', 1.2]], 'Size'],
        ['Car Phone Holder', '🚗', 199, 899, 'Dashboard phone holder.', { Mount: ['Dashboard', 'Vent'] }, [['Standard', 1]], null],
        ['Bike Helmet', '🪖', 699, 3499, 'ISI-style protective helmet.', { Type: ['Full-face', 'Open-face'] }, [['M', 1], ['L', 1], ['XL', 1.03]], 'Size'],
        ['Tool Kit', '🧰', 499, 2999, 'Multi-purpose home tool kit.', { Pieces: ['40', '70', '110'] }, [['Standard', 1]], null],
        ['Car Cleaning Kit', '🚗', 399, 1799, 'Microfibre cloths, wash and shine kit.', { Pieces: ['8', '12'] }, [['Standard', 1]], null],
        ['Mixed Dry Fruits', '🥜', 299, 1499, 'Premium mixed dry fruits.', { Type: ['Almonds, cashews, raisins'] }, [['250 g', 1], ['500 g', 1.9]], 'Pack'],
        ['Masala Tea', '🍵', 149, 599, 'Aromatic masala chai blend.', { Type: ['Loose leaf'] }, [['250 g', 1], ['500 g', 1.8]], 'Pack'],
        ['Natural Honey', '🍯', 199, 699, 'Raw natural honey.', { Type: ['Multiflora'] }, [['250 g', 1], ['500 g', 1.8]], 'Pack'],
        ['Protein Powder', '💪', 999, 4999, 'Whey protein powder.', { Flavour: ['Chocolate', 'Vanilla', 'Coffee'] }, [['500 g', 1], ['1 kg', 1.8]], 'Pack'],
        ['Festive Gift Hamper', '🎁', 499, 3999, 'Curated gift hamper.', { Contents: ['Sweets, snacks and décor'] }, [['Standard', 1], ['Premium', 1.6]], 'Edition'],
    ]);

    return out;
}

export const products = [...seed, ...buildCatalog()];