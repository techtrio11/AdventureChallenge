import { View, Text } from "react-native";
import { ContainerCenter, SolidButton } from "./components";
import { buttonStyles, globalStyles } from "./styles";
import { UserData } from "./types";
import { useEffect, useState } from "react";
import { usersReference } from "../FirebaseConfig";
import { onSnapshot, query, where } from "firebase/firestore";

type Props = {
  navigation: any;
};

const ChooseLocation = ({ navigation }: Props) => {
  const [userData, setUserData] = useState<UserData>();
  const [isLoading, setIsLoading] = useState(true);

  //get user from database
  useEffect(() => {
    const fetchData = async () => {
      const userQuery = query(
        usersReference,
        where("name", "==", "Bobby Smith")
      );

      const unsubscribe = onSnapshot(userQuery, (querySnapshot) => {
        const user: UserData = {};
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          user.id = doc.id;
          user.name = data.name;
        });
        setUserData(user);
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

  return (
    <ContainerCenter>
      {isLoading ? (
        <>Loading data ...</>
      ) : (
        <>
          <Text>Welcome {userData.name}!</Text>
          <Text style={globalStyles.acHeader}>ADVENTURE CHALLENGE</Text>
          <Text style={globalStyles.mainHeader}>
            Choose location for challenge:
          </Text>
          <View
            style={[
              buttonStyles.buttonContainer,
              {
                display: "flex",
                paddingTop: 10,
                paddingBottom: 30,
                width: 265,
              },
            ]}
          >
            <SolidButton
              buttonText="Backyard"
              onPress={() =>
                navigation.navigate("Backyard", {
                  userId: userData.id,
                })
              }
              pressableColor={buttonStyles.solidGreenButton}
            />
            <SolidButton
              buttonText="Local Park"
              onPress={() => navigation.navigate("LocalPark")}
              pressableColor={buttonStyles.solidYellowButton}
            />
            <SolidButton
              buttonText="Forest"
              onPress={() => navigation.navigate("Forest")}
              pressableColor={buttonStyles.solidGreenButton}
            />
            <SolidButton
              buttonText="Water"
              onPress={() => navigation.navigate("Water")}
              pressableColor={buttonStyles.solidYellowButton}
            />
            <SolidButton
              buttonText="Learn"
              onPress={() => navigation.navigate("Learn")}
              pressableColor={buttonStyles.solidBlueButton}
            />
          </View>
        </>
      )}
    </ContainerCenter>
  );
};

export default ChooseLocation;
