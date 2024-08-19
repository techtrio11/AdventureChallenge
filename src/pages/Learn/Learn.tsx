import React, { useEffect, useState } from "react";
import { View, Button, Text, ScrollView } from "react-native";
import {
  arraysAreEqual,
  generateResponse,
  getAnswerKey,
  getDescription,
  getFormattedQuizArray,
} from "../../utils";
import { QuizQuestion } from "../../types/learn";
import { buttonStyles } from "../../styles";
import { SolidButton } from "../../components";

const Learn = () => {
  // const [aiPrompt, setAiPrompt] = useState(
  //   "Why is the sky blue? in one sentence"
  // );
  // const [tempResponse, setTempResponse] = useState([]);

  // const sendMessage = async () => {
  //   if (!aiPrompt) return;

  //   const botResponse = await generateResponse(aiPrompt);
  //   setTempResponse((prevMessages) => [
  //     ...prevMessages,
  //     `ChatGPT: ${botResponse}`,
  //   ]);
  // };
  // console.log(tempResponse);

  // useEffect(() => {
  //   sendMessage();
  // }, []);

  // const [response, setResponse] = useState();
  const [aiParagraph, setAiParagraph] = useState("");
  const [aiQuiz, setAiQuiz] = useState<QuizQuestion[]>([]);
  const [aiAnswers, setAiAnswers] = useState(["", "", ""]);
  const [selectedAnswers, setSelectedAnswers] = useState(["", "", ""]);
  const [showPass, setShowPass] = useState(false);
  const [pass, setPass] = useState(false);

  const response = `Paragraph of things. 
  
  Multiple Choice Questions:

1. What is the first priority when acting as a witness to a wildlife crime?

A) Taking photos
B) Ensuring your safety
C) Reporting immediately
D) Describing the suspect

2. Which detail is NOT mentioned as important when reporting a wildlife crime?

A) Vehicle description and license plate
B) Exact location of the crime
C) The type of clothing the suspect was wearing
D) Photos or videos of the scene

3. How can you provide the location of the wildlife crime to conservation officers?

A) Describe the weather conditions
B) Use a GPS location or mapping app
C) Estimate the distance from the nearest town
D) Provide the name of the nearest city

Answers:

B) Ensuring your safety
C) The type of clothing the suspect was wearing
B) Use a GPS location or mapping app`;

  useEffect(() => {
    setAiParagraph(getDescription(response));
    setAiQuiz(getFormattedQuizArray(response));
    setAiAnswers(getAnswerKey(response));
  }, [response]);

  // Handle change for radio buttons
  const handleAnswerChange = (questionIndex, option) => {
    setSelectedAnswers((prevState) => {
      const newAnswers = [...prevState];
      newAnswers[questionIndex] = option;
      return newAnswers;
    });
  };

  const handleSubmit = async () => {
    setPass(arraysAreEqual(aiAnswers, selectedAnswers));
    setShowPass(true);
  };

  return (
    <View>
      <ScrollView>
        <Text>{aiParagraph}</Text>
        <Text>
          {aiQuiz.map((item, index) => (
            <div key={index}>
              <h3>{item.question}</h3>
              <div>
                <label>
                  <input
                    type="radio"
                    name={`question${index}`}
                    value="A"
                    checked={selectedAnswers[index] === "A"}
                    onChange={() => handleAnswerChange(index, "A")}
                  />
                  A) {item.optionA}
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name={`question${index}`}
                    value="B"
                    checked={selectedAnswers[index] === "B"}
                    onChange={() => handleAnswerChange(index, "B")}
                  />
                  B) {item.optionB}
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name={`question${index}`}
                    value="C"
                    checked={selectedAnswers[index] === "C"}
                    onChange={() => handleAnswerChange(index, "C")}
                  />
                  C) {item.optionC}
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name={`question${index}`}
                    value="D"
                    checked={selectedAnswers[index] === "D"}
                    onChange={() => handleAnswerChange(index, "D")}
                  />
                  D) {item.optionD}
                </label>
              </div>
            </div>
          ))}
        </Text>
        <Text>
          {showPass && (pass ? "CORRECT!" : "Incorrect, please try again.")}
        </Text>
      </ScrollView>
      <View>
        <SolidButton
          buttonText="Check Answers"
          onPress={() => {
            handleSubmit();
          }}
          pressableColor={buttonStyles.solidGreenButton}
        />
      </View>
    </View>
  );
};

export default Learn;
