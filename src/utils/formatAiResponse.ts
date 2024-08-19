export const getDescription = (aiResponse) => {
  const paragraphPart = aiResponse.split("Multiple Choice Questions:")[0];
  return paragraphPart;
};

export const getFormattedQuizArray = (aiResponse) => {
  const questionsPart = aiResponse
    .split("Multiple Choice Questions:")[1]
    .split("Answers:")[0]
    .trim();
  const questionsArray = questionsPart.split(/\n(?=\d+\.)/);
  const formattedQuestionsArray = questionsArray.map((question) => {
    // Split each question by newline to separate the question from the answers
    const lines = question.split("\n").map((part) => part.trim());
    const questionText = lines[0];
    const answers = lines.slice(1);

    return {
      question: questionText,
      optionA:
        answers
          .find((a) => a.startsWith("A)"))
          ?.slice(3)
          .trim() || "",
      optionB:
        answers
          .find((a) => a.startsWith("B)"))
          ?.slice(3)
          .trim() || "",
      optionC:
        answers
          .find((a) => a.startsWith("C)"))
          ?.slice(3)
          .trim() || "",
      optionD:
        answers
          .find((a) => a.startsWith("D)"))
          ?.slice(3)
          .trim() || "",
    };
  });

  return formattedQuestionsArray;
};

export const getAnswerKey = (aiResponse) => {
  const answersPart = aiResponse.split("Answers:")[1].trim();
  const aiAnswersArray = answersPart.match(/[A-D]/g);
  return aiAnswersArray;
};

export const getFormattedAnswerArray = (aiResponse) => {
  const answersPart = aiResponse.split("Answers:")[1].trim();
  const fullAnswersArray = answersPart
    .split("\n")
    .map((answer) => answer.trim());
  return fullAnswersArray;
};
