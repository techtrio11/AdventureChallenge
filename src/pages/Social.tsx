import { Text } from "react-native";
import { ContainerCenter, SolidButton } from "../components";
import { buttonStyles } from "../styles";
type Props = {
  navigation: any;
  route: any;
};
const Social = ({ navigation, route }: Props) => {
  const { userId, userName } = route.params;
  return (
    <ContainerCenter>
      <>
        {userName}
        <Text>small user profile with streak</Text>
        <Text>list of all user completed activity with image/date/user</Text>
        <SolidButton
          buttonText="Choose a new challenge"
          onPress={() => {
            navigation.navigate("ChooseLocation", {
              userId: userId,
            });
          }}
          pressableColor={buttonStyles.solidGreenButton}
        />
      </>
    </ContainerCenter>
  );
};

export default Social;
