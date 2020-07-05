import React,{Component} from 'react';
import {View,Text,TouchableOpacity} from 'react-native';
import LocalStorage from '../../utils/localStorage/LocalStorage';
import { LOCAL_STORAGE_KEYS } from '../../utils/localStorage/LocalStorageKeys';
import ProfileImage from '../../component/ProfileImage';

export default class Profile extends Component {

    render(){
        const {navigation} = this.props;
        return(
                <ProfileImage/>
            )
    }
}
