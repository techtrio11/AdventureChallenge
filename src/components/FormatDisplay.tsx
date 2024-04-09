import { View, Text } from "react-native";
import { formStyles, globalStyles } from "../styles";
import { BooleanValue } from "./ConstantDisplay";

type LabelValueProps = { label: string; value: string | number | undefined };
export const LabelValue = ({ label, value }: LabelValueProps) => {
  //CGU: display value variable with ternary operator
  let displayValue = value === "" ? "-" : value;

  //CGU: return details container displaying label and value
  return (
    <View style={globalStyles.detailsContainer}>
      <Text style={globalStyles.detailsLabel}>{label}:</Text>
      <Text style={globalStyles.detailsValue}>{displayValue}</Text>
    </View>
  );
};
