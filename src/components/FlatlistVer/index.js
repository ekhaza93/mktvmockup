import React, { Component } from 'react'
import { FlatList, Text, View,TouchableOpacity,Image } from 'react-native'
import { logo,imgc } from '../../assets'
import {stylescss} from '../../Styless'

export default class FlatlistVer extends Component {

    render() {
        const {nav} =this.props
        return (
            <View>
                <View style={{height: 35, justifyContent: 'center',backgroundColor: 'rgba(0,0,0,0.2)'}}><Text style={stylescss.txtexa}>{this.props.judul}</Text></View>
                <FlatList data={this.props.lempar} renderItem={
                    ({item, index, separators}) =>
                    <TouchableOpacity onShowUnderlay={separators.highlight} style={{flex:1/3}}
                    onHideUnderlay={separators.unhighlight} 
                        key={index} onPress={() =>{nav.navigate('PreviewMovie',{lempar:this.props.lempar,kat:this.props.judul,listitem:item})}}>
                        <View style={stylescss.flatListItem}>
                        <View style={{flex: 1, flexDirection: 'column',justifyContent: 'center',
            alignItems: 'center',}}>
                            <View style={stylescss.imgfli}>
                        <Image  style={stylescss.imgfl}
    
    source={{uri:item.movieMediaThumbnailUrl}}/> 
    </View>
    <View style={{flex: 1,position:'absolute', bottom:5}}>
                <Text style={stylescss.txttt} >{item.movieName} ({item.movieYear})</Text>
                </View>
                </View>
                        </View>
                       </TouchableOpacity>
                } horizontal={false} numColumns={3}></FlatList>
            </View>
        )
    }
}
