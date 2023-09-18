import { Server, Socket } from "socket.io"

const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
  },
})

// every time we connect it will run the function
io.on("connection", (socket: Socket) => {
  socket.on("send-changes", messages => {
    // broadcast message to everyone not on current socket
    socket.broadcast.emit("recieve-changes", messages)
  })
})
