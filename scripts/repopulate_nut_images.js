const fs = require('fs');
const path = require('path');
const https = require('https');

const nuts = [
    "almonds", "walnuts", "pistachios", "cashews", "hazelnuts", "brazil-nuts", "macadamia-nuts",
    "pine-nuts", "chestnuts", "pecans", "tiger-nuts", "kola-nuts", "ginkgo-nuts", "acorns",
    "candle-nuts", "baru-nuts", "hickory-nuts", "african-bush-mango", "malabar-chestnuts",
    "sacha-inchi", "monkey-puzzle-nuts", "pili-nuts", "chilean-hazelnuts", "japanese-walnuts",
    "butternuts", "buah-keluak", "water-caltrop", "lotus-seeds", "makhana", "kukui-nuts",
    "peanuts", "soy-nuts", "cedar-nuts", "chironji", "bitter-kola", "shea-nuts", "marula-nuts",
    "african-walnut", "singada-nuts", "kukui-seeds", "ogbono-seeds", "siberian-pine-nuts",
    "wild-almonds", "wild-walnuts"
];

const dir = path.join(__dirname, '..', 'public', 'images', 'nuts');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

// A high-quality fallback image for very obscure nuts that return poor results
const FALLBACK_URL = "https://images.unsplash.com/photo-1536620662728-ceca1361daff?auto=format&fit=crop&w=800&q=80";

function downloadImage(nut) {
    return new Promise((resolve, reject) => {
        const dest = path.join(dir, `${nut}.jpg`);
        const formattedName = nut.replace(/-/g, ' ');
        
        // Strict tags: nut, [name], food, organic
        // This forces LoremFlickr to find more relevant food items
        const url = `https://loremflickr.com/800/600/nut,${nut},organic/all`;
        
        console.log(`Downloading image for ${nut}...`);
        
        https.get(url, (response) => {
            if (response.statusCode === 302 || response.statusCode === 301) {
                let redirect = response.headers.location;
                if (!redirect.startsWith('http')) {
                    redirect = `https://loremflickr.com${redirect}`;
                }
                https.get(redirect, (res2) => {
                    saveResponseToFile(res2, dest, nut, resolve, reject);
                });
            } else if (response.statusCode === 200) {
                saveResponseToFile(response, dest, nut, resolve, reject);
            } else {
                useFallback(dest, nut, resolve, reject);
            }
        }).on('error', (err) => {
            useFallback(dest, nut, resolve, reject);
        });
    });
}

function saveResponseToFile(response, dest, nut, resolve, reject) {
    const file = fs.createWriteStream(dest);
    response.pipe(file);
    file.on('finish', () => {
        file.close(() => {
            const stats = fs.statSync(dest);
            if (stats.size < 15000) { // If < 15KB, likely a bad/corrupted image or a "not found" illustration
                console.log(`  ! Image for ${nut} too small (${stats.size}b), using fallback...`);
                useFallback(dest, nut, resolve, reject);
            } else {
                resolve();
            }
        });
    });
}

function useFallback(dest, nut, resolve, reject) {
    https.get(FALLBACK_URL, (response) => {
        const file = fs.createWriteStream(dest);
        response.pipe(file);
        file.on('finish', () => {
            file.close(resolve);
        });
    }).on('error', reject);
}

async function main() {
    console.log(`Repopulating ${nuts.length} nut images with validation...`);
    for (const nut of nuts) {
        try {
            await downloadImage(nut);
            console.log(`✓ Completed ${nut}`);
            // Small delay to be respectful
            await new Promise(r => setTimeout(r, 600)); 
        } catch (error) {
            console.error(`✗ Error on ${nut}:`, error.message);
        }
    }
    console.log("Repopulation complete.");
}

main();
