import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from "../../FirebaseConfig";
import React from "react";

type pickImageProps = {
  setImage: React.Dispatch<any>;
};
export const pickImage = async ({ setImage }: pickImageProps) => {
  // No permissions request is necessary for launching the image library
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

type uploadImageProps = {
  image: any;
  setImage: React.Dispatch<any>;
};
export const uploadImage = async ({ image, setImage }: uploadImageProps) => {
  const storageRef = ref(storage, image.fileName);
  const img = await fetch(image);
  const bytes = await img.blob();
  uploadBytes(storageRef, bytes).then(() => {
    setImage(null);
  });
};
