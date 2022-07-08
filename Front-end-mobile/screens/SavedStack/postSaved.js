import React, { Component, useEffect, useState } from 'react';
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from 'react-native';
import Card from '../../components/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "@env"
import HomemadeNavBar from '../../components/homemadeNavBar';
import Header from '../../components/header';
import { Divider } from 'react-native-elements';

const PostSaved = ({ navigation }) => {
  const [post, setPost] = useState({});
  const [display, setDisplay] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [savedArticlesId, setSavedArticlesId] = useState(null);
  const [savedArticles, setSavedArticles] = useState(null);
  const [reload,setReload] = useState(0);

  const getUserData = async () => {
    const idUser = await AsyncStorage.getItem('@userId');
    try {
      const api = await fetch(API_URL + '/user/' + idUser, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const res = await api.json();
      setUserData(res);
    } catch (e) {
      console.log(e)
    }

  }
  const getSavedArticlesId = () => {
    let articles = []
    articles = [...userData.favorites];
    setSavedArticlesId(articles)
  }
  //IMPORTANT DE OUF
  const getDataSavedArticles = async () => {
    let articles = await Promise.all(savedArticlesId.map(async savedArticleId => {
        const api = await fetch(API_URL + '/article/' + savedArticleId, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        });
        return await api.json()
    }))
    setSavedArticles(articles)
  }
  const displayPost = (articles) => {
    if (articles.length > 0) {
      return articles.map(item => {
        return <Card navigation={navigation} key={item._id} data={item} />
      })
    } else if (articles.length <= 0) {
      return <Text>Aucun article a été sauvegardé</Text>
    }
  }

  useEffect(() => {
    if(!userData){getUserData()}
    else if(!savedArticlesId){getSavedArticlesId()}
    else if(!savedArticles && savedArticlesId.length >= 0){getDataSavedArticles()}
    else if(!display && savedArticles.length > 0){
      setDisplay(displayPost(savedArticles))
    }
    console.log(reload)
  }, [userData,savedArticlesId, savedArticles, display])

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Vos ressources sauvegardées</Text>
        <Divider
          orientation='horizontal'
          color='#CE8686'
          style={styles.divider}
        />
      </View>
      <SafeAreaView style={styles.scrollViewContainer}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.postPosition}>
          {display || <Text>Loading</Text>}
        </ScrollView>
      </SafeAreaView>
      <View style={styles.footer}>
      </View>
      <HomemadeNavBar route='Save' navigation={navigation} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2F4077'
  },
  scrollViewContainer: {
    flex: 12,
  },
  scrollView: {
    flex: 8,
  },
  postPosition: {
    alignItems: 'center'
  },
  titleContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  divider: {
    width: '33%',
    margin: 10
  },
  title: {
    fontSize: 20,
    marginTop: 10
  }
});

export default PostSaved;
