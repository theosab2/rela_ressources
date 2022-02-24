import {HeaderStyleInterpolators} from '@react-navigation/stack';
import React, {Component} from 'react';
import {StyleSheet, Text, View, ScrollView, SafeAreaView} from 'react-native';
import Card from '../components/card';
import Footer from '../components/footer';

const Home = ({navigation}) => {
  return (
    <>
      <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Card navigation={navigation} />
          <Card navigation={navigation} />
          <Card navigation={navigation} />
          <Card navigation={navigation} />
          <Card navigation={navigation} />
          <Card navigation={navigation} />
          <Card navigation={navigation} />
          <Card navigation={navigation} />
          <Card navigation={navigation} />
          <Card navigation={navigation} />
          <Card navigation={navigation} />
          <Card navigation={navigation} />
        </ScrollView>
      </SafeAreaView>
      <View style={styles.footer}>
        <Footer />
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 12,
  },
  scrollView: {
    flex: 8,
  },
  footer: {
    flex: 1,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;
