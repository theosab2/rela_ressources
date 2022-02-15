import React, { useState } from 'react';
import {View, StyleSheet} from 'react-native';
import {CheckBox, Input, Icon, Button, Text} from 'react-native-elements';
import { color } from 'react-native-reanimated';


const Login = ( {navigation} ) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [saveLogin, setSaveLogin] = useState(false);
    return (
        <View style={styles.container}>
            <Text
                h2
                style={styles.h1}
            >Connexion</Text>
            <Input
                placeholder="Email"
                onChangeText={email => setEmail(email)}
                defaultValue= {email}
                leftIcon={
                  <Icon
                    name='envelope'
                    type='evilicon'
                    color='#517fa4'
                  />
                }
            />
            <Input
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={password => setPassword(password)}
                defaultValue= {password}
                leftIcon={
                    <Icon
                      name='unlock'
                      type='evilicon'
                      color='#517fa4'
                    />
                  }
            />
            <CheckBox
                center
                title="Se souvenir de moi"
                checked={saveLogin}
                onPress={() => setSaveLogin(!saveLogin)}
                containerStyle = {styles.checkbox}
                checkedColor = '#869ECE'
            />
            <View style={styles.buttons}>
                <Button
                    title="Connexion"
                    loading={false}
                    loadingProps={{ size: 'small', color: 'white' }}
                    buttonStyle={styles.buttonStyle}
                    titleStyle={{ fontWeight: 'bold', fontSize: 12 }}
                    containerStyle={styles.buttonContainerStyle}
                    onPress={() => navigation.navigate('Home')}

                />
                <Button
                    title="Créer un compte"
                    loading={false}
                    loadingProps={{ size: 'small', color: 'white' }}
                    buttonStyle={styles.buttonStyle}
                    titleStyle={{ fontWeight: 'bold', fontSize: 12 }}
                    containerStyle={styles.buttonContainerStyle}
                    onPress={() => {
                        navigation.navigate('createAccount')
                    }}

                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'center',
        alignItems:'center',
        width: '95%',
    },
    checkbox: {
        backgroundColor: "#FFFFFF",
        borderColor : "#FFFFFF"
    },
    buttons: {
        flexDirection: "row",
        justifyContent:"center",
    },
    buttonStyle: {
        backgroundColor: '#869ECE',
        borderRadius: 5,
    },
    buttonStyle: {
        backgroundColor: '#869ECE',
        
    },
    buttonContainerStyle: {
        margin: 10,
        height: 50,
        width: 150,
    },
    h1 : {
        marginBottom: 50
    }
})

export default Login;
