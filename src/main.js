const { main } = require("./index.js");

(() => {
  try {
    main();
  } catch (err) {
    console.error(err);
  }
})();
