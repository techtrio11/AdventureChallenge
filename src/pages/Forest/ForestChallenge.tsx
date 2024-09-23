import { Text, Image } from "react-native";
import { ContainerCenter, SolidButton } from "../../components";
import { buttonStyles, globalStyles } from "../../styles";
import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../FirebaseConfig";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";

type Props = {
  navigation: any;
  route: any;
};

const ForestChallenge = ({ navigation, route }: Props) => {
  const { challengeId, challengeName, challengeDescription, userId, userName } =
    route.params;
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
  const handleSubmit = async () => {
    const storageRef = ref(storage, image.fileName);
    const userRef = doc(db, "Users", userId);
    const img = await fetch(image);
    const bytes = await img.blob();
    uploadBytes(storageRef, bytes).then(() => {
      updateDoc(userRef, {
        activities_completed: arrayUnion({
          activity_id: challengeId,
          date_completed: new Date(),
          image_name: image.fileName,
        }),
      })
        .then(() => {
          setImage(null);
          navigation.navigate("Social", {
            userId: userId,
          });
        })
        .catch((e) => console.log(e));
    });
  };
  return (
    <ContainerCenter>
      <>
        {/*<Text>{challengeId}</Text>*/}
        <Text style={globalStyles.challenge}>{challengeName}</Text>
        <Text style={globalStyles.title}>{challengeDescription}</Text>
        <SolidButton
          buttonText="Choose from Camera Roll"
          onPress={pickImage}
          pressableColor={buttonStyles.solidYellowButton}
        />
        {image && image.uri && (
          <Image source={{ uri: image.uri }} style={globalStyles.image} />
        )}
        <SolidButton
          buttonText="Complete Challenge"
          onPress={handleSubmit}
          pressableColor={buttonStyles.solidGreenButton}
        />
      </>
    </ContainerCenter>
  );
};

export default ForestChallenge;
