import io from "socket.io-client";

// backend on localhost
// const baseURL = 'http://localhost:3001';
const baseUrl = "/";

export const socket = io(baseUrl);
