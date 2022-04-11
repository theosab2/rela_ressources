import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon, Button } from 'react-native-elements'

const HomemadeNavBar = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Button
                type='clear'
                icon={
                    <Icon
                        name='home-outline'
                        type='ionicon'
                        color='#ffffff'
                    />
                }
                onPress={() => navigation.navigate("Home",{ screen: 'Test'})}
            />
            <Button
                type='clear'
                icon={
                    <Icon
                        name='people-outline'
                        type='ionicon'
                        color='#ffffff'
                    />
                }
            />
            <Button
                type='clear'
                icon={
                    <Icon
                        name='add-circle-outline'
                        type='ionicon'
                        color='#ffffff'
                    />
                }
                onPress={() => navigation.navigate("NewPost")}
            />
            <Button
                type='clear'
                icon={
                    <Icon
                        name='folder-outline'
                        type='ionicon'
                        color='#ffffff'
                    />
                }
            />
            <Button
                type='clear'
                icon={
                    <Icon
                        name='chatbox-outline'
                        type='ionicon'
                        color='#ffffff'
                    />
                }
            />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: "90%",
        backgroundColor: "#CE8686",
        height: 50,
        top: "90%",
        left: "5%",
        borderRadius: 50,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"
    }
})

export default HomemadeNavBar