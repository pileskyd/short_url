const { Schema, model } = require("mongoose");

const Slink = new Schema({
  hash: { type: String, unique: true, required: true },
  url: { type: String, required: true },
});

module.exports = model("Slink", Slink);