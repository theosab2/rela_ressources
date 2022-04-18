import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Header from '../components/header';

const Post = ({route, navigation}) => {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.toolButton}>
          <Text>PostScene</Text>
          <Text>{route.params.idPost}</Text>
      </View>
      <SafeAreaView style={styles.scrollViewContainer}>
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.postPosition}> 
        </ScrollView>
      </SafeAreaView>
      <View style={styles.footer}>
      </View>
    </View>
  )
}

export default Post

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
      toolButton: {
        width: '100%',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'center'
      },
      title: {
        fontSize: 20,
        marginTop: 10
      }    
})