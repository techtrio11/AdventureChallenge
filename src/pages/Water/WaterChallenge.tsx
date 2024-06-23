import { Text, Image } from "react-native";
import { ContainerCenter, SolidButton } from "../../components";
import { buttonStyles, globalStyles } from "../../styles";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../FirebaseConfig";

type Props = {
  navigation: any;
  route: any;
};

const WaterChallenge = ({ navigation, route }: Props) => {
  const { challengeId, challengeName, challengeDescription } = route.params;
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };
  const uploadImage = async () => {
    const storageRef = ref(storage, image.fileName);
    const img = await fetch(image);
    const bytes = await img.blob();
    uploadBytes(storageRef, bytes).then(() => {
      setImage(null);
    });
  };
  return (
    <ContainerCenter>
      <>
        <Text>{challengeId}</Text>
        <Text>{challengeName}</Text>
        <Text>{challengeDescription}</Text>
        <SolidButton
          buttonText="Pick an image from camera roll"
          onPress={pickImage}
          pressableColor={buttonStyles.solidYellowButton}
        />
        {image && image.uri && (
          <Image source={{ uri: image.uri }} style={globalStyles.image} />
        )}
        <SolidButton
          buttonText="Complete Challenge"
          onPress={uploadImage}
          pressableColor={buttonStyles.solidGreenButton}
        />
      </>
    </ContainerCenter>
  );
};

export default WaterChallenge;
