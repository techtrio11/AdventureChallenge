import { SafeAreaView, ScrollView, View } from "react-native";
import { buttonStyles, globalStyles } from "../styles";
import { ReactElement } from "react";

type Props = {
  children: ReactElement;
};
export const Container = ({ children }: Props) => {
  //CGU: return container aligned left
  return <View style={globalStyles.container}>{children}</View>;
};

export const ContainerCenter = ({ children }: Props) => {
  //CGU: return container aligned center
  return <View style={globalStyles.containerCenter}>{children}</View>;
};

export const ButtonContainer = ({ children }: Props) => {
  //CGU: return button container
  return <View style={buttonStyles.buttonContainer}>{children}</View>;
};

export const SafeAreaContainer = ({ children }: Props) => {
  //CGU: return safe area container
  return <SafeAreaView style={globalStyles.container}>{children}</SafeAreaView>;
};

export const ScrollContainer = ({ children }: Props) => {
  //CGU: return scroll container
  return <ScrollView style={globalStyles.container}>{children}</ScrollView>;
};
