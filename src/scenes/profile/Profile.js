import React,{Component} from 'react';
import {View,Text} from 'react-native';

export default class Profile extends Component {
    render(){
        const {navigation} = this.props;
        return(
            <View>
                <Text>{"profile!"}</Text>
            </View>
        )
    }
}
