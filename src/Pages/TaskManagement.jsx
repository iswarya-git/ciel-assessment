import React, { useState, useEffect } from "react";
import AddTaskModal from "./AddTaskModal";
import TaskTable from "./TaskTable";

const API_BASE = process.env.REACT_APP_API_BASE;
const Task_URL = `${API_BASE}api/tasks`

// API helper functions
async function addTask(newTask) {
  const res = await fetch(Task_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  });
  return res.json();
}

async function updateTask(id, updatedTask) {
  const res = await fetch(`${Task_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedTask),
  });
  return res.json();
}

async function deleteTask(id) {
  const res = await fetch(`${Task_URL}/${id}`, {
    method: "DELETE",
  });
  return res.json();
}

const TaskManagement = () => {
  const itemsPerPage = 3;

  const [allTasks, setAllTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTask, setNewTask] = useState({ taskName: "", description: "", dueDate: "" });
  const [menuOpenId, setMenuOpenId] = useState(null);

  useEffect(() => {
    async function fetchTasks() {
      const data = await fetch(Task_URL).then(res => res.json());
      setAllTasks(data);
    }
    fetchTasks();
  }, []);



  const handleAddOrEditTask = async () => {
    if (!newTask.taskName.trim() || !newTask.dueDate) {
      alert("Fill in Task Name and Due Date.");
      return;
    }
    let result;
    if (editingTask) {
      result = await updateTask(editingTask._id, newTask);
      setAllTasks(prev => prev.map(t => t._id === result._id ? result : t));
    } else {
      result = await addTask(newTask);
      setAllTasks(prev => [...prev, result]);
      const newTotal = Math.ceil((allTasks.length + 1) / itemsPerPage);
      setCurrentPage(newTotal);
    }
    resetModal();
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm("Confirm delete?")) {
      await deleteTask(id);
      setAllTasks(prev => prev.filter(t => t._id !== id));
      const newTotal = Math.ceil((allTasks.length - 1) / itemsPerPage);
      if (currentPage > newTotal) setCurrentPage(newTotal);
    }
  };

  const openModal = (task = null) => {
    setEditingTask(task);
    setNewTask(task ? {
      taskName: task.taskName, description: task.description, dueDate: task.dueDate.slice(0, 10)
    } : { taskName: "", description: "", dueDate: "" });
    setIsModalOpen(true);
  };

  const resetModal = () => {
    setIsModalOpen(false);
    setEditingTask(null);
    setNewTask({ taskName: "", description: "", dueDate: "" });
    setMenuOpenId(null);
  };

  const handleChange = (e) =>
    setNewTask(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const totalPages = Math.ceil(allTasks.length / itemsPerPage);
  const currentTasks = allTasks.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const goToPage = (page) => { if (page >= 1 && page <= totalPages) setCurrentPage(page); };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-[36px] text-[#1E3BA3] mb-6">Tasks Management</h1>
        <div className="flex justify-end mb-4">
          <button className="bg-[#1E3BA3] text-white px-8 py-3 rounded-full" onClick={() => openModal()}>
            + Add Task
          </button>
        </div>
        <TaskTable
          tasks={currentTasks}
          currentPage={currentPage}
          totalPages={totalPages}
          itemsPerPage={itemsPerPage}
          menuOpenId={menuOpenId}
          setMenuOpenId={setMenuOpenId}
          openModal={openModal}
          handleDeleteTask={handleDeleteTask}
          goToPage={goToPage}
        />
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={resetModal}
        onSave={handleAddOrEditTask}
        newTask={newTask}
        onChange={handleChange}
        editingTask={editingTask}
      />
    </div>
  );
};

export default TaskManagement;
