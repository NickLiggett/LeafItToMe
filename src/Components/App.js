import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./Login";
import Home from "./Home";
import MyPlants from "./MyPlants";
import AddNew from "./AddNew";
import CreateProfile from "./CreateProfile"
import CreateProfileNext from "./CreateProfileNext"

export default function App() {
  const [fontsLoaded] = useFonts({
    "Satisfy-Regular": require("../../assets/fonts/Satisfy-Regular.ttf"),
  });

  const Stack = createNativeStackNavigator();

  return fontsLoaded ? (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login Page">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login Page" component={Login} />
        <Stack.Screen name="My Plants" component={MyPlants} />
        <Stack.Screen name="Add New Plant" component={AddNew} />
        <Stack.Screen name="Create Profile Page" options={{title: "Create Profile"}} component={CreateProfile} />
        <Stack.Screen name="Create Profile Page 2" options={{title: "Create Profile"}} component={CreateProfileNext} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : null;
}
