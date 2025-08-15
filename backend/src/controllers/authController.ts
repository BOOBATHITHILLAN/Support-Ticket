import { Request, Response } from "express";
import { prisma } from "../prisma";

export const mockLogin = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body as {
      username: string;
      password: string;
    };

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    let user = await prisma.user.findUnique({ where: { username } });

    if (!user) {
      user = await prisma.user.create({
        data: { username, password },
      });
    }

    res.json({
      message: "Login successful",
      user: { id: user.id, username: user.username },
      token: "mock-token-12345",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process login" });
  }
};
