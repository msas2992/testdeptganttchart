import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    const { userId, prompt, tag, jsonData } = await req.json();

    try {
        await connectToDB();
        console.log(jsonData)
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag,
            jsonData
        })
        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt), { status: 201 })
    } catch (error) {
        return new Response(error, { status : 500 })
    }
}