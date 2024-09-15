export const getDescription = (aiResponse) => {
  const paragraphPart = aiResponse.split("Multiple Choice Questions:")[0];
  return paragraphPart;
};

export const getFormattedQuizArray = (aiResponse) => {
  const trimmedResponse = aiResponse.trim();
  const questionsArray = trimmedResponse.split(/\n(?=\d+\.)/);
  const formattedQuestionsArray = questionsArray.map((question) => {
    // Split each question by newline to separate the question from the answers
    const lines = question.split("\n").map((part) => part.trim());
    const questionText = lines[0];
    const answers = lines.slice(1);

    return {
      question: questionText,
      optionA:
        answers
          .find((a) => a.startsWith("A."))
          ?.slice(3)
          .trim() || "",
      optionB:
        answers
          .find((a) => a.startsWith("B."))
          ?.slice(3)
          .trim() || "",
      optionC:
        answers
          .find((a) => a.startsWith("C."))
          ?.slice(3)
          .trim() || "",
      optionD:
        answers
          .find((a) => a.startsWith("D."))
          ?.slice(3)
          .trim() || "",
    };
  });

  return formattedQuestionsArray;
};

export const getAnswerKey = (aiResponse) => {
  const aiAnswersArray = [];
  const trimmedResponse = aiResponse.trim();
  const questionAndAnswerArray = trimmedResponse.split(/\n(?=\d+\.)/);
  questionAndAnswerArray.length > 0 &&
    questionAndAnswerArray.map((questionAndAnswer) => {
      const fullAnswer = questionAndAnswer.split("Answer:")[1];
      const answerCharacter = fullAnswer.split(".")[0].trim();
      aiAnswersArray.push(answerCharacter.toUpperCase());
    });
  return aiAnswersArray;
};
