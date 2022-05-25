import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "@env"
import Header from '../../components/header'
import { Divider } from 'react-native-elements';
import HomemadeNavBar from '../../components/homemadeNavBar';
import { Picker } from '@react-native-picker/picker';
import { Icon, Button, Image } from 'react-native-elements';
import { block } from 'react-native-reanimated';



const Settings = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Paramètres</Text>
                <Divider
                    orientation='horizontal'
                    color='#CE8686'
                    style={styles.divider}
                />
            </View>
            <View style={styles.settingButtonsColumn}>
                <View style={styles.settingButtonsRow}>
                    <TouchableOpacity
                        style={styles.tool}
                    >
                        <Icon
                            name='person-circle-outline'
                            type='ionicon'
                            color='#FFFFFF'
                            size={50}
                        />
                        <Text style={styles.buttonName}>Informations</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.tool}
                    >
                        <Icon
                            name='key-outline'
                            type='ionicon'
                            color='#FFFFFF'
                            size={50}
                        />
                        <Text style={styles.buttonName}>Modifier le mot de passe</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.settingButtonsRow}>
                    <TouchableOpacity
                        style={styles.tool}
                    >
                        <Icon
                            name='globe-outline'
                            type='ionicon'
                            color='#FFFFFF'
                            size={50}
                        />
                        <Text style={styles.buttonName}>Paramètres de confidentialités</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.tool}
                    >
                        <Icon
                            name='help-outline'
                            type='ionicon'
                            color='#FFFFFF'
                            size={50}
                        />
                        <Text style={styles.buttonName}>Aide</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.settingButtonsRow}>
                    <TouchableOpacity
                        style={styles.tool}
                    >
                        <Icon
                            name='information-outline'
                            type='ionicon'
                            color='#FFFFFF'
                            size={50}
                        />
                        <Text style={styles.buttonName}>A propos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.tool}
                    >
                        <Icon
                            name='power-outline'
                            type='ionicon'
                            color='#FFFFFF'
                            size={50}
                        />
                        <Text style={styles.buttonName}>Déconnexion</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2F4077'
    },
    scrollViewContainer: {
        flex: 12,
    },
    scrollView: {
        flex: 8,
    },
    postPosition: {
        alignItems: 'center'
    },
    titleContainer: {
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    },
    divider: {
        width: '33%',
        margin: 10
    },
    title: {
        fontSize: 20,
        marginTop: 10
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
    tool: {
        width: 120,
        height: 120,
        backgroundColor: '#CE8686',
        margin: 10,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingButtonsColumn: {
        alignItems: 'center',
        margin: 50
    },
    settingButtonsRow: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    buttonName: {
        width: "100%",
        textAlign: 'center',
        fontSize: 15,
        fontWeight: 'bold'
    }
    

});
export default Settings;
