import { StyleSheet, Text, View,TextInput } from 'react-native';
import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler'; // Add this import
import ScreenWrapper from '../components/screenwraper';
import { theme } from '../constrants/theme';
import Input from '../components/Input';
import Feather from '@expo/vector-icons/Feather';
import Button from '../components/Button';

const Login = () => {
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {  
    if(!emailRef.current || !passwordRef.current) {  
        Alert.alert('Login', "please fill all the fields!");  
        return;  
    }
    let email = emailRef.current.trim();  
    let password = passwordRef.current.trim();  
    setLoading(true);  
    const { error } = await supabase.auth.signInWithPassword({  
        email,  
        password  
    });  
    
    setLoading(false);  
    
    console.log('error: ', error);  
    if (error) {  
        Alert.alert('Login', error.message);  
    }   
}  





  return (
    <GestureHandlerRootView style={{ flex: 1 }}> 
      <ScreenWrapper bg="white">
        <StatusBar style="dark" />
        <View style={styles.container}>
          
          {/* Welcome */}
          
          <View>
           <View>
          <Text style={styles.welcomeText}> Hey,</Text>
          <Text style={styles.welcomeText}> Welcome Back</Text>
        </View>
          </View>
          
          {/* Form */}
          
          <View style={styles.form}>
            <Text style={{ fontSize: 15, color: theme.colors.text }}>
              Please login to continue
            </Text>
            <Input
              leftIcon={<Feather name="mail" size={24} color="black" />}
              placeholder="Enter your email"
              onChangeText={value => emailRef.current = value}
            />
            <Input
              leftIcon={<Feather name="lock" size={24} color="black" />} 
              placeholder="Enter your password"
              secureTextEntry
              onChangeText={value => passwordRef.current = value} 
            />

            <Text style={styles.forgotPassword}>
              Forgot Password?
            </Text>

            {/* Button */}
            <Button title={'Login'} loading={loading} onPress={onSubmit}/>

          </View>

          {/* footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Don't have an account?
            </Text>
            <Pressable>
              <Text style={[styles.footerText, {color:theme.colors.primaryDark, fontWeight: theme.fonts.semibold}]}> Sign Up 
              </Text>
            </Pressable>
          </View>
        </View>
      </ScreenWrapper>
    </GestureHandlerRootView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 32,
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  form: {
    gap: 25,
  },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
  footerText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: 12,
  },
});