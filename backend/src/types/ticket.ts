export type Priority = "Low" | "Medium" | "High";
export type Status = "Open" | "InProgress" | "Closed";

export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  createdAt: Date;
}
