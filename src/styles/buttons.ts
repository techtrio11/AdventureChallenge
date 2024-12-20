import { BUTTON_BLUE, BUTTON_GREEN, WHITE } from "../constants";
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
    padding: 10,
    borderRadius: 10,
    borderColor: "black",
    borderWidth: 4,
  },
  solidGreenButton: {
    backgroundColor: "#6aa84fff",
  },
  solidYellowButton: {
    backgroundColor: "#ffd966ff",
  },
  solidBlueButton: {
    backgroundColor: "#a4c2f4ff",
  },
  solidButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
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
