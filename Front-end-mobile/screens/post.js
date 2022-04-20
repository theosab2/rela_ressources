import {API_URL} from "@env"
import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../components/header';
import ProfilCard from '../components/profilCard';

const Post = ({route, navigation}) => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const getDataPost = async () => {
     /* try{*/
        console.log(API_URL + '/article/' + route.params.idPost)
        const api = await fetch(API_URL + '/article/' + route.params.idPost, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        });
        const res = await api.json()
        console.log(res)
        setPost(res);
      /*}catch(e){
        console.log(e);
      }*/
    }
    getDataPost();
  },[])
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.toolsButtons}>
          <TouchableOpacity
            style={styles.tool}
          >
            <Icon
              name='share-social-outline'
              type='ionicon'
              color='#FFFFFF'
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tool}
          >
            <Icon
              name='save-outline'
              type='ionicon'
              color='#FFFFFF'
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tool}
          >
            <Icon
              name='ellipsis-vertical-outline'
              type='ionicon'
              color='#FFFFFF'
            />
          </TouchableOpacity>
      </View>
      <SafeAreaView style={styles.scrollViewContainer}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.postPosition}>
          <Image
            style={styles.img}
            source={require('../test_content/waiting.jpg')}
          />
          <Text style={styles.title}>{post != null ? post.articleTitle : '...' }</Text>
          <View style={styles.infoLine}>
            <View style={styles.infoContainer}>
              <Text style={styles.categorieIcon}>CA</Text>
              <Text>Categorie</Text>
            </View>
            <View style={styles.infoContainer}>
              <Icon
                name='eye-outline'
                type='ionicon'
                color='#CE8686'
                style={styles.infoIcon}
              />
              <Text style={styles.info}>122</Text>
            </View>
            <View style={styles.infoContainer}>
              <Icon
                name='thumbs-up-outline'
                type='ionicon'
                color='#CE8686'
                style={styles.infoIcon}
              />
              <Text style={styles.info}>47</Text>
            </View>
            <View style={styles.infoContainer}>
              <Icon
                name='thumbs-down-outline'
                type='ionicon'
                color='#CE8686'
                style={styles.infoIcon}
              />
              <Text style={styles.info}>10</Text>
            </View>
          </View>
          <ProfilCard userId={1}/>
          <Text>{route.params.idPost}</Text>
        </ScrollView>
      </SafeAreaView>
      <View style={styles.footer}>
      </View>
    </View>
  )
}

export default Post

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
      img:{
        width: '95%',
        height: 210,
        borderRadius: 10,
        margin: 10
      },
      title: {
        fontSize: 20,
        marginTop: 10,
        fontWeight: 'bold',
        color: '#FFFFFF'
      },
      infoLine: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'

      },
      infoContainer:{
        flexDirection: 'row',
        alignItems: 'center'
      },
      categorieIcon: {
        backgroundColor: "#90CE86",
        borderRadius: 100,
        textAlign: 'center',
        padding: 3,
        margin: 5
      },
      infoIcon: {
        margin: 5
      }    
})