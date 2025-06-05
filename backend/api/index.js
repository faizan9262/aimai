import app from "../index.js";
import { createServer } from "vercel-node-server";

const server = createServer(app);

export default async function handler(req, res) {
  server.emit("request", req, res);
}
