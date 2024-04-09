import { BUTTON_BLUE, WHITE } from "../constants";
import { StyleSheet } from "react-native";

export const buttonStyles = StyleSheet.create({
  buttonContainer: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 10,
    marginBottom: 10,
  },
  buttonContainerThin: {
    marginLeft: 4,
    marginRight: 4,
    marginTop: 5,
    marginBottom: 5,
  },
  buttonWrapper: {
    display: "flex",
    paddingBottom: 5,
  },
  solidButton: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: BUTTON_BLUE,
    borderRadius: 10,
  },
  solidButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: WHITE,
    textAlign: "center",
  },
  outlineButton: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: WHITE,
    borderColor: BUTTON_BLUE,
    borderWidth: 2,
    borderRadius: 10,
  },
  outlineButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: BUTTON_BLUE,
    textAlign: "center",
  },
  textButton: {
    paddingTop: 1,
    paddingBottom: 1,
  },
  textButtonText: {
    fontSize: 12,
    fontWeight: "500",
    color: BUTTON_BLUE,
    textAlign: "right",
  },
});
