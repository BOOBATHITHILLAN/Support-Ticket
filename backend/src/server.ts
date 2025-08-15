import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ticketsRouter from "./routes/tickets";
import authRouter from "./routes/auth";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/tickets", ticketsRouter);
app.use("/api", authRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
