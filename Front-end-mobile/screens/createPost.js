import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { Button, Input } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const CreatePost = () => {
  return (
    <LinearGradient
      colors={['#869ece', '#ffffff' ]}
      style={styles.linearGradient}
      locations={[0, 1]}
    >
      <Input
        placeholder='Titre'

      />
      <Input
        placeholder='Contenu'
        
      />
      <Button
        title='Valider'
      />
    </LinearGradient>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  linearGradient: {
    height: '100%',
    width: '100%',
  }
});
