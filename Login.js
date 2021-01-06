import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  View,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';


export default function Login({navigation}) {

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" />
      <ImageBackground
        source={require("./assets/img.jpg")}
        style={styles.image}
      >
        <LinearGradient colors={['transparent', 'black']} style={{flex:1, alignItems: 'center',justifyContent:"flex-end"}}>
        <View style={{paddingTop:20}}>
            <TouchableOpacity
              style={styles.but}
              onPress={() => {
                navigation.navigate("Signin");
              }}
            >
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
          </View>

          <View style={{paddingTop:20}}>
            <TouchableOpacity
              style={styles.but}
              onPress={() => {
                navigation.navigate("Signup");
              }}
            >
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
          </View>

        </LinearGradient>
      </ImageBackground>
    </SafeAreaView>
  );
}

styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
  but: {
    alignItems: "center",
    backgroundColor: "#E50914",
    borderRadius: 5,
    padding: 10,
    textAlign: "center",
    width: 300,
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 17,
    color: "white",
    paddingHorizontal: 10,
  },
});