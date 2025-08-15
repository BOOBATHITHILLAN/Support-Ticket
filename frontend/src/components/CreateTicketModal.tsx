import { useState } from "react";
import type { TicketPriority } from "../store/ticketsSlice";

interface CreateTicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (
    title: string,
    description: string,
    priority: TicketPriority
  ) => Promise<void> | void; // allow async
}

export default function CreateTicketModal({
  isOpen,
  onClose,
  onCreate,
}: CreateTicketModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TicketPriority>("Low");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{
    title?: string;
    description?: string;
  }>({});

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPriority("Low");
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
    if (!validateForm()) return;

    setLoading(true);
    try {
      await onCreate(title.trim(), description.trim(), priority);
      resetForm();
      onClose();
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer hover:bg-gray-300 rounded-sm px-1"
          disabled={loading}
        >
          ✕
        </button>

        <h3 className="text-lg font-bold mb-4">Create Ticket</h3>

        <label className="block mb-2 text-sm font-medium">Title</label>
        <input
          className={`border rounded w-full px-3 py-2 mb-1 ${
            errors.title ? "border-red-500" : ""
          }`}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={loading}
        />
        {errors.title && (
          <p className="text-red-500 text-xs mb-3">{errors.title}</p>
        )}

        <label className="block mb-2 text-sm font-medium">Description</label>
        <textarea
          className={`border rounded w-full px-3 py-2 mb-1 ${
            errors.description ? "border-red-500" : ""
          }`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={loading}
        />
        {errors.description && (
          <p className="text-red-500 text-xs mb-3">{errors.description}</p>
        )}

        <label className="block mb-2 text-sm font-medium">Priority</label>
        <select
          className="border rounded w-full px-3 py-2 mb-4"
          value={priority}
          onChange={(e) => setPriority(e.target.value as TicketPriority)}
          disabled={loading}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            onClick={handleClose}
            className="px-4 py-2 rounded border cursor-pointer"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className={`bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 flex items-center justify-center cursor-pointer ${
              loading ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              "Create"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
