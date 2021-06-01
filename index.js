const express = require("express");

const app = express();

const db = require("./db/db");

require("dotenv").config();

const shortId = require("shortid");

app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");

db.sequelize.sync().then(() => {
  console.log("Drop and re-sync db.");
});

app.get("/", async (req, res) => {
  const urls = await db.Url.findAll();
  res.render("index", { urls: urls, message: "" });
});

app.post("/submit", async (req, res) => {
  await db.Url.create({
    long: req.body.url.trim(),
    short: shortId.generate(),
    clicks: 0,
  });
  res.redirect("/");
});

app.get("/:short", async (req, res) => {
  const url = await db.Url.findOne({
    where: { short: req.params.short.trim() },
  });
  url.clicks++;
  url.save();
  res.redirect(url.long);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
