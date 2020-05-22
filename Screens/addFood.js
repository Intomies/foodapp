import React, { useState } from 'react';
import firebase from '../API/firebaseConfig.js'

import 
{ 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Modal,
} from 'react-native';

import { styles } from '../Styles/styles.js'
import { Formik } from 'formik'
import {Icon} from 'react-native-elements'


export default function AddFood(props) {
    const [ingredients, setIngredients] = useState([])
    const [eatCounter, setEatCounter] = useState(0)
    const [modalVisible, setModalVisible] = useState(false);

   const onSubmit = (values) => {
    let firestoreTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
    firebase
        .firestore()
        .collection('foods')
        .add({
            name: values.name,
            recipe: values.recipe,
            notes: values.notes,
            added: firestoreTimestamp,
            times_eaten: eatCounter,
            ingredients: ingredients
        })
        props.navigation.goBack()
    }

   const getKey = () => {
    let max = 100000
    return Math.floor(Math.random() * Math.floor(max))
    }

    _listEmptyComponent = () => {
        return (
            <View>
                <Text style={styles.baseText}>You haven't added any ingredients yet</Text>
            </View>
        )
    }

    const handleIngredients = (values) => {
        setIngredients([...ingredients, values])
    }
   
    return(
        <View style={styles.container}>
            <Text style={styles.titleText}>Add New Food</Text>
            <Formik
                initialValues={{name: '', recipe: '', notes: ''}}
                onSubmit={(values) => {onSubmit(values)}}
            >
                {(formikProps) => (
                    <View  style={styles.addNewFoodForm}>
                        <TextInput 
                            placeholder='Food Name'
                            placeholderTextColor='#2F4F4F'
                            style={styles.textIn}
                            onChangeText={formikProps.handleChange('name')}
                            value={formikProps.values.name}
                        />

                        <TextInput
                            multiline
                            style={styles.textIn}
                            placeholder='Recipe'
                            placeholderTextColor='#2F4F4F'
                            onChangeText={formikProps.handleChange('recipe')}
                            value={formikProps.values.recipe}
                        />

                        <TextInput
                            multiline
                            style={styles.textIn}
                            placeholder='Notes'
                            placeholderTextColor='#2F4F4F'
                            onChangeText={formikProps.handleChange('notes')}
                            value={formikProps.values.notes}
                        />
                        <Text style={styles.smallerTitle}>Ingredients:</Text>
                        <FlatList style={{width: '80%'}}
                                    keyExtractor={key => getKey().toString()}
                                    data={ingredients}
                                    ListEmptyComponent={_listEmptyComponent}
                                    renderItem={({item, key}) =>
                                    <View style={{flexDirection: 'column', justifyContent: 'space-evenly'}}>
                                        <TouchableOpacity style={styles.listItem}>
                                            <Text style={{marginBottom: 2, fontSize: 16, color: 'black', opacity: 0.8}}>{item.ing} {item.amount} {item.unit}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    }
                                />
                        <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                            <TouchableOpacity 
                                style={[styles.addFoodBubble, styles.addFoodButton, {backgroundColor:'#5f6f50'}]}
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
                                onPress={formikProps.handleSubmit}
                            >
                                <Icon
                                    name='save'
                                    color='#FFEBCD'
                                    size={40}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                )}
            </Formik>
            
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Add Ingredients</Text>
                        <Formik 
                            initialValues={{ing: '', amount: '', unit: ''}}
                            onSubmit={(values, actions) => {
                                handleIngredients(values);
                                actions.resetForm();
                            }}
                            >
                            {(formikProps) => (
                                <View>
                                    <TextInput
                                        placeholder='Ingredient'
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
        </View>
        
    )
}