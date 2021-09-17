const { main } = require("./index.js");

(async () => {
  try {
    await main();
  } catch (err) {
    console.error(err);
  }
})();
