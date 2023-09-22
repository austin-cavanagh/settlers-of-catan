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
    turn: String,
    dice: {
      productionDie: Object,
      eventDie: Object,
    },
    centerCards: [Object],
  },
})

module.exports = model("Document", DocumentSchema)
