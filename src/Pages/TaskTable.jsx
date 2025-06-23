import React, { useRef } from "react";

const TaskTable = ({
    tasks,
    currentPage,
    totalPages,
    itemsPerPage,
    setMenuOpenId,
    menuOpenId,
    openModal,
    handleDeleteTask,
    goToPage,
}) => {
    const menuRef = useRef(null);

    const formatDate = (date) => {
        if (!date) return "";
        const d = new Date(date);
        return d.toLocaleDateString("en-GB");
    };

    return (
        <>
            {tasks.length > 0 ? (
                <>
                    <div className="hidden sm:block h-[350px] overflow-x-auto">
                        <table className="min-w-full text-left border-separate border-spacing-y-3">
                            <thead className="!text-xs !font-normal !text-[#1E3BA3]">
                                <tr>
                                    <th className="px-4">No</th>
                                    <th className="px-4">Due Date</th>
                                    <th className="px-4">Task Name</th>
                                    <th className="px-4">Description</th>
                                    <th className="px-4">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task, idx) => (
                                    <tr key={task._id} className="bg-white shadow rounded-lg relative text-[13px] font-semibold">
                                        <td className="px-4 py-3">{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                                        <td className="px-4 py-3">{formatDate(task.dueDate)}</td>
                                        <td className="px-4 py-3">{task.taskName}</td>
                                        <td className="px-4 py-3">{task.description}</td>
                                        <td className="px-4 py-3 text-right relative">
                                            <button
                                                onClick={() => setMenuOpenId(menuOpenId === task._id ? null : task._id)}
                                                className="text-gray-600 hover:text-gray-900 px-2 py-1"
                                            >
                                                &#8942;
                                            </button>
                                            {menuOpenId === task._id && (
                                                <div
                                                    ref={menuRef}
                                                    className="absolute right-0 mt-2 w-24 bg-white border border-gray-300 rounded-md shadow-lg z-50"
                                                >
                                                    <button
                                                        onClick={() => openModal(task)}
                                                        className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDeleteTask(task._id)}
                                                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="sm:hidden space-y-4">
                        {tasks.map((task, idx) => (
                            <div
                                key={task._id}
                                className="bg-white shadow-md rounded-lg p-4 relative text-sm"
                            >
                                <p className="text-gray-700">
                                    {formatDate(task.dueDate)}
                                </p>
                                <p className="text-gray-700">
                                    {task.taskName}
                                </p>
                                <p className="text-gray-700">
                                    {task.description}
                                </p>

                                {menuOpenId === task._id && (
                                    <div
                                        ref={menuRef}
                                        className="absolute right-4 top-12 bg-white border border-gray-300 rounded-md shadow-lg z-50"
                                    >
                                        <button
                                            onClick={() => openModal(task)}
                                            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDeleteTask(task._id)}
                                            className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-100"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-wrap justify-center mt-6 gap-2 text-sm text-gray-700">
                        <button
                            className="px-3 py-1 rounded hover:bg-gray-200 disabled:opacity-50"
                            onClick={() => goToPage(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            &lt;
                        </button>
                        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
                            <button
                                key={page}
                                onClick={() => goToPage(page)}
                                className={`px-3 py-1 rounded-full ${currentPage === page ? "bg-blue-700 text-white" : "hover:bg-gray-200"
                                    }`}
                            >
                                {page}
                            </button>
                        ))}
                        <button
                            className="px-3 py-1 rounded hover:bg-gray-200 disabled:opacity-50"
                            onClick={() => goToPage(currentPage + 1)}
                            disabled={currentPage === totalPages}
                        >
                            &gt;
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-center text-gray-500 mt-4 text-sm">No tasks available.</p>
            )}
        </>
    );
};

export default TaskTable;
