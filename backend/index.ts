import express from "express"
import cors from "cors"
import "dotenv/config";

import letterRoute from "./routes/letter"
import authRoute from "./routes/auth"
import auth from "./middlewares/auth";

const app = express()

app.use(cors())
app.use(express.json())

app.use("/letter",auth, letterRoute)
app.use("/auth", authRoute);

app.listen(3001, () => {
    console.log("Server running port 3001")
})