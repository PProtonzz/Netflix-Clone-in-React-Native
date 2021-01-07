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
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {AuthContext} from '../context';

import colors from './services/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const windowWidth = Dimensions.get('window').width;

export default function ManagePro({navigation}) {
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
      <View
        style={{
          flex: 0.5,
          flexDirection: 'row',
          alignItem: 'center',
          width: windowWidth,
        }}>
        <View>
          <View
            style={{padding: 10, marginHorizontal: 10, alignItems: 'center'}}>
            <Text
              style={{
                color: '#ffffff',
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
            style={{padding: 10, marginHorizontal: 55, alignItems: 'center'}}>
            <Text style={{color: '#ffffff', textAlign: 'center', fontSize: 15}}>
              Manage Profiles
            </Text>
          </View>
        </View>
      </View>
      <View style={{flex: 9, alignItems: 'center', justifyContent: 'center'}}>
        <View style={styles.pro}>
          <View>
            <Icon
              name="pencil-outline"
              style={styles.pencil}
              color={colors.text}
              size={45}
            />
            <View style={[styles.profiles, {backgroundColor: 'orange'}]}>
              <Image
                style={{
                  height: 80,
                  width: 80,
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0.8,
                }}
                source={require('./assets/girl.png')}></Image>
            </View>
            <Text
              style={{color: colors.text, textAlign: 'center', fontSize: 14}}>
              User1
            </Text>
          </View>
          <View>
          <Icon
              name="pencil-outline"
              style={styles.pencil}
              color={colors.text}
              size={45}
            />
            <View style={[styles.profiles, {backgroundColor: 'pink'}]}>
              <Image
                style={{height: 80, width: 80}}
                source={require('./assets/boy.png')}></Image>
            </View>
            <Text
              style={{color: colors.text, textAlign: 'center', fontSize: 14}}>
              User2
            </Text>
          </View>
        </View>
        <View style={styles.pro}>
          <View>
          <Icon
              name="pencil-outline"
              style={styles.pencil}
              color={colors.text}
              size={45}
            />
            <View style={[styles.profiles, {backgroundColor: 'green'}]}>
              <Image
                style={{height: 80, width: 80}}
                source={require('./assets/monkey.png')}></Image>
            </View>
            <Text
              style={{color: colors.text, textAlign: 'center', fontSize: 14}}>
              User3
            </Text>
          </View>
          <View>
          <Icon
              name="pencil-outline"
              style={styles.pencil}
              color={colors.text}
              size={45}
            />
            <View style={[styles.profiles, {backgroundColor: 'violet'}]}>
              <Image
                style={{height: 80, width: 80}}
                source={require('./assets/baby.png')}></Image>
            </View>
            <Text
              style={{color: colors.text, textAlign: 'center', fontSize: 14}}>
              User4
            </Text>
          </View>
        </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  profiles: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'flex-end',
    margin: 20,
    borderRadius: 6,
    opacity: 0.6,
  },
  pencil: {
    position: 'absolute',
    top: 50,
    left: 50,
    elevation: 4,
  },
});
