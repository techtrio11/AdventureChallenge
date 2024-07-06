import { View, Text } from "react-native";
import { ContainerCenter, SolidButton } from "../components";
import { buttonStyles, globalStyles } from "../styles";

type Props = {
  navigation: any;
  route: any;
};

const ChooseLocation = ({ navigation, route }: Props) => {
  const { userId, userName } = route.params;

  return (
    <ContainerCenter>
      <>
        <Text>Welcome {userName}!</Text>
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
                userId: userId,
                userName: userName,
              })
            }
            pressableColor={buttonStyles.solidGreenButton}
          />
          <SolidButton
            buttonText="Local Park"
            onPress={() =>
              navigation.navigate("LocalPark", {
                userId: userId,
                userName: userName,
              })
            }
            pressableColor={buttonStyles.solidYellowButton}
          />
          <SolidButton
            buttonText="Forest"
            onPress={() =>
              navigation.navigate("Forest", {
                userId: userId,
                userName: userName,
              })
            }
            pressableColor={buttonStyles.solidGreenButton}
          />
          <SolidButton
            buttonText="Water"
            onPress={() =>
              navigation.navigate("Water", {
                userId: userId,
                userName: userName,
              })
            }
            pressableColor={buttonStyles.solidYellowButton}
          />
          <SolidButton
            buttonText="Learn"
            onPress={() =>
              navigation.navigate("Learn", {
                userId: userId,
                userName: userName,
              })
            }
            pressableColor={buttonStyles.solidBlueButton}
          />
          <SolidButton
            buttonText="Social"
            onPress={() =>
              navigation.navigate("Social", {
                userId: userId,
                userName: userName,
              })
            }
            pressableColor={buttonStyles.solidBlueButton}
          />
        </View>
      </>
    </ContainerCenter>
  );
};

export default ChooseLocation;
