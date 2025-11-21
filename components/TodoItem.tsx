"use client";

import { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";
import { MdCancel } from "react-icons/md";

interface TodoItemProps {
  todo: any;
  onDelete: (id: string) => void;
  onUpdate: (updatedTodo: any) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  async function toggleComplete() {
    const res = await fetch(`/api/todos/${todo._id}`, {
      method: "PATCH",
      body: JSON.stringify({ completed: !todo.completed }),
    });

    const data = await res.json();
    onUpdate(data.data);
  }

  async function handleDelete() {
    await fetch(`/api/todos/${todo._id}`, { method: "DELETE" });
    onDelete(todo._id);
  }

  async function handleSave() {
    if (!newText.trim()) return;

    const res = await fetch(`/api/todos/${todo._id}`, {
      method: "PATCH",
      body: JSON.stringify({ text: newText }),
    });

    const data = await res.json();
    onUpdate(data.data);
    setIsEditing(false);
  }

  return (
   <li className="flex items-center justify-between bg-white p-4 rounded-xl shadow-sm border border-gray-200 transition">

  {!isEditing ? (
    <>
      <div className="flex items-center gap-3">

        <input 
          type="checkbox"
          checked={todo.completed}
          onChange={toggleComplete}
          className="h-5 w-5 accent-black"
        />

        <span className={`text-gray-900 text-lg ${todo.completed ? "line-through text-gray-400" : ""}`}>
          {todo.text}
        </span>
      </div>

      <div className="flex gap-2">
        <button 
          onClick={() => setIsEditing(true)}
          className="text-[30px] font:bold text-green-600 bg-green-100 rounded-md hover:bg-green-200"
        >
          <CiEdit/>
        </button>

        <button 
          onClick={handleDelete}
          className="text-[30px] text-red-600 hover:bg-red-200 bg-red-100 rounded-md"
        >
          <MdDeleteForever/>
        </button>
      </div>
    </>
  ) : (
    <>
      <input  
        value={newText}
        onChange={(e) => setNewText(e.target.value)}
        className="flex-1 bg-gray-50 px-3 py-2 border border-gray-300 rounded-lg outline-none"
      />

      <div className="flex gap-2 ml-2">
        <button 
          onClick={handleSave}
          className="text-[30px] text-white  bg-green-600 rounded-md px-3 py-1  hover:bg-green-800"
        >
          <VscSaveAs/>
        </button>

        <button 
          onClick={() => { setIsEditing(false); setNewText(todo.text); }}
          className="text-[30px] text-red-600 hover:text-red-800 "
        >
          <MdCancel/>
        </button>
      </div>
    </>
  )}

</li>

  );
};

export default TodoItem;
