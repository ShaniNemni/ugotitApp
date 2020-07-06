import React,{Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native';
import ProfileImage from '../../component/profileImage/ProfileImage';
import ErrorDisplay from '../../component/errorDisplay/ErrorDisplay';

export default class Profile extends Component {

    render(){
        const {navigation} = this.props;
        return(
            <View style={styles.profileView}>
                <ProfileImage/>
                <ErrorDisplay errorText={"עליך לבחור תמונה על מנת להתקדם לשלב הבא"}/>
            </View>
          )
    }
}

const styles = StyleSheet.create({
    profileView:{
        height:'100%',
        width:'100%',
    }
})