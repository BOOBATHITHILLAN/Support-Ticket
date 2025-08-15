import { Router } from "express";
import { createTicket, getTickets, updateTicket } from "../controllers/ticketsController";

const router = Router();

router.post("/create", createTicket);
router.get("/all", getTickets);
router.put("/update/:id", updateTicket);

export default router;
