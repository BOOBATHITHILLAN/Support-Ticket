import type { Ticket } from "../store/ticketsSlice";

interface TicketListProps {
  tickets: Ticket[];
  onEdit: (id: string) => void;
}

export default function TicketList({ tickets, onEdit }: TicketListProps) {
  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Priority</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {tickets.length > 0 ? (
              tickets.map((ticket) => (
                <tr key={ticket.id}>
                  <td className="px-4 py-2 border">{ticket.title}</td>
                  <td className="px-4 py-2 border">{ticket.description}</td>
                  <td className="px-4 py-2 border">{ticket.priority}</td>
                  <td className="px-4 py-2 border">{ticket.status}</td>
                  <td className="px-4 py-2 border text-center">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      onClick={() => onEdit(ticket.id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="text-center text-gray-500 py-4 border"
                >
                  No tickets created
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="block md:hidden">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="border rounded p-4 mb-3 shadow-sm bg-white"
            >
              <h3 className="font-bold text-lg">
                {" "}
                <span className="font-semibold">Title:</span>
                {ticket.title}
              </h3>
              <p className="text-sm text-gray-700">
                {" "}
                <span className="font-semibold">Description:</span>
                {ticket.description}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Priority:</span>{" "}
                {ticket.priority}
              </p>
              <p className="text-sm">
                <span className="font-semibold">Status:</span> {ticket.status}
              </p>
              <button
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded w-full"
                onClick={() => onEdit(ticket.id)}
              >
                Edit
              </button>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 py-6 border rounded">
            No tickets created
          </div>
        )}
      </div>
    </>
  );
}
