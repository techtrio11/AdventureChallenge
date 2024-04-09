import { Text, Pressable, View } from "react-native";
import { buttonStyles } from "../styles";

type SolidButtonProps = {
  buttonText: string;
  onPress: () => void;
  variant?: string;
};
export const SolidButton = ({ buttonText, onPress }: SolidButtonProps) => {
  //CGU: return solid button
  return (
    <Pressable style={buttonStyles.solidButton} onPress={onPress}>
      <Text style={buttonStyles.solidButtonText}>{buttonText}</Text>
    </Pressable>
  );
};

type OutlineButtonProps = {
  buttonText: string;
  navigation: any;
  pageName: string;
  params: {};
};
export const OutlineButton = ({
  buttonText,
  navigation,
  pageName,
  params,
}: OutlineButtonProps) => {
  //CGU: return outline button
  return (
    <View style={buttonStyles.buttonWrapper}>
      <Pressable
        style={buttonStyles.outlineButton}
        onPress={() => {
          navigation.navigate(pageName, params);
        }}
      >
        <Text style={buttonStyles.outlineButtonText}>{buttonText}</Text>
      </Pressable>
    </View>
  );
};

type TextButtonProps = {
  buttonText: string;
  onPress: () => void;
  variant?: string;
};
export const TextButton = ({ buttonText, onPress }: TextButtonProps) => {
  return (
    <Pressable style={buttonStyles.textButton} onPress={onPress}>
      <Text style={buttonStyles.textButtonText}>{buttonText}</Text>
    </Pressable>
  );
};
