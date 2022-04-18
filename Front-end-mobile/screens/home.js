import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import Card from '../components/card';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from "@env"
import HomemadeNavBar from '../components/homemadeNavBar';
import Header from '../components/header';
import { Divider } from 'react-native-elements';

const Home = ({navigation}) => {
  const [post, setPost] = useState({});
  const [display, setDisplay] = useState(<Text>Loading</Text>);
  const [userId,setUserId] = useState(null);
  let excedTime = 0;

  useEffect(() => {
    const getStateUser = async () => {
      const user = await AsyncStorage.getItem('@userId');
      setUserId(user);
      console.log(user);
      if(user != null){
        getPost()
      }else{
        getPost()
      }
    }
    const getPost = async () => {
      try{
        const api = await fetch(API_URL + '/articles/all', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        });
        const res = await api.json()
        setDisplay(displayPost(res));
      }catch(e){
        console.log(e);
      }
    }
    const displayPost = (data) => {
      if(data.articles != undefined){
        console.log(data.articles);
        return data.articles.map(item => {
          console.log('coucou',item._id);
          return <Card navigation={navigation} key={item._id} data={item}/>
        })
      }else{
        return <View/>
      }
    }
    getStateUser();
    
  }, [])
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Fil d'actualités</Text>
        <Divider
          orientation='horizontal'
          color='#CE8686'
          style={styles.divider}
        />
      </View>
      <SafeAreaView style={styles.scrollViewContainer}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.postPosition}>
          {display} 
        </ScrollView>
      </SafeAreaView>
      <View style={styles.footer}>
      </View>
      <HomemadeNavBar navigation={navigation}/>
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

export default Home;
