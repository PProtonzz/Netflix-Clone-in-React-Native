import React, {useState} from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  View,
  StyleSheet,
  SafeAreaView,
  Toast,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {AuthContext} from '../context';

export default function Signup({navigation}) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const {signUp} = React.useContext(AuthContext);

  const registerUser = () => {
    if (password !== confirmPassword) {
      alert("Passwords don't match.");
      return;
    }
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const data = {
          id: uid,
          fullName,
          email,
          phone,
        };
        database()
          .ref(`Users/${uid}`)
          .set({
            Info: data,
            Profiles:{
              0:{
                name:"User1"
              },
              1:{
                name:"User2"
              },
              2:{
                name:"User3"
              },
              3:{
                name:"User4"
              }
            }
          })
          .then(() => {
            ToastAndroid.show('Registration Successfull!', ToastAndroid.SHORT);
            signUp();
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#252525',
      }}>
      <StatusBar translucent backgroundColor="transparent" />
      <View
        style={{
          flex: 3,
          padding: 30,
          justifyContent: 'center',
          marginHorizontal: 30,
        }}>
        <View style={{paddingVertical: 10}}>
          <View
            style={{
              flexDirection: 'row',
              padding: 5,
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: 'rgba(81, 81, 81, 0.76)',
            }}>
            <TextInput
              placeholderTextColor="white"
              placeholder="Full Name"
              onChangeText={(text) => setFullName(text)}
              value={fullName}
              color={'white'}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={{paddingVertical: 10}}>
          <View
            style={{
              flexDirection: 'row',
              padding: 5,
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: 'rgba(81, 81, 81, 0.76)',
            }}>
            <TextInput
              placeholderTextColor="white"
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
              value={email}
              color={'white'}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={{paddingVertical: 10}}>
          <View
            style={{
              flexDirection: 'row',
              padding: 5,
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: 'rgba(81, 81, 81, 0.76)',
            }}>
            <TextInput
              placeholderTextColor="white"
              placeholder="Phone"
              color={'white'}
              onChangeText={(text) => setPhone(text)}
              value={phone}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={{paddingVertical: 10}}>
          <View
            style={{
              flexDirection: 'row',
              padding: 5,
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: 'rgba(81, 81, 81, 0.76)',
            }}>
            <TextInput
              placeholderTextColor="white"
              placeholder="Password"
              color={'white'}
              secureTextEntry
              onChangeText={(text) => setPassword(text)}
              value={password}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={{paddingVertical: 10}}>
          <View
            style={{
              flexDirection: 'row',
              padding: 5,
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: 'rgba(81, 81, 81, 0.76)',
            }}>
            <TextInput
              placeholderTextColor="white"
              placeholder="Confirm Password"
              secureTextEntry
              onChangeText={(text) => setConfirmPassword(text)}
              value={confirmPassword}
              color={'white'}
              underlineColorAndroid="transparent"
              autoCapitalize="none"
            />
          </View>
        </View>
        <View style={{paddingTop: 20}}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              backgroundColor: '#E50914',
              borderRadius: 5,
              padding: 10,
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
            onPress={() => {
              registerUser();
            }}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            paddingTop: 30,
            justifyContent: 'center',
          }}>
          <Text style={{color: 'white'}}>Already have an account ?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signin');
            }}>
            <Text style={{color: '#E50914', paddingHorizontal: 5}}>
              Login Here
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
    backgroundColor: '#252525',
  },
  image: {
    flex: 1,
  },
  but: {
    alignItems: 'center',
    backgroundColor: '#E50914',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 17,
    color: 'white',
    paddingHorizontal: 10,
  },
});
