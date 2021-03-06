import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, ScrollView, SafeAreaView, Image } from 'react-native'
import { Divider, Icon } from 'react-native-elements';
import Header from '../../components/header';
import HomemadeNavBar from '../../components/homemadeNavBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "@env"
import { TouchableOpacity } from 'react-native-gesture-handler'


const Relations = ({ navigation }) => {
    const [userId, setUserId] = useState()
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [demande, setDemande] = useState([]);
    const [waiting, setWaiting] = useState([]);
    const [friends, setFriends] = useState([]);
    const [displaySuggestion, setDisplaySuggestion] = useState([]);
    const [displayDemandes, setDisplayDemandes] = useState([]);

    const getUser = async () => {
        const user = await AsyncStorage.getItem('@userId');
        setUserId(user);
    }
    //Get user friends
    const getFriends = async () => {
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

            const currentUser = res.users.find(user => user._id === userId)
            const demandes = res.users.filter(user => user.friends_ids.includes(userId) && !currentUser.friends_ids.includes(user._id))

            setDemande(demandes)


        } catch (e) {
            console.log(e)
        }
    }
    const getDisplaySuggestion = async () => {

        let tmpSuggestions = [];

        tmpSuggestions = suggestions.filter(suggest => suggest._id !== userId).filter(suggest => friends.findIndex(f => f === suggest._id) === -1).map(item => {

            if (!item.friends_ids.find(friend => friend === userId)) {
                return <TouchableOpacity
                    style={styles.cardContainer}
                    containerStyle={styles.cardContainerStyle}
                >
                    <Image
                        style={styles.cardImg}
                        source={item && item.photoUrl ? {uri: item.photoUrl} : require('../../test_content/waiting.jpg')}
                    />
                    <View style={styles.infoContainer}>
                        <Text style={styles.name}>{item.username}</Text>
                        <Text style={styles.date}></Text>
                    </View>
                    <TouchableOpacity containerStyle={styles.buttonContainer} onPress={() => addFriend(item._id)}>
                        <Text>Ajouter</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            }
        })
        setDisplaySuggestion(tmpSuggestions);
    }
    const getDisplayDemande = () => {
        let tmpDemandes = [];

        let currentUser = suggestions.find(u => u._id === userId)

        tmpDemandes = [...demande.map(item => {
            return <TouchableOpacity
                style={styles.cardContainer}
                containerStyle={styles.cardContainerStyle}
            >
                <Image
                    style={styles.cardImg}
                    source={item && item.photoUrl ? {uri: item.photoUrl} : require('../../test_content/waiting.jpg')}
                />
                <View style={styles.infoContainer}>
                    <Text style={styles.name}>{item.username}</Text>
                    <Text style={styles.date}></Text>
                </View>
                <TouchableOpacity containerStyle={[styles.buttonContainer,styles.accept]} onPress={() => addFriend(item._id)}>
                    <Text>Accepter</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        }), ...friends.map(item => {
            
            

            let user = suggestions.find(u => u._id === item);
            if (!user) return;

            if (!user.friends_ids.includes(userId) && currentUser.friends_ids.includes(user._id))
            {return <TouchableOpacity style={styles.cardContainer} containerStyle={styles.cardContainerStyle}>
            <Image
                style={styles.cardImg}
                source={item && item.photoUrl ? {uri: item.photoUrl} : require('../../test_content/waiting.jpg')}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.name}>{user.username}</Text>
                <Text style={styles.date}></Text>
            </View>
            <View style={[styles.buttonContainer,styles.waiting]}>
                <Text adjustsFontSizeToFit>En attente</Text>
            </View>
        </TouchableOpacity>}
            else return;

        })]
        setDisplayDemandes(tmpDemandes.filter(item => item !== undefined))

    }
    const addFriend = async (idfriend) => {
        try {
            const api = await fetch(API_URL + '/user/toggle-friend/' + userId + '/' + idfriend, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
            const res = await api.json();
            getFriends()
            getSuggestionUser();
            getDisplaySuggestion();
            getDisplayDemande();
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        if (!userId) {
            getUser()
        } else {
            getFriends();
            getSuggestionUser();
        }

    }, [userId]);

    useEffect(() => {
        if (userId) {
            getDisplayDemande();
            getDisplaySuggestion();
        }

    }, [suggestions, demande, userId])

    console.log({demande, suggestions})
    return (<>

        {userId ? <View style={styles.container}>
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
        </View> : <View></View>}</>)

}

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
    },
    accept: {
        backgroundColor: '#9EAF6C'
    },
    waiting: {
        backgroundColor: '#635D5B'
    }
})
export default Relations