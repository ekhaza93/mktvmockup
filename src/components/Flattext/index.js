import React, { Component } from 'react'
import { FlatList, Text, View,TouchableOpacity,Image } from 'react-native'
import { logo,imgc } from '../../assets'
import {stylescss} from '../../Styless'

export default class Flattext extends Component {

    render() {
        const {nav} =this.props
        return (
            <View>
                <View style={{height: 35, justifyContent: 'center',backgroundColor: 'rgba(0,0,0,0.2)'}}><Text style={stylescss.txtexa}>{this.props.judul}</Text></View>
                <FlatList data={this.props.lempar} renderItem={
                    ({item, index, separators}) =>
                    <TouchableOpacity onShowUnderlay={separators.highlight} style={{flex:1}}
                    onHideUnderlay={separators.unhighlight} 
                        key={index} onPress={() =>{nav.replace('Genreshow',{kat:item.genreName})}}>
                        <View style={stylescss.flatListItem}>
                        <View style={{flex: 1, flexDirection: 'column',justifyContent: 'center',
            alignItems: 'center',}}>
                <Text style={stylescss.txtttA} >{item.genreName}</Text>
                </View>
                        </View>
                       </TouchableOpacity>
                } horizontal={false} numColumns={1}></FlatList>
            </View>
        )
    }
}
