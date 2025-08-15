import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios from "axios";
export type TicketStatus = "Open" | "InProgress" | "Closed";
export type TicketPriority = "Low" | "Medium" | "High";
export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt?: string;
}

interface TicketsState {
  tickets: Ticket[];
  loading: boolean;
  error: string | null;
}

const initialState: TicketsState = {
  tickets: [],
  loading: false,
  error: null,
};

const API_URL = import.meta.env.VITE_API_URL
  ? `${import.meta.env.VITE_API_URL}/tickets`
  : "http://localhost:5000/api/tickets";

export const fetchTickets = createAsyncThunk("tickets/fetch", async () => {
  const res = await axios.get<Ticket[]>(`${API_URL}/all`);
  return res.data;
});

export const createTicket = createAsyncThunk(
  "tickets/create",
  async (ticket: Omit<Ticket, "id" | "status" | "createdAt">) => {
    const res = await axios.post<Ticket>(`${API_URL}/create`, ticket);
    return res.data;
  }
);

export const updateTicketStatus = createAsyncThunk(
  "tickets/updateStatus",
  async ({ id, status }: { id: string; status: Ticket["status"] }) => {
    const res = await axios.put<Ticket>(`${API_URL}/update/${id}`, { status });
    return res.data;
  }
);
export const updateTicket = createAsyncThunk(
  "tickets/update",
  async ({
    id,
    title,
    description,
    priority,
    status,
  }: {
    id: string;
    title: string;
    description: string;
    priority: Ticket["priority"];
    status: Ticket["status"];
  }) => {
    const res = await axios.put<Ticket>(`${API_URL}/update/${id}`, {
      title,
      description,
      priority,
      status,
    });
    return res.data;
  }
);

const ticketsSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchTickets.fulfilled,
        (state, action: PayloadAction<Ticket[]>) => {
          state.loading = false;
          state.tickets = action.payload;
        }
      )
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch tickets";
      })
      .addCase(
        createTicket.fulfilled,
        (state, action: PayloadAction<Ticket>) => {
          state.tickets.push(action.payload);
        }
      )
      .addCase(updateTicket.fulfilled, (state, action) => {
        const index = state.tickets.findIndex(
          (t) => t.id === action.payload.id
        );
        if (index !== -1) {
          state.tickets[index] = action.payload;
        }
      })
      .addCase(
        updateTicketStatus.fulfilled,
        (state, action: PayloadAction<Ticket>) => {
          const index = state.tickets.findIndex(
            (t) => t.id === action.payload.id
          );
          if (index !== -1) {
            state.tickets[index] = action.payload;
          }
        }
      );
  },
});

export default ticketsSlice.reducer;
