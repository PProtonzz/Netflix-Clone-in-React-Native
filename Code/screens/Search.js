import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  FlatList,
  Modal
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import {AuthContext} from '../context';
import colors from './services/colors';
import LoadingView from './services/Loading.js';


import Icon from 'react-native-vector-icons/Ionicons';
import {Video} from 'expo-av';

const windowWidth = Dimensions.get('window').width;
export default function Search({navigation}) {
  const {signOut} = React.useContext(AuthContext);
  const [List, setList] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [isVisible, setVisible] = useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filterList, setFilterList] = useState([]);
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

  function getList() {
    database()
      .ref('/Categories/')
      .on('value', (snapshot) => {
        var main = [];
        snapshot.forEach((child2) => {
          child2.forEach((child) => {
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
          });
        });
        setList(main);
        setFilterList(main);
      });
  }

  const onChangeSearch = (query) => {
    setSearchQuery(query);
    setFilterList(
      List.filter((i) => i.name.toLowerCase().includes(query.toLowerCase())),
    );
  };

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
    getUserData(user.uid);
    getList();
  }, []);

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
      <View style={{flex: 0.5}}>
        <TextInput
          placeholderTextColor="grey"
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={styles.textIn}
        />
      </View>
      <View style={{flex: 7}}>
        <Text style={{fontSize:20,color:colors.text,paddingTop:7}}>
          Top Searches
          </Text>
        <FlatList
          data={filterList}
          showsHorizontalScrollIndicator={false}
          style={{marginTop: 15, flex: 1}}
          renderItem={({item,index}) => (
            <View
              style={{
                width: windowWidth - 20,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{alignItems: 'center', flexDirection: 'row'}}>
                <Image
                  style={{borderRadius: 5, height: 100, width: 150}}
                  source={{
                    uri: item.thumbnail,
                  }}
                />
                <Text
                  style={{color: colors.text, marginLeft: 10, fontSize: 14}}>
                  {item.name}
                </Text>
              </View>
              <View>
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
              </View>
            </View>
          )}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={{
                  width: '100%',
                  height: 8,
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
                source={isVisible !== null ? {uri: filterList[isVisible].link} : null}
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  textIn: {
    borderRadius: 4,
    width: windowWidth - 20,
    height: 40,
    marginRight: 10,
    backgroundColor: colors.secondary,
    textAlign: 'center',
  },
  playButton: {
    height: 50,
    width: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: colors.text,
    backgroundColor: 'rgba(43, 38, 39, 0.68)',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
});
