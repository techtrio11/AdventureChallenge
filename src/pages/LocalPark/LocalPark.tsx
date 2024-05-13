import { View, Text } from "react-native";
import { ContainerCenter, SolidButton, TextButton } from "../../components";
import { challengesReference } from "../../../FirebaseConfig";
import { useEffect, useState } from "react";
import { ChallengesData } from "../../types";
import { query, onSnapshot, collection, where } from "firebase/firestore";
import { getRandomChallenges } from "../../utils";
import { buttonStyles, globalStyles } from "../../styles";

type Props = {
  navigation: any;
};

const LocalPark = ({ navigation }: Props) => {
  const [challengeData, setChallengesData] = useState<ChallengesData[]>([]);
  const [selectedOptions, setSelectedOptions] = useState<ChallengesData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  //get challenges from database
  useEffect(() => {
    const fetchData = async () => {
      const challengesQuery = query(
        challengesReference,
        where("Location", "==", "LocalPark")
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
          <Text style={globalStyles.mainHeader}>In your local park:</Text>
          {selectedOptions.map((option, index) => {
            const isFirstButton = index === 0;
            const buttonColor = isFirstButton
              ? buttonStyles.solidGreenButton
              : buttonStyles.solidYellowButton;
            return (
              <View key={`LocalPark_${index}`}>
                <SolidButton
                  buttonText={option.name}
                  onPress={() => {
                    //TO DO: pass in record to next page where they will see the description
                    console.log(option);
                  }}
                  pressableColor={buttonColor}
                />
                {isFirstButton && selectedOptions.length == 2 && (
                  <Text style={globalStyles.mainHeader}>OR</Text>
                )}
              </View>
            );
          })}
          <TextButton
            buttonText="Pick Again"
            onPress={() => {
              setSelectedOptions((prevOptions) =>
                getRandomChallenges(challengeData, prevOptions)
              );
            }}
          />
        </>
      )}
    </ContainerCenter>
  );
};

export default LocalPark;
