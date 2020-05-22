import React, { useState , useEffect} from 'react';
import firebase from '../API/firebaseConfig.js'

import 
{ 
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native';
import {Icon} from 'react-native-elements'

import { styles } from '../Styles/styles.js'

function getFoods() {
    const [foods, setFoods] = useState([])

    useEffect(() => {
        const unsubscribe = firebase
            .firestore()
            .collection('foods')
            .onSnapshot((snapshot) => {
                const newFoods = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setFoods(newFoods)
            })
            return unsubscribe
    },[])
 return foods
}

export default function FoodList(props) {
    const foods = getFoods()
    const {navigate} = props.navigation;

    const deleteAlert = (itemId) =>
    Alert.alert(
      "Delete Food",
      "This will delete food permanently.",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () =>  deleteFood(itemId)}
      ],
      { cancelable: false }
    );

    const deleteFood = (itemId) => {
        firebase
        .firestore()
        .collection('foods')
        .doc(itemId.toString())
        .delete()
        .then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        })
    }

    return(
        <View style={styles.container}>
            <Text style={styles.titleText}>Foods List</Text>
            <View style={{flex:6}}>
            <FlatList style={{borderRadius: 5}}
            keyExtractor={item => item.id.toString()}
            data={foods}
            renderItem={({item}) =>
            <View style={{flexDirection: 'column', justifyContent: 'space-evenly'}}>
            <TouchableOpacity style={styles.listItem} 
                onPress={() => navigate('Food Details', {id:item.id})}
                onLongPress={() => deleteAlert(item.id)}
            >
                <Text style={{marginBottom: 2, fontSize: 16, color: 'black', opacity: 0.8}}>{item.name}</Text>
                <Text style={{marginBottom: 2, fontSize: 16, color: 'black', opacity: 0.8}}>{item.recipe}</Text>
            </TouchableOpacity>
            </View>
            }/>
            </View>
            <View style={styles.addFoodContainer}>
            <TouchableOpacity 
                style={[styles.addFoodBubble, styles.addFoodButton]}
                onPress={() => props.navigation.navigate('Add Food')}>
                    <Icon
                    name='add'
                    color='#FFEBCD'
                    size={40}
                     />
            </TouchableOpacity>
            </View>
        </View>
    )

}