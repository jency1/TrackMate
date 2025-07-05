import { useState, useEffect } from "react";
import "../styles/App.css";
import { FaSave, FaTimes } from "react-icons/fa";

export default function TaskForm({ onSubmit, editingTask, onCancel }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("low");
  const [dueDate, setDueDate] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDesc(editingTask.description);
      setPriority(editingTask.priority);
      setDueDate(editingTask.dueDate);
      setTags((editingTask.tags || []).join(", "));
    }
  }, [editingTask]);

  const handle = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description: desc,
      priority,
      dueDate,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
    });

    if (!editingTask) {
      setTitle("");
      setDesc("");
      setPriority("low");
      setDueDate("");
      setTags("");
    }
  };

  return (
    <>
      <h2 className="form-heading">
        {editingTask ? "Edit Task" : "Create New Task"}
      </h2>

      <form className="task-form vertical-form" onSubmit={handle}>
        <label>
          <div className="inline-label">
            Title <span>*</span>
          </div>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            maxLength={50}
          />
        </label>

        <label>
          <div className="inline-label">Description</div>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={3}
          />
        </label>

        <label>
          Priority
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>

        <label>
          Due Date
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </label>

        <label>
          Tags (separated by commas)
          <input
            placeholder="tag1, tag2"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </label>

        <div className="form-buttons">
          <button type="submit">
            <FaSave />
            {editingTask ? "Update" : "Save"}
          </button>
          <button type="button" onClick={onCancel}>
            <FaTimes />
            Cancel
          </button>
        </div>
      </form>
    </>
  );
}
