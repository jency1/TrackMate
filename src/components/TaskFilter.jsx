import "../styles/App.css";

export default function TaskFilter({ currentFilter, setFilter, tasks }) {
  const counts = tasks.reduce(
    (acc, t) => {
      acc.all++;
      t.completed ? acc.completed++ : acc.pending++;
      return acc;
    },
    { all: 0, completed: 0, pending: 0 }
  );

  return (
    <div className="tab-filter">
      {["all", "completed", "pending"].map((f) => (
        <button
          key={f}
          className={currentFilter === f ? "active" : ""}
          onClick={() => setFilter(f)}
        >
          {f.charAt(0).toUpperCase() + f.slice(1)} ({counts[f]})
        </button>
      ))}
    </div>
  );
}
