import Todolist from "../components/todolist";

export default function Home() {
    return (
        <main className="min-h-screen px-16 py-12">
            <h1 className="text-3xl mb-4 font-medium">Todolist</h1>
            <Todolist />
        </main>
    );
}
