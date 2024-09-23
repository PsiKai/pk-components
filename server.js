import express from "express"
import path from "path"

const app = express()

const __filename = new URL(import.meta.url).pathname
const __dirname = path.dirname(__filename)

app.use(express.static(path.join(__dirname, "build")))
app.use("/pk-components", express.static(path.join(__dirname, "build")))

app.get("*", (_req, res) => {
  res.sendFile(__dirname + "/build/index.html")
})

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000")
})
