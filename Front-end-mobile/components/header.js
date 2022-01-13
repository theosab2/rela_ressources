import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import { Avatar } from 'react-native-elements'

const Header = () => {
        return (
            <View style={styles.container}>
                <Avatar
                    containerStyle={styles.headerComponent}
                    size={55}
                    icon={{ name:'navicon', type:'evilicon', size: 55}}
                    onPress={ () =>{console.log('Menu')}}
                    
                />
                <Avatar
                    containerStyle={styles.headerComponent}
                    size={55}
                    icon={{ name:'user', type:'evilicon', size: 55}}
                    onPress={ () =>{console.log('Account')}}
                />
            </View>
        )
    }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B0B0B0',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    headerComponent: {
        marginTop: 30
    }
})

export default Header;