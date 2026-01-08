export const revalidate = 30;

export default async function TasksPage() {
    const tasks = await fetch('http://localhost:3000/api/tasks')
    .then(res=>res.json());

    return(
        <ul>
            {tasks.map((task:any)=>(
                <li key={task._id}>{task.title}</li>
            ))}
        </ul>
    );
}