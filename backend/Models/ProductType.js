const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productTypeSchema = new Schema({
  type: { type: String, required: true },
  image: { type: String },
});
module.exports = mongoose.model("ProductType", productTypeSchema);
