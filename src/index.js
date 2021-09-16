import cheerio from 'cheerio';
import path, { dirname } from 'path';
import pretty from 'pretty';
import { fileURLToPath } from 'url';
import { promises as fs } from 'fs';
import Sentiment from 'sentiment';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
    const sentiment = new Sentiment();
    const rawText = await fs.readFile(path.join(__dirname, '../data/page_snapshot.html'), 'utf8');
    const $ = cheerio.load(rawText);
    const reviews = $('p.review-content');
    reviews.each((i, elem) => {
        const reviewText = $(elem).html();
        const { comparative } = sentiment.analyze(reviewText);
        console.log({ reviewText, score: comparative });
    });
}

main()
