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
        // Format the nut name for the prompt
        const formattedName = nut.replace(/-/g, ' ');
        // Use Pollinations AI to generate a highly specific, high-quality image of the nut
        const prompt = `${formattedName} nuts, high quality food photography, organic, studio lighting, macro`;
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=600&nologo=true`;
        
        console.log(`Generating & downloading image for ${nut}...`);
        
        const options = {
            headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
        };

        https.get(url, options, (response) => {
            if (response.statusCode === 200) {
                const file = fs.createWriteStream(dest);
                response.pipe(file);
                file.on('finish', () => {
                    file.close(resolve);
                });
            } else if (response.statusCode === 301 || response.statusCode === 302 || response.statusCode === 307) {
                 const redirect = response.headers.location;
                 https.get(redirect, (imgResponse) => {
                    const file = fs.createWriteStream(dest);
                    imgResponse.pipe(file);
                    file.on('finish', () => {
                        file.close(resolve);
                    });
                 }).on('error', (err) => {
                    fs.unlink(dest, () => reject(err));
                });
            } else {
                reject(new Error(`Failed to download image for ${nut}: ${response.statusCode}`));
            }
        }).on('error', (err) => {
            reject(err);
        });
    });
}

async function main() {
    console.log(`Starting generation of ${nuts.length} precise nut images via AI...`);
    for (const nut of nuts) {
        try {
            await downloadImage(nut);
            console.log(`✓ Successfully generated ${nut}`);
            // Wait a moment between requests to be polite to the generation API
            await new Promise(r => setTimeout(r, 1500));
        } catch (error) {
            console.error(`✗ Failed to generate ${nut}:`, error.message);
        }
    }
    console.log("Image generation complete.");
}

main();
