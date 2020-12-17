const fs = require('fs');
const data = fs.readFileSync('_temp/posts.json', 'utf8');
const puppeteer = require('puppeteer');
const imagemin = require('imagemin');
const imageminPngquant = require('imagemin-pngquant');

const outputDir = "../obsolete29.com"

// parse JSON string to JSON object
const posts = JSON.parse(data);

// print all databases
posts.forEach(post => {
    console.log(`${post.url}`);
    
    (async () => {
        let postUrl = 'http://127.0.0.1:5500' + post.url + 'og-image'
        let localDir =  outputDir + post.url + 'og-image/twitter-social-cover.jpg'
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(postUrl);
        await page.setViewport({
            width: 512,
            height: 256,
            deviceScaleFactor: 2
        });
        await page.screenshot({path: localDir});
        await browser.close();

        await imagemin([localDir], {
            destination: outputDir + post.url + 'og-image/',
            plugins: [
                imageminPngquant({
                    quality: [0.6, 0.8]
                })
            ]
        });
    })();
});