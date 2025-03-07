import axios from "axios";
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const AddPost = () => {
  const [post, setPost] = useState({
    user_id: "",
    title: "",
    description: "",
    media_url: "",
  });

  const navigation = useNavigation(); // Use React Navigation instead of react-router-dom

  const handleChange = (name, value) => {
    setPost((prev) => ({ ...prev, [name]: value }));
  };
  const API_BASE_URL = "https://5554-171-244-188-41.ngrok-free.app"; 

  const handleClick = async () => {
    try {
      await axios.post(`${API_BASE_URL}/posts`, post);
      Alert.alert("Success", "Post added successfully!");
      navigation.navigate("Home"); // Navigate back to Home
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Something went wrong!");
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Post</Text>
      <TextInput style={styles.input} placeholder="User ID" keyboardType="numeric" onChangeText={(value) => handleChange("user_id", value)} />
      <TextInput style={styles.input} placeholder="Post Title" onChangeText={(value) => handleChange("title", value)} />
      <TextInput style={styles.textarea} placeholder="Post Description" multiline numberOfLines={5} onChangeText={(value) => handleChange("description", value)} />
      <TextInput style={styles.input} placeholder="Media URL" onChangeText={(value) => handleChange("media_url", value)} />
      <Button title="Add Post" onPress={handleClick} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textarea: {
    height: 100,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    borderRadius: 5,
    textAlignVertical: "top", // Fixes text input alignment
  },
});

export default AddPost;
