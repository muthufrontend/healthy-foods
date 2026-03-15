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

function downloadImage(nut) {
    return new Promise((resolve, reject) => {
        const dest = path.join(dir, `${nut}.jpg`);
        // Using LoremFlickr to get a random high quality image of the nut
        const url = `https://loremflickr.com/800/600/${nut},nut`;
        
        console.log(`Downloading image for ${nut}...`);
        
        https.get(url, (response) => {
            // LoremFlickr redirects to the actual image URL
            if (response.statusCode === 301 || response.statusCode === 302) {
                let redirectLocation = response.headers.location;
                if (redirectLocation.startsWith('/')) {
                    redirectLocation = 'https://loremflickr.com' + redirectLocation;
                }
                https.get(redirectLocation, (imgResponse) => {
                    const file = fs.createWriteStream(dest);
                    imgResponse.pipe(file);
                    file.on('finish', () => {
                        file.close(resolve);
                    });
                }).on('error', (err) => {
                    fs.unlink(dest, () => reject(err));
                });
            } else {
                reject(new Error(`Failed to get LoremFlickr redirect for ${nut}`));
            }
        }).on('error', (err) => {
            reject(err);
        });
    });
}

async function main() {
    console.log(`Starting download of ${nuts.length} nut images...`);
    for (const nut of nuts) {
        try {
            await downloadImage(nut);
            console.log(`✓ Successfully downloaded ${nut}`);
            // Small delay to avoid hammering the API
            await new Promise(r => setTimeout(r, 1000));
        } catch (error) {
            console.error(`✗ Failed to download ${nut}:`, error.message);
        }
    }
    console.log("Image download complete.");
}

main();
