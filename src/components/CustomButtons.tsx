import { Text, Pressable, View } from "react-native";
import { buttonStyles } from "../styles";

type SolidButtonProps = {
  buttonText: string;
  onPress: () => void;
  pressableColor?: {};
  textColor?: {};
};
export const SolidButton = ({
  buttonText,
  onPress,
  pressableColor = {},
  textColor = {},
}: SolidButtonProps) => {
  return (
    <Pressable
      style={[
        buttonStyles.buttonContainer,
        buttonStyles.solidButton,
        pressableColor,
      ]}
      onPress={onPress}
    >
      <Text style={[buttonStyles.solidButtonText, textColor]}>
        {buttonText}
      </Text>
    </Pressable>
  );
};

type OutlineButtonProps = {
  buttonText: string;
  navigation: any;
  pageName: string;
  params: {};
  pressableColor?: {};
  textColor?: {};
};
export const OutlineButton = ({
  buttonText,
  navigation,
  pageName,
  params,
  pressableColor = {},
  textColor = {},
}: OutlineButtonProps) => {
  //CGU: return outline button
  return (
    <View style={buttonStyles.buttonWrapper}>
      <Pressable
        style={[buttonStyles.outlineButton, pressableColor]}
        onPress={() => {
          navigation.navigate(pageName, params);
        }}
      >
        <Text style={[buttonStyles.outlineButtonText, textColor]}>
          {buttonText}
        </Text>
      </Pressable>
    </View>
  );
};

type TextButtonProps = {
  buttonText: string;
  onPress: () => void;
  variant?: string;
  textColor?: {};
};
export const TextButton = ({
  buttonText,
  onPress,
  textColor = {},
}: TextButtonProps) => {
  return (
    <Pressable style={buttonStyles.textButton} onPress={onPress}>
      <Text style={[buttonStyles.textButtonText, textColor]}>{buttonText}</Text>
    </Pressable>
  );
};
