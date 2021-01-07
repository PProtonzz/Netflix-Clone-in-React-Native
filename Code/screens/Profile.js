import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {AuthContext} from '../context';
import Icon from 'react-native-vector-icons/Ionicons';
import DeviceInfo from 'react-native-device-info';
import colors from './services/colors';

const appVersion = DeviceInfo.getVersion();

const windowWidth = Dimensions.get('window').width;

export default function Profile({navigation}) {
  const {signOut} = React.useContext(AuthContext);

  const [ProfilesList, setProfilesList] = useState([
    {
      name:"User1"
    },
    {
      name:"User2"
    },
    {
      name:"User3"
    },
   {
      name:"User4"
    }
  
]);

  const [userDetail, setUserDetail] = useState({
    email: '',
    fullName: '',
    id: '',
    phone: '',
  });

  function getUserData(uid) {
    database()
      .ref(`/Users/${uid}/Info`)
      .on('value', (snapshot) => {
        setUserDetail({
          email: snapshot.val().email,
          fullName: snapshot.val().fullName,
          id: snapshot.val().id,
          phone: snapshot.val().phone,
        });
      });
  }

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

  useEffect(() => {
    const user = auth().currentUser;
    getUserData(user.uid);
    getProfiles(user.uid)
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
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.flex1}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: windowWidth,
            paddingHorizontal: 24,
            marginTop: 40,
          }}>
          <View>
            <View style={[styles.profiles, {backgroundColor: 'orange'}]}>
              <Image
                style={{height: 35, width: 35}}
                source={require('./assets/girl.png')}></Image>
            </View>
            <Text
              style={{color: colors.text, textAlign: 'center', fontSize: 12}}>
              {ProfilesList[0].name}
            </Text>
          </View>

          <View>
            <View style={[styles.profiles, {backgroundColor: 'pink'}]}>
              <Image
                style={{height: 35, width: 35}}
                source={require('./assets/boy.png')}></Image>
            </View>
            <Text
              style={{color: colors.text, textAlign: 'center', fontSize: 12}}>
              {ProfilesList[1].name}
            </Text>
          </View>
          <View>
            <View style={[styles.profiles, {backgroundColor: 'green'}]}>
              <Image
                style={{height: 35, width: 35}}
                source={require('./assets/monkey.png')}></Image>
            </View>
            <Text
              style={{color: colors.text, textAlign: 'center', fontSize: 12}}>
              {ProfilesList[2].name}
            </Text>
          </View>
          <View>
            <View style={[styles.profiles, {backgroundColor: 'violet'}]}>
              <Image
                style={{height: 35, width: 35}}
                source={require('./assets/baby.png')}></Image>
            </View>
            <Text
              style={{color: colors.text, textAlign: 'center', fontSize: 12}}>
              Children
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.flex5}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ManagePro');
          }}>
          <View
            style={{padding: 20, flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="md-pencil-sharp"
              style={{paddingHorizontal: 8}}
              size={12}
              color={colors.text}
            />
            <Text style={{color: colors.text, fontSize: 14}}>
              Manage Profiles
            </Text>
          </View>
        </TouchableOpacity>
        <View style={styles.set}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="checkmark"
              style={{paddingHorizontal: 11}}
              size={22}
              color={colors.text}
            />
            <Text style={{color: colors.text}}>My List</Text>
          </View>
          <Icon
            name="chevron-forward"
            style={{paddingHorizontal: 11}}
            size={22}
            color={colors.text}
          />
        </View>
        <View style={styles.set}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="settings-outline"
              style={{paddingHorizontal: 11}}
              size={22}
              color={colors.text}
            />
            <Text style={{color: colors.text}}>App Settings</Text>
          </View>
          <Icon
            name="chevron-forward"
            style={{paddingHorizontal: 11}}
            size={22}
            color={colors.text}
          />
        </View>
        <View style={styles.set}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="help-circle-outline"
              style={{paddingHorizontal: 11}}
              size={22}
              color={colors.text}
            />
            <Text style={{color: colors.text}}>Help</Text>
          </View>
          <Icon
            name="chevron-forward"
            style={{paddingHorizontal: 11}}
            size={22}
            color={colors.text}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            auth()
              .signOut()
              .then(() => {
                console.log('User signed out!');
                signOut();
              });
          }}
          style={{marginTop: 40}}>
          <Text style={{color: 'white', fontSize: 14}}>Sign Out</Text>
        </TouchableOpacity>
        <Text style={{color: 'grey', fontSize: 14}}>Version {appVersion}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  flex5: {
    flex: 5,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  profiles: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 6,
  },
  set: {
    height: 40,
    width: windowWidth,
    backgroundColor: colors.secondary,
    marginVertical: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
