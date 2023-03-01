import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { stylescss } from '../../Styless'

const TabItem = ({isFocused,onPress,onLongPress,label}) => {
    const Iscon = () => {
        if(label == "Home") return isFocused ? <Icon name={'home'} size={16} color='#ffffff'></Icon> : <Icon name='home' size={16} color='#808080'></Icon>
  
        if(label == "Last Watch") return isFocused ? <Icon name={'history'} size={16} color='#ffffff'></Icon> : <Icon name='history' size={16} color='#808080'></Icon>
  
        if(label == "Profile") return isFocused ? <Icon name={'user'} size={16} color='#ffffff'></Icon> : <Icon name='user' size={16} color='#808080'></Icon>

        if(label == "Menu") return isFocused ? <Icon name={'bars'} size={16} color='#ffffff'></Icon> : <Icon name='bars' size={16} color='#808080'></Icon>

        if(label == "Search") return isFocused ? <Icon name={'search'} size={16} color='#ffffff'></Icon> : <Icon name='search' size={16} color='#808080'></Icon>

        if(label == "My List") return isFocused ? <Icon name={'film'} size={16} color='#ffffff'></Icon> : <Icon name='film' size={16} color='#808080'></Icon>
  
        return <Icon name={'home'} size={16} color='#ffffff'></Icon>
    }
    return (
        <TouchableOpacity
              onPress={onPress}
              onLongPress={onLongPress}
              style={stylescss.centerMid}
            >
                <Iscon />
              <Text style={{ color: isFocused ? '#ffffff' : '#808080' }}>
                {label}
              </Text>
            </TouchableOpacity>
    )
}

export default TabItem

const styles = StyleSheet.create({})
