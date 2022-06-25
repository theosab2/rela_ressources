import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, StyleSheet, ScrollView, SafeAreaView } from 'react-native'
import { Divider, Icon } from 'react-native-elements';
import Header from '../../components/header';

const Relations = ({ navigation }) => {
    const [search, setSearch] = useState("");
    const [suggestions, setSuggestions] = useState(<View/>);
    const [demande,setDemande] = useState(<View/>);
    const [friends,setFriends] = useState([])

    useEffect(() => {
        getFriends();
    },[])

    const getFriends = async () => {
        const userId = await AsyncStorage.getItem('@userId')
        if(userId){
            return;
        }
        try {
            const api = await fetch(API_URL + "/user/" + userId ,{
                method: "GET",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
              })
              const res = await api.json();
              console.log(res);
        } catch (e) {
            console.log(e);
            
        }
    }
    const getSuggestionUser = async () => {
        if(await AsyncStorage.getItem('@userId') == null){
            setUser(null)
        }else{
            const userId = await AsyncStorage.getItem('@userId')
        }
        try {
            const api = await fetch(API_URL + '/user/' + storedId, {
                method: 'GET',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
              });
              const res = await api.json();
        } catch (e) {
            console.log(e)
        }
         
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
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>Suggestions</Text>
                        <Divider
                            orientation='horizontal'
                            color='#CE8686'
                            style={styles.divider}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
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
})