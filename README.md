# dealer_rater_challenge

## Running

Copy `.env_example` to `.env` which is `.gitignore`'d. Normally this is to protect secrets from getting committed. I suppose I could not ignore the file but that feels SO WRONG.

You can modify the `REVIEW_PAGE_URL` to scrape reviews for a different dealer, or `USE_SIMPLE_SCORING` to use my quick-n-dirty sentiment analyzer instead of a real one from npm.

Developed with node v14.15.0

`npm run start` to run it.

`npm run test` to run tests.

## Positivity Scoring:

So I happen to know that this task goes by the formal name "Sentiment Analysis"

The requirements are written such that an off-the shelf sentiment analyzer meets them without further work.

Therefore, my criterion for positivity scoring is what this library does:
https://www.npmjs.com/package/sentiment

It uses a coded wordlist called AFINN to assign a score to certain words in the input. All the scores are added together for an overall score.

### 'Dumb' Alternatives:

If I didn't know about sentiment analysis, I would probably do some math around `!` which seems to be a decent predictor of positivity in my visual scan. Some options:

- ratio of `!` to `.`.
- ratio of `!` to total characters.
- total count of `!` per review.

From my quick examination, I think the third option gives the best result. This is a surprise to me because I believe raw counts out of context / not normalized to the input size are usually useless.

In this case, it looks like there's lots of variation in the length of reviews that I judge as similarly positive, making the normalizing of the first two options counterproductive. (Some people go on for sentences before gushing, others just gush and then are done).

### Better Alternatives:

If I wanted more accuracy, the next step up would be to use some sort of AI/ML model. I'm sure this is what the company really does. Doing so would be a lot of work for this small project.

## Influences:

https://www.twilio.com/blog/4-tools-for-web-scraping-in-node-js

https://nodejs.libhunt.com/compare-axios-vs-got

https://www.freecodecamp.org/news/how-to-scrape-websites-with-node-js-and-cheerio/

https://stackoverflow.com/a/62892482

https://www.tabnine.com/code/javascript/functions/cheerio/Cheerio/each

https://stackoverflow.com/a/881111

## Commentary:

Of course - malformed HTML! Let's see if cheerio can handle it.

- Preventing prettier from making it more readable too

Apparently old `__dirname` is incompatible with ES6 modules

- Stuck on node 12 @ `<JOB>`

Cheerio didn't have any trouble getting the first review content, but can it get all of them?

Looks like you have to call methods on the selected set like `.each`, `.next`, etc.

When I select the `p.review-content` nodes I see that the "Read More" links have ids. If this were a real product we'd probably want to grab those. As it stands, the requirements only ask to print the review itself.

Hard to tell from my small sample if the anylyzer is doing well. Next step is getting lots of pages and comparing the top scorers to the bottom ones.

Jest says their ES6 modules support in node is experimental so I'm just going back to `require`

I didn't like the results of using the 'comparative' score - it was punishing long gushy reviews too much, bringing short reviews to the top. Therefore I am not using the total score raw.
