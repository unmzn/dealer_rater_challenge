import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import cheerio from 'cheerio';
import pretty from 'pretty';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
    const rawText = await fs.readFile(path.join(__dirname, '../data/page_snapshot.html'), 'utf8');
    const $ = cheerio.load(rawText);
    const reviews = $('p.review-content');
    reviews.each((i, elem) => {
        const reviewText = $(elem).html();
        //console.log($(elem).html());
    });
}

main()
