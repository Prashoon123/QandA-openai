import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const response = await openai.createCompletion("text-davinci-001", {
    prompt:
      `I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with "Unknown".\n\nQ: What is human life expectancy in the United States?\nA: Human life expectancy in the United States is 78 years.\n\nQ: Who was president of the United States in 1955?\nA: Dwight D. Eisenhower was president of the United States in 1955.\n\nQ: Which party did he belong to?\nA: He belonged to the Republican Party.\n\nQ: What is the square root of banana?\nA: Unknown\n\nQ: How does a telescope work?\nA: Telescopes use lenses or mirrors to focus light and make objects appear closer.\n\nQ: How many squigs are in a bonk?\nA: Unknown\n\nQ: When was cricket created?\nA: Cricket was created in the early 16th century.\n\nQ: Which country has won the most fifa world cups?\nA: Brazil has won the most fifa world cups with 5 titles.\n\nQ: When was this country created?\nA: Brazil was created on September 7th, 1822.\n\nQ: ${req.body.question}\nA:`,
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["\n"],
  });

  res.status(200).json({ result: response.data.choices[0].text });
}
