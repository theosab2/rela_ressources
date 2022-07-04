import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { CheckBox, Input, Icon, Button, Text, Divider } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "@env"


const AccountUpdate = ({ navigation, route }) => {
    const [userData, setUserData] = useState(null)
    const [username, setUsername] = useState('');
    const [lastname, setLastname] = useState('');
    const [firstname, setFirstname] = useState('');
    const [city, setCity] = useState('');
    const [zipcode, setZipcode] = useState('');
    const [region, setRegion] = useState('');


    const updateData = async () => {
        try {
            const userId = await AsyncStorage.getItem('@userId')
            const api = await fetch(API_URL + '/user/' + userId, {
                method: 'PUT',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    user: {
                        username: username == '' ? res.username : username,
                        firstname: firstname == '' ? res.firstname : firstname,
                        lastname: lastname == '' ? res.lastname : lastname,
                        location: {
                            ville: city == '' ? res.location.city : city,
                            region: region == '' ? res.location.region : region,
                            zipcode: zipcode == '' ? res.location.zipcode : zipcode,
                        },
                    },
                }),
            });
            const res = await api.json();
            if (res.statusCode === 500) {
                console.log(res.message)
            } else if (res.statusCode === 200) {
                console.log(res.message)
                navigation.navigate('Auth', { screen: 'Account' })
            } else if (res.statusCode === 201) {
                console.log('Modifications effectuées')
                navigation.navigate('Auth', { screen: 'Account' })
            }
        } catch (err) {
            console.log(err)
        }
    }
    const setField = async () => {
        try {
            const storedId = await AsyncStorage.getItem('@userId');
            if (storedId != null) {
                try {
                    const api = await fetch(API_URL + '/user/' + storedId, {
                      method: 'GET',
                      headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                      },
                    });
                    const res = await api.json();
                    setUserData(res);
                    setUsername(res.username)
                    setFirstname(res.firstname)
                    setLastname(res.lastname)
                    setCity(res.location.city)
                    setRegion(res.location.region)
                    setZipcode(res.location.zipcode)
                  } catch (e) {
                    console.log(e);
                  }
            } else {
              navigation.navigate('Auth', {screen: 'Login'})
            }
          } catch (e) {
            console.log('dommage',e);
          }
    }
    
    useEffect(() => {
        setField()
    },[])

    return (
        <View style={styles.container}>
            <View style={styles.appTitleContainer}>
                <Text style={styles.appTitle}>Ressources Relationnelles</Text>
            </View>
            <View style={styles.loginContainer}>
                <Text style={styles.formName}>
                    Modification de vos données
                </Text>
                <View style={styles.input}>
                    <Icon name="person-outline" type="ionicon" color="#FFFFFF" style={styles.inputIcon} />
                    <TextInput
                        placeholder="Pseudonyme"
                        onChangeText={username => setUsername(username)}
                        defaultValue={username}
                    />
                </View>
                <View style={styles.input}>
                    <Icon name="person-outline" type="ionicon" color="#FFFFFF" style={styles.inputIcon} />
                    <TextInput
                        placeholder="Nom"
                        onChangeText={lastname => setName(lastname)}
                        defaultValue={lastname}
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
                <View style={styles.buttons}>
                    <Button
                        title="Valider les modifications"
                        loading={false}
                        loadingProps={{ size: 'small', color: 'white' }}
                        buttonStyle={styles.buttonStyle}
                        titleStyle={{ fontWeight: 'bold', fontSize: 12 }}
                        containerStyle={styles.buttonContainerStyle}
                        onPress={() => {
                            updateData();
                        }}
                    />
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

export default AccountUpdate;
