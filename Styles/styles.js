import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#D2691E',
      alignItems: 'center',
      justifyContent: 'flex-start',
      paddingTop: 20,
      paddingBottom: 5,
      paddingLeft: 5,
      paddingRight: 5,
      borderWidth: 1
    },
    titleText: {
      color: '#FFEBCD',
      fontSize: 36,
      marginBottom: 8,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
      letterSpacing: 3
    },
    addFoodContainer: {
      flex: 1/4, 
      flexDirection: 'row', 
      justifyContent: 'flex-end', 
      alignItems: 'flex-end', 
      width: '100%',
      height: 50,
      paddingHorizontal: 18,
      paddingVertical: 12,
      marginTop: 15,
    },
    addFoodButton: {
      height: 75,
      width: 75,
      alignItems: 'center',
      marginHorizontal: 5,
      justifyContent: 'center',
    },
    addFoodBubble: {
      zIndex: 2,
      position: 'absolute',
      backgroundColor: '#FF7F50',
      paddingHorizontal: 18,
      paddingVertical: 12,
      borderRadius: 50,
      borderWidth: 1,
      alignItems: 'center',
      borderColor: '#A52A2A',
      textDecorationColor: '#edede8', 
      textDecorationStyle: 'solid',
      opacity: 0.9,
      shadowColor: "#000",
      shadowOffset: {
        width: 5,
        height: 2
      },
      shadowOpacity: 0.5,
      shadowRadius: 13,
      elevation: 8
    },
    addFoodText: {
      color: '#FFEBCD',
      fontSize: 56
    },
    addItemContainer: {
      flex: 0.1, 
      flexDirection: 'row', 
      justifyContent: 'space-around', 
      alignItems: 'center', 
      width: '100%',
      height: 50,
      paddingHorizontal: 18,
      paddingVertical: 12,
      marginTop: 15,
      marginBottom: 15
    },
    addFoodBubble: {
      zIndex: 2,
      position: 'relative',
      backgroundColor: '#FF7F50',
      paddingHorizontal: 18,
      paddingVertical: 12,
      borderRadius: 50,
      borderWidth: 1,
      alignItems: 'center',
      borderColor: '#A52A2A',
      textDecorationColor: '#edede8', 
      textDecorationStyle: 'solid',
      opacity: 0.9,
      shadowColor: "#000",
      shadowOffset: {
        width: 5,
        height: 2
      },
      shadowOpacity: 0.5,
      shadowRadius: 13,
      elevation: 8
    },
    textIn: {
      borderWidth: 1,
      borderColor: 'black',
      width: 150,
      alignItems: 'center',
      justifyContent: 'space-around',
      fontSize: 16,
      color: 'black',
      opacity: 0.8,
      paddingLeft: 4,
      marginVertical: 5,
      borderRadius: 5
    },
    listItem: {
      zIndex: 1,
      position:'relative',
      paddingHorizontal: 5,
      paddingVertical: 2,
      borderWidth:1,
      borderColor: '#A52A2A',
      marginTop: 2,
      marginBottom: 2,
      backgroundColor: '#DEB887',
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.3,
      shadowRadius: 6,
      elevation: 2,
      borderRadius: 5
    },
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      borderWidth: 1,
      borderColor: '#A52A2A',
      position: 'absolute',
      margin: 20,
      backgroundColor: '#DEB887',
      borderRadius: 15,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    textStyle: {
      color: "#FFEBCD",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
      color: '#191970',
      fontSize: 28,
      letterSpacing: 1
    },
    addNewFoodForm: {
      position: 'relative',
      alignItems:'center',
      justifyContent: 'center',
      borderColor:'#A52A2A', 
      borderWidth:1,
      backgroundColor: '#DEB887',
      padding: 8,
      borderRadius: 5,
      width:'80%',
      height: '80%'
    },
    smallerTitle: {
      fontSize:18, 
      margin: 2, 
      justifyContent: 'flex-start', 
      width: '80%', 
      color: 'black', 
      letterSpacing: 1
    },
    baseText: {
      fontSize:12, 
      margin: 2, 
      justifyContent: 'flex-start', 
      width: '80%', 
      color: 'black', 
      letterSpacing: 1
    },
  });