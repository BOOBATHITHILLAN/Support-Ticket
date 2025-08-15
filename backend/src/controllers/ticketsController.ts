import { Request, Response } from "express";
import { prisma } from "../prisma";
import { Priority, Status } from "../types/ticket";

export const createTicket = async (req: Request, res: Response) => {
  try {
    const { title, description, priority } = req.body as {
      title: string;
      description: string;
      priority: Priority;
    };

    const ticket = await prisma.ticket.create({
      data: { title, description, priority, status: "Open" },
    });

    res.status(201).json(ticket);
  } catch (err) {
    res.status(500).json({ error: "Failed to create ticket" });
  }
};

export const getTickets = async (_req: Request, res: Response) => {
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(tickets);
  } catch {
    res.status(500).json({ error: "Failed to fetch tickets" });
  }
};

export const updateTicketStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body as { status: Status };

    const ticket = await prisma.ticket.update({
      where: { id },
      data: { status },
    });

    res.json(ticket);
  } catch {
    res.status(500).json({ error: "Failed to update ticket status" });
  }
};
export const updateTicket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, description, priority, status } = req.body;

    const updated = await prisma.ticket.update({
      where: { id },
      data: { title, description, priority, status },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update ticket" });
  }
};
