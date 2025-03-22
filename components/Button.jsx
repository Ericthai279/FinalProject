import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { theme } from '../constrants/theme'
const Button = (
    buttonStyle,
    textStyle,
    title='',
    onpress=() => {},
    loading = false,
    hasShadow= true,
) => {

    const ShadowStyle = {
        shadowColor: theme.colors.dark,
        shadowOffset: {width:0, height: 10},
        shadowOpacity:0.2,
        shadowRadius:8,
        elevation:4
    }

  if(loading) {
    return (
      <View style = {[styles.button, buttonStyle, {backgroundColor: 'white'}]}>
        <loading/>
      </View>
    )
  }

  return (
    <View>
      <Pressable onPress={onpress} style = {[styles.button,buttonStyle, hasShadow && ShadowStyle ]}>Button
        <Text style={(styles.text, textStyle)}>{title}</Text>
      </Pressable>
    </View>
  )
}

export default Button

const styles = StyleSheet.create({
    button:{
        backgroundColor:theme.colors.primary,
        height: hp(6.6),
        justifyContent:'center',
        alignItems:'center',
        borderCurve:'continuous',
        borderRadius: theme.Radius.xl
    },
    text: {
        fontSize:hp(2.5),
        color: 'white',
        fontWeight: theme.fonts.bold
    }
})