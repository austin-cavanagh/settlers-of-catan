import { Server, Socket } from "socket.io"

const io = require("socket.io")(3000, {
  cors: {
    origin: ["http://localhost:5173"],
  },
})

io.on("connection", (socket: Socket) => {
  console.log(socket.id)
})
