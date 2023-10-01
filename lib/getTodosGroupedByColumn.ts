import { databases } from "@/appwrite"
import { Column, Todo, TypedColumn } from "@/typings";

export const getTodosGroupedByColumn =  async() => {
    const data = await databases.listDocuments(process.env.NEXT_PUBLIC_DATABASE_ID!, process.env.NEXT_PUBLIC_COLLECTION_ID!);
    const columns = data.documents.reduce((acc, todo) => {
        if (!acc.get(todo.status)) {
            acc.set(todo.status, {
                id: todo.status,
                todos: []
            });
        }
        acc.get(todo.status)?.todos.push({
            $id: todo.$id,
            $createdAt: todo.$createdAt,
            title: todo.title,
            status: todo.status,
            ...(todo.image && { image: JSON.parse(todo.image) })
        });
        return acc;
    }, new Map<TypedColumn, Column>);

    const columnsTypes: TypedColumn[] = ["todo", "inprogress", "done"];
    for (const column  of columnsTypes) {
        if (!columns.get(column as TypedColumn)) {
            columns.set(column as TypedColumn, {
                id: column as TypedColumn,
                todos:[]
            })
        }
    }

    const sortedColumns = new Map(
        Array.from(columns.entries()).sort((a, b) => columnsTypes.indexOf(a[0]) - columnsTypes.indexOf(b[0]))
    )
    return { columns: sortedColumns };
}