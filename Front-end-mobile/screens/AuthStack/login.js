import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { CheckBox, Input, Icon, Button, Text, Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "@env"


const Login = ({ navigation }) => {
  // Identifier can set by email,username or phone number 's user
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [saveLogin, setSaveLogin] = useState();

  const getDataDebug = async () => {
    try {
      const api = await fetch(API_URL + '/users/all', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      const res = await api.json();
      console.log(res);
    } catch (e) {

    }
  }
  const dataAuth = async () => {
    try {
      await AsyncStorage.setItem('@userEmail', identifier);
      await AsyncStorage.setItem('@userPassword', password);

      console.log(await AsyncStorage.getItem('@userEmail'));
      console.log(await AsyncStorage.getItem('@userPassword'));

      const login = await fetch(API_URL + '/auth/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          identifier: identifier,
          password: password
        })
      })
      const res = await login.json();
      await AsyncStorage.setItem('@userId', res.user._id);
      if (res.status === 'SUCCESS') {
        navigation.navigate('Home');
      }
      else {
        console.log(res.message);
      }

    } catch (e) {
      console.log(e);
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.appTitleContainer}>
        <Text style={styles.appTitle}>Ressources Relationnelles</Text>
      </View>
      <View style={styles.loginContainer}>
        <Text style={styles.formName}>
          Connexion
        </Text>
        <View style={styles.input}>
          <Icon name="mail-outline" type="ionicon" color="#FFFFFF" style={styles.inputIcon} />
          <TextInput
            placeholder="Username,Email or phone number"
            onChangeText={identifier => setIdentifier(identifier)}
            defaultValue={identifier}

          />
        </View>
        <View style={styles.input}>
          <Icon name="key-outline" type="ionicon" color="#FFFFFF" style={styles.inputIcon} />
          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={password => setPassword(password)}
            defaultValue={password}
          />
        </View>
        <CheckBox
          center
          title="Rester connecté"
          textStyle={styles.checkboxText}
          checked={saveLogin}
          onPress={() => setSaveLogin(!saveLogin)}
          containerStyle={styles.checkbox}
          checkedColor="#CE8686"
        />
        <View style={styles.buttons}>
          <Button
            title="Connexion"
            loading={false}
            loadingProps={{ size: 'small', color: 'white' }}
            buttonStyle={styles.buttonStyle}
            titleStyle={{ fontWeight: 'bold', fontSize: 12 }}
            containerStyle={styles.buttonContainerStyle}
            onPress={dataAuth}
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
            >Pas encore inscrit ? </Text>
            <Text
              style={styles.link}
              onPress={() => {
                navigation.navigate('Auth',{ screen: 'IdSetting' });
              }}
            >Créez un compte !</Text>
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

export default Login;
