import { View, Image, StyleSheet, Text } from "react-native";
import { ContainerCenter, SolidButton } from "./components";
import { buttonStyles } from "./styles";

type Props = {
  navigation: any;
};

const ChooseLocation = ({ navigation }: Props) => {
  return (
    <ContainerCenter>
      <>
        {/* <Image
          source={require("../assets/KPD_logo.jpg")}
          style={styles.image}
        /> */}
        <Text style={{ fontSize: 22 }}>ADVENTURE CHALLENGE</Text>
        <Text style={{ fontWeight: "bold", fontSize: 24 }}>
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

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    resizeMode: "contain", // You can use 'cover', 'contain', 'stretch', etc.
  },
});
