"use client";

import { useEffect, useState } from "react";

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);

    useEffect(()=>{
        fetch("/api/tasks")
        .then(res=>res.json())
        .then(setTasks)
    },[]);

    return (
        <>
            <h1>Dashboard</h1>
            {tasks.map((task:any)=>(
                <p key={task._id}>{task.title}</p>
            ))}
        </>
    )
}