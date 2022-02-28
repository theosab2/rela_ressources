import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { Button, Input } from 'react-native-elements';

const CreatePost = () => {
  return (
    <View>
      <Input
        placeholder='Titre'

      />
      <Input
        placeholder='Contenu'
        
      />
      <Button
        title='Valider'
      />
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({});
