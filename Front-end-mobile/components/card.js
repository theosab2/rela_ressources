import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { Icon, Badge } from 'react-native-elements';
import {API_URL} from "@env"
import { color } from 'react-native-reanimated';

const Card = props => {
  const [pseudo, setPseudo] = useState('');
  const [imageTmp,setImageTmp] = useState(require('../test_content/waiting.jpg'))
  const [categories, setCategories] = useState(null);
  const [category, setCategory] = useState(null)

  const getPseudoUser = async () => {
    const api = await fetch(API_URL + '/user/' + props.data.articleCreator, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    const res = await api.json();
    setPseudo(res.username);
  }
  const getImage = async () => {
    try {
      if(props.data.image != '' || props.data.image != null || props.data.image != undefined ){
        setImageTmp({uri : props.data.image})
      }
    } catch (e) {
      console.log('error')
      console.log(e)
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
  const findCategory = () => {
    const cat = categories.find(cat => cat._id == props.data.category_UTid)
    if(cat){
      setCategory(cat.name);
    }
    
  }
  useEffect(() => {
    if(!categories){getCategories();}
    else if (!category){findCategory()}
    getImage();
    getPseudoUser();
  }, [categories])

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.navigation.navigate('Post', {
        idPost: props.data._id
      })}>
        <View style={styles.topPart}>
          <View style={styles.titleContainer}>
            <View style={styles.categoryContainer}>
              <Text style={styles.categorieIcon}>{category ? (category[0] + category[1]).toUpperCase() :"CA"}</Text>
              <Text>{category || "Categorie"}</Text>
            </View>
            <Text style={styles.titlePost}>{props.data.title}</Text>
            <Text style={styles.date}>{props.data._createdAt}</Text>
          </View>
          <Image 
            style={styles.img}
            source={imageTmp}
          />
        </View>
        <View style={styles.bottomPart}>
          <Text>{props.data.description}</Text>
        </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 5,
    width: '95%',
    height: 230,
    backgroundColor: '#869ECE',
    borderRadius: 10
  },
  topPart:{
    flex: 1,
    flexDirection: 'row',
    margin: 9
  },
  titleContainer: {
    flexDirection: 'column',
    width: '66%'

  },
  categoryContainer:{
    flexDirection: 'row',
    alignItems: 'center'
  },
  categorieIcon: {
    backgroundColor: "#90CE86",
    borderRadius: 100,
    textAlign: 'center',
    padding: 3,
    marginEnd: 5
  },
  titlePost: {
    fontSize: 22
  },
  date: {
    fontSize: 12,
    color: '#BEC4D3',
  },
  bottomPart:{
    flex: 1,
    margin: 9,
  },
  img:{
    backgroundColor: '#ffffff',
    width: '33%',
    height: '100%',
    borderRadius: 10
  }
});

export default Card;
