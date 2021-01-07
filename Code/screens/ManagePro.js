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
            <Text onPress={() => {navigation.navigate("Profile")}}
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
            <TouchableOpacity onPress={()=>{
                navigation.navigate("EditPro",{index:0,color:'orange',type:require('./assets/girl.png')})
              }}>
              <Image
                style={{
                  height: 80,
                  width: 80,
                }}
                source={require('./assets/girl.png')}></Image>
                </TouchableOpacity>
            </View>
            <Text
              style={{color: colors.text, textAlign: 'center', fontSize: 15}}>
              {ProfilesList[0].name}
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
              <TouchableOpacity onPress={()=>{
                navigation.navigate("EditPro",{index:1,color:'pink',type:require('./assets/boy.png')})
              }}>
                
              <Image
                style={{height: 80, width: 80}}
                source={require('./assets/boy.png')}></Image>
                
              </TouchableOpacity>
            </View>
            <Text
              style={{color: colors.text, textAlign: 'center', fontSize: 15}}>
              {ProfilesList[1].name}
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
            <TouchableOpacity onPress={()=>{
                navigation.navigate("EditPro",{index:2,color:'green',type:require('./assets/monkey.png')})
              }}>
              <Image
                style={{height: 80, width: 80}}
                source={require('./assets/monkey.png')}></Image>
                </TouchableOpacity>
            </View>
            <Text
              style={{color: colors.text, textAlign: 'center', fontSize: 15}}>
              {ProfilesList[2].name}
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
            <TouchableOpacity onPress={()=>{
                navigation.navigate("EditPro",{index:3,color:'violet',type:require('./assets/baby.png')})
              }}>
              <Image
                style={{height: 80, width: 80}}
                source={require('./assets/baby.png')}></Image>
                </TouchableOpacity>
            </View>
            <Text
              style={{color: colors.text, textAlign: 'center', fontSize: 15}}>
              {ProfilesList[3].name}
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
    justifyContent: 'center',
    marginVertical:30
  },
  profiles: {
    height: 100,
    width: 100,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: 15,
    borderRadius: 6,
    opacity: 0.6,
  },
  pencil: {
    position: 'absolute',
    top: 30,
    left: 40,
    elevation: 4,
  },
});
