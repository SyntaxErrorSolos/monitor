let { model, models, Schema } = require("mongoose");

module.exports =
  models.art ||
  model(
    "art",
    new Schema({
      User: String,
      Image: { type: Image },
    })
  );
