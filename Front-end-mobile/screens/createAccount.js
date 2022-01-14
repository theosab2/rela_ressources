import React, { useState } from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {CheckBox, Input, Icon, Button, Text} from 'react-native-elements';

const CreateAccount = () => {
    const [username, setUsername] = useState('')
    const [name, setName] = useState('');
    const [firstname, setFirstname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState('');
    const [accept, setAccept] = useState(false);
    const [phone, setPhone] = useState('');
    const [ville, setVille] = useState('');
    const [zipcode,setZipcode] = useState('');
    const [region, setRegion] = useState('');

    const display = async () => {
        if(accept){
            console.log(`${username} ${name} ${firstname} ${email} ${phone} ${password} ${location}`)
        }
        else{
            console.log('conditions non acceptées')
        }
        const api = await fetch('http://10.176.133.46:3000/auth/register', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            user: {
              username: username,
              firstname: firstname,
              name: name,
              password: password,
              phone: phone,
              email: email,
              isActive: false,
              role: 'user',
              location: {
                ville: 'CESI',
                region: location,
                zip: '76300'
              }
            }
          })
        }); 
        const res = await api.json();
        if(res.status == 'FAILURE'){
          console.log('Le nom d\'utilisateurs existe deja')
        }
        else{
          console.log('Compte crée')
        }
    }

    return (
        <ScrollView contentContainerStyles={styles.container}>
            <Text
                h2
                style={styles.h1}
            >Création du compte</Text>
            <Input
                placeholder="Pseudonyme"
                containerStyle={{width: "100%"}}
                onChangeText={username => setUsername(username)}
                defaultValue= {username}
                leftIcon={
                  <Icon
                    name='user'
                    type='evilicon'
                    color='#517fa4'
                  />
                }
            />
            <Input
                placeholder="Email"
                containerStyle={{width: "100%"}}
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
                placeholder="Téléphone"
                containerStyle={{width: "100%"}}
                onChangeText={phone => setPhone(phone)}
                defaultValue= {phone}
                leftIcon={
                  <Icon
                    name='bell'
                    type='evilicon'
                    color='#517fa4'
                  />
                }
            />
            <Input
                secureTextEntry={true}
                placeholder="Mot de passe"
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
            <Input
                secureTextEntry={true}
                placeholder="Verification du mot de passe"
                onChangeText={validPassword => setValidPassword(validPassword)}
                defaultValue= {validPassword}
                leftIcon={
                    <Icon
                      name='unlock'
                      type='evilicon'
                      color='#517fa4'
                    />
                  }
            />
            <Input
                placeholder="Nom"
                onChangeText={firstname => setFirstname(firstname)}
                defaultValue= {firstname}
                leftIcon={
                    <Icon
                      name='user'
                      type='evilicon'
                      color='#517fa4'
                    />
                  }
            />
            <Input
                placeholder="Prénom"
                onChangeText={name => setName(name)}
                defaultValue= {name}
                leftIcon={
                    <Icon
                      name='user'
                      type='evilicon'
                      color='#517fa4'
                    />
                  }
            />
            <Input
                placeholder="Ville"
                containerStyle={{width: "100%"}}
                onChangeText={ville => setVille(ville)}
                defaultValue= {ville}
                leftIcon={
                  <Icon
                    name='location'
                    type='evilicon'
                    color='#517fa4'
                  />
                }
            />
            <Input
                placeholder="Code postal"
                containerStyle={{width: "100%"}}
                onChangeText={zipcode => setZipcode(zipcode)}
                defaultValue= {zipcode}
                leftIcon={
                  <Icon
                    name='location'
                    type='evilicon'
                    color='#517fa4'
                  />
                }
            />
            <Input
                placeholder="Région"
                containerStyle={{width: "100%"}}
                onChangeText={region => setRegion(region)}
                defaultValue= {region}
                leftIcon={
                  <Icon
                    name='location'
                    type='evilicon'
                    color='#517fa4'
                  />
                }
            />

            <CheckBox
                center
                title="J'accepte les conditions d'utilisations"
                checked={accept}
                onPress={() => setAccept(!accept)}
                containerStyle = {styles.checkbox}
            />
            <View style={styles.buttons}>
                <Button
                    title="Annuler"
                    loading={false}
                    loadingProps={{ size: 'small', color: 'white' }}
                    buttonStyle={styles.buttonStyle2}
                    titleStyle={{ fontWeight: 'bold', fontSize: 12, color: "black" }}
                    containerStyle={styles.buttonContainerStyle}
                    onPress={() => console.log('aye')}

                />
                <Button
                    title="Créer un compte"
                    loading={false}
                    loadingProps={{ size: 'small', color: 'white' }}
                    buttonStyle={styles.buttonStyle1}
                    titleStyle={{ fontWeight: 'bold', fontSize: 12 }}
                    containerStyle={styles.buttonContainerStyle}
                    onPress={display}

                />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({    
    container: {
        flex: 1,
        alignItems:'center',
        width: '95%',
    },
    checkbox: {
        backgroundColor: "#FFFFFF",
        borderColor : "#FFFFFF"
    },
    buttons: {
        flexDirection: "row",
        justifyContent:"center"
    },
    buttonStyle1: {
        backgroundColor: 'rgba(111, 202, 186, 1)',
        borderRadius: 5,
    },
    buttonStyle2: {
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        borderColor: 'rgba(111, 202, 186, 1)',
        borderWidth: 1
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

export default CreateAccount;
