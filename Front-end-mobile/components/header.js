import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

const Header = () => {
        return (
            <View style={styles.container}>
                <Text>Header</Text>
                <Text>Header</Text>
                <Text>Header</Text>
            </View>
        )
    }
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#B0B0B0',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
      },
})

export default Header;