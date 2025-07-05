import { FaEdit, FaTrash, FaCheckCircle, FaRegCircle } from "react-icons/fa";
import "../styles/App.css";

export default function TaskItem({ task, onEdit, onToggle, onDelete }) {
  const {
    id,
    title,
    description,
    completed,
    createdAt,
    dueDate,
    priority,
    tags = [],
  } = task;

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  return (
    <div className={`task-item ${completed ? "completed" : ""}`}>
      <div className="info">
        <h3>{title}</h3>
        {description && <p>{description}</p>}

        <div className="meta">
          <span>Created At: {formatDate(createdAt)}</span>

          {dueDate && (
            <span className="due">
              Due:{" "}
              {new Date(dueDate).toLocaleDateString("en-IN", {
                dateStyle: "medium",
              })}
            </span>
          )}

          {priority && (
            <span className={`priority-${priority}`}>
              Priority: {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </span>
          )}
          {tags.map((tag, idx) => (
            <span key={idx}>#{tag}</span>
          ))}
        </div>
      </div>

      <div className="actions">
        <button
          onClick={() => onToggle(id)}
          title={completed ? "Mark as Pending" : "Mark as Completed"}
        >
          {completed ? <FaCheckCircle /> : <FaRegCircle />}
          <span>{completed ? "Undo" : "Done"}</span>
        </button>

        <button onClick={() => onEdit(task)} title="Edit Task">
          <FaEdit />
          <span>Edit</span>
        </button>

        <button
          onClick={() =>
            window.confirm("Are you sure you want to delete this task?") &&
            onDelete(id)
          }
          title="Delete Task"
        >
          <FaTrash />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
}
