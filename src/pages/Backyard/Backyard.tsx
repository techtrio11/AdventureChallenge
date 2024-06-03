import { Text, View } from "react-native";
import { ContainerCenter, SolidButton, TextButton } from "../../components";
import { challengesReference } from "../../../FirebaseConfig";
import { useEffect, useState } from "react";
import { ChallengesData } from "../../types";
import { query, onSnapshot, where } from "firebase/firestore";
import { getRandomChallenges } from "../../utils";
import { buttonStyles, globalStyles } from "../../styles";

type Props = {
  navigation: any;
};

const Backyard = ({ navigation }: Props) => {
  const [challengeData, setChallengesData] = useState<ChallengesData[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<ChallengesData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  //get challenges from database
  useEffect(() => {
    const fetchData = async () => {
      const challengesQuery = query(
        challengesReference,
        where("Location", "==", "Backyard")
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
  }, [challengeData]);

  return (
    <ContainerCenter>
      {isLoading ? (
        <>Loading data ...</>
      ) : (
        <>
          <Text style={globalStyles.acHeader}>ADVENTURE CHALLENGE</Text>
          <Text style={globalStyles.mainHeader}>In your backyard:</Text>
          {selectedOptions.map((option, index) => {
            const isFirstButton = index === 0;
            const buttonColor = isFirstButton
              ? buttonStyles.solidGreenButton
              : buttonStyles.solidYellowButton;
            return (
              <View key={`backyard_${index}`}>
                <SolidButton
                  buttonText={option.name}
                  onPress={() => {
                    navigation.navigate("BackyardChallenge", {
                      challengeId: option.id,
                      challengeName: option.name,
                      challengeDescription: option.description,
                    });
                  }}
                  pressableColor={buttonColor}
                />
                {isFirstButton && selectedOptions.length == 2 && (
                  <Text style={globalStyles.mainHeader}>OR</Text>
                )}
              </View>
            );
          })}
          {selectedOptions.length > 2 && (
            <TextButton
              buttonText="Pick Again"
              onPress={() => {
                setSelectedOptions((prevOptions) =>
                  getRandomChallenges(challengeData, prevOptions)
                );
              }}
            />
          )}
          {/* TO DO: What to do if challengeData is empty? */}
          {/* TO DO: How does a user choose a different challenge location? */}
        </>
      )}
    </ContainerCenter>
  );
};

export default Backyard;
