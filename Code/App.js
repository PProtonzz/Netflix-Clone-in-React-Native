import React, { useState, useEffect } from "react";
import Signup from "./Signup.js";
import Signin from "./Signin.js";
import Home from "./Home.js";
import Login from "./Login.js";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import auth from "@react-native-firebase/auth";
import { AuthContext } from "./context";

const AuthDone = createStackNavigator();
const AuthDoneScreen = () => (
  <AuthDone.Navigator headerMode="none">
    <AuthDone.Screen name="Home" component={Home} />
  </AuthDone.Navigator>
);
const AuthNotDone = createStackNavigator();
const AuthNotDoneScreen = () => (
  <AuthNotDone.Navigator headerMode="none">
    <AuthNotDone.Screen name="Login" component={Login} />
    <AuthNotDone.Screen name="Signup" component={Signup} />
    <AuthNotDone.Screen name="Signin" component={Signin} />
  </AuthNotDone.Navigator>
);

export default function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const authContext = React.useMemo(
    () => ({
      signIn: async () => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      },
      signOut: async () => {
        setInitializing(true);
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      },
      signUp: async () => {
        const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      },
    }),
    []
  );

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;
  return (
    <AuthContext.Provider value={authContext}>
      {!user ? (
        <NavigationContainer>
          <AuthNotDoneScreen />
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <AuthDoneScreen />
        </NavigationContainer>
      )}
    </AuthContext.Provider>
  );
}