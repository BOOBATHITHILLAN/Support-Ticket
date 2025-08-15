import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  fetchTickets,
  createTicket,
  updateTicket,
  type Ticket,
  type TicketPriority,
  type TicketStatus,
} from "../store/ticketsSlice";
import TicketList from "../components/TicketList";
import CreateTicketModal from "../components/CreateTicketModal";
import EditTicketModal from "../components/EditTicketModal";
import { useNavigate } from "react-router-dom"; // for redirect

export default function TicketsPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { tickets, loading } = useAppSelector((state) => state.tickets);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | undefined>();

  useEffect(() => {
    dispatch(fetchTickets());
  }, [dispatch]);

  const handleCreate = (
    title: string,
    description: string,
    priority: TicketPriority
  ) => {
    dispatch(createTicket({ title, description, priority }));
  };

  const handleEditSave = (
    id: string,
    title: string,
    description: string,
    priority: TicketPriority,
    status: TicketStatus
  ) => {
    dispatch(updateTicket({ id, title, description, priority, status }));
  };

  const handleOpenEdit = (id: string) => {
    const ticket = tickets.find((t) => t.id === id);
    setSelectedTicket(ticket);
    setIsEditOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <div className="relative p-4">
      {/* Loader overlay */}
      {loading && (
        <div className="absolute inset-0 bg-white/60 flex justify-center items-center z-50">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2 w-full">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Tickets</h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <button
            onClick={() => setIsCreateOpen(true)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto"
          >
            Create Ticket
          </button>

          <button
            onClick={handleLogout}
            className="hidden sm:block bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>

      <TicketList tickets={tickets} onEdit={handleOpenEdit} />
      <div className=" text-right mt-2">
        <button
          onClick={handleLogout}
          className="sm:hidden bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <CreateTicketModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreate={handleCreate}
      />
      <EditTicketModal
        isOpen={isEditOpen}
        ticket={selectedTicket}
        onClose={() => setIsEditOpen(false)}
        onSave={handleEditSave}
      />
    </div>
  );
}
