import { Text, Pressable, View } from "react-native";
import { buttonStyles } from "../styles";

type SolidButtonProps = {
  /**
   * Text to display on the button.
   */
  buttonText: string;
  /**
   * Function to be called when the button is pressed.
   */
  onPress: () => void;
  /**
   * Color style for the button when pressed.
   */
  pressableColor?: {};
  /**
   * Color style for the text displayed on the button.
   */
  textColor?: {};
};

/**
 * SolidButton component displays a button with solid background and customizable text color.
 */
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
  /**
   * Text to display on the button.
   */
  buttonText: string;
  /**
   * Navigation object for navigating to another screen.
   */
  navigation: any;
  /**
   * Name of the destination screen.
   */
  pageName: string;
  /**
   * Parameters to pass to the destination screen.
   */
  params: any;
  /**
   * Color style for the button when pressed.
   */
  pressableColor?: {};
  /**
   * Color style for the text displayed on the button.
   */
  textColor?: {};
};
/**
 * OutlineButton component displays a button with outlined border and customizable text color.
 */
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
  /**
   * Text to display on the button.
   */
  buttonText: string;
  /**
   * Function to be called when the button is pressed.
   */
  onPress: () => void;
  /**
   * Optional variant to specify button style.
   */
  variant?: string;
  /**
   * Color style for the text displayed on the button.
   */
  textColor?: {};
};
/**
 * TextButton component displays a button with customizable text color.
 */
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
