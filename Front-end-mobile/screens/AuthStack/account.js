import { StyleSheet, Text, View, Image, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Divider, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { API_URL } from "@env"
import HomemadeNavBar from '../../components/homemadeNavBar';
import Header from '../../components/header';
import Card from '../../components/card';
import DocumentPicker from 'react-native-document-picker';



const Account = ({ navigation }) => {
  const [userId, setUserId] = useState(null)
  const [userData, setUserData] = useState({});
  const [selectedTab, setSelectedTab] = useState('top');
  const [friends, setFriends] = useState([]);
  const [singleFile, setSingleFile] = useState(null);
  const [imageEdit, setImageEdit] = useState(null);
  const editFront = <View style={styles.overlayImage}>
    <TouchableOpacity
      style={styles.profilImageSetting}
      onPress={() => selectFile()}
    >
      <Icon
        name='pencil-outline'
        type='ionicon'
        color='#FFFFFF'
      />
    </TouchableOpacity>
  </View>
  const validEditFront = <View style={styles.overlayImageEdit}>
    <TouchableOpacity
      style={[styles.profilImageSetting, { backgroundColor: '#9EAF6C' }]}
      onPress={() => saveSelectedFile()}
    >
      <Icon
        name='checkmark-outline'
        type='ionicon'
        color='#FFFFFF'
      />
    </TouchableOpacity>
    <TouchableOpacity
      style={[styles.profilImageSetting, { backgroundColor: '#635D5B' }]}
      onPress={() => deleteSelectFile()}
    >
      <Icon
        name='close-outline'
        type='ionicon'
        color='#FFFFFF'
      />
    </TouchableOpacity>
  </View>

  /**
   * A modifier => Créer deux state pour new et top ressource
   */
  const [display, setDisplay] = useState(<Text>Loading</Text>);
  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.images],
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res[0]);
      setImageEdit(res[0].uri);
      console.log('uri', imageEdit)
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  const deleteSelectFile = () => {
    setSingleFile(null)
    setImageEdit(null)
  }
  const saveSelectedFile = async () => {
    var formdata = new FormData()
    formdata.append("avatar-image", singleFile)
    formdata.append('user','{}')
    const res = await fetch(API_URL + "/user/" + userId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "user-upload-GUID": userId,
      },
      body: formdata,
    });

    console.log(res.status);
    if (res.status == 201 || res.status == 200) {
      console.log(res);
      setSingleFile(null)
      setImageEdit(null)
      getUserData()
    } else {
      console.log(res.status)
    }
  }
  const getLocalData = async () => {
    try {
      const storedId = await AsyncStorage.getItem('@userId');
      if (storedId != null) {
        setUserId(storedId)
      } else {
        navigation.navigate('Auth', { screen: 'Login' })
      }
    } catch (e) {
      console.log('dommage', e);
    }
  }
  const getUserData = async () => {
    try {
      const api = await fetch(API_URL + '/user/' + userId, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const res = await api.json();
      setUserData(res);
      console.log('frinds', friends)
    } catch (e) {
      console.log(e);
    }
  }
  const getPost = async () => {
    try {
      const api = await fetch(API_URL + '/articles/all', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const res = await api.json()
      setDisplay(displayPost(res));
    } catch (e) {
      console.log(e);
    }
  }
  const displayPost = (data) => {
    if (data.articles != undefined) {
      return data.articles.map(item => {
        return <Card navigation={navigation} key={item._id} data={item} />
      })
    } else {
      return <View />
    }
  }

  useEffect(() => {
    if (userId == null) {
      getLocalData();
    } else {
      if (Object.keys(userData).length === 0) {
        getUserData()
        getPost();
      } else {
        setFriends(userData.friends_ids)
      }
    }
  }, [userId, userData]);



  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.toolsButtons}>
        <TouchableOpacity
          style={styles.tool}
          onPress={() => navigation.navigate('Auth', { screen: 'AccountUpdate' })}
        >
          <Icon
            name='pencil-outline'
            type='ionicon'
            color='#FFFFFF'
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tool}
          onPress={() => navigation.navigate('Auth', { screen: 'Settings' })}
        >
          <Icon
            name='settings-outline'
            type='ionicon'
            color='#FFFFFF'
          />
        </TouchableOpacity>
      </View>
      <View
        style={styles.card}
      >
        <Image
          style={styles.profilImage}
          source={imageEdit ? { uri: imageEdit } : userData.photoUrl ? {uri: userData.photoUrl} : require('../../test_content/waiting.jpg')}
        />
        {singleFile ? validEditFront : editFront}
        <Text style={styles.username}>{userData.username}</Text>
        <Text style={styles.name}>{userData.firstname} {userData.lastname}</Text>
        <View style={styles.containerStats}>
          <View style={styles.containerStat}>
            <Text style={styles.stat}>42</Text>
            <Text style={styles.libelleStat}>Ressources</Text>
          </View>
          <Divider
            orientation='vertical'
            color='#CE8686'
            style={styles.divider}
          />
          <View style={styles.containerStat}>
            <Text style={styles.stat}>{friends.length || 0}</Text>
            <Text style={styles.libelleStat}>Relations</Text>
          </View>
        </View>
      </View>
      <View style={styles.buttonList}>
        <TouchableOpacity
          containerStyle={styles.containerRessourceType}
          style={[styles.ressourceType, selectedTab == 'top' ? styles.selectedRessource : null]}
          onPress={() => setSelectedTab('top')}
        >
          <Text style={styles.ressourceTitle}>Top ressources</Text>
        </TouchableOpacity>
        <TouchableOpacity
          containerStyle={styles.containerRessourceType}
          style={[styles.ressourceType, selectedTab == 'new' ? styles.selectedRessource : null]}
          onPress={() => setSelectedTab('new')}
        >
          <Text style={styles.ressourceTitle}>Les plus récentes</Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView style={styles.scrollViewContainer}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.postPosition}>
          {display}
        </ScrollView>
      </SafeAreaView>
      <HomemadeNavBar route='Relation' navigation={navigation} />
    </View>
  );
};

