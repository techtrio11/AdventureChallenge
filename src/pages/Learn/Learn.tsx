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
  const [aiResponse, setAiResponse] = useState("");
  const [aiQuiz, setAiQuiz] = useState<QuizQuestion[]>([]);
  const [aiAnswers, setAiAnswers] = useState(["", "", ""]);
  const [selectedAnswers, setSelectedAnswers] = useState(["", "", ""]);
  const [showPass, setShowPass] = useState(false);
  const [pass, setPass] = useState(false);

  //get all learn articles from database
  useEffect(() => {
    const fetchData = async () => {
      const learnQuery = query(learnReferences);
      const data = onSnapshot(learnQuery, (querySnapshot) => {
        const list: LearnData[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          list.push({
            id: doc.id,
            article: data.article,
          });
        });
        const getRandomItemFromArray = (array) => {
          return array[Math.floor(Math.random() * array.length)];
        };
        const learnChallenge = getRandomItemFromArray(list);
        setLearnChallenge(learnChallenge);
      });
      return data;
    };
    fetchData();
    return () => {};
  }, []);

  const sendMessage = async () => {
    if (!learnChallenge.article) return;
    const prompt =
      "Based on the previous paragraph, write three multiple choice questions and the answer. Formatted like this: 1. yyy A. xxx B. xxx C. xxx D. xxx Answer: B. xxx";
    await generateResponse(learnChallenge.article + " " + prompt).then(
      (data) => {
        setAiResponse(`${data}`);
      }
    );
  };

  useEffect(() => {
    sendMessage();
  }, [learnChallenge]);

  useEffect(() => {
    if (aiResponse !== "") {
      setAiQuiz(getFormattedQuizArray(aiResponse));
      setAiAnswers(getAnswerKey(aiResponse));
      setIsLoading(false);
    }
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
    console.log("aiAnswers, selectedAnswers", aiAnswers, selectedAnswers);
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
            <Text>{learnChallenge.article}</Text>
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
                      D) {item.optionC}
                    </label>
                  </div>
                </div>
              ))}
            </Text>
            {showPass && (
              <Text
                style={pass ? globalStyles.correct : globalStyles.incorrect}
              >
                {pass ? "CORRECT!" : "Incorrect, please try again."}
              </Text>
            )}{" "}
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
