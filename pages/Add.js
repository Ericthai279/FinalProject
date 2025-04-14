import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import { useNavigation } from "@react-navigation/native";

const AddPost = () => {
  const [post, setPost] = useState({
    user_id: "",
    title: "",
    description: "",
  });
  const [file, setFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigation = useNavigation();
  const API_BASE_URL = "http://192.168.31.229:3300";

  const handleChange = (name, value) => {
    setPost((prev) => ({ ...prev, [name]: value }));
  };

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true, // Important for iOS
      });
      
      if (res.canceled) {
        console.log("User cancelled the picker");
      } else {
        console.log("Document picked:", res.assets[0]);
        setFile(res.assets[0]);
      }
    } catch (err) {
      console.error("Error picking document:", err);
      Alert.alert("Error", "Failed to pick document");
    }
  };

  const handleClick = async () => {
    if (!post.user_id) {
      Alert.alert("Missing Field", "Please enter a User ID");
      return;
    }
    
    if (!file) {
      Alert.alert("No File", "Please select a file to upload");
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const formData = new FormData();
      
      // Add text fields
      formData.append("user_id", post.user_id);
      formData.append("title", post.title || "");
      formData.append("description", post.description || "");
      
      // Add the file with the correct field name - "document"
      formData.append("document", {
        uri: file.uri,
        type: file.mimeType || "application/octet-stream",
        name: file.name || `file-${Date.now()}.${file.mimeType?.split('/')[1] || 'bin'}`
      });
      
      // Log what we're sending (for debugging)
      console.log("Sending form data:", formData);
      
      // Use fetch API
      const response = await fetch(`${API_BASE_URL}/posts`, {
        method: "POST",
        body: formData,
        headers: {
          // Do NOT set Content-Type here, the browser will set it with the proper boundary
          "Accept": "application/json",
        },
      });
      
      const result = await response.json();
      console.log("Upload result:", result);
      
      if (response.ok) {
        Alert.alert("Success", "Post created successfully!", [
          { text: "OK", onPress: () => navigation.goBack() }
        ]);
      } else {
        throw new Error(result.message || "Failed to create post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      Alert.alert("Error", error.message || "Something went wrong!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add New Post</Text>
      <TextInput
        style={styles.input}
        placeholder="User ID (required)"
        keyboardType="numeric"
        value={post.user_id}
        onChangeText={(value) => handleChange("user_id", value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Post Title"
        value={post.title}
        onChangeText={(value) => handleChange("title", value)}
      />
      <TextInput
        style={styles.textarea}
        placeholder="Post Description"
        multiline
        numberOfLines={5}
        value={post.description}
        onChangeText={(value) => handleChange("description", value)}
      />
      <TouchableOpacity onPress={pickDocument} style={styles.pickButton}>
        <Text style={styles.pickButtonText}>
          {file ? `Selected: ${file.name}` : "Pick a Document"}
        </Text>
      </TouchableOpacity>
      <Button 
        title={isSubmitting ? "Creating..." : "Add Post"} 
        onPress={handleClick} 
        disabled={isSubmitting}
      />
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
    textAlignVertical: "top",
  },
  pickButton: {
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  pickButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default AddPost;