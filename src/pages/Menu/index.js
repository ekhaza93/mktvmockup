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


export default class Menu extends Component {

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
    const { navigation } = this.props;
return(
<SafeAreaView style={{backgroundColor: '#210200',flex:1}}>
<View style={{height: 45, backgroundColor: 'rgba(255,0,0,0)',justifyContent: 'center',flexDirection: 'row' ,}}>
                <Image  style={{width:135, height: 40,marginTop:15}}
source={logo}/>
                    </View>

            <View style={{flex: 1, flexDirection: 'column' ,justifyContent: 'flex-start',marginTop:25,marginLeft:10,
            alignItems: 'flex-start',}}>
<View style={{ flexDirection: 'row' ,justifyContent: 'flex-start',marginTop:25,
            alignItems: 'flex-start', backgroundColor: 'rgba(255,0,0,0)',}}>
<Icon style={{padding:5}}  name={'user-circle'} size={100} color={'white'}/>
<View ><Text style={styles.logoText}>{this.state.objku.userName} </Text>
<TouchableOpacity
style={styles.buttonp}
onPress={() => navigation.navigate('Profile')}
><Text style={styles.signupText}>View Profile</Text></TouchableOpacity></View>

</View>

<View style={{marginTop:20}}>
<TouchableOpacity
style={styles.button}
//onPress={() => this.removeValue()}
><Text style={styles.signupText}>Menu 1</Text></TouchableOpacity>
<TouchableOpacity
style={styles.button}
//onPress={() => this.removeValue()}
><Text style={styles.signupText}>Menu 2</Text></TouchableOpacity>
<TouchableOpacity
style={styles.button}
//onPress={() => this.removeValue()}
><Text style={styles.signupText}>Menu 3</Text></TouchableOpacity>
<TouchableOpacity
style={styles.button}
//onPress={() => this.removeValue()}
><Text style={styles.signupText}>Menu 4</Text></TouchableOpacity>
<TouchableOpacity
style={styles.button}
//onPress={() => this.removeValue()}
><Text style={styles.signupText}>Menu 5</Text></TouchableOpacity>
    <TouchableOpacity
style={styles.button}
onPress={() => this.removeValue()}
><Text style={styles.signupText}>Keluar</Text></TouchableOpacity></View>

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
        alignItems:"flex-start",
        backgroundColor: "#FF000000",
        padding: 10,
        marginLeft:10
      },

      buttonp: {
        alignItems: "center",
        backgroundColor: "#FF000000",
        paddingLeft: 10
      },

      button2: {
        alignItems: "center",
        backgroundColor: "#FF0000",
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
paddingLeft:10,
fontSize:18,

color:'rgba(255, 255, 255, 1)'

}

});
