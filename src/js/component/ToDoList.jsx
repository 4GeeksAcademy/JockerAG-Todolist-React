import React, {useState, useEffect} from "react";
import "../../styles/ToDoList.css"

function TodoItem ({ label, isdone, delete_work, toggle_todo }) {
    return(
        <div className="todo-item">
            <input type="checkbox" checked={isdone} onChange={toggle_todo} />
            <span className="todo-text">{label}</span>
            <button type="button" className="btn btn-danger" onClick={delete_work}>Eliminar</button>
        </div>
    );
}

export const ToDoList = () => {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState("")
    
   

    return(
        <>
            <form 
            onSubmit={ (event) => {
                event.preventDefault();
                if (input.length > 0){
                    setTodos((prevTodos) => [
                        {
                            label:input,
                            isdone:false
                        },
                        ...prevTodos
                    ]);
                    setInput("");
                }
            }}
            className="container d-flex flex-column align-items-center justify-content-center mt-5">
                <h1 className="fw-bold mb-4 text-primary">To Do List</h1>
                <input className="form-control form-control-lg" type="text" placeholder="Nueva Tarea" aria-label=".form-control-lg example" value={input} onChange={(event) => setInput(event.target.value)}></input>
                {todos.map((item, idx) => (
                    <TodoItem
                    key={idx} 
                    label={item.label} 
                    isdone={item.isdone} 
                    toggle_todo={() => 
                        setTodos((prevTodos) => {
                            const updatedTodos = [...prevTodos];
                            updatedTodos[idx].isdone = !item.isdone;
                            return updatedTodos
                        })
                    }
                    delete_work ={() => 
                    setTodos((prevTodos) => {
                        const updatedTodos = [...prevTodos];
                        updatedTodos.splice(idx, 1);
                        return updatedTodos
                    })    
                    }
                    />
                ))}
                <small className="mt-3 fw-bold">{todos.filter((item ) => !item.isdone).length} Tareas pendientes  </small>
            </form>

        </>
    );
}