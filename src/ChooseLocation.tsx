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
        <Text>Choose location for challenge:</Text>
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
