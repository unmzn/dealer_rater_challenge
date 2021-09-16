import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

async function main() {
    const pageHtml = await fs.readFile(path.join(__dirname, '../data/page_snapshot.html'), 'utf8');
    console.log(pageHtml);
}

main()
