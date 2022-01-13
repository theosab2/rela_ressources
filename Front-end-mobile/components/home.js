import React, { Component } from 'react'
import { StyleSheet,Text, View , ScrollView} from 'react-native'
import Card from './card'

const Home = () => {
        return (
            <ScrollView style={styles.containers}>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
                <Card/>
            </ScrollView>
        )
    }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
        
      },
})

export default Home;