export default Account;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2F4077',
    width: '100%'
  },
  toolsButtons: {
    width: '100%',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    alignItems: 'center',
    paddingEnd: '5%'
  },
  tool: {
    width: 40,
    height: 40,
    backgroundColor: '#CE8686',
    margin: 5,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: '95%',
    backgroundColor: '#2F4077',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonList: {
    width: '95%',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    backgroundColor: '#2F4077',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  username: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  name: {
    fontSize: 20
  },
  text: {
    margin: 10
  },
  profilImage: {
    borderRadius: 100,
    width: 150,
    height: 150,
    margin: 25,
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    width: '100%',
  },
  overlayImage: {
    flex: 1,
    position: 'absolute',
    top: 150,
    left: Dimensions.get('window').width / 2 + 15,
  },
  overlayImageEdit: {
    flex: 1,
    position: 'absolute',
    flexDirection: 'row',
    top: 150,
    left: Dimensions.get('window').width / 2 + 15,
  },
  profilImageSetting: {
    width: 35,
    height: 35,
    backgroundColor: '#CE8686',
    margin: 5,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100
  },
  containerStats: {
    margin: 15,
    width: "50%",
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  containerStat: {
    alignItems: 'center',
    margin: 5
  },
  stat: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  libelleStat: {
    fontSize: 12,
  },
  containerRessourceType: {
    width: "50%",
    alignItems: 'center',
  },
  ressourceType: {
    borderBottomWidth: 1,
    width: "100%",
  },
  ressourceTitle: {
    width: "100%",
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 5
  },
  selectedRessource: {
    borderBottomWidth: 3,
    borderBottomColor: '#CE8686'
  },
  postPosition: {
    alignItems: 'center'
  },


});
