import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChooseLocation from "../ChooseLocation";
import Backyard from "../pages/Backyard/Backyard";
import LocalPark from "../pages/LocalPark/LocalPark";
import Forest from "../pages/Forest/Forest";
import Water from "../pages/Water/Water";
import Learn from "../pages/Learn/Learn";

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
      <Stack.Screen
        name="Forest"
        component={Forest}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Water"
        component={Water}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Learn"
        component={Learn}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default ChooseLocationStack;
