import { useState } from "react";

export default function App() {
    const [page, setPage] = useState("home");
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");
    const [search, setSearch] = useState("");
    const [message, setMessage] = useState("No notifications yet");

    function addTask() {
        if (input.trim() === "") return;
        setTasks([...tasks, { text: input, done: false }]);
        setInput("");
        setMessage("New task added successfully!");
    }

    function deleteTask(index) {
        setTasks(tasks.filter((_, i) => i !== index));
        setMessage("Task deleted");
    }

    function toggleTask(index) {
        setTasks(
            tasks.map((task, i) =>
                i === index ? { ...task, done: !task.done } : task
            )
        );
    }

    const filteredTasks = tasks.filter((task) =>
        task.text.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="app">
            <aside className="sidebar">
                <h2>TaskFlow</h2>

                <button onClick={() => setPage("home")}>Home</button>
                <button onClick={() => setPage("tasks")}>Tasks</button>
                <button onClick={() => setPage("about")}>About</button>
                <button onClick={() => setMessage("You clicked notification!")}>
                    Notification
                </button>
            </aside>

            <main className="main">
                <div className="topbar">
                    <input
                        placeholder="Search tasks..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <button onClick={addTask}>Add Task</button>
                </div>

                <p className="message">{message}</p>

                {page === "home" && (
                    <section className="card">
                        <h1>Welcome to TaskFlow</h1>
                        <p>A modern React todo app with working buttons and clean UI.</p>
                    </section>
                )}

                {page === "tasks" && (
                    <section className="card">
                        <h1>Your Tasks</h1>

                        <div className="inputBox">
                            <input
                                placeholder="Write a task..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <button onClick={addTask}>Create</button>
                        </div>

                        <ul>
                            {filteredTasks.map((task, index) => (
                                <li key={index}>
                                    <span
                                        onClick={() => toggleTask(index)}
                                        className={task.done ? "done" : ""}
                                    >
                                        {task.text}
                                    </span>
                                    <button className="delete" onClick={() => deleteTask(index)}>
                                        Delete
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {page === "about" && (
                    <section className="card">
                        <h1>About App</h1>
                        <p>This app is built with React.js using state, events, search, delete, and complete functionality.</p>
                    </section>
                )}
            </main>
        </div>
    );
}