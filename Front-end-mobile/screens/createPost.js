import { StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, { useState } from 'react';
import { Button, Input } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import DocumentPicker from 'react-native-document-picker';

const CreatePost = () => {
  const [articleTitle, setArticleTitle] = useState('');
  const [articleDescritpion, setArticleDescription] = useState('');
  const [articleTTags, setArticleTTags] = useState([]);
  const [articleContentIds, setArticleContentIds] = useState([]);
  const [articleCreator, setArticleCreator] = useState('');
  const [singleFile, setSingleFile] = useState(null);
  const [imageUri, setImageUri] = useState('../test_content/waiting.jpg');

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res[0]);
      setImageUri(uri);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };
  return (
    <LinearGradient
      colors={['#869ece', '#ffffff']}
      style={styles.linearGradient}
      locations={[0, 1]}
    >
      <Input
        placeholder='Titre'
        onChangeText={articleTitre => setArticleTitle(articleTitre)}
        defaultValue={articleTitle}
      />
      <Input
        placeholder='Description'
        onChangeText={articleDescription => setArticleDescription(articleDescription)}
        defaultValue={articleDescritpion}
      />
      <Input
        placeholder='Tags'
        onChangeText={articleTTags => setArticleTTags(...articleTTags)}
        defaultValue={articleTTags.join(' ')}
      />
      {singleFile != null ? (
        <View>
          <Image
            style={styles.uploadImg}
            source={imageUri}
          />
          <Text >
          File Name: {singleFile.name ? singleFile.name : ''}
          {'\n'}
          Type: {singleFile.type ? singleFile.type : ''}
          {'\n'}
          File Size: {singleFile.size ? singleFile.size : ''}
          {'\n'}
          URI: {singleFile.uri ? singleFile.uri : ''}
          {'\n'}
          </Text>
        </View>
      ) : null}
      <TouchableOpacity
        style={styles.buttonStyle}
        activeOpacity={0.5}
        onPress={selectFile}>
        <Text style={styles.buttonTextStyle}>Select File</Text>
      </TouchableOpacity>
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
  },
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
});
