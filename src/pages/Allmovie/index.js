import React, {Component} from 'react'
import { ScrollView, Text, SafeAreaView,ImageBackground, View,FlatList,TouchableOpacity,Image,ActivityIndicator, } from 'react-native'
import { bg2, logo } from '../../assets'
import { FlatlistMov, FlatlistVer, HeaderTop } from '../../components'
import {stylescss} from '../../Styless'
import {apiserver, mylist, suballmov, token, userid,ufo} from '../../Valiable'
import Orientation from 'react-native-orientation';
import AsyncStorage from '@react-native-async-storage/async-storage';


    function handleErrors(response) {
        if (!response.ok && response.status == 401) {
            return response.json();
        } else if (!response.ok && response.status != 401)  {
            throw Error(response.statusText);
        } else {
            return response.json();
        }
    }
    
    export default class Allmovie extends Component {
        
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
                screenWidth: "", screenHeight: "",
                toked:"",
                objku:""
            };
    
        }

        getMyStringValue = async (key) => {
            try {
                    const val = await AsyncStorage.getItem('token')
        
                    console.log(val)
                    this.loadinfo(val)
                    this.setState({
                        toked: val
                    })
            } catch(e) {
              // read error
            }
          
            console.log('Done.')
          
          }
        
        loadinfo(tokennya){
        
            console.log('here')
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
                                    isFetchSuccess: false,
                                    objku: obj
                                })
                        console.log(obj.userId)
            //const { navigation,route } = this.props;
            this.loadAll(obj.userId,this.state.toked)
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


        loadAll(usid,toked){
            console.log(usid)
            fetch(apiserver+mylist, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer '+toked,
                    'X-User-Id': usid,
                },
            })
                .then(handleErrors)
                .then((obj) => {
                    if (obj.status) {
                        debugger
                        this.setState({
                            isFetchSuccess: true,
                            dataku: obj.data
                        })
                        //console.log('tenggelam')
                        //console.log(this.state.dataku)
                    } else {
                        Alert.alert('Informasi', obj.message);
                    }
                }).catch((error) => {
                Alert.alert('Informasi', 'Tidak Dapat Terambung Dengan Server');
            })
        }
    
        componentDidMount(){
            this.getMyStringValue('token')           
        }
    
        loadhere=()=>{
      
        }
    
        render() {
            const { navigation } = this.props;

            return(
                <SafeAreaView style={{backgroundColor: '#210200',flex:1}}>
            <ScrollView style={{backgroundColor: 'rgba(0,0,0,0.3)'}}>
            <View style={{height: 75, backgroundColor: 'rgba(255,0,0,0)',justifyContent: 'flex-start',flexDirection: 'row' ,}}>                   
                    <Image  style={stylescss.imageLogoTop}
    source={logo}/></View>
            <View style={{flex:1,height: 50,position:'absolute',right:5}}>{this.state.isFetchSuccess == false ? <ActivityIndicator size="large" color="rgba(255,255,255,0.7)"/> : null}</View>
                <View style={{flex: 1, flexDirection: 'column' ,justifyContent: 'center',
                alignItems: 'stretch',}}>
                    {this.state.isFetchSuccess == true && this.state.dataku.length != 0 ? <FlatlistVer lempar={this.state.dataku} judul={'My List'} nav={navigation}/> : null}
                </View>
                </ScrollView>
                </SafeAreaView>
            )
            
            }
    
            renderSeparator = () => {
                return (
                    <View style={{height: 3, flex: 1, backgroundColor: 'black'}}/>
                );
            }
    
    }