import { Text } from "react-native";
import { ContainerCenter } from "../../components";

type Props = {
  navigation: any;
  route: any;
};

const LocalParkChallenge = ({ navigation, route }: Props) => {
  const { challengeId, challengeName, challengeDescription } = route.params;
  return (
    <ContainerCenter>
      <>
        <Text>{challengeId}</Text>
        <Text>{challengeName}</Text>
        <Text>{challengeDescription}</Text>
      </>
    </ContainerCenter>
  );
};

export default LocalParkChallenge;
