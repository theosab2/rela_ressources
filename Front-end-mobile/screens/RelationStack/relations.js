import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native'
import { Divider, Icon } from 'react-native-elements';
import Header from '../../components/header';
import HomemadeNavBar from '../../components/homemadeNavBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "@env"
import { TouchableOpacity } from 'react-native-gesture-handler'


const Relations = ({ navigation }) => {
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [demande, setDemande] = useState([]);
    const [waiting, setWaiting] = useState([]);
    const [friends, setFriends] = useState([]);
    const [displaySuggestion, setDisplaySuggestion] = useState([]);
    const [displayDemandes, setDisplayDemandes] = useState([]);

    useEffect(() => {
        getFriends();
        getSuggestionUser();
    }, [])
    //Get user friends
    const getFriends = async () => {
        const userId = await AsyncStorage.getItem('@userId')
        if (userId == null) {
            return;
        }
        try {
            const api = await fetch(API_URL + "/user/" + userId, {
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            const res = await api.json();
            setFriends(res.friends_ids);
        } catch (e) {
            console.log(e);
        }
    }
    //Get all unfriends user
    const getSuggestionUser = async () => {
        if (await AsyncStorage.getItem('@userId') == null) {
            setUser(null)
        } else {
            const userId = await AsyncStorage.getItem('@userId')
        }
        try {
            const api = await fetch(API_URL + '/users/all', {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const res = await api.json();
            setSuggestions(res.users);
            getDisplaySuggestion();
        } catch (e) {
            console.log(e)
        }
    }
    const getDisplaySuggestion = async () => {
        const userId = await AsyncStorage.getItem('@userId')
        displaySuggestion.splice(0, displaySuggestion.length)
        demande.splice(0,demande.length);
        displaySuggestion.push(suggestions.map(item => {
            console.log('detail',item.friends_ids.find(friend => friend === userId))
            if (item._id == userId) {
                console.log('cest moi');
                return;
            }
            else if (item.friends_ids.find(friend => friend === userId) != undefined) {
                console.log('initialisation dune demande',item);
                demande.push(item);
            }
            else if (friends.find(friend => friend === item._id)) {
                
                return;
            }
            else {
                return <TouchableOpacity style={styles.cardContainer} containerStyle={styles.cardContainerStyle}>
                    <Image
                        style={styles.cardImg}
                        source={require('../../test_content/waiting.jpg')}
                    />
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{item.username}</Text>
                        <Text style={styles.date}></Text>
                    </View>
                    <TouchableOpacity containerStyle={styles.buttonContainer}>
                        <Text>Ajouter</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            }
        }))
        getDisplayDemande();;
    }
    const getDisplayDemande = async () => {
        displayDemandes.splice(0, displayDemandes.length);
        displayDemandes.push(demande.map(item => {
            return <TouchableOpacity style={styles.cardContainer} containerStyle={styles.cardContainerStyle}>
                <Image
                    style={styles.cardImg}
                    source={require('../../test_content/waiting.jpg')}
                />
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{item.username}</Text>
                    <Text style={styles.date}></Text>
                </View>
                <TouchableOpacity containerStyle={styles.buttonContainer}>
                    <Text>Accepter</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        }))
        //console.log(displayDemandes);
        displayDemandes.push(friends.map(item => {
            suggestions.find(friend => {
                if (friend.friends_ids != undefined && friend.friends_ids == item) {
                    return <TouchableOpacity style={styles.cardContainer} containerStyle={styles.cardContainerStyle}>
                        <Image
                            style={styles.cardImg}
                            source={require('../../test_content/waiting.jpg')}
                        />
                        <View style={styles.infoContainer}>
                            <Text style={styles.name}>{friends.username}</Text>
                            <Text style={styles.date}></Text>
                        </View>
                        <TouchableOpacity containerStyle={styles.buttonContainer}>
                            <Text>En attente</Text>
                        </TouchableOpacity>
                    </TouchableOpacity>
                }
            })
        }))
        //console.log(displayDemandes);

    }

    return (
        <View style={styles.container}>
            <Header navigation={navigation} />
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Relations</Text>
                <Divider
                    orientation='horizontal'
                    color='#CE8686'
                    style={styles.divider}
                />
            </View>
            <View style={styles.input}>
                <Icon name="search-outline" type="ionicon" color="#FFFFFF" style={styles.inputIcon} />
                <TextInput
                    placeholder="Rechercher quelqu'un ici !"
                    onChangeText={search => setSearch(search)}
                    defaultValue={search}

                />
            </View>
            <SafeAreaView style={styles.scrollViewContainer}>
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.postPosition}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Demandes</Text>
                        <Divider
                            orientation='horizontal'
                            color='#CE8686'
                            style={styles.divider}
                        />
                    </View>
                    <View>
                        {displayDemandes}
                    </View>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Suggestions</Text>
                        <Divider
                            orientation='horizontal'
                            color='#CE8686'
                            style={styles.divider}
                        />
                    </View>
                    <View>
                        {displaySuggestion}
                    </View>
                </ScrollView>
            </SafeAreaView>
            <HomemadeNavBar route='Relation' navigation={navigation} />
        </View>)
}
export default Relations
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
    input: {
        backgroundColor: "#869ECE",
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        margin: 5,
        width: "95%",
    },
    inputIcon: {
        margin: 5,
    },
    cardContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    cardContainerStyle: {
        height: 60,
        width: '100%',
        backgroundColor: '#869ECE',
        borderRadius: 10,
        justifyContent: 'center',
        margin: 5,

    },
    cardImg: {
        margin: 5,
        width: 50,
        height: 50,
        borderRadius: 100,
    },
    infoContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        margin: 5,
        width: '60%'
    },
    buttonContainer: {
        backgroundColor: '#CE8686',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: 25,
        width: 70
    },
    name: {
        color: '#FFFFFF',
        fontSize: 15,
    },
    date: {
        color: '#BEC4D3',
        fontSize: 12
    }
})