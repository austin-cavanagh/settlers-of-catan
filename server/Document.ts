const { Schema, model } = require("mongoose")

// schema says properties in our object
const DocumentSchema = new Schema({
  _id: String,
  data: {
    messages: [String],
    playerCards: {
      blueCards: [Object],
      redCards: [Object],
    },
    playerHands: {
      blueHand: [Object],
      redHand: [Object],
    },
    centerCards: [Object],
    turn: String,
  },
})

module.exports = model("Document", DocumentSchema)
