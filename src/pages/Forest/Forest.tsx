import { Text, View } from "react-native";
import { ContainerCenter, SolidButton, TextButton } from "../../components";
import { challengesReference } from "../../../FirebaseConfig";
import { useEffect, useState } from "react";
import { ChallengesData } from "../../types";
import { query, onSnapshot, collection, where } from "firebase/firestore";
import { availableChallenges, getRandomChallenges } from "../../utils";
import { buttonStyles, globalStyles } from "../../styles";

type Props = {
  navigation: any;
};

const Forest = ({ navigation }: Props) => {
  const [challengeData, setChallengesData] = useState<ChallengesData[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<ChallengesData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [availableChallengeData, setAvailableChallengesData] = useState<
    ChallengesData[]
  >([]);

  //get challenges from database
  useEffect(() => {
    const fetchData = async () => {
      const challengesQuery = query(
        challengesReference,
        where("Location", "==", "Forest")
      );

      const unsubscribe = onSnapshot(challengesQuery, (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          list.push({
            id: doc.id,
            name: data.Name,
            description: data.Description,
          });
        });
        setChallengesData(list);
        setIsLoading(false);
      });

      return unsubscribe;
    };

    fetchData();

    // Cleanup function
    return () => {
      // Perform any cleanup here if needed
    };
  }, []);

  //get initial challenges
  useEffect(() => {
    //TO DO: pass in user completed data
    setSelectedOptions(getRandomChallenges(challengeData));
    setAvailableChallengesData(availableChallenges(challengeData));
  }, [challengeData]);

  return (
    <ContainerCenter>
      {isLoading ? (
        <>Loading data ...</>
      ) : (
        <>
          <Text style={globalStyles.acHeader}>ADVENTURE CHALLENGE</Text>
          <Text style={globalStyles.mainHeader}>In the forest:</Text>
          {selectedOptions.map((option, index) => {
            const isFirstButton = index === 0;
            const buttonColor = isFirstButton
              ? buttonStyles.solidGreenButton
              : buttonStyles.solidYellowButton;
            return (
              <View key={`forest_${index}`}>
                <SolidButton
                  buttonText={option.name}
                  onPress={() => {
                    navigation.navigate("ForestChallenge", {
                      challengeId: option.id,
                      challengeName: option.name,
                      challengeDescription: option.description,
                    });
                  }}
                  pressableColor={buttonColor}
                />
                {isFirstButton && selectedOptions.length == 2 && (
                  <Text
                    key={`forest_OR_${index}`}
                    style={globalStyles.mainHeader}
                  >
                    OR
                  </Text>
                )}
              </View>
            );
          })}
          {availableChallengeData.length > 2 && (
            <TextButton
              buttonText="Pick Again"
              onPress={() => {
                setSelectedOptions((prevOptions) =>
                  getRandomChallenges(challengeData, prevOptions)
                );
              }}
            />
          )}
        </>
      )}
    </ContainerCenter>
  );
};

export default Forest;
