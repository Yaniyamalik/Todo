"use client";

import { useEffect,useState } from "react";
import TodoForm from "@/components/TodoForm";
import TodoList from "@/components/TodoList";

export default function Home() {
  const[todos,setTodos]=useState<any[]>([]);

  async function fetchTodos(){
    const res = await fetch("/api/todos");
    const data= await res.json();
    setTodos(data.data||[]);
  }
  useEffect(()=>{
    fetchTodos();
  },[])
  return (
  <main className="min-h-screen bg-gray-50 flex justify-center py-10 px-4 ">
  <div className="w-[50%] max-w-lg bg-white/20 rounded-lg p-5 shadow-xl ">
    
    <h1 className="text-4xl font-semibold text-neutral-900 text-center mb-8">
      Todo 
    </h1>

    <TodoForm onAdd={(todo) => setTodos(prev => [todo, ...prev])} />

    <div className="mt-6 space-y-3">
      <TodoList todos={todos} setTodos={setTodos} />
    </div>

  </div>
</main>


    
  );
}
