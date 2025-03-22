import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./pages/Home"; // or wherever Home is defined
import Posts from "./pages/Post";
import AddPost from "./pages/Add";
import UpdatePost from "./pages/Update";
import WelcomeScreen from "./pages/Welcome";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Posts" component={Posts} />
        <Stack.Screen name="AddPost" component={AddPost} />
        <Stack.Screen name="UpdatePost" component={UpdatePost} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUp} /> 
      </Stack.Navigator>
    </NavigationContainer>
  );
}
