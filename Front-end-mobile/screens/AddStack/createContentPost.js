import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "@env"
import Header from '../../components/header'
import { Divider } from 'react-native-elements';
import HomemadeNavBar from '../../components/homemadeNavBar';
import { Picker } from '@react-native-picker/picker';
import { Icon, Button, Image } from 'react-native-elements';



const CreateContentPost = ({ navigation, route }) => {
  const [arrayContentFront, setArrayContentFront] = useState([]);
  const [contentsData, setContentsData] = useState([]);

  const [contentFront, setContentFront] = useState([]);
  const [selectedContent, setSelectedContent] = useState(null)

  const [cacheContentType, setCacheContentType] = useState([])

  const [singleFile, setSingleFile] = useState(null);
  const [imageUri, setImageUri] = useState(null);
  const [namePicture, setNamePicture] = useState('')

  console.log(route.params);
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
  const sendFile = async () => {
    const user = await AsyncStorage.getItem('@userId');
    let formdata = new FormData();
    formdata.append("article-image", singleFile);
    let jsonData = JSON.stringify({
      articleTitle: articleTitle,
      articleDescription: articleDescritpion,
      articleTag_TTids: articleTTags,
      articleCategory_TTids: articleCategory,
      articleContent: articleContents,
      articleCreator: user,
    })
    formdata.append("article", jsonData);
    try {
      const api = await fetch(API_URL + '/article/create', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          "user-upload-GUID": user
        },
        body: formdata
      });
      const res = await api.json();
      console.log(res);
    } catch (err) {
      console.log(err)
    }
  }
  const titleContent = (index) => {
    return (
      <View style={styles.input}>
        <Icon name="receipt-outline" type="ionicon" color="#FFFFFF" style={styles.inputIcon} />
        <TextInput
          placeholder="Titre"
          onChangeText={titreContent => contentsData[index].body = titreContent}
        />
      </View>
    )
  }
  const descriptionContent = (index) => {
    return (
      <View style={[styles.input, styles.inputDescription]}>
        <Icon name="receipt-outline" type="ionicon" color="#FFFFFF" style={styles.inputIcon} />
        <TextInput
          placeholder="Courte description décrivant votre ressource de ce contenu"
          onChangeText={descriptionContent => contentsData[index].body = descriptionContent}
          multiline={true}
          style={styles.textArea}
        />
      </View>
    )
  }
  const imgContent = (index) => {
    return (
      <View style={styles.imagePickerContainer}>
        <View style={styles.imagePickerLeft}>
          <View style={[styles.input, styles.inputPictureTitle]}>
            <Icon name="image-outline" type="ionicon" color="#FFFFFF" style={styles.inputIcon} />
            <Text>{namePicture == '' ? "Sélectionner une image de couverture" : namePicture}</Text>
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
            source={imageUri == null ? require('../../test_content/waiting.jpg') : require('../../test_content/waiting.jpg')}
          />
        </View>
      </View>
    )
  }
  const getContent = async () => {
    try {
      const api = await fetch(API_URL + '/uts/all/CONTENT', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      });
      const res = await api.json()
      console.log(res.ut);
      setContentFront(res.ut)
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getContent();
  }, [])

  const renderContent = () => {
    return contentFront.map((item, index) => {
      return <Picker.Item label={item.name} value={item.name} />
    })
  }
  const AddNewContent = () => {
    if (selectedContent == null || selectedContent == 0) {
      console.log("contenu non selectionner")
    } else if (selectedContent == 'img') {
      arrayContentFront.push(imgContent(arrayContentFront.length))
      contentsData.push({
        UT_id: getIdContentByName(selectedContent),
        body: "",
        positionX: null,
        positionY: null,
        textColor: "",
        additionnalCSS: ""
      })
    } else if (selectedContent == 'text') {
      arrayContentFront.push(descriptionContent(arrayContentFront.length))
      contentsData.push({
        UT_id: getIdContentByName(selectedContent),
        body: "",
        positionX: null,
        positionY: null,
        textColor: "",
        additionnalCSS: ""
      })
    } else if (selectedContent == 'title') {
      arrayContentFront.push(titleContent(arrayContentFront.length))
      contentsData.push({
        UT_id: getIdContentByName(selectedContent),
        body: "",
        positionX: null,
        positionY: null,
        textColor: "",
        additionnalCSS: ""
      })
    }
    setSelectedContent(null);
  }
  const sendToDB = async () => {
    const user = await AsyncStorage.getItem('@userId');
    var formdata = new FormData()
    formdata.append("article-image",route.params.image)
    var article = JSON.stringify({
      title: route.params.title,
      description: route.params.description,
      category_UTid: route.params.category,
      contents: contentsData,
      creator: user,
      image: route.params.image,
      isApproved: true,
      isActive: true,

    })
    formdata.append("article", article);
    console.log(article)
    const res = await fetch(API_URL + "/article/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "user-upload-GUID": user,
      },
      body: formdata,
    });
    
    console.log(res.status);
    if (res.status == 201 || res.status == 200) {
      navigation.navigate('Home');
    } else {
      console.log(res.status)
    }
  }
  const getIdContentByName = (contentName) => {
    return contentFront.find(item => item.name == contentName)._id
  }
  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Créer votre contenu</Text>
        <Divider
          orientation='horizontal'
          color='#CE8686'
          style={styles.divider}
        />
        {arrayContentFront.map(item => {
          return item
        })}
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={selectedContent}
            onValueChange={(value) => setSelectedContent(value)}
            style={styles.picker}
            placeholder="Content"
          >
            <Picker.Item label="Choisissez un type de contenu" value={0} />
            {renderContent()}
          </Picker>
        </View>
      </View>
      <View style={styles.buttons}>
        <Button
          title="Ajouter le contenu"
          loading={false}
          loadingProps={{ size: 'small', color: 'white' }}
          buttonStyle={styles.buttonAddStyle}
          titleStyle={{ fontWeight: 'bold', fontSize: 12 }}
          containerStyle={[styles.buttonContainerStyle, styles.buttonAdd]}
          onPress={() => {
            AddNewContent();
            /**Mise en BDD l'article complet */
          }}
        />
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
            //navigation.navigate('Home', { screen: 'home' });
            /**Mise en BDD l'article complet */
            sendToDB()
          }}
        />
      </View>
      <View style={styles.footer}>
      </View>
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
  },
  buttonAdd: {
    width: "95%",
    margin: 5,
  },
  buttonAddStyle: {
    backgroundColor: '#869ECE',
    borderRadius: 10,
    height: 50,
  }

});
export default CreateContentPost;
