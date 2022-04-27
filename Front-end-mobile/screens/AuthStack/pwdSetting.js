import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { CheckBox, Input, Icon, Button, Text, Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "@env"


const PwdSetting = ({ navigation, route }) => {
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const validation = () => {
        //Ecrire ici le code de vérifications des champs, Hash le mot de passe puis envoyer les données à la page suivante
        if(password < 6){
            console.log('Le mot de passe est trop court')
        }
        else if(password == rePassword){
            navigation.navigate('Auth',{ 
                screen: 'CoorSetting',
                params: {
                    username: route.params.username,
                    email: route.params.email,
                    phone: route.params.phone,
                    password: password
                }
            });
        }
        else{
            console.log('Une erreur c\'est produite');
        }
    }

  return (
    <View style={styles.container}>
      <View style={styles.appTitleContainer}>
        <Text style={styles.appTitle}>Ressources Relationnelles</Text>
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.formName}>
          Inscription 2/3
        </Text>
        <View style={styles.input}>
          <Icon name="key-outline" type="ionicon" color="#FFFFFF" style={styles.inputIcon} />
          <TextInput
            placeholder="Mot de passe"
            onChangeText={password => setPassword(password)}
            defaultValue={password}
            secureTextEntry={true}

          />
        </View>
        <View style={styles.input}>
          <Icon name="key-outline" type="ionicon" color="#FFFFFF" style={styles.inputIcon} />
          <TextInput
            placeholder="Vérification du mot de passe"
            onChangeText={rePassword => setRePassword(rePassword)}
            defaultValue={rePassword}
            secureTextEntry={true}
          />
        </View>
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

export default PwdSetting;
