import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { CheckBox, Input, Icon, Button, Text, Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "@env"


const CoorSetting = ({ navigation, route }) => {
    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [accept, setAccept] = useState(false);
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [region, setRegion] = useState('');  

  
    const validation =  async () => {
        //Ecrire ici le code de vérifications des champs, Hash le mot de passe puis envoyer les données à la page suivante
        if(accept){
            try{
                const api = await fetch(API_URL + '/auth/register', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                    user: {
                      username: route.params.username,
                      firstname: firstname,
                      name: name,
                      password: route.params.password,
                      phone: route.params.phone,
                      email: route.params.email,
                      isActive: false,
                      role: 'user',
                      location: {
                        ville: city,
                        region: region,
                        zip: zipcode,
                      },
                    },
                  }),
                });
                const res = await api.json();
                if(res.statusCode === 500){
                  console.log(res.message)
                }else if(res.statusCode === 200){
                  console.log(res.message)
                  navigation.navigate('Auth',{screen: 'Login'})
                }else if(res.statusCode === 201){
                  console.log('compte crée')
                  navigation.navigate('Auth',{screen: 'Login'})
                }
              }catch(err){
                console.log(err)
              }
        }else{
            console.log('Conditions d\'utilistions non acceptées')
        }
    }

  return (
    <View style={styles.container}>
      <View style={styles.appTitleContainer}>
        <Text style={styles.appTitle}>Ressources Relationnelles</Text>
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.formName}>
          Inscription 3/3
        </Text>
        <View style={styles.input}>
          <Icon name="person-outline" type="ionicon" color="#FFFFFF" style={styles.inputIcon} />
          <TextInput
            placeholder="Nom"
            onChangeText={name => setName(name)}
            defaultValue={name}
          />
        </View>
        <View style={styles.input}>
          <Icon name="person-outline" type="ionicon" color="#FFFFFF" style={styles.inputIcon} />
          <TextInput
            placeholder="Prénom"
            onChangeText={firstname => setFirstname(firstname)}
            defaultValue={firstname}
          />
        </View>
        <View style={styles.input}>
          <Icon name="location-outline" type="ionicon" color="#FFFFFF" style={styles.inputIcon} />
          <TextInput
            placeholder="Code postal"
            onChangeText={zipcode => setZipcode(zipcode)}
            defaultValue={zipcode}
          />
        </View>
        <View style={styles.input}>
          <Icon name="location-outline" type="ionicon" color="#FFFFFF" style={styles.inputIcon} />
          <TextInput
            placeholder="Ville"
            onChangeText={city => setCity(city)}
            defaultValue={city}
          />
        </View>
        <View style={styles.input}>
          <Icon name="location-outline" type="ionicon" color="#FFFFFF" style={styles.inputIcon} />
          <TextInput
            placeholder="Région"
            onChangeText={region => setRegion(region)}
            defaultValue={region}
          />
        </View>
        <CheckBox
          center
          title="J'accepte les conditions d'utilisations"
          textStyle={styles.checkboxText}
          checked={accept}
          onPress={() => setAccept(!accept)}
          containerStyle={styles.checkbox}
          checkedColor="#CE8686"
        />
        <View style={styles.buttons}>
          <Button
            title="Continuer"
            loading={false}
            loadingProps={{ size: 'small', color: 'white' }}
            buttonStyle={styles.buttonStyle}
            titleStyle={{ fontWeight: 'bold', fontSize: 12 }}
            containerStyle={styles.buttonContainerStyle}
            onPress= {() => {
                validation();
            }}
          />
        </View>
        <View style={styles.createAccountContainer}>
          <Divider
            orientation='horizontal'
            color='#CE8686'
            style={styles.divider}
          />
          <View style={styles.createAccountContainerText}>
            <Text
              style={styles.text}
            >Vous possédez déjà un compte ? </Text>
            <Text
              style={styles.link}
              onPress={() => {
                navigation.navigate('Auth',{ screen: 'Login' });
              }}
            >Connectez-vous !</Text>
          </View>

        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#2F4077',
  },
  appTitleContainer: {
    width: '100%',
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  appTitle: {
    fontSize: 24,
    width: 200,
    color: '#FFFFFF',
    textAlign: 'center',

  },
  loginContainer: {
    flexDirection: 'column',
    flex: 1,
    width: '95%'

  },
  formName: {
    margin: 10,
    color: '#FFFFFF',
    fontSize: 20
  },
  inputIcon: {
    margin: 5,
  },
  input: {
    backgroundColor: '#869ECE',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5
  },
  checkbox: {
    backgroundColor: null,
    borderWidth: 0
  },
  checkboxText: {
    color: '#FFFFFF'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonStyle: {
    backgroundColor: '#CE8686',
    borderRadius: 10,
    height: 50,
  },
  buttonContainerStyle: {
    margin: 10,
    width: '100%',
  },
  divider: {
    width: '50%'
  },
  createAccountContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  createAccountContainerText: {
    flexDirection: 'row',
    margin: 25
  },
  link: {
    color: '#CE8686'
  },
  text: {
    color: '#FFFFFF'
  }
});

export default CoorSetting;
