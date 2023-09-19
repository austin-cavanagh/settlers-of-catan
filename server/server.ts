import { Server, Socket } from "socket.io"

const mongoose = require("mongoose")
mongoose.connect("mongodb://localhost/google-docs-clone")
const Document = require("./Document")

// creating server on port 3000
const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
})

// every time we connect it will run the function
io.on("connection", (socket: Socket) => {
  socket.on("get-document", async documentId => {
    // finding or creating document
    const document = await findOrCreateDocument(documentId)
    // join places socket into its own room
    socket.join(documentId)
    // send document to client
    socket.emit("load-document", document.data)

    // client sends messages and server sends to other clients
    socket.on("client-changes", messages => {
      // socket.broadcast sends message to everyone not on current socket
      socket.broadcast.to(documentId).emit("recieve-changes", messages)
    })

    // saving data to database
    socket.on("save-document", async data => {
      await Document.findByIdAndUpdate(documentId, { data })
    })
  })
})

// if we have a document with an Id return it
// otherwise create a new document
async function findOrCreateDocument(id: string) {
  if (id == null) return

  const document = await Document.findById(id)

  if (document) return document

  return await Document.create({ _id: id, data: [] })
}
