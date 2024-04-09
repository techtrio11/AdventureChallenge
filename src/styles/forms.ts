import { StyleSheet } from "react-native";

export const formStyles = StyleSheet.create({
  formContainer: {
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  input: {
    borderWidth: 1,
    padding: 14,
    paddingLeft: 22,
    borderRadius: 4,
  },
  select: {
    borderWidth: 1,
    padding: 6,
    borderRadius: 4,
    borderColor: "black",
  },
  errorMessageContainer: {
    padding: 12,
    paddingBottom: 6,
  },
  errorMessage: {
    color: "red",
    fontSize: 14,
    fontWeight: "bold",
  },
  checkboxContainer: {
    flexDirection: "row",
  },
  checkbox: {
    alignSelf: "center",
  },
});
