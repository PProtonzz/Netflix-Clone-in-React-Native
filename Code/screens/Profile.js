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

const appVersion = DeviceInfo.getVersion();

const windowWidth = Dimensions.get('window').width;

export default function Profile({navigation}) {
  const {signOut} = React.useContext(AuthContext);

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
  useEffect(() => {
    const user = auth().currentUser;
    getUserData(user.uid);
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
            <View
              style={{
                height: 50,
                width: 50,
                backgroundColor: 'orange',
                alignItems: 'center',
                justifyContent: 'flex-end',
                borderRadius: 6,
              }}>
              <Image
                style={{height: 35, width: 35}}
                source={require('./assets/girl.png')}></Image>
            </View>
            <Text style={{color: '#ffffff', textAlign: 'center', fontSize: 12}}>
              User1
            </Text>
          </View>
          <View>
            <View
              style={{
                height: 50,
                width: 50,
                backgroundColor: 'yellow',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 6,
              }}>
              <Image
                style={{height: 35, width: 35}}
                source={require('./assets/smile.png')}></Image>
            </View>
            <Text style={{color: '#ffffff', textAlign: 'center', fontSize: 12}}>
              User2
            </Text>
          </View>
          <View>
            <View
              style={{
                height: 50,
                width: 50,
                backgroundColor: 'green',
                alignItems: 'center',
                borderRadius: 6,
                justifyContent: 'flex-end',
              }}>
              <Image
                style={{height: 35, width: 35}}
                source={require('./assets/boy.png')}></Image>
            </View>
            <Text style={{color: '#ffffff', textAlign: 'center', fontSize: 12}}>
              User3
            </Text>
          </View>
          <View>
            <View
              style={{
                height: 50,
                width: 50,
                backgroundColor: 'violet',
                alignItems: 'center',
                borderRadius: 6,
                justifyContent: 'flex-end',
              }}>
              <Image
                style={{height: 35, width: 35}}
                source={require('./assets/monkey.png')}></Image>
            </View>
            <Text style={{color: '#ffffff', textAlign: 'center', fontSize: 12}}>
              User4
            </Text>
          </View>
          <View>
            <View
              style={{
                height: 50,
                width: 50,
                backgroundColor: 'pink',
                alignItems: 'center',
                borderRadius: 6,
                justifyContent: 'flex-end',
              }}>
              <Image
                style={{height: 35, width: 35}}
                source={require('./assets/baby.png')}></Image>
            </View>
            <Text style={{color: '#ffffff', textAlign: 'center', fontSize: 12}}>
              Children
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.flex5}>
        <View style={{padding: 20, flexDirection: 'row', alignItems: 'center'}}>
          <Icon
            name="md-pencil-sharp"
            style={{paddingHorizontal: 8}}
            size={12}
            color={'#ffffff'}
          />
          <Text style={{color: '#ffffff', fontSize: 14}}>Manage Profiles</Text>
        </View>
        <View
          style={{
            height: 40,
            width: windowWidth,
            backgroundColor: '#252525',
            marginVertical: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="checkmark"
              style={{paddingHorizontal: 11}}
              size={22}
              color={'#ffffff'}
            />
            <Text style={{color: '#ffffff'}}>My List</Text>
          </View>
          <Icon
            name="chevron-forward"
            style={{paddingHorizontal: 11}}
            size={22}
            color={'#ffffff'}
          />
        </View>
        <View
          style={{
            height: 40,
            width: windowWidth,
            backgroundColor: '#252525',
            marginVertical: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="settings-outline"
              style={{paddingHorizontal: 11}}
              size={22}
              color={'#ffffff'}
            />
            <Text style={{color: '#ffffff'}}>App Settings</Text>
          </View>
          <Icon
            name="chevron-forward"
            style={{paddingHorizontal: 11}}
            size={22}
            color={'#ffffff'}
          />
        </View>
        <View
          style={{
            height: 40,
            width: windowWidth,
            backgroundColor: '#252525',
            marginVertical: 1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Icon
              name="help-circle-outline"
              style={{paddingHorizontal: 11}}
              size={22}
              color={'#ffffff'}
            />
            <Text style={{color: '#ffffff'}}>Help</Text>
          </View>
          <Icon
            name="chevron-forward"
            style={{paddingHorizontal: 11}}
            size={22}
            color={'#ffffff'}
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
});
