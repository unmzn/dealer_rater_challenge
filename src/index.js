const axios = require("axios");
const cheerio = require("cheerio");
const dotenv = require("dotenv");
const path = require("path");
const Sentiment = require("sentiment");
const fs = require("fs").promises;

async function main() {
  dotenv.config();
  const useSimpleScoring = process.env.USE_SIMPLE_SCORING === "true";
  const baseUrl = process.env.REVIEW_PAGE_URL;
  let scoredPages = [];
  for (let pageNum = 1; pageNum <= 5; pageNum++) {
    const page = await getPage({ baseUrl, pageNum });
    const reviews = extractReviews(page);
    const scoredPage = reviews.map((review) => ({
      review,
      score: score({ review, useSimpleScoring }),
    }));
    scoredPages = [...scoredPages, ...scoredPage];
  }
  // does a reverse sort
  scoredPages.sort((a, b) => {
    if (a.score > b.score) return -1;
    if (a.score === b.score) return 0;
    return 1;
  });
  console.log(scoredPages.slice(0, 3));
}

async function getPage({ baseUrl, pageNum }) {
  const result = await axios.get(`${baseUrl}/page${pageNum}`);
  return result.data;
}

async function loadLocalSample() {
  return fs.readFile(
    path.join(__dirname, "../data/page_snapshot.html"),
    "utf8"
  );
}

function extractReviews(page) {
  const toReturn = [];
  const $ = cheerio.load(page);
  const reviews = $("p.review-content");
  reviews.each((i, elem) => {
    toReturn.push($(elem).html());
  });
  return toReturn;
}

// I wanted to not have useSimpleScoring as an argument
// but I was having issues mocking 'process.env'
function score({ review, useSimpleScoring }) {
  if (useSimpleScoring) {
    return (review.match(/!/g) || []).length;
  } else {
    // If we were dong performance and it mattered
    // we could build this outside of the "inner loop"
    const sentiment = new Sentiment();
    return sentiment.analyze(review).score;
  }
}

module.exports = {
  extractReviews,
  getPage,
  loadLocalSample,
  main,
  score,
};
