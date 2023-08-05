import { io } from "socket.io-client";
const socket = io('http://localhost:3900');

export default socket;