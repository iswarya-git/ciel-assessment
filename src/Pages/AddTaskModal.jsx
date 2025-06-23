// components/AddTaskModal.js
import React from "react";

const AddTaskModal = ({
  isOpen,
  onClose,
  onSave,
  newTask,
  onChange,
  editingTask,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6">
        <h2 className="text-3xl mb-6 text-center text-indigo-700">
          {editingTask ? "Edit Task" : "Add Task"}
        </h2>

        <input
          type="text"
          name="taskName"
          placeholder="Enter Task Name"
          className="w-full p-3 mb-4 rounded-md bg-gray-100 focus:ring-indigo-500"
          value={newTask.taskName}
          onChange={onChange}
        />

        <input
          name="description"
          placeholder="Description"
          rows={4}
          className="w-full p-3 mb-4 rounded-md bg-gray-100 resize-none focus:ring-indigo-500"
          value={newTask.description}
          onChange={onChange}
        />

        <input
          type="date"
          name="dueDate"
          className="w-full p-3 mb-6 rounded-md bg-gray-100 focus:ring-indigo-500"
          value={newTask.dueDate}
          onChange={onChange}
        />

        <div className="flex flex-col items-center">
          <button
            onClick={onSave}
            className="bg-[#1E3BA3] text-white px-8 py-3 rounded-full mb-3"
            disabled={!newTask.taskName.trim() || !newTask.dueDate}
          >
            {editingTask ? "Save" : "Add"}
          </button>
          <button
            onClick={onClose}
            className="text-gray-700 px-8 py-3 rounded-full"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTaskModal;
