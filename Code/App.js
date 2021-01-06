import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import Signup from './screens/Signup.js';
import Signin from './screens/Signin.js';
import Home from './screens/Home.js';
import Login from './screens/Login.js';
import Profile from './screens/Profile.js';
import Search from './screens/Search.js';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './context';
import Icon from 'react-native-vector-icons/Ionicons';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const HomeStack = createStackNavigator();
const HomeScreen = () => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen name="Home" component={Home} />
  </HomeStack.Navigator>
);

const SearchStack = createStackNavigator();
const SearchScreen = () => (
  <SearchStack.Navigator headerMode="none">
    <SearchStack.Screen name="Search" component={Search} />
  </SearchStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileScreen = () => (
  <ProfileStack.Navigator headerMode="none">
    <ProfileStack.Screen name="Profile" component={Profile} />
  </ProfileStack.Navigator>
);

const AuthDone = createBottomTabNavigator();

function AuthDoneScreen() {
  return (
    <AuthDone.Navigator
      initialRouteName="HomeScreen"
      tabBarOptions={{
        activeTintColor: '#ffffff',
        activeBackgroundColor: '#101010',
        inactiveBackgroundColor: '#101010',
        showLabel: false,
        style: {
          elevation: 0, // for Android
          shadowOffset: {
            width: 0,
            height: 0, // for iOS
          },
        },
      }}
      color="#101010">
      <AuthDone.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon name="home-outline" style={{}} size={22} color={color} />
              <Text style={{color: color, fontSize:7}}>HOME</Text>
            </View>
          ),
        }}
      />
      <AuthDone.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon name="search" style={{}} size={22} color={color} />
              <Text style={{color: color, fontSize:7}}>Search</Text>
            </View>
          ),
        }}
      />
      <AuthDone.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon name="person-outline" style={{}} size={22} color={color} />
              <Text style={{color: color, fontSize:7}}>Profile</Text>
            </View>
          ),
        }}
      />
    </AuthDone.Navigator>
  );
}

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
    [],
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
