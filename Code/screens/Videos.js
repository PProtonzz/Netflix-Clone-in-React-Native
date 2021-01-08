import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  ImageBackground,
  Modal,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {AuthContext} from '../context';

import {Video} from 'expo-av';

import Icon from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
import colors from './services/colors';
import LoadingView from './services/Loading.js';

export default function Videos({navigation, route}) {
  const {
    type,
    key,
    description,
    genre,
    cast,
    link,
    thumbnail,
    viewCount,
    name,
  } = route.params;
  const {signOut} = React.useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [isVisible, setVisible] = useState(null);
  const [uid, setuid] = useState();
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

  function increaseCount(type,key,viewCount){
    database()
      .ref(`Categories/${type}/${key}`)
      .update({
        viewCount: viewCount+ 1,
      })
      .then(() => console.log('Data set.'));
  }


  useEffect(() => {
    const user = auth().currentUser;
    setuid(user.uid);
    getUserData(user.uid);
  }, []);

  function setLastWatching() {
    database()
      .ref(`/Users/${uid}/Profiles/0`)
      .on('value', (snapshot) => {
        if (!snapshot.child(`Recent/${key}`).exists()) {
          database()
            .ref(`/Users/${uid}/Profiles/0/Recent/${key}`)
            .set({
              link: link,
              thumbnail:thumbnail,
            })
            .then(() => console.log('Data set.'));
        }
      });
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        paddingTop: StatusBar.currentHeight,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ScrollView>
        <ImageBackground
          source={{
            uri: thumbnail,
          }}
          style={{
            height: 300,
            width: windowWidth,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              setVisible(link);
              setLastWatching();
              increaseCount(type,key,viewCount)
            }}>
            <View style={styles.playButton}>
              <Icon
                name="play"
                style={{marginLeft: 3}}
                color={colors.text}
                size={30}
              />
            </View>
          </TouchableOpacity>
        </ImageBackground>
        <Modal
          style={{}}
          animationType="slide"
          transparent={false}
          visible={isVisible !== null}
          onRequestClose={() => {
            setVisible(null);
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#000000',
            }}>
            <View>
              {loading && <LoadingView />}
              <Video
                ref={(ref) => {
                  console.log(ref);
                }}
                source={isVisible !== null ? {uri: link} : null}
                shouldPlay={false}
                onLoadStart={() => {
                  setLoading(true);
                }}
                onLoad={() => {
                  setLoading(false);
                }}
                useNativeControls
                resizeMode="contain"
                style={{
                  aspectRatio: 0.8,
                  // position: 'absolute',
                  // top: 0,
                  // right: 0,
                  // bottom: 0,
                  // left: 0,
                  borderRadius: 7,
                }}
              />
            </View>
          </View>
        </Modal>

        <View>
          <Text
            style={{
              color: colors.text,
              fontWeight: 'bold',
              fontSize: 25,
              padding: 5,
            }}>
            {name}
          </Text>
          <Text style={{color: colors.text, padding: 7}}>{description}</Text>
          <Text style={{color: colors.text, padding: 7, fontSize: 10}}>
            Starring: {cast}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 10,
            marginVertical: 10,
          }}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 15,
            }}>
            <Icon
              name="add"
              style={{paddingHorizontal: 8}}
              size={20}
              color={colors.text}
            />
            <Text style={{color: colors.text}}>My List</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 15,
            }}>
            <Icon
              name="thumbs-up-outline"
              style={{paddingHorizontal: 8}}
              size={20}
              color={colors.text}
            />
            <Text style={{color: colors.text}}>Rate</Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginHorizontal: 15,
            }}>
            <Icon
              name="ios-share-social"
              style={{paddingHorizontal: 8}}
              size={20}
              color={colors.text}
            />
            <Text style={{color: colors.text}}>Share</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  playButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.text,
    backgroundColor: 'rgba(43, 38, 39, 0.68)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
