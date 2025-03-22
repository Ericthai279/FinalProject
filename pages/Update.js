import axios from "axios";
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const UpdatePost = () => {
  const [post, setPost] = useState({
    title: "",
    description: "",
    media_url: "",
  });

  const [error, setError] = useState(false);
  const navigation = useNavigation();
  const route = useRoute();
  const postId = route.params?.postId; // Get postId from navigation params

  const handleChange = (name, value) => {
    setPost((prev) => ({ ...prev, [name]: value }));
  };
  const API_BASE_URL = "https://fca6-27-74-242-54.ngrok-free.app"; 
  const handleClick = async () => {
    try {
      await axios.put(`${API_BASE_URL}/posts/${postId}`, post);
      Alert.alert("Success", "Post updated successfully!", [{ text: "OK", onPress: () => navigation.navigate("Posts", {refresh:true}) }]);
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Update Post</Text>
      <TextInput style={styles.input} placeholder="Post Title" onChangeText={(value) => handleChange("title", value)} />
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Post Description"
        multiline
        numberOfLines={5}
        onChangeText={(value) => handleChange("description", value)}
      />
      <TextInput style={styles.input} placeholder="Media URL" onChangeText={(value) => handleChange("media_url", value)} />
      <Button title="Update" onPress={handleClick} />
      {error && <Text style={styles.error}>Something went wrong!</Text>}
      <TouchableOpacity onPress={() => navigation.navigate("Posts")} style={styles.link}>
        <Text style={styles.linkText}>See all posts</Text>
      </TouchableOpacity>
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
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  textarea: {
    height: 100,
  },
  error: {
    color: "red",
    marginTop: 10,
    textAlign: "center",
  },
  link: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    color: "blue",
    fontSize: 16,
  },
});

export default UpdatePost;
