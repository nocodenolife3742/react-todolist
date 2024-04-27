"use client";
import { useState } from 'react';

interface Todo {
    id: number,
    finished: boolean,
    name: string,
    date: Date
}

function CompareFunc(a: Todo, b: Todo) {
    return a.finished === b.finished ?
        a.name.localeCompare(b.name) :
        Number(a.finished) - Number(b.finished);
}

export default function Todolist() {
    const [datas, setDatas] = useState(new Array<Todo>());
    const [newId, setNewId] = useState(1);

    function addTodo() {
        setDatas([...datas, {
            id: newId,
            finished: false,
            name: 'new todo ' + newId,
            date: new Date()
        }].sort(CompareFunc));
        setNewId(newId + 1);
    }

    return (
        <div className="overflow-x-auto shadow-md rounded-xl">
            <table className="w-full text-left text-gray-900 font-medium whitespace-nowrap">
                <tbody>
                    <TodolistElements datas={datas} setDatas={setDatas} />
                    <AddTodoElement onClick={addTodo} />
                </tbody>
            </table>
        </div>
    );
}

function AddTodoElement({ onClick }: { onClick: () => void }) {
    return (
        <tr className="bg-white border-b">
            <td className="text-center text-gray-600 hover:bg-gray-200" colSpan={4}>
                <button className="h-full w-full py-2" onClick={onClick}>
                    + Add todo
                </button>
            </td>
        </tr>
    );
}

function TodolistElements({ datas, setDatas }: {
    datas: Todo[],
    setDatas: React.Dispatch<React.SetStateAction<Todo[]>>
}) {
    return datas.map((data) =>
        <tr className="bg-white border-b hover:bg-gray-200 w-full" key={data.id}>
            <td className="px-6 py-4 w-4">
                <input type="checkbox"
                    className="w-4 h-4 flex justify-center"
                    checked={data.finished}
                    onChange={() => {
                        datas.find(d => d.id === data.id)!.finished = !data.finished;
                        setDatas([...datas].sort(CompareFunc));
                    }} />
            </td>
            <td className="px-6 py-4 w-64">
                <input type="text"
                    className="w-fit bg-transparent focus:outline-gray-300 pl-2"
                    value={data.name}
                    onChange={(event) => {
                        datas.find(d => d.id === data.id)!.name = event.target.value;
                        setDatas([...datas].sort(CompareFunc));
                    }} />
            </td>
            <td className="px-6 py-4 w-12">
                {data.date.toLocaleDateString()}
            </td>
            <td className="px-6 py-4 w-6">
                <button className="w-full text-red-500 hover:text-red-800"
                    onClick={() => { setDatas(datas.filter(d => d.id !== data.id)) }}>
                    Delete
                </button>
            </td>
        </tr>
    );
}