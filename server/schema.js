let { model, models, Schema } = require("mongoose");

module.exports =
  models.accounts ||
  model(
    "accounts",
    new Schema({
      Username: String,
      Password: String,
      Email: String,
      UserID: String,
      Websites: Array,
      Premium: {  type: Boolean, default: false  }
    })
  );
