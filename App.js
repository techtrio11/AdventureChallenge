import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

//Stack AdventureChallenge Screens
import AdventureChallenge from "./src/routes/adventureChallengeStack";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="AdventureChallenge">
        <Drawer.Screen
          name="AdventureChallenge"
          component={AdventureChallenge}
          options={{
            headerShown: false,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
