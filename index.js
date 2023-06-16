const express = require("express");
const fetch = require("node-fetch");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(
    `Agentbox API helper functions listening at http://localhost:${port}`
  );
});

app.get("/", (req, res) => {
  res.json("Welcome to the Agentbox API");
});

app.get("/agentbox/:type", async (req, res) => {
  console.log("Received agentbox request", req.query);

  const url =
    `https://api.agentboxcrm.com.au/${req.params.type}?` +
    new URLSearchParams({
      version: 2,
      include: req.query.include,
      "filter[hiddenListing]": false,
      page: req.query.page,
    });

  const agentboxResults = await fetch(url, {
    method: "GET",
    headers: {
      "X-Client-ID": req.header("X-Client-ID"),
      "X-API-Key": req.header("X-API-Key"),
      "X-Robots-Tag": 'none'
    },
  }).then((res) => res.json());
  console.log(agentboxResults)
  res.json(agentboxResults);
});
