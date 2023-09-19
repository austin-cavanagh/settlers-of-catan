const { Schema, model } = require("mongoose")

// schema says properties in our object
const DocumentSchema = new Schema({
  _id: String,
  data: Object,
})

module.exports = model("Document", DocumentSchema)
