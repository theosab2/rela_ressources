import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'

export default class Header extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text>Header</Text>
                <Text>Header</Text>
                <Text>Header</Text>
            </View>
        )
    }
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