import React,{Component} from 'react'
import { Image, ImageBackground, StyleSheet, SafeAreaView } from 'react-native'
import { bgsplash, logo } from '../../assets'
import {stylescss} from '../../Styless'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RNEmulatorCheck from 'react-native-emulator-check';
let aya=""


export default class Splashscreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isFetchSuccess: false,
            emu:false
        };
        
    }

getData = async () => {
   
        try {
            const val = await AsyncStorage.getItem('token')
            console.log(val)
            const { navigation } = this.props;
          const value = await AsyncStorage.getItem('logined')
          if(value !== null) {
            console.log('try')
            console.log(value)
            navigation.replace('Main')
          }else{
            console.log('tryo')
            navigation.replace('Login')
          }
        } catch(e) {
          // error reading value
        }
      }

componentDidMount=()=>{
console.log('hehe')
setTimeout( () => {

    console.log('test');
    console.log('emu'+this.state.emu);
    this.getData();
}, 3000)
}

    render() {
        const {nav} =this.props
        return (
            <SafeAreaView style={stylescss.safestyle}>
            <ImageBackground source={bgsplash} style={stylescss.centerMid}>
                    <Image source={logo} style={stylescss.imageLogo}></Image>
            </ImageBackground>
            </SafeAreaView>
        )
    }
}

