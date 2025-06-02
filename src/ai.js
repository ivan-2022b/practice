import { InferenceClient } from "@huggingface/inference";

const SYSTEM_PROMPT = `As a creative assistant chef, you suggest recipes based on a given list of ingredients. You don't necessarily need to use every ingredient in the list. You may use extra ingredients but try not to include too many extra ingredients. Format your response in markdown to make it easier to render to a web page.`;

// 🚨👉 ALERT: Read message below! You've been warned! 👈🚨
// If you're following along on your local machine instead of
// here on Scrimba, make sure you don't commit your API keys
// to any repositories and don't deploy your project anywhere
// live online. Otherwise, anyone could inspect your source
// and find your API keys/tokens. If you want to deploy
// this project, you'll need to create a backend of some kind,
// either your own or using some serverless architecture where
// your API calls can be made. Doing so will keep your
// API keys private.

// Make sure you set an environment variable in Scrimba 
// for HF_ACCESS_TOKEN

const client = new InferenceClient(import.meta.env.VITE_HF_ACCESS);

export async function getRecipeFromMistral(ingredientsArr) {
    const ingredientsString = ingredientsArr.join(", ").toLowerCase();
    console.log(ingredientsString);
    try {
        const response = await client.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "system", content: SYSTEM_PROMPT },
                { role: "user", content: `I have ${ingredientsString}. Please give me a recipe you'd recommend I make! Hint: salad.` },
            ],
            max_tokens: 1024,
        });
        return response.choices[0].message.content;
    } catch (err) {
        console.error(err.message);
    }
}
