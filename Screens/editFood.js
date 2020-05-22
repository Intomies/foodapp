import React, { useState, useEffect } from 'react';
import firebase from '../API/firebaseConfig.js'

import 
{ 
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    Modal,
    Button,
} from 'react-native';

import { styles } from '../Styles/styles.js'
import { Formik } from 'formik'



export default function EditFoodDetails(props) {
    
    const {navigate} = props.navigation
    const foodId = props.route.params.id;
    const [ingredients, setIngredients] = useState([])
    const [modalVisible, setModalVisible] = useState(false);
    const [eatCounter, setEatCounter] = useState(0)
    const [food, setFood] = useState({})
    const [name, setName] = useState('Väärä')
    
    useEffect(() => {
        fetchData();
    },[])

    const fetchData = () => {
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
            props.navigation.goBack()
        }
    
       const getKey = () => {
        let max = 100000
        return Math.floor(Math.random() * Math.floor(max))
        }
    
        _listEmptyComponent = () => {
            return (
                <View>
                    <Text>You haven't added any ingredients yet</Text>
                </View>
            )
        }
    
        const handleIngredients = (values) => {
            setIngredients([...ingredients, values])
        }
        const testX = () => {
            console.log(name)
            setName(food.name)
        }

    return(
        <View style={styles.container}>
            <Button title='test' onPress={testX}></Button>
            <Text>{name}</Text>
            <Formik
                initialValues={{name: name, recipe: '', notes: ''}}
                onSubmit={(values) => {onSubmit(values)}}
            >
                {(formikProps) => (
                    <View>
                        <TextInput
                            placeholder='Food Name'
                            style={styles.textIn}
                            onChangeText={formikProps.handleChange('name')}
                            value={formikProps.values.name}
                        />

                        <TextInput
                            multiline
                            style={styles.textIn}
                            placeholder='Recipe'
                            onChangeText={formikProps.handleChange('recipe')}
                            value={formikProps.values.recipe}
                        />

                        <TextInput
                            multiline
                            style={styles.textIn}
                            placeholder='Notes'
                            onChangeText={formikProps.handleChange('notes')}
                            value={formikProps.values.notes}
                        />
                        <Button title='add ingredient' color='darkblue' onPress={() => setModalVisible(true)}/>
                        <Button title='add' color='maroon' onPress={formikProps.handleSubmit}/>
                    </View>
                    
                )}
            </Formik>
            <FlatList style={{borderWidth:1, height:10}}
                        keyExtractor={key => getKey().toString()}
                        data={ingredients}
                        ListEmptyComponent={_listEmptyComponent}
                        renderItem={({item, key}) =>
                        <View style={{flexDirection: 'column', justifyContent: 'space-evenly'}}>
                            <TouchableOpacity style={styles.listItem}>
                                <Text style={{marginBottom: 2, fontSize: 16, color: 'black', opacity: 0.8}}>{item.ing}</Text>
                                <Text style={{marginBottom: 2, fontSize: 16, color: 'black', opacity: 0.8}}>{item.amount} {item.unit}</Text>
                            </TouchableOpacity>
                        </View>
                        }
                    />
            
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
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
                                        style={styles.textIn}
                                        onChangeText={formikProps.handleChange('ing')}
                                        value={formikProps.values.ing}
                                    />

                                    <TextInput
                                        multiline
                                        style={styles.textIn}
                                        placeholder='Amount'
                                        keyboardType='numeric'
                                        onChangeText={formikProps.handleChange('amount')}
                                        value={formikProps.values.amount}
                                    />

                                    <TextInput
                                        multiline
                                        style={styles.textIn}
                                        placeholder='Unit'
                                        onChangeText={formikProps.handleChange('unit')}
                                        value={formikProps.values.unit}
                                    />
                                    <Button title='add' color='darkblue' onPress={formikProps.handleSubmit}/>
                                    <Button title='close' color='maroon' onPress={() => setModalVisible(!modalVisible)}/> 
                                </View>
                            )}
                        </Formik>
                    </View>
                </View>
            </Modal>
        </View>
        
    )

}