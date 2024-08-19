import axios from "axios";

export const generateResponse = async (message) => {
  const apiKey =
    "sk--WI7Hj9pTzFi3uZHkhuC7zIukwlfu-4wqmfGiiQt_WT3BlbkFJZ-ln3XrSTskjZMOpgESyizv027sOKJxq2vYUey5nEA";
  try {
    const result = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        model: "gpt-3.5-turbo-instruct",
        prompt: message,
        max_tokens: 100,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    return result.data.choices[0].text;
  } catch (error) {
    console.error(error);
    return "";
  }
};
