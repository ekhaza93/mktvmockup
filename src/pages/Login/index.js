import React, { Component } from 'react'
import {Alert,StyleSheet,Text,View,TextInput, SafeAreaView,TouchableOpacity, Image , Linking } from 'react-native'
import {stylescss} from '../../Styless'
import { bgsplash, logo } from '../../assets'
import {apiserver, suballmov, token,loginurl} from '../../Valiable'

import DialogProgress from 'react-native-dialog-progress'
import AsyncStorage from '@react-native-async-storage/async-storage'

function handleErrors(response) {
    DialogProgress.hide()
    //console.log(response.json())
    if (!response.ok) {  
        //let obk='setset';
        return response.json();
        //Alert.alert('Informasi', response.json().error_description.toString());
    } else {
      //  console.log(hasil);
        return response.json();
    }
}
const options = {
    title:"Loading",
    message:"Please wait!",
    isCancelable:true
}

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
        username:'',
        password:''
    };}

    storeData = async (value) => {
        try {
          await AsyncStorage.setItem('logined', value)
        } catch (e) {
          // saving error
        }
      }

    doLogin() {
        DialogProgress.show(options)
        console.log(this.state.username)
        fetch(apiserver+loginurl+"username="+this.state.username+"&password="+this.state.password,{
            method: 'POST',
            headers: {
                'Authorization': 'Basic dGVzdGp3dGNsaWVudGlkOlhZN2ttem9OemwxMDA='
            }
        })
        .then(handleErrors)
            .then((obj) => {
                try{
                if (typeof obj.access_token!== 'undefined') {
                    //console.log(obj.access_token)
                    Alert.alert('Login Sukses', 'ok');
                    AsyncStorage.setItem('token',obj.access_token.toString());
                    this.storeData('lgin');
                  this.props.navigation.replace('Main')
                } else {
                    Alert.alert('Login Failed', obj.error_description.toString());
                    
                }}
                catch{

                    Alert.alert('Informasi', "Tidak Dapat Tersambung Dengan Server");
                }

            }).catch((error) => {
             console.error(error);
             //doLogin()
            Alert.alert('Informasi', "Kesalahan saat Login");
        });
    }

    doInfo(){

    }

    render(){
    return (
        <SafeAreaView style={{backgroundColor: '#210200',flex:1}}>
                <View style={{flex:1,justifyContent:'center',alignItems: 'center' }}>
                <Image  style={stylescss.imageLogoTop}
source={logo}/>

<TextInput style={styles.inputBox}

underlineColorAndroid='rgba(0,0,0,0)'

placeholder="Email"

placeholderTextColor = "#ffffff"

selectionColor="#fff"

onChangeText={(val)=>this.setState({username:val})}

onSubmitEditing={()=> this.password.focus()}

/>

<TextInput style={styles.inputBox}

underlineColorAndroid='rgba(0,0,0,0)'

placeholder="Password"

secureTextEntry={true}

placeholderTextColor = "#ffffff"

on

onChangeText={(val)=>this.setState({password:val})}

ref={(input) => this.password = input}

/>
<TouchableOpacity style={styles.button} onPress={()=>this.doLogin()}>
<Text style={styles.buttonText}>Login</Text>

</TouchableOpacity>

<TouchableOpacity style={styles.button} onPress={ ()=>{ Linking.openURL('https://mktv.id/freetrial')}}>
<Text style={styles.buttonText}>SignUp</Text>

</TouchableOpacity>

</View>          
    </SafeAreaView>
    )}
}


const styles = StyleSheet.create({

    container : {
    
    flexGrow: 1,
    
    justifyContent:'center',
    
    alignItems: 'center'
    
    },
    
    
    
    inputBox: {
    
    width:300,
    
    backgroundColor:'rgba(255, 255,255,0.7)',
    
    borderRadius: 5,
    
    paddingHorizontal:16,
    
    fontSize:16,
    
    color:'#000000',
    
    marginVertical: 10
    
    },
    
    button: {
    
    width:300,
    
    backgroundColor:'#ff313a',
    
    borderRadius: 5,
    
    marginVertical: 10,
    
    paddingVertical: 13
    
    },
    
    buttonText: {
    
    fontSize:16,
    
    fontWeight:'500',
    
    color:'#ffffff',
    
    textAlign:'center'
    
    }
    });