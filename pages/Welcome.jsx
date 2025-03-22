import React from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import ScreenWrapper from "../components/screenwraper";
import { StatusBar } from "expo-status-bar";
import { theme } from "../constrants/theme";
import { wp } from "../helpers/common";
import { hp }   from "../helpers/common";
import Button from "../components/Button";
const WelcomeScreen = () => {

  return (
    <ScreenWrapper bg = "white">    
        <StatusBar style = "dark"/>
            <View style={styles.container}>
                <Image style = {styles.welcomeImage} resizeMode = 'contain' source ={require('../images/WelcomeImage.jpg')}/>
                <View style = {{gap:20}}>
                    <Text style={styles.title}> Social </Text>
                    <Text style={styles.punchiline}> Where everyone learn and develope.  </Text>
                </View>

                <View Style={styles.footer}>

                    <Button title='Dive into the world of knowledge'
                    buttonStyle = {{marginHorizontal: wp(3)}}
                    onpress={()=> navigation.navigate("SignUp")} />
                </View>
                    <View style={styles.bottomTextContainer}>
                      <Text style={styles.loginText}>
                        Already have an account!
                      </Text>
                      <Pressable>
                        <Text style={[styles.loginText, {color: theme.colors.primary, fontWeight: theme.fonts.semibold}]}>
                          Login
                        </Text>
                      </Pressable>
                    </View>

            </View>
        

    </ScreenWrapper>

  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'space-around', 
    alignItems: 'center',
    backgroundColor:"white",
    paddingHorizontal:wp },
  header: { 
    fontSize: 24, 
    fontWeight: "bold" },
  welcomeImage:{ 
    height: hp(30),
    width: wp(100),
    alignSelf:'center'},
  title:{
    color: theme.colors.text,
    fontSize: hp(4),
    textAlign: 'center',
    fontWeight: theme.fonts.extraBold,},

punchline:{
    textAlign: 'center',
    paddingHorizontal: wp(10),
    fontSize: hp(1.7),
    color: theme.colors.text    },
footer:{
        gap:30,
        width:'100%',
    },
bottomTextContainer:{
  flexDirection:'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap:5
},
loginText:{
  textAlign: 'center',
  color: theme.colors.text,
  fontSize: hp(1.6)

}
})


export default WelcomeScreen;
