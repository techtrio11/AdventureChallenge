import { View, Image, StyleSheet, Text } from "react-native";
import { ContainerCenter, SolidButton } from "./components";
import { buttonStyles, globalStyles } from "./styles";

type Props = {
  navigation: any;
};

const ChooseLocation = ({ navigation }: Props) => {
  return (
    <ContainerCenter>
      <>
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
            onPress={() => navigation.navigate("Backyard")}
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
    </ContainerCenter>
  );
};

export default ChooseLocation;
