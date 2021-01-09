import React, {useState, useEffect} from 'react';
import Signup from './screens/Signup.js';
import Signin from './screens/Signin.js';
import Home from './screens/Home.js';
import Login from './screens/Login.js';
import ManagePro from './screens/ManagePro.js';
import EditPro from './screens/EditPro.js';
import Profile from './screens/Profile.js';
import Search from './screens/Search.js';
import Videos from './screens/Videos.js';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import auth from '@react-native-firebase/auth';
import {AuthContext} from './context';
import Icon from 'react-native-vector-icons/Ionicons';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import colors from './screens/services/colors.js';
import PushNotification from 'react-native-push-notification';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';

const HomeStack = createStackNavigator();
const HomeScreen = () => (
  <HomeStack.Navigator headerMode="none">
    <HomeStack.Screen name="Home" component={Home} />
    <HomeStack.Screen name="Videos" component={Videos} />
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
    <ProfileStack.Screen name="ManagePro" component={ManagePro} />
    <ProfileStack.Screen name="EditPro" component={EditPro} />
  </ProfileStack.Navigator>
);

const AuthDone = createMaterialTopTabNavigator();

function AuthDoneScreen() {
  return (
    <AuthDone.Navigator
      initialRouteName="HomeScreen"
      tabBarPosition="bottom"
      swipeEnabled={false}
      tabBarOptions={{
        activeTintColor: colors.text,
        labelStyle: {fontSize: 10, textAlign: 'center'},
        iconStyle: {alignItems: 'center'},
        indicatorStyle: {opacity: 0},
        showIcon: true,
        style: {
          backgroundColor: '#000000',
          elevation: 0, // for Android
          shadowOffset: {
            width: 0,
            height: 0, // for iOS
          },
          borderEndWidth: 0,
        },
      }}>
      <AuthDone.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color}) => (
            <Icon name="home-outline" style={{}} size={18} color={color} />
          ),
        }}
      />
      <AuthDone.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({color}) => (
            <Icon name="search" style={{}} size={18} color={color} />
          ),
        }}
      />
      <AuthDone.Screen
        name="ProfileScreen"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Icon name="person-outline" style={{}} size={18} color={color} />
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

    // Must be outside of any component LifeCycle (such as `componentDidMount`).
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log('TOKEN:', token);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        console.log('NOTIFICATION:', notification);

        // process the notification
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

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
