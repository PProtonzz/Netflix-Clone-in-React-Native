  
import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import auth from "@react-native-firebase/auth";
import database from '@react-native-firebase/database';
import { AuthContext } from "./context";


export default function Home({ navigation }) {
  const { signOut } = React.useContext(AuthContext);
  const [userDetail,setUserDetail]=useState({
    email:'',
    fullName:'',
    id:"",
    phone:'',
  })

  function getUserData(uid){
    database()
      .ref(`/Users/${uid}`)
      .on('value',(snapshot)=>{
        setUserDetail({
          email: snapshot.val().email,
          fullName: snapshot.val().fullName,
          id: snapshot.val().id,
          phone: snapshot.val().phone,
        })
      })
  }
  useEffect(() => {
    const user=auth().currentUser;
    getUserData(user.uid)
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#191414",
        paddingTop: StatusBar.currentHeight,
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableOpacity>
        <Text style={{ color: "white" }}>Hello {userDetail.fullName}</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          auth()
            .signOut()
            .then(() => {
              console.log("User signed out!");
              signOut();
              //navigation.navigate('signin')
            });
        }}
        style={{ padding: 40 }}
      >
        <Text style={{ color: "white" }}>LOGOUT</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}