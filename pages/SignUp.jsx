import { StyleSheet, Text, View,TextInput, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView, Pressable } from 'react-native-gesture-handler'; // Add this import
import ScreenWrapper from '../components/screenwraper';
import { theme } from '../constrants/theme';
import Input from '../components/Input';
import Feather from '@expo/vector-icons/Feather';
import Button from '../components/Button';
import { supabase } from '../lib/supabase';

const SignUp =  () => {
  const emailRef = useRef("");
  const nameRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {  
    if(!emailRef.current || !passwordRef.current) {  
        Alert.alert('Sign Up', "please fill all the fields!");  
        return;  
    }  
  

    let name = nameRef.current.trim();
    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();

    setLoading(true);

    const {data: {session}, error} = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
        }
      }
    
    });

    setLoading(false);

    console.log('session: ', session);
    console.log('error: ', error);
    if(error) {
        Alert.alert('Sign Up', error.message)}
    }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}> 
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
          
          {/* Welcome */}
          
          <View>
           <View>
          <Text style={styles.welcomeText}> Let's</Text>
          <Text style={styles.welcomeText}> Get Started</Text>
        </View>
          </View>
          
          {/* Form */}
          
          <View style={styles.form}>
            <Text style={{ fontSize: 15, color: theme.colors.text }}>
              Please enter the details to create a new account
            </Text>
            <Input
              leftIcon={<Feather name="user" size={24} color="black" />}
              placeholder="Enter your name"
              onChangeText={value => nameRef.current = value}
            />
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

           

            {/* Button */}
            <Button title={'SignUp'} loading={loading} onPress={onSubmit}/>

          </View>

          {/* footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account ?
            </Text>
            <Pressable onPress={() => router.push('Login')}>
              <Text style={[styles.footerText, {color:theme.colors.primaryDark, fontWeight: theme.fonts.semibold}]}> Login 
              </Text>
            </Pressable>
          </View>
        </View>
      </ScreenWrapper>
    </GestureHandlerRootView>
  );
};

export default SignUp;

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
    fontWeight: theme.fonts.semiBold,
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