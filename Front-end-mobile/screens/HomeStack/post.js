import { API_URL } from "@env"
import React, { useEffect, useState } from 'react'
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Header from '../../components/header';
import ProfilCard from '../../components/profilCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Post = ({ route, navigation }) => {
  const [idUser, setIdUser] = useState(null)
  const [userData, setUserData] = useState(null);
  const [savedUserArticles, setSavedUserArticles] = useState(null);
  const [post, setPost] = useState(null);
  const [imageUrl, setImageUrl] = useState(require('../../test_content/waiting.jpg'))
  const [savedIcon, setSavedIcon] = useState(null)
  const [categories, setCategories] = useState(null);
  const [contentType, setContentType] = useState(null);
  const [displayContent,setDisplayContent] = useState(null);
  const [category, setCategory] = useState(null)
    
  const getUserId = async () => {
    const userId = await AsyncStorage.getItem('@userId')
    setIdUser(userId)
  }
  const getDataPost = async () => {
    try {
      const api = await fetch(API_URL + '/article/' + route.params.idPost, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const res = await api.json()
      setPost(res);
    } catch (e) {
      console.log('erreur récupération d\'article', e);
    }
  }
  const getImage = () => {
    setImageUrl({ uri: post.image })
  }
  const getUserData = async () => {
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
      console.log('Erreur récupération userData', e)
    }

  }
  const getSavedArticlesId = async () => {
    const articles = userData.favorites;
    setSavedUserArticles(articles)
  }
  const saveArticles = async () => {
    //Problème par ici
    if (userData.favorites.includes(route.params.idPost)) {
      console.log("l'article est contenu dans les favoris")
    } else {
      try {
        const api = await fetch(API_URL + '/user/toggle-favorite/' + userData._id + '/' + route.params.idPost, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        });
        const res = await api.json();
        console.log('retour favoris', res);
        getSavedArticlesId();
        //setUserData(null);
      } catch (e) {
        console.log('erreur ajout favoris', e)
      }

    }
  }
  const changeIconSaved = async () => {
    console.log('user',userData)
    if (savedUserArticles.includes(route.params.idPost)) {
      setSavedIcon(<TouchableOpacity
        style={[styles.tool, { backgroundColor: '#9EAF6C' }]}
        onPress={() => saveArticles()}
      >
        <Icon
          name='checkbox-outline'
          type='ionicon'
          color='#FFFFFF'
        />
      </TouchableOpacity>)
    } else {
      setSavedIcon(<TouchableOpacity
        style={styles.tool}
        onPress={() => saveArticles()}
      >
        <Icon
          name='save-outline'
          type='ionicon'
          color='#FFFFFF'
        />
      </TouchableOpacity>)
    }
  }
  const getCategories = async () => {
    try {
      const api = await fetch(API_URL + '/uts/all/CATEGORY', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const res = await api.json()
      setCategories(res.ut);
    } catch (e) {
      console.log(e);
    }
  }
  const getContentType = async () => {
    try {
      const api = await fetch(API_URL + '/uts/all/CONTENT', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const res = await api.json()
      console.log(res.ut);
      setContentType(res.ut);
    } catch (e) {
      console.log(e);
    }
  }
  const findCategory = () => {
    const cat = categories.find(cat => cat._id == post.category_UTid)
    if(cat){
      setCategory(cat.name);
    }else{
      setCategory("Categorie");
    }
  }
  const getDisplayContent = () => {
    const display = post.contents.map(content => {
      const type = contentType.find(contentType => contentType._id == content.UT_id)
      if(type && type.name == "title"){
        return <Text style={styles.titleContent}>{content.body}</Text>
      }else if(type && type.name == "text"){
        return <Text style={styles.textContent}>{content.body}</Text>
      }else if(type && type.name == "img"){
        return <View></View>
      }else{
        return <></>
      }
    })
    setDisplayContent(display);
  }
  useEffect(() => {
    if (!idUser) {
      getUserId()
      getCategories()
      getContentType()
    } 
    else {
      if (!userData) {getUserData();}
      else if (!savedUserArticles) { getSavedArticlesId();}
      else if (!post) { getDataPost();}
      else if (!savedIcon){changeIconSaved()}
      else if (!category){findCategory()}
      else if (!displayContent){getDisplayContent()}
      else {
        getImage();
      }
    }
  }, [idUser, userData, savedUserArticles, post, savedIcon, categories, displayContent])

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
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
        {savedIcon}
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
            source={imageUrl}
          />
          <Text style={styles.title}>{post ? post.title : '...'}</Text>
          <View style={styles.infoLine}>
            <View style={styles.infoContainer}>
              <Text style={styles.categorieIcon}>{category ? (category[0] + category[1]).toUpperCase() :"CA"}</Text>
              <Text>{category || "Categorie"}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Icon
                name='eye-outline'
                type='ionicon'
                color='#CE8686'
                style={styles.infoIcon}
              />
              <Text style={styles.info}>{post ? post.articleNbLikes : '...'}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Icon
                name='thumbs-up-outline'
                type='ionicon'
                color='#CE8686'
                style={styles.infoIcon}
              />
              <Text style={styles.info}>{post ? post.articleNbLikes : '...'}</Text>
            </View>
            <View style={styles.infoContainer}>
              <Icon
                name='thumbs-down-outline'
                type='ionicon'
                color='#CE8686'
                style={styles.infoIcon}
              />
              <Text style={styles.info}>{post ? post.articleNbDislikes : '...'}</Text>
            </View>
          </View>
          {post ? <ProfilCard userId={post ? post.creator : null} date={post ? post._updatedAt : null}/> : null}
          <Text>{post ? post.description : '...'}</Text>
          <View>{displayContent ? displayContent.map(content => {return content}): null}</View>
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
  img: {
    width: '95%',
    height: 210,
    borderRadius: 10,
    margin: 10,
    resizeMode: 'contain'
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
  infoContainer: {
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
  },
  titleContent: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  textContent: {

  }
})