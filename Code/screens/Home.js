import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  ImageBackground,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {AuthContext} from '../context';
import Icon from 'react-native-vector-icons/Ionicons';
import {Video} from 'expo-av';
import LoadingView from './services/Loading.js';
import colors from "./services/colors"

export default function Home({navigation}) {
  const {signOut} = React.useContext(AuthContext);
  
  const [loading, setLoading] = useState(true);
  const [isVisible, setVisible] = useState(null);
  const [vidList, setVidList] = useState([
    {
      name: 'coolie',
    },
    {
      name: 'tenet',
    },
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

  function getVidList() {
    database()
      .ref('/Categories/Bollywood')
      .on('value', (snapshot) => {
        var main = [];
        snapshot.forEach((child) => {
          console.log(child.val());
          main.push({
            name: child.val().name,
            link: child.val().link,
            Description: child.val().Description,
            Genre: child.val().Genre,
            ViewCount: child.val().ViewCount,
            Cast: child.val().Cast,
          });
        });
        setVidList(main);
      });
  }

  useEffect(() => {
    const user = auth().currentUser;
    getUserData(user.uid);
    getVidList();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary,
        paddingTop: StatusBar.currentHeight,
      }}>
      <StatusBar
        translucent
        backgroundColor="#191414"
        barStyle="light-content"
      />
      <ScrollView>
        <View
          style={{
            height: 70,
            alignItems: 'flex-end',
            justifyContent: 'center',
          }}></View>
        <View style={{}}>
          <View>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 17,
                paddingHorizontal: 15,
              }}>
              Continue Watching for {userDetail.fullName}
            </Text>
          </View>
          <FlatList
            horizontal={true}
            data={vidList}
            showsHorizontalScrollIndicator={false}
            style={{marginTop: 15, flex: 1}}
            renderItem={({item,index}) => (
              <View
                style={{
                  marginHorizontal: 15,
                  width: 120,
                  backgroundColor: '#252525',
                }}>
                <ImageBackground
                  style={{
                    height: 140,
                    width: 120,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  source={require('./assets/img.jpg')}>
                    <TouchableOpacity onPress={()=>setVisible(index)}>
                      
                  <View style={styles.playButton}>
                    <Icon name="play" style={{marginLeft:3}} color={colors.text} size={30} />
                  </View>
                  
                  </TouchableOpacity>
                </ImageBackground>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 5,
                  }}>
                  <Icon
                    name="information-circle-outline"
                    color={'grey'}
                    size={26}
                  />
                  <Icon name="ellipsis-vertical" color={'grey'} size={21} />
                </View>
              </View>
            )}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    height: '100%',
                  }}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
          <Modal
            style={{}}
            animationType="slide"
            transparent={false}
            visible={isVisible !== null}
            onRequestClose={() => {
              setVisible(null)
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
                source={isVisible !== null ? {uri: vidList[isVisible].link} : null}
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
                color: 'white',
                fontWeight: 'bold',
                fontSize: 17,
                paddingHorizontal: 15,
                marginTop: 15,
              }}>
              Popular On Netflix
            </Text>
          </View>

          <FlatList
            horizontal={true}
            data={vidList}
            showsHorizontalScrollIndicator={false}
            style={{marginTop: 15, flex: 1}}
            renderItem={({item}) => (
              <View style={{marginHorizontal: 15}}>
                <Image
                  style={{height: 150, width: 120}}
                  source={require('./assets/img.jpg')}
                />
              </View>
            )}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    height: '100%',
                  }}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
          <View>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 17,
                paddingHorizontal: 15,
                marginTop: 15,
              }}>
              Trending Now
            </Text>
          </View>

          <FlatList
            horizontal={true}
            data={vidList}
            showsHorizontalScrollIndicator={false}
            style={{marginTop: 15, flex: 1}}
            renderItem={({item}) => (
              <View style={{marginHorizontal: 15}}>
                <Image
                  style={{height: 150, width: 120}}
                  source={require('./assets/img.jpg')}
                />
              </View>
            )}
            ItemSeparatorComponent={() => {
              return (
                <View
                  style={{
                    height: '100%',
                  }}
                />
              );
            }}
            keyExtractor={(item, index) => index.toString()}
          />
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
