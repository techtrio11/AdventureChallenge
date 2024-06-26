import { Text, View } from "react-native";
import { ContainerCenter, SolidButton, TextButton } from "../../components";
import { challengesReference, usersReference } from "../../../FirebaseConfig";
import { useEffect, useState } from "react";
import { ChallengesData } from "../../types";
import { query, onSnapshot, where } from "firebase/firestore";
import {
  getFilteredChallengeData,
  availableChallenges,
  getRandomChallenges,
} from "../../utils";
import { buttonStyles, globalStyles } from "../../styles";

type Props = {
  navigation: any;
  route: any;
};

const LocalPark = ({ navigation, route }: Props) => {
  const { userId } = route.params;
  const [userCompletedChallenges, setUserCompletedChallenges] = useState<
    ChallengesData[]
  >([]);
  const [userChallengesAvailable, setUserChallengesAvailable] = useState<
    ChallengesData[]
  >([]);
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
        where("Location", "==", "Local Park")
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

  //get completed challenges from database
  useEffect(() => {
    const fetchData = async () => {
      const usersQuery = query(usersReference);
      const completedChallenges = onSnapshot(usersQuery, (querySnapshot) => {
        const list = [];
        querySnapshot.forEach((doc) => {
          if (doc.id === userId) {
            const data = doc.data();
            data.activities_completed.forEach((activity) => {
              list.push({
                id: activity.activity_id,
              });
            });
          }
        });
        if (list.length) setUserCompletedChallenges(list);
        setIsLoading(false);
      });

      return completedChallenges;
    };
    fetchData();

    // Cleanup function
    return () => {
      // Perform any cleanup here if needed
    };
  }, [userId]);

  //get all the user challenges available, filtering out completed challenges
  useEffect(() => {
    setUserChallengesAvailable(
      getFilteredChallengeData(challengeData, userCompletedChallenges)
    );
  }, [challengeData, userCompletedChallenges]);

  //get initial challenges
  useEffect(() => {
    //TO DO: pass in user completed data
    setSelectedOptions(getRandomChallenges(challengeData));
  }, [challengeData]);

  return (
    <ContainerCenter>
      {isLoading && selectedOptions.length ? (
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
                    navigation.navigate("LocalParkChallenge", {
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
                  getRandomChallenges(userChallengesAvailable, prevOptions)
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

export default LocalPark;
