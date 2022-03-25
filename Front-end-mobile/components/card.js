import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import { Icon, Badge } from 'react-native-elements';
import {API_URL} from "@env"

const Card = props => {
  const [pseudo, setPseudo] = useState('');
  const [imageTmp,setImageTmp] = useState(require('../test_content/waiting.jpg'))
  useEffect(() => {
    const getPseudoUser = async() => {
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
        console.log('lien ',props.data)
        if(props.data.articleImage != '' || props.data.articleImage != null || props.data.articleImage != undefined ){
          setImageTmp({uri : props.data.articleImage})
        }
        console.log(imageTmp)
      } catch (e) {
        console.log('error')
        console.log(e)
      }
    }
    getImage();
    getPseudoUser();
  }, [])
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => props.navigation.navigate('Login')}>
      <View style={styles.containerPseudo}>
        <Text style={styles.pseudo} adjustsFontSizeToFit={true}>{pseudo}</Text>
      </View>
      <View style={styles.containerImg}>
        <Image 
        style={styles.img}
        source={imageTmp}
        />
      </View>
      <View style={styles.description}>
        <Text>{props.data.articleDescription}</Text>
      </View>
      <View style={styles.containerIcon}>
        <View style={styles.icons}>
          <Icon
            name='thumbs-up'
            type='ionicon'
            color='#ffffff'            
          />
          <Badge
            status="primary"
            value={props.data.articleNbLikes}
            containerStyle={{ position: 'absolute', top: 2, right: 15 }}
          />
        </View>
        <View>
          <Text>ICO2</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 5,
  },
  containerImg: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 200,
    backgroundColor: "#2f4077",
    borderTopRightRadius: 10
  },
  description: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#2f4077'
  },
  containerIcon: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#2f4077',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    height: 35
  },
  icons:{
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center'
  },
  containerPseudo: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: '#2F4077',
    width: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },
  pseudo: {
    
  },
  img:{
    backgroundColor: '#ffffff',
    width: '95%',
    height: '95%',
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  }
});

export default Card;
