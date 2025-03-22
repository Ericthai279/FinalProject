import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { NavigationContainer, useRoute } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WelcomeScreen from "./pages/Welcome.jsx";
import AddPost from "./pages/Add";
import Posts from "./pages/Post";
import UpdatePost from "./pages/Update";

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }: any) => {
  
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome to Social App</Text>
      
      <View style={styles.buttonContainer}>
        <Button title="View Posts" onPress={() => navigation.navigate("Posts")} />
        <Button title="Add Post" onPress={() => navigation.navigate("AddPost")} />
        <Button title="Update Post" onPress={() => navigation.navigate("UpdatePost")} />
        <Button title="Welcome" onPress={() => navigation.navigate("WelcomeScreen")} />



      </View>
    </View>
  );
};


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Posts" component={Posts} />
        <Stack.Screen name="AddPost" component={AddPost} />
        <Stack.Screen name="UpdatePost" component={UpdatePost} />
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "80%",
    gap: 10,
  },
});