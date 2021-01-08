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
  Dimensions,
  ToastAndroid,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {AuthContext} from '../context';
import Icon from 'react-native-vector-icons/Ionicons';
import {Video} from 'expo-av';
import LoadingView from './services/Loading.js';
import colors from './services/colors';

import LinearGradient from 'react-native-linear-gradient';

const windowWidth = Dimensions.get('window').width;

export default function Home({navigation}) {
  const {signOut} = React.useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [isVisible, setVisible] = useState(null);
  const [BollywoodList, setBollywoodList] = useState([]);
  const [RecentWatching, setRecentWatching] = useState([]);
  const [HollywoodList, setHollywoodList] = useState([]);
  const [SeriesList, setSeriesList] = useState([]);
  const [KidsList, setKidsList] = useState([]);
  const [TrendingList, setTrendingList] = useState([]);
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

  function getRecentWatching(uid) {
    database()
      .ref(`/Users/${uid}/Profiles/0/Recent`)
      .on('value', (snapshot) => {
        var main = [];
        snapshot.forEach((child) => {
          main.push({
            key: child.key,
            link: child.val().link,
            thumbnail: child.val().thumbnail,
          });
        });
        setRecentWatching(main);
      });
  }

  function getTrendingList() {
    database()
      .ref('/Categories/')
      .on('value', (snapshot) => {
        var main = [];
        snapshot.forEach((child2) => {
          child2.forEach((child) => {
            if (main.every((item) => item.link !== child.val().link)) {
              main.push({
                type: child2.key,
                key: child.key,
                name: child.val().name,
                link: child.val().link,
                description: child.val().description,
                genre: child.val().genre,
                viewCount: child.val().viewCount,
                cast: child.val().cast,
                thumbnail: child.val().thumbnail,
              });
            }
          });
        });
        setTrendingList(sortArrayAsc(main));
      });
  }

  function sortArrayAsc(array) {
    return array.sort(function (a, b) {
      console.info(b.viewCount);
      return b.viewCount < a.viewCount ? -1 : b.viewCount > a.viewCount ? 1 : 0;
    });
  }

  function getList() {
    database()
      .ref('/Categories/Bollywood')
      .on('value', (snapshot) => {
        var main = [];
        snapshot.forEach((child) => {
          main.push({
            name: child.val().name,
            link: child.val().link,
            description: child.val().description,
            genre: child.val().genre,
            viewCount: child.val().viewCount,
            cast: child.val().cast,
            thumbnail: child.val().thumbnail,
            key: child.key,
          });
        });
        setBollywoodList(main);
      });

    database()
      .ref('/Categories/Hollywood')
      .on('value', (snapshot) => {
        var main = [];
        snapshot.forEach((child) => {
          main.push({
            name: child.val().name,
            link: child.val().link,
            description: child.val().description,
            genre: child.val().genre,
            viewCount: child.val().viewCount,
            cast: child.val().cast,
            thumbnail: child.val().thumbnail,
            key: child.key,
          });
        });
        setHollywoodList(main);
      });

    database()
      .ref('/Categories/Series')
      .on('value', (snapshot) => {
        var main = [];
        snapshot.forEach((child) => {
          main.push({
            name: child.val().name,
            link: child.val().link,
            description: child.val().description,
            genre: child.val().genre,
            viewCount: child.val().viewCount,
            cast: child.val().cast,
            thumbnail: child.val().thumbnail,
            key: child.key,
          });
        });
        setSeriesList(main);
      });

    database()
      .ref('/Categories/Kids')
      .on('value', (snapshot) => {
        var main = [];
        snapshot.forEach((child) => {
          main.push({
            name: child.val().name,
            link: child.val().link,
            description: child.val().description,
            genre: child.val().genre,
            viewCount: child.val().viewCount,
            cast: child.val().cast,
            thumbnail: child.val().thumbnail,
            key: child.key,
          });
        });
        setKidsList(main);
      });
  }

  function increaseCount(type, key, viewCount) {
    database()
      .ref(`Categories/${type}/${key}`)
      .update({
        viewCount: viewCount + 1,
      })
      .then(() => console.log('Data set.'));
  }

  useEffect(() => {
    const user = auth().currentUser;
    getUserData(user.uid);
    getRecentWatching(user.uid);
    getList();
    getTrendingList();
  }, []);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.primary,
      }}>
      <ScrollView>
        <ImageBackground
          source={{
            uri:
              'https://www.filmibeat.com/ph-big/2012/05/gangs-of-wasseypur_133783674811.jpg',
          }}
          style={{
            height: windowWidth - 60,
            width: windowWidth,
            justifyContent: 'flex-end',
          }}>
          <LinearGradient
            colors={['transparent', 'rgba(0, 0, 0, 0.73)', 'black']}
            style={{}}>
            <View
              style={{
                height: 50,
                marginBottom: 20,
              }}></View>
            <View
              style={{
                marginLeft: 40,
                marginRight: 40,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 12,
                alignItems: 'center',
                marginHorizontal: 9,
              }}>
              <View style={{}}>
                <Icon
                  name="add"
                  style={{paddingHorizontal: 8}}
                  size={16}
                  color={colors.text}
                />
                <Text style={{color: colors.text}}>Done</Text>
              </View>
              <View
                style={{
                  backgroundColor: colors.text,
                  flexDirection: 'row',
                  alignItems: 'center',
                  borderRadius: 4,
                  paddingHorizontal: 3,
                }}>
                <Icon
                  name="play"
                  style={{paddingHorizontal: 8}}
                  size={16}
                  color={'#000000'}
                />
                <Text style={{color: '#000000', textAlign: 'center'}}>
                  Done
                </Text>
              </View>
              <View style={{alignItems: 'center'}}>
                <Icon
                  name="information-circle-outline"
                  style={{paddingHorizontal: 8}}
                  size={18}
                  color={colors.text}
                />
                <Text style={{color: colors.text}}>Info</Text>
              </View>
            </View>
            <View
              style={{
                height: 5,
                marginBottom: 20,
              }}></View>
          </LinearGradient>
        </ImageBackground>

        <View
          style={{
            height: 10,
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
            data={RecentWatching}
            showsHorizontalScrollIndicator={false}
            style={{marginTop: 15, flex: 1}}
            renderItem={({item, index}) => (
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
                  source={{
                    uri: item.thumbnail,
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setVisible(index);
                      increaseCount(item.type,item.key,item.viewCount)
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
                  source={
                    isVisible !== null
                      ? {uri: RecentWatching[isVisible].link}
                      : null
                  }
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
              Trending Now
            </Text>
          </View>

          <FlatList
            horizontal={true}
            data={TrendingList}
            showsHorizontalScrollIndicator={false}
            style={{marginTop: 15, flex: 1}}
            renderItem={({item}) => (
              <View style={{marginHorizontal: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Videos', {
                      type: item.type,
                      key: item.key,
                      description: item.description,
                      genre: item.genre,
                      cast: item.cast,
                      link: item.link,
                      thumbnail: item.thumbnail,
                      viewCount: item.viewCount,
                      name: item.name,
                    });
                  }}>
                  <Image
                    style={{borderRadius: 5, height: 150, width: 120}}
                    source={{
                      uri: item.thumbnail,
                    }}
                  />
                </TouchableOpacity>
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
              Netflix Originals
            </Text>
          </View>

          <FlatList
            horizontal={true}
            data={SeriesList}
            showsHorizontalScrollIndicator={false}
            style={{marginTop: 15, flex: 1}}
            renderItem={({item}) => (
              <View style={{marginHorizontal: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Videos', {
                      type: 'Series',
                      key: item.key,
                      description: item.description,
                      genre: item.genre,
                      cast: item.cast,
                      link: item.link,
                      thumbnail: item.thumbnail,
                      viewCount: item.viewCount,
                      name: item.name,
                    });
                  }}>
                  <Image
                    style={{borderRadius: 5, height: 150, width: 120}}
                    source={{
                      uri: item.thumbnail,
                    }}
                  />
                </TouchableOpacity>
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
              Bollywood Movies
            </Text>
          </View>

          <FlatList
            horizontal={true}
            data={BollywoodList}
            showsHorizontalScrollIndicator={false}
            style={{marginTop: 15, flex: 1}}
            renderItem={({item}) => (
              <View style={{marginHorizontal: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Videos', {
                      type: 'Bollywood',
                      key: item.key,
                      description: item.description,
                      genre: item.genre,
                      cast: item.cast,
                      link: item.link,
                      thumbnail: item.thumbnail,
                      viewCount: item.viewCount,
                      name: item.name,
                    });
                  }}>
                  <Image
                    style={{borderRadius: 5, height: 150, width: 120}}
                    source={{
                      uri: item.thumbnail,
                    }}
                  />
                </TouchableOpacity>
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
              Hollywood Movies
            </Text>
          </View>

          <FlatList
            horizontal={true}
            data={HollywoodList}
            showsHorizontalScrollIndicator={false}
            style={{marginTop: 15, flex: 1}}
            renderItem={({item}) => (
              <View style={{marginHorizontal: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Videos', {
                      type: 'Hollywood',
                      key: item.key,
                      description: item.description,
                      genre: item.genre,
                      cast: item.cast,
                      link: item.link,
                      thumbnail: item.thumbnail,
                      viewCount: item.viewCount,
                      name: item.name,
                    });
                  }}>
                  <Image
                    style={{borderRadius: 5, height: 150, width: 120}}
                    source={{
                      uri: item.thumbnail,
                    }}
                  />
                </TouchableOpacity>
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
              Kids, Cartoons {'&'} Childrens
            </Text>
          </View>

          <FlatList
            horizontal={true}
            data={KidsList}
            showsHorizontalScrollIndicator={false}
            style={{marginTop: 15, flex: 1}}
            renderItem={({item}) => (
              <View style={{marginHorizontal: 10}}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('Videos', {
                      type: 'Kids',
                      key: item.key,
                      description: item.description,
                      genre: item.genre,
                      cast: item.cast,
                      link: item.link,
                      thumbnail: item.thumbnail,
                      viewCount: item.viewCount,
                      name: item.name,
                    });
                  }}>
                  <Image
                    style={{borderRadius: 5, height: 150, width: 120}}
                    source={{
                      uri: item.thumbnail,
                    }}
                  />
                </TouchableOpacity>
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
