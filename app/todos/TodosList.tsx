import { Todo } from '@/typings';
import Link from 'next/link';
import React from 'react'

const fetchTodos = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos");
    const todos:Todo[] = await res.json();
    return todos;
}

export const TodosList = async () => {
    const todos = await fetchTodos();
    return (
        <>
            {
                todos.map((todo,index) => <p key={todo.id}><Link href={`/todos/${todo.id}`}>todo: {index+1}</Link></p>)
            }
        </>
    )
}
