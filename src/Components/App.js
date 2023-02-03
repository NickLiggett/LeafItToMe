import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Login from "./Login";
import Home from "./Home";
import MyPlants from "./MyPlants";
import AddNew from "./AddNew"

export default function App() {
  const [fontsLoaded] = useFonts({
    "Satisfy-Regular": require("../../assets/fonts/Satisfy-Regular.ttf"),
  });

  const Stack = createNativeStackNavigator();

  return fontsLoaded ? (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="MyPlants" component={MyPlants} />
        <Stack.Screen name="AddNew" component={AddNew} />
      </Stack.Navigator>
    </NavigationContainer>
  ) : null;
}
