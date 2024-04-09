import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChooseLocation from "../ChooseLocation";

const Stack = createNativeStackNavigator();

const ChooseLocationStack = () => {
  return (
    <Stack.Navigator initialRouteName="ChooseLocation">
      <Stack.Screen
        name="ChooseLocation"
        component={ChooseLocation}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name="ViewVehicles"
        component={OfficerPortalStack}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
};

export default ChooseLocationStack;
