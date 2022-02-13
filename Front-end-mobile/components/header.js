import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Avatar, Button } from 'react-native-elements'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Header = (props, {navigation}) => {
    console.log(navigation);
        return (
            <View style={styles.container}>
                <Avatar
                    size={55}
                    icon={{ name:'navicon', type:'evilicon', size: 55}}
                    onPress={ () =>{console.log('Menu')}}
                />
                <Text>{props.title}</Text>
                <Avatar
                    size={55}
                    icon={{ name:'user', type:'evilicon', size: 55}}
                    onPress={ () => navigation.navigate('Login')}
                />
            </View>
        )
    }
const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        width: '100%'
    },
})

export default Header;