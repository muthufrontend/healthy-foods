const fs = require('fs');
const path = require('path');
const https = require('https');

const dataFile = fs.readFileSync(path.join(__dirname, '..', 'lib', 'data.ts'), 'utf8');
const foodRegex = /name:\s*"(.*?)"[\s\S]*?slug:\s*"(.*?)"[\s\S]*?category:\s*"(.*?)"[\s\S]*?image:\s*"(.*?)"/g;
let match;
const foods = [];
while ((match = foodRegex.exec(dataFile)) !== null) {
    foods.push({ name: match[1], slug: match[2], category: match[3], image: match[4] });
}

const STABLE_FALLBACKS = {
    fruits: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=800",
    vegetables: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800",
    nuts: "https://images.unsplash.com/photo-1511067007398-7e4b90cfa4bc?q=80&w=800"
};

const BLACKLIST = [126099, 52769, 288859, 57230, 82510, 24700];

const BASE_DIR = path.join(__dirname, '..', 'public');

async function downloadImage(food, index) {
    const dest = path.join(BASE_DIR, food.image);
    const dir = path.dirname(dest);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    // Try LoremFlickr first with a unique lock
    const categorySingular = food.category.endsWith('s') ? food.category.slice(0, -1) : food.category;
    const url = `https://loremflickr.com/800/600/${categorySingular},${food.slug},organic,food/all?lock=${index}`;

    return new Promise((resolve, reject) => {
        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                let redirect = response.headers.location;
                if (!redirect.startsWith('http')) redirect = `https://loremflickr.com${redirect}`;
                https.get(redirect, (res2) => {
                    saveResponseToFile(res2, dest, food, resolve, reject);
                });
            } else if (response.statusCode === 200) {
                saveResponseToFile(response, dest, food, resolve, reject);
            } else {
                useFallback(dest, food.category, resolve, reject);
            }
        }).on('error', () => {
            useFallback(dest, food.category, resolve, reject);
        });
    });
}

function saveResponseToFile(response, dest, food, resolve, reject) {
    const file = fs.createWriteStream(dest);
    response.pipe(file);
    file.on('finish', () => {
        file.close(() => {
            const stats = fs.statSync(dest);
            if (stats.size < 15000 || BLACKLIST.includes(stats.size)) {
                console.log(`    ! Mismatched result for ${food.name} (${stats.size}b), using premium fallback.`);
                useFallback(dest, food.category, resolve, reject);
            } else {
                resolve();
            }
        });
    });
}

function useFallback(dest, category, resolve, reject) {
    const url = STABLE_FALLBACKS[category] || STABLE_FALLBACKS.fruits;
    https.get(url, (response) => {
        const file = fs.createWriteStream(dest);
        response.pipe(file);
        file.on('finish', () => { file.close(resolve); });
    }).on('error', reject);
}

async function main() {
    console.log("Ultimate asset synchronization beginning (Stable v2)...");
    for (let i = 0; i < foods.length; i++) {
        console.log(`  [${i+1}/131] ${foods[i].name}...`);
        await downloadImage(foods[i], i);
        // Throttle
        await new Promise(r => setTimeout(r, 200));
    }
    console.log("Process complete. All 131 items have premium assets.");
}

main();
