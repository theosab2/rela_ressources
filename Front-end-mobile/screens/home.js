import React, { Component } from 'react'
import { StyleSheet,Text, View , ScrollView} from 'react-native'
import Card from '../components/card'
import CreateAccount from './createAccount'
import Login from './login'

const Home = () => {
        return (
            <ScrollView 
                style={styles.containers}
                contentContainerStyle={{flex:1,justifyContent:'center', alignItems:'center'}}
            >
                <CreateAccount/>
            </ScrollView>
        )
    }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems:'center'
        
      },
})

export default Home;