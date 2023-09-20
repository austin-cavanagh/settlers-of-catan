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
  [room: string]: string[]
}

let oldPlayerId: string = ""
const roomTracker: RoomTracker = {}
const roomLimit: number = 2

// every time we connect it will run the function
io.on("connection", (socket: Socket) => {
  socket.on("get-document", async data => {
    const room = data.documentId
    const user = data.socketId

    // finding or creating document
    const document = await findOrCreateDocument(room)

    // placing client in room and checking if room has more than 2 people
    socket.on("disconnect", () => {
      oldPlayerId = user
      roomTracker[room] = roomTracker[room].filter(user => user !== socket.id)
    })

    if (roomTracker[room] && roomTracker[room].length >= 2) {
      socket.emit("room-full", { user: user, roomTracker: roomTracker })
    }

    if (roomTracker[room] && roomTracker[room].length < 2) {
      roomTracker[room].push(user)
      socket.join(room)
    }

    if (!roomTracker[room]) {
      roomTracker[room] = [user]
      socket.join(room)
    }

    console.log(roomTracker)

    // if (roomTracker[room]) roomTracker[room].push(user)
    // if (!roomTracker[room]) roomTracker[room] = [user]

    // socket.on("disconnect", () => {
    //   oldPlayerId = user
    //   roomTracker[room] = roomTracker[room].filter(user => user !== socket.id)
    // })

    // if (roomTracker[room].length > roomLimit) {
    //   roomTracker[room] = roomTracker[room].filter(user => user !== socket.id)
    //   socket.emit("room-full", { user: user, roomTracker: roomTracker })
    // } else {
    //   socket.join(room)
    // }

    // send document to client
    socket.emit("load-document", document.data)

    // client sends messages and server sends to other clients
    socket.on("client-changes", messages => {
      // .broadcast sends message to everyone not on current socket
      // .to specifies which room to send data to
      socket.broadcast.to(room).emit("server-changes", messages)
    })

    // saving data to database
    socket.on("update-database", async data => {
      await Document.findByIdAndUpdate(room, { data })
    })
  })
})

// if we have a document with an id return it
// otherwise create a new document
async function findOrCreateDocument(id: string) {
  if (id == null) return

  const document = await Document.findById(id)

  if (document) return document

  return await Document.create({ _id: id, data: [] })
}
