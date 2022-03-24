import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {CheckBox, Input, Icon, Button, Text} from 'react-native-elements';
import {color} from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({navigation}) => {
  // Identifier can set by email,username or phone number 's user
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [saveLogin, setSaveLogin] = useState();

  const getDataDebug = async () => {
    try {
      const api = await fetch('http://10.176.131.87:3001/users/all', {
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

      const login = await fetch('http://10.176.131.87:3001/auth/login', {
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
      if(res.status === 'SUCCESS'){
        navigation.navigate('Home');
      }
      else{
        console.log(res.message);
      }
      
    } catch (e) {
      console.log(e);
    }

  }

  return (
    <View style={styles.container}>
      <Text h2 style={styles.h1}>
        Connexion
      </Text>
      <Input
        placeholder="Username,Email or phone number"
        onChangeText={identifier => setIdentifier(identifier)}
        defaultValue={identifier}
        leftIcon={<Icon name="envelope" type="evilicon" color="#517fa4" />}
      />
      <Input
        secureTextEntry={true}
        placeholder="Password"
        onChangeText={password => setPassword(password)}
        defaultValue={password}
        leftIcon={<Icon name="unlock" type="evilicon" color="#517fa4" />}
      />
      <CheckBox
        center
        title="Se souvenir de moi"
        checked={saveLogin}
        onPress={() => setSaveLogin(!saveLogin)}
        containerStyle={styles.checkbox}
        checkedColor="#869ECE"
      />
      <View style={styles.buttons}>
        <Button
          title="Connexion"
          loading={false}
          loadingProps={{size: 'small', color: 'white'}}
          buttonStyle={styles.buttonStyle}
          titleStyle={{fontWeight: 'bold', fontSize: 12}}
          containerStyle={styles.buttonContainerStyle}
          onPress={dataAuth}
        />
        <Button
          title="Créer un compte"
          loading={false}
          loadingProps={{size: 'small', color: 'white'}}
          buttonStyle={styles.buttonStyle}
          titleStyle={{fontWeight: 'bold', fontSize: 12}}
          containerStyle={styles.buttonContainerStyle}
          onPress={() => {
            navigation.navigate('createAccount');
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
  },
  checkbox: {
    backgroundColor: '#FFFFFF',
    borderColor: '#FFFFFF',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonStyle: {
    backgroundColor: '#869ECE',
    borderRadius: 5,
  },
  buttonContainerStyle: {
    margin: 10,
    height: 50,
    width: 150,
  },
  h1: {
    marginBottom: 50,
  },
});

export default Login;
