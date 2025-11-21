"use client"

import TodoItem from "./TodoItem"

interface TodoListProps{
    todos:any[];
    setTodos:(todos:any[])=>void
}

const TodoList:React.FC<TodoListProps> =({todos,setTodos})=>{
    function handleDelete(id:string){
    
        setTodos(todos.filter((t)=>t._id !==id))
    }
    function handleUpdate(updated:any){
        if(!updated)return
        setTodos(todos.map((t)=>(t._id===updated._id?updated:t)))
    }
    return(
          <ul className="space-y-3">
        {todos.map(todo => (
        <TodoItem 
          key={todo._id}
          todo={todo}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
           />
         ))}
      </ul>
    );

};

export default TodoList;