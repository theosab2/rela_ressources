import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Footer from './components/footer';
import Header from './components/header';
import Home from './components/home';

const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header} >
        <Header/>
      </View>
      <View style={styles.home} >
        <Home/>
      </View>
      <View style={styles.footer} >
        <Footer/>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  header: {
    flex: 1,    
  },
  home: {
      flex: 8,
      },
  footer: {
      flex: 1,
  }
});

export default App;