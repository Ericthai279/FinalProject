import { Pressable, StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";
import { theme } from "../constrants/theme";

const Button = ({
  buttonStyle,
  textStyle,
  title = "",
  onPress = () => {},
  loading = false,
  hasShadow = true,
}) => {
  const ShadowStyle = {
    shadowColor: theme.colors.dark,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  };

  if (loading) {
    return (
      <View style={[styles.button, buttonStyle, { backgroundColor: "white" }]}>
        <ActivityIndicator size="small" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <View>
      <Pressable
        onPress={onPress}
        style={[styles.button, buttonStyle, hasShadow && ShadowStyle]}
      >
        <Text style={[styles.text, textStyle]}>{title}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: theme.colors.primary,
    height: 50, // Replaced hp(6.6)
    justifyContent: "center",
    alignItems: "center",
    borderCurve: "continuous",
    borderRadius: theme.radius.xl,
  },
  text: {
    fontSize: 20, // Replaced hp(2.5)
    color: "white",
    fontWeight: theme.fonts.bold,
  },
});

export default Button;