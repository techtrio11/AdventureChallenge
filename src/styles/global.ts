import { StyleSheet } from "react-native";
import { BORDER_COLOR, WHITE } from "../constants";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  containerCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: WHITE,
  },
  detailsContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
  },
  detailsLabel: {
    fontSize: 14,
    fontWeight: "bold",
  },
  detailsValue: {
    paddingLeft: 4,
  },
  horizontalDivider: {
    borderBottomWidth: 2,
    borderColor: BORDER_COLOR,
    margin: 4,
    marginTop: 10,
  },
  indicatorDetailsContainer: {
    display: "flex",
    flexDirection: "row",
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
  },
  indicatorContainer: {
    padding: 5,
    marginRight: 5,
    width: 20,
    maxHeight: 20,
  },
  indicatorValue: { paddingLeft: 4, textAlign: "left" },
  acHeader: {
    fontSize: 22,
  },
  mainHeader: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
  },
  underline: { textDecorationLine: "underline" },
  image: {
    width: 200,
    height: 200,
  },
});
