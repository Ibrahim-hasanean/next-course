import { Board } from "@/typings";
import { formateTodosForAi } from "./formateTodosForAi";

export const fetchSuggestions =async (board:Board) => {
    const todos = formateTodosForAi(board);
    console.log("formated todos",todos);
    const res = await fetch("/api/generateSummary", {
        method: "Post",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({todos})
    });
    console.log("response",res);
    const gptData = await res.json();
    console.log("gptData",gptData);
    const { content } = gptData;
    return content;
}