const { extractReviews, score, loadLocalSample, getPage } = require("./index");

describe("The score function", () => {
  const review = "great terrible! stupid fun!!";
  it("Counts `!` in simple mode", () => {
    const actual = score({ review, useSimpleScoring: true });
    expect(actual).toEqual(3);
  });
  it("Uses word scores when not in simple mode", () => {
    const actual = score({ review, useSimpleScoring: false });
    expect(actual).toEqual(2);
  });
});

describe("The load local function", () => {
  // This is a crude assertion but I don't like brittle tests
  it("Gets over 5k lines", async () => {
    const text = await loadLocalSample();
    expect(countLines(text)).toBeGreaterThan(5000);
  });
});

describe("getPage", () => {
  it("Gets different pages for different page nums", async () => {
    const baseUrl =
      "https://www.dealerrater.com/dealer/McKaig-Chevrolet-Buick-A-Dealer-For-The-People-dealer-reviews-23685";
    const page1 = await getPage({ baseUrl, pageNum: 1 });
    const page2 = await getPage({ baseUrl, pageNum: 2 });

    expect(page1).not.toEqual(page2);
    expect(countLines(page1)).toBeGreaterThan(5000);
    expect(countLines(page2)).toBeGreaterThan(5000);
  });
});

describe("extractReviews", () => {
  it("Parses out the reviews from the sample", async () => {
    const text = await loadLocalSample();
    const actual = extractReviews(text);
    const expectedFirstReview =
      "McKaig Chevrolet gave us a pleasant buying experience. Such friendly, knowledgeable staff that were a pleasure to work with. ";
    expect(actual.length).toEqual(10);
    expect(actual[0]).toEqual(expectedFirstReview);
  });
});

function countLines(input) {
  return (input || "").split(/\r\n|\r|\n/).length;
}
