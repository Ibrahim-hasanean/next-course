"use server"

import { IProducts } from "@/typings";
import { revalidateTag } from "next/cache";

export const addProductToDatabase = async (e: FormData) => {
    const product = e.get("product")?.toString();
    const price = e.get("price")?.toString();
    if (!product || !price) return;
    const newProduct: IProducts = {
        product, price
    };
    await fetch("https://650ac83edfd73d1fab08e2bb.mockapi.io/products", {
        method: "post",
        body: JSON.stringify(newProduct),
        headers: {
            "Content-Type": "application/json"
        }
    });
    revalidateTag("products")
}