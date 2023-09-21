export type Todo = {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}


export interface IProducts {
    id?: number;
    product: string;
    price: string;
}