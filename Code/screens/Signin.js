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
import { AuthContext } from '../context';
import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';


export default function Signin({navigation}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn } = React.useContext(AuthContext);


const loginUser = () => {
    auth()
    .signInWithEmailAndPassword(email, password)
    .then((response) => {
      signIn();
    })
    .catch((error) => {
      alert(error);
    });
};


  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: "#252525"
    }}>
      <StatusBar translucent backgroundColor="transparent" />

        <View
          style={{
            flex: 4,
            padding: 30,
            justifyContent: "center",
            marginHorizontal: 30,
          }}
        >
          
          <View style={{ paddingVertical: 10 }}>
            <View style={{ flexDirection: "row", padding:5, alignItems: "center",borderRadius:10,backgroundColor:"rgba(81, 81, 81, 0.76)" }}>
              <TextInput
                placeholderTextColor="white"
                placeholder="Email"
                onChangeText={(text) => setEmail(text)}
                value={email}
                color={"white"}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
            </View>
          </View>
    
          <View style={{ paddingVertical: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center",padding:5,borderRadius:10,backgroundColor:"rgba(81, 81, 81, 0.76)" }}>
              <TextInput
                placeholderTextColor="white"
                placeholder="Password"
                color={"white"}
                secureTextEntry
                onChangeText={(text) => setPassword(text)}
                value={password}
                underlineColorAndroid="transparent"
                autoCapitalize="none"
              />
            </View>
          </View>
          
          <View style={{paddingTop:20}}>
            <TouchableOpacity
              style={{
                alignItems: "center",
                backgroundColor: "#E50914",
                borderRadius: 5,
                padding: 10,
                width: "100%",
                flexDirection: "row",
                justifyContent: "center",
              }}
              onPress={() => {
                loginUser();
              }}
            >
              <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              paddingTop: 30,
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white" }}>Don't have an account ?</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("Signup");
              }}
            >
              <Text style={{ color: "#E50914", paddingHorizontal: 5 }}>
                Sign Up Here
              </Text>
            </TouchableOpacity>
          </View>
        </View>
    </SafeAreaView>
  );
}

styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#252525"
  },
  image: {
    flex: 1,
  },
  but: {
    alignItems: "center",
    backgroundColor: "#E50914",
    borderRadius: 5,
    padding: 10,
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 17,
    color: "white",
    paddingHorizontal: 10,
  },
});