import { Server } from "socket.io";
import Chat from "../models/chatModel.js";

const socketHandler = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("New Client Connected");

    socket.on("joinRoom", (roomId) => {
      socket.join(roomId);
      console.log(`Client ${socket.id} joined room: ${roomId}`);
      //   if (members.includes(userId)) {
      //     socket.join(roomId);
      //     console.log(`Client ${socket.id} joined room: ${roomId}`);
      //   } else {
      //     console.log(
      //       `Client ${socket.id} tried to join room ${roomId} without permission.`
      //     );
      //   }
    });
    const existingRooms = new Set();
    socket.on("createRoom", (roomId, members) => {
      // Check if the room already exists
      if (!existingRooms.has(roomId)) {
        existingRooms.add(roomId); // Mark the room as created
        io.emit("roomCreated", { roomId, members });
        console.log(`Room Created: ${roomId}, Members: ${members}`);
      } else {
        console.log(`Room ${roomId} already exists, not creating again.`);
      }
    });

    socket.on("message", async ({ roomId, senderId, message }) => {
      const chatMessage = new Chat({ roomId, senderId, message });
      await chatMessage.save();

      io.to(roomId).emit("message", { senderId, message });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected : ", socket.id);
    });
  });
};

export default socketHandler;
