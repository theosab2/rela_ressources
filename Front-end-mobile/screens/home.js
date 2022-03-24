import {HeaderStyleInterpolators} from '@react-navigation/stack';
import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import Card from '../components/card';
import Footer from '../components/footer';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
  const [post, setPost] = useState({});
  const [display, setDisplay] = useState(<Text>Loading</Text>);
  let excedTime = 0;

  useEffect(() => {
    const getStateUser = async () => {
      const user = await AsyncStorage.getItem('@userId');
      if(user != null){
        getPost()
      }else{
        getPost
      }
    }
    const getPost = async () => {
      const api = await fetch('http://10.176.131.87:3001/articles/all', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const res = await api.json()
      setDisplay(displayPost(res));
    }
    const displayPost = (data) => {
      if(data.articles != undefined){
        console.log(data.articles);
        return data.articles.map(item => {
          console.log(item._id);
          return <Card navigation={navigation} key={item._id} data={item}/>
        })
      }else{
        return <View/>
      }
    }
    getStateUser();
    
  }, [])
  
  return (
    <LinearGradient
      colors={['#869ece', '#ffffff' ]}
      style={styles.linearGradient}
      locations={[0, 1]}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          {display}
        </ScrollView>
      </SafeAreaView>
      <View style={styles.footer}>
        <Footer />
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 12,
  },
  scrollView: {
    flex: 8,
  },
  footer: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    height: '100%',
    width: '100%',
  }
});

export default Home;
