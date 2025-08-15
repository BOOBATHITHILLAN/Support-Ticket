import { useState, useEffect } from "react";
import type {
  TicketStatus,
  TicketPriority,
  Ticket,
} from "../store/ticketsSlice";

interface EditTicketModalProps {
  isOpen: boolean;
  ticket?: Ticket;
  onClose: () => void;
  onSave: (
    id: string,
    title: string,
    description: string,
    priority: TicketPriority,
    status: TicketStatus
  ) => Promise<void> | void;
}

export default function EditTicketModal({
  isOpen,
  ticket,
  onClose,
  onSave,
}: EditTicketModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TicketPriority>("Low");
  const [status, setStatus] = useState<TicketStatus>("Open");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  useEffect(() => {
    if (ticket) {
      setTitle(ticket.title);
      setDescription(ticket.description);
      setPriority(ticket.priority);
      setStatus(ticket.status);
      setErrors({});
    }
  }, [ticket]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("Low");
    setStatus("Open");
    setErrors({});
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};
    if (!title.trim()) newErrors.title = "Title is required";
    if (!description.trim()) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!ticket) return;
    if (!validateForm()) return;

    setLoading(true);
    try {
      await onSave(ticket.id, title.trim(), description.trim(), priority, status);
      resetForm();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !ticket) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">

        {/* Close X Icon */}
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
          disabled={loading}
          title="Close"
        >
          ✕
        </button>

        <h3 className="text-lg font-bold mb-4">Edit Ticket</h3>

        {/* Title */}
        <label className="block mb-2 text-sm font-medium">Title</label>
        <input
          className={`border rounded w-full px-3 py-2 mb-1 transition-colors duration-200 ${
            errors.title ? "border-red-500" : "border-gray-300"
          } focus:border-blue-500 hover:border-blue-400`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        {errors.title && <p className="text-red-500 text-xs mb-3">{errors.title}</p>}

        {/* Description */}
        <label className="block mb-2 text-sm font-medium">Description</label>
        <textarea
          className={`border rounded w-full px-3 py-2 mb-1 transition-colors duration-200 ${
            errors.description ? "border-red-500" : "border-gray-300"
          } focus:border-blue-500 hover:border-blue-400`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
        {errors.description && (
          <p className="text-red-500 text-xs mb-3">{errors.description}</p>
        )}

        {/* Priority */}
        <label className="block mb-2 text-sm font-medium">Priority</label>
        <select
          className="border rounded w-full px-3 py-2 mb-3 transition-colors duration-200 border-gray-300 focus:border-blue-500 hover:border-blue-400"
          value={priority}
          onChange={(e) => setPriority(e.target.value as TicketPriority)}
          disabled={loading}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        {/* Status */}
        <label className="block mb-2 text-sm font-medium">Status</label>
        <select
          className="border rounded w-full px-3 py-2 mb-4 transition-colors duration-200 border-gray-300 focus:border-blue-500 hover:border-blue-400"
          value={status}
          onChange={(e) => setStatus(e.target.value as TicketStatus)}
          disabled={loading}
        >
          <option value="Open">Open</option>
          <option value="InProgress">In Progress</option>
          <option value="Closed">Closed</option>
        </select>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded border hover:bg-gray-100 transition-colors duration-200"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-200 flex items-center justify-center ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
            title="Save changes"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Save Changes"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
