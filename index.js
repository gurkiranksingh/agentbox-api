const express = require("express");
const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(
    `Agentbox API helper functions listening at http://localhost:${port}`
  );
});

app.get("/agentbox/:type", (req, res) => {
  console.log("Received agentbox request", req.query);
  res.setHeader("X-Client-ID", req.header("X-Client-ID"));
  res.setHeader("X-API-Key", req.header("X-API-Key"));

  const url =
    `https://api.agentboxcrm.com.au/${req.params.type}?` +
    new URLSearchParams({
      version: 2,
      include: req.query.include,
      "filter[hiddenListing]": false,
      page: req.query.page,
    });
  res.redirect(302, url);
});
