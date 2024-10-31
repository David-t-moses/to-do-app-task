"use client";

import { useState } from "react";

interface Task {
  id: number;
  title: string;
  completed: boolean;
}

export default function TodoApp() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editingText, setEditingText] = useState("");

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([
        ...tasks,
        { id: Date.now(), title: newTask.trim(), completed: false },
      ]);
      setNewTask("");
    }
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const startEditing = (task: Task) => {
    setEditingId(task.id);
    setEditingText(task.title);
  };

  const saveEdit = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingId ? { ...task, title: editingText } : task
      )
    );
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Todo List</h1>

        <div className="flex mb-6">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addTask()}
            className="flex-1 px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Add a new task..."
          />
          <button
            onClick={addTask}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 transition-colors"
          >
            Add
          </button>
        </div>

        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center mb-4 bg-gray-50 p-3 rounded-lg"
          >
            {editingId === task.id ? (
              <div className="flex-1 flex">
                <input
                  type="text"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                  className="flex-1 px-2 py-1 border rounded"
                  onKeyPress={(e) => e.key === "Enter" && saveEdit()}
                />
                <button
                  onClick={saveEdit}
                  className="ml-2 px-3 py-1 bg-green-500 text-white rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="mr-3"
                />
                <span
                  className={`flex-1 ${
                    task.completed ? "line-through text-gray-400" : ""
                  }`}
                  onDoubleClick={() => startEditing(task)}
                >
                  {task.title}
                </span>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="ml-2 px-2 py-1 text-red-500 hover:bg-red-100 rounded"
                >
                  x
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
