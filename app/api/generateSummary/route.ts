import openai from "@/openapi";
import { NextResponse } from "next/server";

export async function POST(request:Request) {
    const { todos } = await request.json();


    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-instruct",
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [
            {
                role: 'system',
                content: `When responding, welcome the user always as Mr.Ahmed and say welcome to the Trello Todo App ! limit he response to 2000 chracters`,
            },
            {
                role: 'user',
                content: `Hi there, provide a summary of the following todos. Count how many todos are un  each category such as To do, in progress and done, then tell the user to have a productive day! Here's the data: ${JSON.stringify(
                    todos
                )}`,
            },
        ],
    });
    const { choices } = response;
    return NextResponse.json(choices[0].message);
}