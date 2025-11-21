"use client"

import { useState } from "react"

interface TodoFormProps{
    onAdd:(todo:any)=>void;
}

const TodoForm:React.FC<TodoFormProps>=({onAdd})=>{
    const[text,setText]=useState("")

    async function handlesubmit(e:React.FormEvent){
        e.preventDefault();
        if(!text.trim()){
            console.log("Add Task First")
            return;
        }
        const res=await fetch("/api/todos",{
            method:"POST",
            body:JSON.stringify({text})
        })

        const data =await res.json();
        onAdd(data.data);
        setText("")

    }
    return(
            <form 
               onSubmit={handlesubmit} 
               className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-gray-20 0"
            >
               <input
              type="text"
              value={text}
              placeholder="What do you need to do?"
              onChange={(e)=>setText(e.target.value)}
              className="flex-1 bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
              />

              <button 
                type="submit"
                 className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium transform hover:scale-105 transition "
               >
              Add task
             </button>
            </form>


    );

};

export default TodoForm;