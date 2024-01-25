import React, {useState, useEffect} from "react";
import "../../styles/ToDoList.css"

function TodoItem ({ label, completado, eliminarTarea, toggle_todo }) {
    return(
        <div className="todo-item">
            <input type="checkbox" checked={completado} onChange={toggle_todo} />
            <span className="todo-text">{label}</span>
            <button type="button" className="btn btn-danger" onClick={eliminarTarea}>Eliminar</button>
        </div>
    );
}

export const ToDoList = () => {
    const [tareas, setTareas] = useState([]);
    const [input, setInput] = useState("")
    const [user, setUser] = useState('Alfredo')
    const url_base = 'https://playground.4geeks.com/apis/fake/todos'

    //Post
    const createTodoList = async () => {
        const url = url_base + '/user/' + user;
        const options = {
            method: "POST",
            body: JSON.stringify([]),
            headers: {
                "Content-type" : "application/json"
            }
        };
        const response = await fetch( url, options);
        if(!response.ok){
            //tratamos el error 
            console.log("Error: ", response.status , response.statusText);
            return response.status
        }
        const data = await response.json();
        console.log(data);
        getTodoList();
    }

    // Get

    const getTodoList = async () => {
        const url = url_base + '/user/' + user; 
        const options = {
            method: "GET"
        };
        const response = await fetch(url, options)
        if(!response.ok){
            // tratamos el error
            console.log('Error: ', response.status, response.statusText);
            return response.status
        }
        const data = await response.json()
        console.log(data);
        setTareas(data)
    }
    // PUT
    const updateTodoList = async (newTask) => {
        const dataToSend = [...tareas, newTask]
        const url = url_base + '/user/' + user;
        const options = {
            method: "PUT",
            body: JSON.stringify(dataToSend),
            headers:{
                "Content-type": "application/json"
            }
        }
        const response = await fetch(url, options);
        if(!response.ok) {
        // tratamos el error
        console.log('Error: ', response.status , response.statusText);
        return response.status
        }
        const data = await response.json();
        console.log(data);
        getTodoList();
    } 
    // DELETE 
    const deleteTodoList = async () => {
        const url = url_base + '/user/' + user;
        const options = {
            method: "DELETE"
        };
        const response = await fetch(url, options);
        if (!response.ok){
            console.log('Error: ', response.status , response.statusText);
            return
        }
        const data = await response.json();
        console.log(data);
        setTareas([])
    }

    const deleteTodo = async() => {
        const url = url_base +'/user/' + user;
        const options = {
            method: "DELETE"
        };
        const response = await fetch(url, options);
        if(!response.ok){
            console.log('Error: ', response.status , response.statusText );
            return;
        }
        const data = await response.json();
        console.log(data);
        setTareas([]);
    }

    return(
        <>
            <form 
            onSubmit={ (event) => {
                event.preventDefault();
                if (input.length > 0){
                    setTareas((prevtareas) => [
                        {
                            label:input,
                            completado:false
                        },
                        ...prevtareas
                    ]);
                    setInput("");
                }
            }}
            className="container d-flex flex-column align-items-center justify-content-center mt-5">
                <h1 className="fw-bold mb-4 text-primary">To Do List</h1>
                <input className="form-control form-control-lg" type="text" placeholder="Nueva Tarea" aria-label=".form-control-lg example" value={input} onChange={(event) => setInput(event.target.value)}></input>
                {tareas.map((item, idx) => (
                    <TodoItem
                    key={idx} 
                    label={item.label} 
                    completado={item.completado} 
                    toggle_todo={() => 
                        setTareas((prevtareas) => {
                            const updatedtareas = [...prevtareas];
                            updatedtareas[idx].completado = !item.completado;
                            return updatedtareas
                        })
                    }
                    eliminarTarea ={() => 
                    setTareas((prevtareas) => {
                        const updatedtareas = [...prevtareas];
                        updatedtareas.splice(idx, 1);
                        return updatedtareas
                    })    
                    }
                    />
                ))}
                <div className="Btns d-flex">
                <button onClick={createTodoList} className="btn btn-primary m-3">Crear todo list</button>
                <button onClick={updateTodoList} className="btn btn-warning m-3">Obtener tareas</button>
                <button onClick={deleteTodoList} className="btn btn-danger m-3">Eliminar</button>
                <button onClick={deleteTodo} className="btn btn-danger m-3">Eliminar Todo</button>
                </div>
                <small className="mt-3 fw-bold">{tareas.filter((item ) => !item.completado).length} Tareas pendientes  </small>
            </form>

        </>
    );
}