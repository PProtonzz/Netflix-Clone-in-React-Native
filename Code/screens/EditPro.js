import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {AuthContext} from '../context';

import colors from './services/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const windowWidth = Dimensions.get('window').width;

export default function EditPro({route, navigation}) {
  const {index, type, color} = route.params;
  const {signOut} = React.useContext(AuthContext);
  const [uid,setUid]=useState()
  const [userDetail, setUserDetail] = useState({
    email: '',
    fullName: '',
    id: '',
    phone: '',
  });
  const [name, setname] = useState('');
  const [ProfilesList, setProfilesList] = useState([
    {
      name: 'User1',
    },
    {
      name: 'User2',
    },
    {
      name: 'User3',
    },
    {
      name: 'User4',
    },
  ]);

  function getProfiles(uid) {
    database()
      .ref(`/Users/${uid}/Profiles`)
      .on('value', (snapshot) => {
        var main = [];
        snapshot.forEach((child) => {
          //console.log(child.val().name);
          main.push({
            name: child.val().name,
          });
        });
        setProfilesList(main);
      });
  }
  function getUserData(uid) {
    database()
      .ref(`/Users/${uid}/Profiles`)
      .on('value', (snapshot) => {
        setUserDetail({
          email: snapshot.val().email,
          fullName: snapshot.val().fullName,
          id: snapshot.val().id,
          phone: snapshot.val().phone,
        });
      });
  }

  function setProfile(uid) {
    database()
      .ref(`/Users/${uid}/Profiles/${index}`)
      .update({
        name: name,
      })
      .then(() => {
          navigation.navigate("ManagePro")
      });
  }

  useEffect(() => {
    const user = auth().currentUser;
    setUid(user.uid)
    getUserData(user.uid);
    getProfiles(user.uid);
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#101010',
        paddingTop: StatusBar.currentHeight,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 0.5,
          flexDirection: 'row',
          alignItem: 'center',
          justifyContent: 'space-between',
          width: windowWidth,
        }}>
        <View>
          <View
            style={{padding: 10, marginHorizontal: 10, alignItems: 'center'}}>
            <Text
              onPress={()=>{
                  navigation.navigate("ManagePro")
              }}
              style={{
                color: colors.text,
                textAlign: 'center',
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              Done
            </Text>
          </View>
        </View>
        <View>
          <View
            style={{padding: 10, marginHorizontal: 10, alignItems: 'center'}}>
            <Text
              style={{
                color: colors.text,
                textAlign: 'center',
                fontSize: 15,
              }}>
              Edit Profile
            </Text>
          </View>
        </View>
        <View>
          <View
            style={{padding: 10, marginHorizontal: 10, alignItems: 'center'}}>
            <Text
            onPress={()=>{setProfile(uid)}}
              style={{
                color: colors.text,
                textAlign: 'center',
                fontSize: 15,
                fontWeight: 'bold',
              }}>
              Save
            </Text>
          </View>
        </View>
      </View>
      <View style={{flex: 9, alignItems: 'center', justifyContent: 'center'}}>
        <View style={[styles.profiles, {backgroundColor: color}]}>
          <Image style={{height: 100, width: 100}} source={type}></Image>
        </View>
        <TextInput
          placeholderTextColor="white"
          placeholder={ProfilesList[index].name}
          onChangeText={(text) => setname(text)}
          value={name}
          color={'white'}
          underlineColorAndroid="transparent"
          autoCapitalize="none"
          style={{
            borderWidth: 2,
            borderColor: colors.text,
            width: 200,
            paddingHorizontal:10,
            height:40
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pro: {
    flexDirection: 'row',
    width: windowWidth,
    justifyContent: 'center',
  },
  profiles: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 15,
    borderRadius: 6,
    marginVertical:18
  },
  pencil: {
    position: 'absolute',
    top: 30,
    left: 40,
    elevation: 4,
  },
});
