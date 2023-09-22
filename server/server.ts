import { Server, Socket } from "socket.io"
import { rootCertificates } from "tls"

const Document = require("./Document")
const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/google-docs-clone")

// creating server on port 3000
const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
})

interface RoomTracker {
  [room: string]: { [blue: string]: string }
}

const roomTracker: RoomTracker = {}
const roomLimit: number = 2

// every time we connect it will run the function
io.on("connection", (socket: Socket) => {
  socket.on("get-document", async data => {
    const room: string = data.documentId
    const user: string = data.socketId

    // finding or creating document
    const document = await findOrCreateDocument(room)

    // placing client in room and checking if room has more than 2 people
    createRooms(socket, room, user)

    // send document to client
    socket.emit("load-document", document.data)

    // client updates - messages
    socket.on("client-changes-messages", messages => {
      socket.broadcast.to(room).emit("server-changes-messages", messages)
    })

    // client updates - playerCards
    socket.on("client-changes-playerCards", playerCards => {
      socket.broadcast.to(room).emit("server-changes-playerCards", playerCards)
    })

    //client updates - playerHand
    socket.on("client-changes-playerHands", playerHands => {
      socket.broadcast.to(room).emit("server-changes-playerHands", playerHands)
    })

    // client updates - turn
    socket.on("client-changes-turn", turn => {
      socket.broadcast.to(room).emit("server-changes-turn", turn)
    })

    // client updates - dice
    socket.on("client-changes-dice", dice => {
      socket.broadcast.to(room).emit("server-changes-dice", dice)
    })

    // // client updates - centerCards
    // socket.on("client-changes-centerCards", centerCards => {
    //   socket.broadcast.to(room).emit("server-changes-centerCards", centerCards)
    // })

    // database updates - messages
    socket.on("update-database-messages", async messages => {
      await Document.findByIdAndUpdate(room, { "data.messages": messages })
    })

    // database updates - playerCards
    socket.on("update-database-playerCards", async playerCards => {
      await Document.findByIdAndUpdate(room, {
        "data.playerCards": playerCards,
      })
    })

    // database updates - playerHands
    socket.on("update-database-playerHands", async playerHands => {
      await Document.findByIdAndUpdate(room, {
        "data.playerHands": playerHands,
      })
    })

    // database updates - turn
    socket.on("update-database-turn", async turn => {
      await Document.findByIdAndUpdate(room, { "data.turn": turn })
    })

    // database updates - dice
    socket.on("update-database-dice", async dice => {
      await Document.findByIdAndUpdate(room, { "data.dice": dice })
    })

    // // database updates - centerCards
    // socket.on("update-database-centerCards", async centerCards => {
    //   await Document.findByIdAndUpdate(room, {
    //     "data.centerCards": centerCards,
    //   })
    // })
  })
})

// if we have a document with an id return it
// otherwise create a new document
async function findOrCreateDocument(id: string) {
  if (id == null) return

  const document = await Document.findById(id)

  if (document) return document

  return await Document.create({
    _id: id,
    data: {
      messages: [],
      playerCards: {
        blueCards: [],
        redCards: [],
      },
      playerHands: {
        blueHand: [],
        redHand: [],
      },
      turn: "blue",
      dice: {
        productionDie: {},
        eventDie: {},
      },
      centerCards: [],
    },
  })
}

function createRooms(socket: Socket, room: string, user: string) {
  socket.on("disconnect", () => {
    for (const [color, id] of Object.entries(roomTracker[room])) {
      if (socket.id === id) {
        roomTracker[room][color] = ""
      }
    }

    if (!roomTracker[room].blue && !roomTracker[room].red) {
      delete roomTracker[room]
    }
  })

  if (
    roomTracker[room] &&
    roomTracker[room].blue !== "" &&
    roomTracker[room].red !== ""
  ) {
    socket.emit("room-full", { user: user, roomTracker: roomTracker })
  }

  if (
    roomTracker[room] &&
    roomTracker[room].blue !== "" &&
    roomTracker[room].red === ""
  ) {
    roomTracker[room].red = user
    socket.join(room)
    socket.emit("color-from-server", "red")
  }

  if (
    roomTracker[room] &&
    roomTracker[room].blue === "" &&
    roomTracker[room].red !== ""
  ) {
    roomTracker[room].blue = user
    socket.join(room)
    socket.emit("color-from-server", "blue")
  }

  if (!roomTracker[room]) {
    roomTracker[room] = { blue: user, red: "" }
    socket.join(room)
    socket.emit("color-from-server", "blue")
  }
}
