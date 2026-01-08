export const revalidate = 30;

export default async function TaskPage({params}:any){
    const tasks = await fetch("http://localhost:3000/api/tasks")
    .then(res=>res.json());

    const task = tasks.find((t:any)=> t._id === params.id);

    return <h2>{task?.title}</h2>
}