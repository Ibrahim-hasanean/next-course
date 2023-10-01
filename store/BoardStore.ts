import { ID, databases, storage } from '@/appwrite';
import { getTodosGroupedByColumn } from '@/lib/getTodosGroupedByColumn';
import uploadImage from '@/lib/uploadImage';
import { Board, Column, Image, Todo, TypedColumn } from '@/typings';
import { create } from 'zustand';

interface BoardState {
  board: Board;
  isLoading: boolean;

  getBoard: () => void;
  setBoardState: (board: Board) => void;
  updateTodoInDB: (todo: Todo, columnId: TypedColumn) => void;
  searchString: string;
  setSearchString: (searchString: string) => void;
  deleteTask: (taskIndex: number, todo: Todo, id: TypedColumn) => void;
  newTaskInput: string;
  setNewTaskInput: (input: string) => void;
  newTaskType: TypedColumn;
  setNewTaskType: (id: TypedColumn) => void;
  image: File | null;
  setImage: (image: File | null) => void;
  addTask: (
    todo: string,
    columnId: TypedColumn,
    cb: () => void,
    image?: File | null
  ) => void;
}

export const useBoardStore = create<BoardState>((set, get) => ({
  board: {
    columns: new Map<TypedColumn, Column>(),
  },
  isLoading: false,
  image: null,
  searchString: '',
  newTaskInput: '',
  newTaskType: 'todo',
  setImage: (imageFile) => set({ image: imageFile }),
  setNewTaskType: async (id) => set({ newTaskType: id }),
  setNewTaskInput: async (input) => set({ newTaskInput: input }),
  deleteTask: async (taskIndex: number, todo: Todo, id: TypedColumn) => {
    const newColumns = new Map(get().board.columns);
    // delete todoId from newColmns
    newColumns.get(id)?.todos.splice(taskIndex, 1);
    set({ board: { columns: newColumns } });
    if (todo.image) {
      await storage.deleteFile(todo.image.bucketId, todo.image.fileId);
    }
    await databases.deleteDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_COLLECTION_ID!,
      todo?.$id
    );
  },
  getBoard: async () => {
    const board = await getTodosGroupedByColumn();
    set({ board });
  },
  setSearchString: (value) => {
    set({ searchString: value });
  },
  setBoardState: (board) => set({ board }),
  updateTodoInDB: async (todo, columId) => {
    await databases.updateDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_COLLECTION_ID!,
      todo?.$id,
      {
        title: todo.title,
        status: columId,
      }
    );
  },
  addTask: async (
    todo: string,
    columnId: TypedColumn,
    cb,
    image?: File | null
  ) => {
    let file: Image | undefined;
    if (image) {
      set({ isLoading: true });
      const fileUploaded = await uploadImage(image);
      if (fileUploaded) {
        file = {
          bucketId: fileUploaded.bucketId,
          fileId: fileUploaded.$id,
        };
      }
    }
    const { $id } = await databases.createDocument(
      process.env.NEXT_PUBLIC_DATABASE_ID!,
      process.env.NEXT_PUBLIC_COLLECTION_ID!,
      ID.unique(),
      {
        title: todo,
        status: columnId,
        ...(file && { image: JSON.stringify(file) }),
      }
    );

    set({ isLoading: false });
    cb();
    set({ newTaskInput: '' });
    set((state) => {
      const newColumns = new Map(state.board.columns);
      const newTodo: Todo = {
        $id,
        $createdAt: new Date().toISOString(),
        title: todo,
        status: columnId,
        ...(file && { image: file }),
      };
      const column = newColumns.get(columnId);
      if (!column) {
        newColumns.set(columnId, {
          id: columnId,
          todos: [newTodo],
        });
      } else {
        newColumns.get(columnId)?.todos.push(newTodo);
      }
      return {
        board: {
          columns: newColumns,
        },
      };
    });
  },
}));