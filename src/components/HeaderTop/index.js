import React from 'react'
import { View, Text,Image } from 'react-native'
import { logo } from '../../assets'
import {stylescss} from '../../Styless'

const HeaderTop = () => {
    return (
        <View>
            <Image source={logo} style={stylescss.imageLogoTop}></Image>
        </View>
    )
}

export default HeaderTop
