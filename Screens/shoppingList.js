import React, { useState , useEffect} from 'react';
import firebase from '../API/firebaseConfig.js'

import 
{ 
    View,
    Text,
    Alert,
    FlatList,
    TouchableOpacity,
    Modal,
    TextInput,
    Share,
} from 'react-native';
import { Formik } from 'formik'
import {Icon} from 'react-native-elements'

import { styles } from '../Styles/styles.js'

function getItems() {
    const [items, setItems] = useState([])

    useEffect(() => {
        const unsubscribe = 
            firebase
            .firestore()
            .collection('shoppinglist')
            .onSnapshot((snapshot) => {
                const newItems= snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                    }))
                    setItems(newItems)
                })
            return unsubscribe
    },[])
 return items
}

export default function ShoppingList(props) {
    const {navigate} = props.navigation
    const items = getItems()
    const [modalVisible, setModalVisible] = useState(false);

    _listEmptyComponent = () => {
        return (
            <View>
                <Text style={[styles.baseText, {width: '100%'}]}>List is empty..</Text>
            </View>
        )
    }
    
    const getKey = () => {
        let max = 100000
        return Math.floor(Math.random() * Math.floor(max))
    }

    const deleteItemFromList = (itemId) => {
        firebase
        .firestore()
        .collection('shoppinglist')
        .doc(itemId.toString())
        .delete()
        .then(function() {
            console.log("Document successfully deleted!");
        }).catch(function(error) {
            console.error("Error removing document: ", error);
        })
    }

    const onSubmit = (values) => {
        firebase
            .firestore()
            .collection('shoppinglist')
            .add({ing: values.ing, amount: values.amount, unit: values.unit})
    }

    const prepareShare = () => {
        let helper = ''
        const listItems = items.map((item) =>
        helper += `${item.ing} ${item.amount} ${item.unit}\n`
        );
        return helper;
      }
    
    const shareList = async () => {
        try {
            const result = await Share.share({
        message:
            `${prepareShare()}`
        });
        if (result.action === Share.sharedAction) {
        if (result.activityType) {
        // shared with activity type of result.activityType
        } else {
        // shared
        }
        } else if (result.action === Share.dismissedAction) {
        // dismissed
        }
    } catch (error) {
        Alert.alert(error.message);
    }
    }

    return(
        <View style={styles.container}>
            <Text style={styles.titleText}>Shopping List</Text>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Add Items</Text>
                        <Formik
                            initialValues={{ing: '', amount: '', unit: ''}}
                            onSubmit={(values, actions) => {
                                onSubmit(values);
                                actions.resetForm();
                            }}
                                
                            >
                            {(formikProps) => (
                                <View>
                                    <TextInput
                                        placeholder='Item'
                                        placeholderTextColor='#2F4F4F'
                                        style={styles.textIn}
                                        onChangeText={formikProps.handleChange('ing')}
                                        value={formikProps.values.ing}
                                    />

                                    <TextInput
                                        multiline
                                        style={styles.textIn}
                                        placeholder='Amount'
                                        placeholderTextColor='#2F4F4F'
                                        keyboardType='numeric'
                                        onChangeText={formikProps.handleChange('amount')}
                                        value={formikProps.values.amount}
                                    />

                                    <TextInput
                                        multiline
                                        style={styles.textIn}
                                        placeholder='Unit'
                                        placeholderTextColor='#2F4F4F'
                                        onChangeText={formikProps.handleChange('unit')}
                                        value={formikProps.values.unit}
                                    />
                                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                                        <TouchableOpacity 
                                            style={[styles.addFoodBubble, styles.addFoodButton, {backgroundColor:'maroon',height: 65, width: 65, }]}
                                            onPress={() => setModalVisible(!modalVisible)}
                                        >
                                            <Icon
                                                name='cancel'
                                                color='#FFEBCD'
                                                size={18}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity 
                                            style={[styles.addFoodBubble, styles.addFoodButton, {backgroundColor:'#5f6f50',height: 65, width: 65, }]}
                                            onPress={formikProps.handleSubmit}
                                        >
                                            <Icon
                                                name='check'
                                                color='#FFEBCD'
                                                size={26}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )}
                        </Formik>
                    </View>
                </View>
            </Modal>
            <FlatList 
                style={{height:10}}
                keyExtractor={key => getKey().toString()}
                data={items}
                ListEmptyComponent={_listEmptyComponent}
                renderItem={({item, key}) =>
                <View style={{flexDirection: 'column', justifyContent: 'space-evenly'}}>
                    <TouchableOpacity 
                        style={[styles.listItem, {flexdirection:'row'}]}
                        onLongPress={() => deleteItemFromList(item.id)}
                    >
                        <Text style={{marginBottom: 2, fontSize: 16, color: 'black', opacity: 0.8}}>{item.ing} {item.amount} {item.unit}</Text>
                    </TouchableOpacity>
                </View>
                }
            />
            <View style={styles.addItemContainer}>
            <TouchableOpacity 
                style={[styles.addFoodBubble, styles.addFoodButton]}
                onPress={() => setModalVisible(true)}
            >
                <Icon
                    name='add'
                    color='#FFEBCD'
                    size={40}
                        />
            </TouchableOpacity>
            <TouchableOpacity 
                style={[styles.addFoodBubble, styles.addFoodButton]}
                onPress={() => shareList()}
            >
                <Icon
                    name='share'
                    color='#FFEBCD'
                    size={33} />
            </TouchableOpacity>
            </View>
        </View>
    )

}