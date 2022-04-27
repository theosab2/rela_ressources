import React, { useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { CheckBox, Input, Icon, Button, Text, Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "@env"


const IdSetting = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const validation = () => {
        //Ecrire ici le code de vérifications des champs puis envoyer les données à la page suivante
        if (username.length < 4) {
            console.log("Nom d'utilisateur trop court");
        }
        else if (typeof username != "string") {
            console.log("Nom d'utilisateur incorrect");
        }
        else if (username != '' && email != '' && phone != '') {
            navigation.navigate('Auth', {
                screen: 'PwdSetting',
                params: {
                    username: username,
                    email: email,
                    phone: phone,
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
                    Inscription 1/3
                </Text>
                <View style={styles.input}>
                    <Icon name="person-outline" type="ionicon" color="#FFFFFF" style={styles.inputIcon} />
                    <TextInput
                        textContentType='username'
                        placeholder="Pseudonyme"
                        onChangeText={username => setUsername(username)}
                        defaultValue={username}

                    />
                </View>
                <View style={styles.input}>
                    <Icon name="mail-outline" type="ionicon" color="#FFFFFF" style={styles.inputIcon} />
                    <TextInput
                        textContentType='emailAddress'
                        placeholder="Email"
                        onChangeText={email => setEmail(email)}
                        defaultValue={email}
                    />
                </View>
                <View style={styles.input}>
                    <Icon name="call-outline" type="ionicon" color="#FFFFFF" style={styles.inputIcon} />
                    <TextInput
                        textContentType='telephoneNumber'
                        placeholder="Numéro de téléphone"
                        onChangeText={phone => setPhone(phone)}
                        defaultValue={phone}
                        keyboardType='number-pad'
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
                        onPress={() => {
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
                                navigation.navigate('Auth', { screen: 'Login' });
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

export default IdSetting;
