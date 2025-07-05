import TaskItem from "./TaskItem";
import "../styles/App.css";

export default function TaskList({ tasks, onEdit, onToggle, onDelete }) {
  if (!tasks || tasks.length === 0)
    return <p className="no-tasks">No tasks found.</p>;

  return (
    <ul className="task-list with-margin">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}
