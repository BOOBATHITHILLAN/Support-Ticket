-- CreateEnum
CREATE TYPE "public"."Priority" AS ENUM ('Low', 'Medium', 'High');

-- CreateEnum
CREATE TYPE "public"."Status" AS ENUM ('Open', 'InProgress', 'Closed');

-- CreateTable
CREATE TABLE "public"."Ticket" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "priority" "public"."Priority" NOT NULL,
    "status" "public"."Status" NOT NULL DEFAULT 'Open',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Ticket_pkey" PRIMARY KEY ("id")
);
