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
import { buttonStyles, globalStyles } from "../../styles";
import { SolidButton } from "../../components";
import {
  arrayUnion,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db, learnReferences } from "../../../FirebaseConfig";
import { blankLearn, LearnData } from "../../types";

type Props = {
  navigation: any;
  route: any;
};

const Learn = ({ navigation, route }: Props) => {
  const { userId } = route.params;
  const [learnChallenge, setLearnChallenge] = useState<LearnData>(blankLearn);
  const [isLoading, setIsLoading] = useState(true);
  // const [aiResponse, setAiResponse] = useState();
  const [aiParagraph, setAiParagraph] = useState("");
  const [aiQuiz, setAiQuiz] = useState<QuizQuestion[]>([]);
  const [aiAnswers, setAiAnswers] = useState(["", "", ""]);
  const [selectedAnswers, setSelectedAnswers] = useState(["", "", ""]);
  const [showPass, setShowPass] = useState(false);
  const [pass, setPass] = useState(false);

  //get challenges from database
  useEffect(() => {
    const fetchData = async () => {
      const learnQuery = query(learnReferences);
      const data = onSnapshot(learnQuery, (querySnapshot) => {
        console.log("querySnapshot", querySnapshot);
        const list: LearnData[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          list.push({
            id: doc.id,
            prompt: data.prompt,
          });
        });
        const getRandomItemFromArray = (array) => {
          return array[Math.floor(Math.random() * array.length)];
        };
        const learnChallenge = getRandomItemFromArray(list);
        setLearnChallenge(learnChallenge);
        setIsLoading(false);
      });
      return data;
    };
    fetchData();
    return () => {};
  }, []);

  // const sendMessage = async () => {
  //   if (!learnChallenge.prompt) return;

  //   const botResponse = await generateResponse(learnChallenge.prompt);
  //   setAiResponse((prevMessages) => [
  //     ...prevMessages,
  //     `ChatGPT: ${botResponse}`,
  //   ]);
  // };
  // console.log(aiResponse);

  // useEffect(() => {
  //   sendMessage();
  // }, []);

  const aiResponse = `Paragraph of things. 
  
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
    setAiParagraph(getDescription(aiResponse));
    setAiQuiz(getFormattedQuizArray(aiResponse));
    setAiAnswers(getAnswerKey(aiResponse));
    setIsLoading(false);
  }, [aiResponse]);

  // Handle change for radio buttons
  const handleAnswerChange = (questionIndex, option) => {
    setSelectedAnswers((prevState) => {
      const newAnswers = [...prevState];
      newAnswers[questionIndex] = option;
      return newAnswers;
    });
  };

  const checkAnswers = async () => {
    setPass(arraysAreEqual(aiAnswers, selectedAnswers));
    setShowPass(true);
  };

  const handleSubmit = async () => {
    const userRef = doc(db, "Users", userId);
    updateDoc(userRef, {
      activities_completed: arrayUnion({
        activity_id: "blah - test learn challenge", // learnChallenge.id,
        date_completed: new Date(),
        image_name: "",
      }),
    }).then(() => {
      navigation.navigate("Social", {
        userId: userId,
      });
    });
  };

  return (
    <View style={globalStyles.containerCenter}>
      {isLoading ? (
        <>Loading data ...</>
      ) : (
        <>
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
            <Text style={globalStyles.incorrect}>
              {showPass && (pass ? "CORRECT!" : "Incorrect, please try again.")}
            </Text>
          </ScrollView>
          <View>
            {pass ? (
              <SolidButton
                buttonText="Complete"
                onPress={handleSubmit}
                pressableColor={buttonStyles.solidGreenButton}
              />
            ) : (
              <SolidButton
                buttonText="Check Answers"
                onPress={() => {
                  checkAnswers();
                }}
                pressableColor={buttonStyles.solidGreenButton}
              />
            )}
          </View>{" "}
        </>
      )}
    </View>
  );
};

export default Learn;
