const fs = require('fs');
const path = require('path');
const https = require('https');

const vegetables = [
    "spinach", "broccoli", "carrot", "tomato", "kale", "cauliflower", "bell-pepper", 
    "cabbage", "sweet-potato", "zucchini", "asparagus", "brussels-sprouts", "celery", 
    "beetroot", "onion", "garlic", "radish", "pumpkin", "turnip", "okra", "green-beans", 
    "peas", "eggplant", "leeks", "artichoke", "mustard-greens", "collard-greens", 
    "swiss-chard", "bok-choy", "arugula", "dandelion-greens", "watercress", "chili-pepper", 
    "scallions", "fennel", "parsnip", "yam", "butternut-squash", "chayote", "kohlrabi", 
    "seaweed", "mushrooms", "cucumber", "lotus-root"
];

const dir = path.join(__dirname, 'public', 'images', 'vegetables');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir, { recursive: true });
}

function downloadImage(vegetable) {
    return new Promise((resolve, reject) => {
        const dest = path.join(dir, `${vegetable}.jpg`);
        // Using unplash source to get a random high quality image of the vegetable
        // Using LoremFlickr to get a random high quality image of the vegetable
        const url = `https://loremflickr.com/800/600/${vegetable},vegetable`;
        
        console.log(`Downloading image for ${vegetable}...`);
        
        https.get(url, (response) => {
            // Unsplash source redirects to the actual image URL
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
                reject(new Error(`Failed to get Unsplash redirect for ${vegetable}`));
            }
        }).on('error', (err) => {
            reject(err);
        });
    });
}

async function main() {
    console.log(`Starting download of ${vegetables.length} vegetable images...`);
    for (const veg of vegetables) {
        try {
            await downloadImage(veg);
            console.log(`✓ Successfully downloaded ${veg}`);
            // Small delay to avoid hammering the Unsplash API
            await new Promise(r => setTimeout(r, 1000));
        } catch (error) {
            console.error(`✗ Failed to download ${veg}:`, error.message);
        }
    }
    console.log("Image download complete.");
}

main();
