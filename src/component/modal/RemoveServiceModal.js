import React from 'react';
import {Modal,View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import { PURPLE_BACKGROUND, WHITE_COLOR, GRAY_TEXT } from '../../utils/localStorage/colors/Colors';

const REMOVE_TEXT = 'האם אתה בטוח שאתה רוצה למחוק את השירות? ';
const CANCEL_BUTTON_TEXT = 'ביטול';
const REMOVE_BUTTON_TEXT = 'מחק';

const RemoveServiceModal = ({visibleRemoveModal,onCancel,onRemove}) => {
    return(
            <Modal 
                transparent={true}
                visible={visibleRemoveModal}
                animationType={"slide"}>
                <View style={[styles.centeredView]}>
                    <View style={[styles.modalView]}>
                        <Text style={[styles.removeText]}>{REMOVE_TEXT}</Text>
                    <View style={[styles.buttonsView]}>
                        <TouchableOpacity onPress={() => onRemove()} style={[styles.buttonView,styles.acceptButtonView]}>
                           <Text style={[styles.acceptButtonText,styles.buttonText]}>{REMOVE_BUTTON_TEXT}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onCancel()} style={styles.buttonView}>
                            <Text style={[styles.buttonText]}>{CANCEL_BUTTON_TEXT}</Text>
                        </TouchableOpacity>
                    </View>
                    </View>
                </View>
            </Modal>
    )
}

export default RemoveServiceModal;

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      height:200,
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 60,
      alignItems: "center",
      shadowColor: GRAY_TEXT,
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5
    },
    removeText:{
        textAlign: "center",
        fontSize:16
    },
    buttonsView:{
        flexDirection:'row',
        marginVertical:20,
    },
    buttonView:{
        width:80,
        height:35,
        borderRadius:20,
        marginHorizontal:10,
        justifyContent:'center',
        borderWidth:2,
        borderColor:PURPLE_BACKGROUND
    },
    acceptButtonView:{
        backgroundColor:PURPLE_BACKGROUND
    },
    buttonText:{
        fontSize:15,
        textAlign:'center'
    },
    acceptButtonText:{
        color:WHITE_COLOR
    }
  });
  

