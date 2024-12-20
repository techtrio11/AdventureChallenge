import { Text, View } from "react-native";
import { ContainerCenter, SolidButton } from "../components";
import { buttonStyles, globalStyles } from "../styles";
import { useEffect, useState } from "react";
import { challengesReference, usersReference } from "../../FirebaseConfig";
import { onSnapshot, query } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import {
  ActivityCompletedData,
  ChallengesData,
  UserData,
  blankUserData,
} from "../types";
import { formatDate, formatFirebaseDate, getStreakCalculator } from "../utils";

type Props = {
  navigation: any;
  route: any;
};
const Social = ({ navigation, route }: Props) => {
  const [userInfo, setUserInfo] = useState<UserData>(blankUserData);
  const [challenges, setChallenges] = useState<ChallengesData[]>([]);
  const [completedActivities, setCompletedActivities] = useState<
    ActivityCompletedData[]
  >([]);
  const [isLoadingChallenges, setIsLoadingChallenges] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const today = new Date();
  const formatToday = formatDate(today);
  const storage = getStorage();

  const { userId } = route.params;

  //get challenges from database
  useEffect(() => {
    const fetchChallengeData = async () => {
      const challengesQuery = query(challengesReference);
      const challengeData = onSnapshot(challengesQuery, (querySnapshot) => {
        const list = [];
        querySnapshot.docs.map((doc) => {
          const data = doc.data();
          list.push({
            id: doc.id,
            name: data.Name,
            description: data.Description,
          });
        });
        setChallenges(list);
      });
      return challengeData;
    };
    setIsLoadingChallenges(false);
    fetchChallengeData();

    // Cleanup function
    return () => {
      // Perform any cleanup here if needed
    };
  }, []);

  //get user data
  useEffect(() => {
    if (challenges.length > 0) {
      const fetchActivityData = () => {
        const usersQuery = query(usersReference);
        const userInfo = onSnapshot(usersQuery, (querySnapshot) => {
          let user: UserData = blankUserData;
          const list = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const calculatedStreak = getStreakCalculator(
              data.activities_completed.map((activity) =>
                formatFirebaseDate(activity.date_completed)
              )
            );
            if (doc.id === userId) {
              user.name = data.name;
              user.streak = calculatedStreak;
            }

            data.activities_completed.map((activity) => {
              if (formatFirebaseDate(activity.date_completed) === formatToday) {
                const challengeDetails = challenges.filter(
                  (challenge) => challenge.id === activity.activity_id
                );
                const activityData: ActivityCompletedData = {
                  name: data.name,
                  challengeName:
                    challengeDetails.length > 0 ? challengeDetails[0].name : "",
                  photoName: activity.image_name,
                };
                if (activityData.photoName !== "") {
                  const storageReference = ref(
                    storage,
                    `/${activityData.photoName}`
                  );
                  getDownloadURL(storageReference).then((img) => {
                    activityData.imageUrl = img;
                  });
                } else {
                  activityData.imageUrl = "";
                }
                list.push(activityData);
              }
            });
          });
          setUserInfo(user);
          setCompletedActivities(list);
          setIsLoading(false);
        });

        return userInfo;
      };

      fetchActivityData();

      // Cleanup function
      return () => {
        // Perform any cleanup here if needed
      };
    }
  }, [challenges]);

  return (
    <ContainerCenter>
      {isLoading || isLoadingChallenges ? (
        <>Loading data ...</>
      ) : (
        <>
          <Text>{userInfo.name}</Text>
          <Text style={globalStyles.streak}>Streak: {userInfo.streak}</Text>
          <Text>
            {completedActivities.map((activity, index) => {
              return (
                <View style={globalStyles.detailsContainer} key={index}>
                  <Text style={globalStyles.title}>
                    User Name: {activity.name} {"\n"}Challenge Name:{" "}
                    {activity.challengeName}
                  </Text>
                  {/*I would like to separate these onto separate lines */}
                  {/*<Text style={globalStyles.title}>
                    Challenge Name: {activity.challengeName}
                  </Text>*/}
                  {/* <Image
                    source={{ uri: activity.imageUrl }}
                    style={{ width: 50, height: 50 }}
                  /> */}
                </View>
              );
            })}
          </Text>
          <SolidButton
            buttonText="Home"
            onPress={() => {
              navigation.navigate("ChooseLocation", {
                userId: userId,
              });
            }}
            pressableColor={buttonStyles.solidGreenButton}
          />
        </>
      )}
    </ContainerCenter>
  );
};

export default Social;
