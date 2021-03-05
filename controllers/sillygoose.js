const sillygoose = (req, res) => {
  console.log("hit");
  res.send("You found me you thilly (Silly, but read as Mike Tyson) Goose");
};

module.exports = { sillygoose };
