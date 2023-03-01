import React, { Component } from 'react'
import { FlatList, Text, View,TouchableOpacity,Image } from 'react-native'
import { logo,imgc } from '../../assets'
import {stylescss} from '../../Styless'

export default class Justone extends Component {

    render() {
        const {nav} =this.props
        return (
            <View>
                <FlatList data={this.props.lempar} renderItem={
                    ({item, index, separators}) => (index==0?
                    <TouchableOpacity onShowUnderlay={separators.highlight}
                    onHideUnderlay={separators.unhighlight} 
                        key={index} onPress={() =>{nav.navigate('PreviewMovie',{lempar:this.props.lempar,kat:this.props.judul,listitem:item})}}>
                        <View style={stylescss.flatListItem}>
                        <View style={{flex: 1, flexDirection: 'column',justifyContent: 'center',
            alignItems: 'center',}}>
                            <View style={stylescss.imgfli2}>
                        <Image  style={stylescss.imgfl2}
    
    source={{uri:item.movieMediaThumbnailUrl}}/> 
    </View>
    <View style={{flex: 1,position:'absolute', bottom:5}}>
                <Text style={stylescss.txttt} >{/*item.movieName*/} {/*item.movieYear*/}</Text>
                </View>
                </View>
                        </View>
                       </TouchableOpacity>
                    :null)} horizontal={false} numColumns={1}></FlatList>
            </View>
        )
    }
}
