import { Text } from "react-native";
import { ContainerCenter, SolidButton } from "./components";
import { buttonStyles, globalStyles } from "./styles";
import { UserData } from "./types";
import { useEffect, useState } from "react";
import { usersReference } from "../FirebaseConfig";
import { onSnapshot, query } from "firebase/firestore";

type Props = {
  navigation: any;
};

const Home = ({ navigation }: Props) => {
  const [userList, setUserList] = useState<UserData[]>();
  const [isLoading, setIsLoading] = useState(true);

  //get all users from database
  useEffect(() => {
    const usersQuery = query(usersReference);
    onSnapshot(usersQuery, (querySnapshot) => {
      const list = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name,
        };
      });
      setUserList(list);
      setIsLoading(false);
    });
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
          <Text style={globalStyles.acHeader}>CHOOSE A USER</Text>
          {userList.map((user, index) => {
            return (
              <SolidButton
                key={index}
                buttonText={user.name}
                onPress={() =>
                  navigation.navigate("ChooseLocation", {
                    userId: user.id,
                    userName: user.name,
                  })
                }
                pressableColor={buttonStyles.solidGreenButton}
              />
            );
          })}
          <SolidButton
            buttonText="New User"
            pressableColor={buttonStyles.solidYellowButton}
            onPress={() =>
              navigation.navigate("Backyard", {
                // VERY WRONG ONPRESS FUNCTION. Only added it to have a button on this screen for demo video
              })
            }
          />
        </>
      )}
    </ContainerCenter>
  );
};

export default Home;
