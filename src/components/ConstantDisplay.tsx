import { Text, View } from "react-native";
import { ContainerCenter } from ".";
import { globalStyles } from "../styles";

export const Loading = () => {
  //CGU: return loading message
  return (
    <ContainerCenter>
      <Text>Loading...</Text>
    </ContainerCenter>
  );
};

export const NoDataFound = () => {
  //CGU: return no data found message
  return <Text>No data found.</Text>;
};

export const BooleanValue = (value: boolean) => {
  //CGU: if value is true, return "Yes" else return "No"
  if (value) {
    return "Yes";
  } else {
    return "No";
  }
};

export const HorizontalDivider = () => {
  //CGU: return horizontal divider
  return <View style={globalStyles.horizontalDivider}></View>;
};
