import React, { Component } from 'react';

import {

ImageBackground,

StyleSheet,

Text,

View,

Image,

StatusBar ,

TouchableOpacity,

ScrollView,

SafeAreaView

} from 'react-native';



import { bg2, logo } from '../../assets'

import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiserver, suballmov, token,ufo} from '../../Valiable'

function handleErrors(response) {
        //DialogProgress.hide()
        console.log(response)
        if (!response.ok) {      
            //Alert.alert('Informasi', "Kesalahan saat Login, Periksa username atau password");
        } else {
          //  console.log(hasil);
            return response.json();
        }
    }


export default class Profile extends Component {

        constructor(props) {
                super(props);  
                this.state = {
                    isFetchSuccess: false,
                    isFetchSuccess2: false,
                    isFetchSuccess3: false,
                    dataLempar:'dilempar',
                    apiResult : [],
                    dataarray : ['test5','testtest'],
                    dataku: [],
                    dataku2: [],
                    dataku3: [],
                    dataku4:"",
                    objku:"",
                    screenWidth: "", screenHeight: "",
                };
        
            }

componentDidMount=()=>{
        this.getMyStringValue('token')
        //this.loadAll()
        
}

getMyStringValue = async (key) => {
        try {
                const val = await AsyncStorage.getItem('token')
                console.log(val)
                this.loadAll(val)
        } catch(e) {
          // read error
        }
      
        console.log('Done.')
      
      }

loadAll(tokennya){


        //DialogProgress.show(options)
        //console.log(this.state.username)
        fetch(apiserver+ufo, {
            method: 'GET',
            headers: {
                'Authorization': 'bearer '+tokennya
            }
        })
        .then(handleErrors)
            .then((obj) => {
                try{
                if (obj.userId) {
                        this.setState({
                                isFetchSuccess: true,
                                objku: obj
                            })
                    console.log(obj.userId)
                    //AsyncStorage.setItem(LOCAL_USER_ID, obj.data.userId.toString());
                    //Actions.home();

                } else {
                    //Alert.alert('Login Gagal', 'obj.message.toString()');
                }}
                catch{

                    //Alert.alert('Informasi', "Tidak Dapat Tersambung Dengan Server");
                }
            }).catch((error) => {
             console.error(error);
             //doLogin()
            //Alert.alert('Informasi', "Kesalahan saat Login");
        });

    }

removeValue = async () => {
        try {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('logined')
        this.props.navigation.replace('Login')
        } catch(e) {
                  console.log(e)
        }           
        console.log('Done.')
        }

render() {

return(
<SafeAreaView style={{backgroundColor: '#210200',flex:1}}>
<View style={{height: 45, backgroundColor: 'rgba(255,0,0,0)',justifyContent: 'center',flexDirection: 'row' ,}}>
                <Image  style={{width:135, height: 40,marginTop:15}}
source={logo}/>
                    </View>

            <View style={{flex: 1, flexDirection: 'column' ,justifyContent: 'flex-start',
            alignItems: 'center',marginTop:50}}>

<Icon  name={'user-circle'} size={100} color={'white'}/>
<Text style={styles.logoText}>{this.state.objku.userName} </Text>
<Text style={styles.logoText}>{this.state.objku.userEmail} </Text>
<Text style={styles.logoText}>{this.state.objku.userPhone} </Text>
<TouchableOpacity
style={styles.button2}
><Text style={styles.signupText}></Text></TouchableOpacity>

<TouchableOpacity
style={styles.button}
onPress={() => this.removeValue()}
><Text style={styles.signupText}></Text></TouchableOpacity>
            </View>
            </SafeAreaView>


)

}

}



const styles = StyleSheet.create({

container : {

backgroundColor:'white',

flex: 1,

alignItems:'center',

justifyContent :'center'

},
button: {
        alignItems: "center",
        backgroundColor: "#FF000000",
        padding: 10,
        marginTop:5
      },

      button2: {
        alignItems: "center",
        backgroundColor: "#FF000000",
        padding: 10,
        marginTop:5
      },

signupTextCont : {

flexGrow: 1,

alignItems:'flex-end',

justifyContent :'center',

paddingVertical:16,

flexDirection:'row'

},

signupText: {

color:'rgba(255,255,255,1)',

fontSize:18

},

signupButton: {

color:'#ffffff',

fontSize:16,

fontWeight:'500',

},

logoText : {

marginVertical: 15,

fontSize:18,

color:'rgba(255, 255, 255, 1)'

}

});
