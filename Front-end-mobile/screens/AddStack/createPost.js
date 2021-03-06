import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useEffect, useState } from 'react';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "@env"
import Header from '../../components/header'
import { Divider } from 'react-native-elements';
import HomemadeNavBar from '../../components/homemadeNavBar';
import { Picker } from '@react-native-picker/picker';
import { Icon, Button, Image } from 'react-native-elements';



const CreatePost = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [namePicture, setNamePicture] = useState('');
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [singleFile, setSingleFile] = useState(null);
  const [imageUri, setImageUri] = useState(null);

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.images],
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
      setNamePicture(res[0].name)
      setSingleFile(res[0]);
      setImageUri(res[0].uri);
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
  const goToContent = () => {
    if (title.length <= 0) {
      console.log('Titre manquant')
    }
    else if (description.length <= 0) {
      console.log('Veuillez d??crire en quelque mots votre ressource')
    }
    else if (selectedCategory == null || selectedCategory == 0){
      console.log('Selectionner une category');
    }
    else {
      const data = {
        category: selectedCategory,
        title: title,
        description: description,
        image: singleFile
      }
      navigation.navigate('NewPost', {
        screen: 'CreateContentPost',
        params: data
      })
    }
  }
  const getCategories = async () => {
    try {
      const api = await fetch(API_URL + '/uts/all/CATEGORY', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const res = await api.json()
      console.log(res.ut);
      setCategory(res.ut);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    getCategories();
  }, [])

  const renderCategory = () => {
    return category.map((item,index) => {
      return <Picker.Item label={item.name} value={item._id} key={index} />
    })
  }
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Cr??er votre ressource</Text>
        <Divider
          orientation='horizontal'
          color='#CE8686'
          style={styles.divider}
        />
        <View style={styles.pickerContainer}>
        <Picker
            selectedValue={selectedCategory}
            onValueChange={(value) => setSelectedCategory(value)}
            style={styles.picker}
            placeholder="Category"
          >
            <Picker.Item label="Choisissez une cat??gorie" value={0}/>
            {renderCategory()}
          </Picker>
        </View>

        <View style={styles.input}>
          <Icon name="text-outline" type="ionicon" color="#FFFFFF" style={styles.inputIcon} />
          <TextInput
            placeholder="Titre"
            onChangeText={title => setTitle(title)}
            defaultValue={title}

          />
        </View>
        <View style={[styles.input, styles.inputDescription]}>
          <Icon name="receipt-outline" type="ionicon" color="#FFFFFF" style={styles.inputIcon} />
          <TextInput
            placeholder="Courte description d??crivant votre ressource"
            onChangeText={description => setDescription(description)}
            defaultValue={description}
            multiline={true}
            style={styles.textArea}
          />
        </View>
        <View style={styles.imagePickerContainer}>
          <View style={styles.imagePickerLeft}>
            <View style={[styles.input, styles.inputPictureTitle]}>
              <Icon name="image-outline" type="ionicon" color="#FFFFFF" style={styles.inputIcon} />
              <Text>{namePicture == '' ? "S??lectionner une image de couverture" : namePicture}</Text>
            </View>
            <View style={styles.buttonPictureContainer}>
              <Button
                title="Supprimer"
                buttonStyle={[styles.buttonStyle, styles.buttonDeletePicture]}
                containerStyle={styles.buttonContainerStyle}
                activeOpacity={0.5}
                onPress={selectFile}
              />
              <Button
                title="Ajouter une image"
                buttonStyle={styles.buttonStyle}
                containerStyle={styles.buttonContainerStyle}
                activeOpacity={0.5}
                onPress={selectFile}
              />
            </View>
          </View>
          <View style={styles.imagePicker}>
            <Image
              style={styles.uploadImg}
              source={imageUri == null ? require('../../test_content/waiting.jpg') : {uri : imageUri}}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttons}>
        <Button
          title="Continuer"
          loading={false}
          loadingProps={{ size: 'small', color: 'white' }}
          buttonStyle={styles.buttonStyle}
          titleStyle={{ fontWeight: 'bold', fontSize: 12 }}
          containerStyle={[styles.buttonContainerStyle, styles.buttonContinue]}
          onPress={() => {
            goToContent();
            /**Envoyer l'article ?? la prochaine page */
          }}
        />
      </View>
      <View style={styles.footer}>
      </View>
      <HomemadeNavBar route='CreatePost' navigation={navigation} />
    </View>
  );
};

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
  titleContainer: {
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'column',
    alignItems: 'center'
  },
  divider: {
    width: '33%',
    margin: 10
  },
  title: {
    fontSize: 20,
    marginTop: 10
  },
  pickerContainer: {
    width: "95%",
    height: 60,
    backgroundColor: "#869ECE",
    margin: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  picker: {
    width: "100%",
    height: 60,
  },
  input: {
    backgroundColor: "#869ECE",
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
    width: "95%",
  },
  inputDescription: {
    height: 150,
    alignItems: 'flex-start',

  },
  inputIcon: {
    margin: 5,
  },
  textArea: {
    flex: 1,
    flexShrink: 1,
    textAlignVertical: 'top',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonStyle: {
    backgroundColor: '#CE8686',
    borderRadius: 10,
    height: 50,
  },
  buttonContainerStyle: {
    margin: 2,
    width: '90%',
  },
  buttonDeletePicture: {
    backgroundColor: '#BEC4D3'
  },
  imagePickerContainer: {
    flexDirection: 'row',
    width: "95%",
    height: 170,
    backgroundColor: '#869ECE',
    borderRadius: 10,
    margin: 5,
  },
  imagePickerLeft: {
    flexDirection: 'column',
    width: "66%"
  },
  imagePicker: {
    width: "33%",
    height: "100%",
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonPictureContainer: {
    alignItems: 'center',
  },
  uploadImg: {
    width: 125,
    height: 125,
    borderRadius: 10,
  },
  buttonContinue: {
    width: "95%",
    margin: 5
  }

});
export default CreatePost;
