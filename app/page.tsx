import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>TaskFlow</h1>
      <Link href="/tasks/create"><button>Add Task</button></Link>
      <Link href="/tasks"><button>Show Tasks</button></Link>
    </main>
  );
}