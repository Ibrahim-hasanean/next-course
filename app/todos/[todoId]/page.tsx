import React from 'react'
import {notFound} from "next/navigation"
import { Todo } from '@/typings';

const fetchTodo = async (id:number) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        next: {
        revalidate:60
    }});
    const todos:Todo = await res.json();
    return todos;
}

type Props={
    params: {
        todoId:number
    }
}

const TodoPage = async ({ params: { todoId } }: Props) => {
    const todo = await fetchTodo(todoId);
    if (!todo.id) return notFound();
    return (
        <div className='p-10 bg-yellow-200 border-2 m-2 shadow-lg'>
            <p>
                #{todo.id}: {todo.title}
            </p>
            <p>Completed: {todo.completed ? "Yes" : "No"}</p>
            <p className='border-t border-black mt-5 text-right'>
                By User: {todo.userId}
            </p>
        </div>
    )
}

export default TodoPage

export async function generateStaticParams() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos`);
    const todos: Todo[] = await res.json();

    // for the demo purpose
    const trimmmedTodos = todos.splice(0, 10);


    return trimmmedTodos.map(todo => ({
        todoId: todo.id.toString()
    }));
}