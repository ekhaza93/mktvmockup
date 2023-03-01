import React, {Component} from 'react'
import { Alert,ScrollView, Text, SafeAreaView,ImageBackground, View,FlatList,TouchableOpacity,Image,ActivityIndicator,StatusBar } from 'react-native'
import { bg2, logo } from '../../assets'
import { FlatlistMov, Flatbunder, Justone } from '../../components'
import Icon from 'react-native-vector-icons/FontAwesome5';
import {stylescss} from '../../Styless'
import {apiserver, newbrand, suballmov, token} from '../../Valiable'
import Orientation from 'react-native-orientation';
import AsyncStorage from '@react-native-async-storage/async-storage'
import Spinner from 'react-native-loading-spinner-overlay';

import RNEmulatorCheck from 'react-native-emulator-check';
    function handleErrors(response) {
        if (!response.ok && response.status == 401) {
            return response.json();
        } else if (!response.ok && response.status != 401)  {
            throw Error(response.statusText);
        } else {
            return response.json();
        }
    }

    export default class Home extends Component {
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
                spinner: false,
                emu: false
            };
    
        }
        getScreenSize = () => {  
            const screenWidth = Math.round(Dimensions.get('window').width);  
            const screenHeight = Math.round(Dimensions.get('window').height);  
            this.setState({ screenWidth: screenWidth, screenHeight: screenHeight })  
            }
    
        loadAll(){
            fetch(apiserver+suballmov, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer '+token,
                    //'X-User-Id': LOCAL_USER_ID,
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

        loadNew(){
            fetch(apiserver+newbrand, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer '+token,
                    //'X-User-Id': LOCAL_USER_ID,
                },
            })
                .then(handleErrors)
                .then((obj) => {
                    if (obj.status) {
                        debugger
                        this.setState({
                            isFetchSuccess2: true,
                            dataku2: obj.data
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

        UNSAFE_componentWillMount=()=>{

            this.setState({
                emu:RNEmulatorCheck.isEmulator()
            })
            
            Orientation.lockToPortrait();
            StatusBar.setHidden(false);
            const val = AsyncStorage.getItem('token');
            console.log(val);
            this.loadhere()
        }
    
        loadhere=()=>{
        {this.loadAll()}
        {this.loadNew()}
        console.log('emuhome'+this.state.emu);
        }

        pindah=(navigation)=>{
            
            {navigation.navigate('Login')}
        }

        stloading=()=>{

        }
    
        render() {
            const { navigation } = this.props;

            return(
                <SafeAreaView style={{backgroundColor: '#210200',flex:1}}>
        {this.state.isFetchSuccess == false ?<Spinner
          visible={true}
          textContent={'Loading...'}
          textStyle={stylescss.spinnerTextStyle}
        />:<Spinner
        visible={false}
        textContent={'Loading...'}
        textStyle={stylescss.spinnerTextStyle}/>}

            <ScrollView style={{backgroundColor: 'rgba(0,0,0,0.3)'}}>
            <View style={{height: 75, backgroundColor: 'rgba(255,0,0,0)',justifyContent: 'flex-start',flexDirection: 'row' }}>                   
            <View style={{flex:3}}>
            <Image style={stylescss.imageLogoTop}
    source={logo}/>
                        </View>
                        <View style={{flex:1}}><TouchableOpacity style={{marginVertical:20}} onPress={() =>{navigation.navigate('Allmovie')}}><Text style={{color:'white',fontSize:18}}> MyList</Text></TouchableOpacity></View>
                        <View style={{flex:1.5}}><TouchableOpacity style={{marginVertical:20}} onPress={() =>{navigation.navigate('Pickgenre')}}><Text style={{color:'white',fontSize:18}}> Genres <Icon name='chevron-down' style={{color:'white',fontWeight:'bold',fontSize:12}}></Icon> </Text></TouchableOpacity></View>
                        </View>
               <View style={{flex: 1, flexDirection: 'column' ,justifyContent: 'center', alignItems: 'stretch'}}>
                    {this.state.emu==true?<Text style={{backgroundColor:'white'}}>Emulator Detected</Text>:<Text style={{backgroundColor:'white'}}>Phone Detected</Text>}
                    {this.state.isFetchSuccess == true && this.state.dataku2.length != 0 ? <Flatbunder lempar={this.state.dataku2} judul={'New Movie Preview'} nav={navigation}/> : null}
                    {this.state.isFetchSuccess == true && this.state.dataku.length != 0 ? <FlatlistMov lempar={this.state.dataku} judul={'All Action'} nav={navigation}/> : null}
                    {this.state.isFetchSuccess == true && this.state.dataku.length != 0 ? <FlatlistMov lempar={this.state.dataku} judul={'All General'} nav={navigation}/> : null}
                    {this.state.isFetchSuccess == true && this.state.dataku.length != 0 ? <FlatlistMov lempar={this.state.dataku} judul={'Top Rate'} nav={navigation}/> : null}
                </View>
                </ScrollView>
                </SafeAreaView>)
            
            }
    
            renderSeparator = () => {
                return (
                    <View style={{height: 3, flex: 1, backgroundColor: 'black'}}/>
                );
            }
    
    }
