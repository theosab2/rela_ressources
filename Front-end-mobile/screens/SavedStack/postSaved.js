import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-elements/dist/buttons/Button'
import LinearGradient from 'react-native-linear-gradient';

const PostSaved = ({route}) => {
  return (
    <LinearGradient
      colors={['#869ece', '#ffffff' ]}
      style={styles.linearGradient}
      locations={[0, 1]}
    >
      <Button title="Coucou 2 le retour"

      />
    </LinearGradient>
  );
};

export default PostSaved;

const styles = StyleSheet.create({
  linearGradient: {
    height: '100%',
    width: '100%',
  }
});
