import React, { useState, useEffect, useFocusEffect, useCallback } from 'react';
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
} from 'react-native';

import { styles } from '../Styles/styles.js'
import { Formik } from 'formik'
import {Icon} from 'react-native-elements'

function getFoodById(foodId) {
    const [food, setFood] = useState({})

    useEffect(() => {
        const unsubscribe = 
            firebase
            .firestore()
            .collection('foods')
            .where(firebase.firestore.FieldPath.documentId(), '==', foodId.toString())
            .onSnapshot((snapshot) => {
            const newFood = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
                }))
                setFood(newFood[0])
            })
            return unsubscribe
    },[])
 return food
}

export default function FoodDetails(props) {
    const {navigate} = props.navigation
    const foodId = props.route.params.id;
    const food = getFoodById(foodId)
    const [ingredients, setIngredients] = useState([])
    const [eatCounter, setEatCounter] = useState(0)
    const [foodModalVisible, setFoodModalVisible] = useState(false);
    const [ingModalVisible, setIngModalVisible] = useState(false);

    useEffect(() => {
        setIngredients(food.ingredients)
    }, [food.ingredients])

    const getKey = () => {
        let max = 100000
        return Math.floor(Math.random() * Math.floor(max))
    }

    _listEmptyComponent = () => {
        return (
            <View>
                <Text style={styles.baseText}>You haven't added any ingredients for this food</Text>
            </View>
        )
    }

    const addToShoppinglist = () => {
        let ingredient = {}
        for (let i = 0; i < ingredients.length; i++){
            ingredient = ingredients[i]
            firebase
                .firestore()
                .collection('shoppinglist')
                .add(ingredient)
        }
        Alert.alert('Ingredients added to shoppinglist')
    }

    const onSubmit = (values) => {
        let firestoreTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
        firebase
            .firestore()
            .collection('foods')
            .doc(foodId)
            .update({
                name: values.name,
                recipe: values.recipe,
                notes: values.notes,
                added: firestoreTimestamp,
                times_eaten: eatCounter,
                ingredients: ingredients
            })
        setFoodModalVisible(false)
    }

    const acceptChangesAndSave = () => {
        let firestoreTimestamp = firebase.firestore.Timestamp.fromDate(new Date());
        firebase
            .firestore()
            .collection('foods')
            .doc(foodId)
            .update({
                name: food.name,
                recipe: food.recipe,
                notes: food.notes,
                added: firestoreTimestamp,
                times_eaten: eatCounter,
                ingredients: ingredients
            })
        setFoodModalVisible(false)
    }
        
    const handleIngredients = (values) => {
        if (values.ing === '' && values.amount === '' && values.unit === '') {
            console.log('nothing saved')
        }
        else {
            setIngredients(food.ingredients)
            setIngredients([...ingredients, values])
        }
    }

    const deleteIngredientFromList = (item) => {
        let temp = ingredients.filter(function(ingredient){return ingredient.ing != item.ing})
        setIngredients(temp)
    }

    return(
        <View style={styles.container}>
            <Text style={styles.titleText}>{food.name}</Text>
            <View style={styles.addNewFoodForm}>
            <Text style={styles.smallerTitle}>Recipe:</Text>
            <Text style={styles.baseText}>{food.recipe}</Text>
            <Text style={styles.smallerTitle}>Notes:</Text>
            <Text style={styles.baseText}>{food.notes}</Text>
            <Text style={styles.smallerTitle}>Ingredients:</Text>
            <FlatList style={{width: '80%'}}
                ListEmptyComponent={_listEmptyComponent}
                keyExtractor={key => getKey().toString()}
                data={ingredients}
                renderItem={({item, key}) =>
            <View style={{flexDirection: 'column', justifyContent: 'space-evenly'}}>
                <TouchableOpacity 
                    style={styles.listItem}
                    onLongPress={() => deleteIngredientFromList(item)}
                    >
                    <Text style={{marginBottom: 2, fontSize: 16, color: 'black', opacity: 0.8}}>{item.ing}</Text>
                    <Text style={{marginBottom: 2, fontSize: 16, color: 'black', opacity: 0.8}}>{item.amount} {item.unit}</Text>
                </TouchableOpacity>
            </View>
            }/>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly'}}>
                <TouchableOpacity 
                    style={[styles.addFoodBubble, styles.addFoodButton, {backgroundColor:'#5f6f50', width: 65, height: 65}]}
                    onPress={() => setIngModalVisible(true)}
                >
                    <Icon
                        name='add'
                        color='#FFEBCD'
                        size={30}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.addFoodBubble, styles.addFoodButton, {width: 65, height: 65}]}
                    onPress={() => setFoodModalVisible(true)}
                >
                    <Icon
                        name='edit'
                        color='#FFEBCD'
                        size={30}
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.addFoodBubble, styles.addFoodButton, {backgroundColor:'#5f6f50', width: 65, height: 65}]}
                    onPress={() => addToShoppinglist()} 
                >
                    <Icon
                        name='shopping-cart'
                        color='#FFEBCD'
                        size={30} 
                    />
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[styles.addFoodBubble, styles.addFoodButton, {width: 65, height: 65}]}
                    onPress={() => acceptChangesAndSave()}
                >
                    <Icon
                        name='save'
                        color='#FFEBCD'
                        size={30}
                    />
                </TouchableOpacity>
            </View>
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', position:'relative'}}>
                
            </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={foodModalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>Edit Food</Text>
                        <Formik
                            initialValues={{name: food.name, recipe: food.recipe, notes: food.notes}}
                            onSubmit={(values) => {onSubmit(values)}}
                        >
                            {(formikProps) => (
                                <View>
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
                                    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end'}}>
                                        <TouchableOpacity 
                                            style={[styles.addFoodBubble, styles.addFoodButton, {backgroundColor:'maroon',height: 65, width: 65, }]}
                                            onPress={() => setFoodModalVisible(!foodModalVisible)}
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={ingModalVisible}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.titleText}>Add Ingredient</Text>
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
                                            onPress={() => setIngModalVisible(!ingModalVisible)}
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