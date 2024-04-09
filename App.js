import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";

//TypeScript for all Stack Routes
import { RootStackParams } from "./src/types";

//Stack Navigation Screens
import ChooseLocation from "./src/routes/chooseLocationStack";

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="ChooseLocation">
        <Drawer.Screen
          name="ChooseLocation"
          component={ChooseLocation}
          options={{
            drawerLabel: "Choose Location",
            title: "Choose Location",
          }}
        />
        {/* <Drawer.Screen
          name="OfficerPortal"
          component={OfficerPortalStack}
          options={{
            drawerLabel: "Vehicle List",
            title: "Vehicle List",
          }}
        /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
