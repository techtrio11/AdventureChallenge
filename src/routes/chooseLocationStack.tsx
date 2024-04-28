import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChooseLocation from "../ChooseLocation";
import Backyard from "../pages/Backyard/Backyard";
import LocalPark from "../pages/LocalPark/LocalPark";

const Stack = createNativeStackNavigator();

const ChooseLocationStack = () => {
  return (
    <Stack.Navigator initialRouteName="ChooseLocation">
      <Stack.Screen
        name="ChooseLocation"
        component={ChooseLocation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Backyard"
        component={Backyard}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LocalPark"
        component={LocalPark}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ChooseLocationStack;
