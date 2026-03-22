import { createHttpServer } from "./http/server.js"

const PORT = parseInt(process.env.PORT ?? "3001", 10)

createHttpServer(PORT)
