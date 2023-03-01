import React, {Component} from 'react'
import { ScrollView, Text,TextInput, SafeAreaView,ImageBackground, View,FlatList,TouchableOpacity,Image,ActivityIndicator, } from 'react-native'
import { bg2, logo } from '../../assets'
import { FlatlistMov, FlatlistVer, HeaderTop } from '../../components'
import {stylescss} from '../../Styless'
import {apiserver, suballmov, token,subsearch} from '../../Valiable'
import Orientation from 'react-native-orientation';

import Icon from 'react-native-vector-icons/AntDesign';


    function handleErrors(response) {
        if (!response.ok && response.status == 401) {
            return response.json();
        } else if (!response.ok && response.status != 401)  {
            throw Error(response.statusText);
        } else {
            return response.json();
        }
    }
    
    
    
    export default class Search extends Component {
        
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
                screenWidth: "", 
                screenHeight: "",
                search:'',
            };
    
        }
    
        loadAll(){
            fetch(apiserver+suballmov, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer '+token,
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
                    } else {
                        Alert.alert('Informasi', obj.message);
                    }
                }).catch((error) => {
                Alert.alert('Informasi', 'Tidak Dapat Terambung Dengan Server');
            })
        }

        UNSAFE_componentWillMount=()=>{
            this.loadhere()
        }
        loadsearch(){
            this.setState({
                isFetchSuccess: false
            })
            fetch(apiserver+subsearch+'movieName==*'+this.state.search.replace(' ','_')+'*,genreName==*'+this.state.search.replace(' ','_')+'*', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer '+token,
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
                        console.log(this.state.dataku)
                    } else {
                        Alert.alert('Informasi', obj.message);
                    }
                }).catch((error) => {
                Alert.alert('Informasi', 'Tidak Dapat Terambung Dengan Server');
            })
        }

        loadhere=()=>{
        {this.loadAll()}
        }

        pindah=(navigation)=>{
            
            {navigation.navigate('Login')}
        }
    
        render() {
            const { navigation } = this.props;

            return(
                <SafeAreaView style={{backgroundColor: '#210200',flex:1}}>
                        <View style={{flex:1,height: 50,position:'absolute',right:5}}>{this.state.isFetchSuccess == false ? <ActivityIndicator size="large" color="rgba(255,255,255,0.7)"/> : null}</View>
                        

            <ScrollView style={{backgroundColor: 'rgba(0,0,0,0.3)'}}>
                <View style={{flex: 1, flexDirection: 'column' ,justifyContent: 'center',
                alignItems: 'stretch',}}>

            <View style={{height:50, backgroundColor: 'rgba(0,0,0,0.4)',justifyContent: 'center',flexDirection: 'row' ,}}>
                <TextInput style={stylescss.inputBox}
underlineColorAndroid='rgba(0,0,0,0)'
placeholder="Search Film"
placeholderTextColor = "#ffffff"
selectionColor="#fff"
keyboardType="email-address"
onChangeText={(val)=>this.setState({search:val})}
onSubmitEditing={()=> this.loadsearch()}
/>
<TouchableOpacity style={{flex:1,justifyContent: 'center',marginVertical: 10,marginHorizontal:10,}} onPress={() => this.loadsearch()}><Icon name='search1' size={30} color='rgba(255,255,255,0.6)'/></TouchableOpacity>

                </View>
                    {this.state.isFetchSuccess == true && this.state.dataku.length != 0 ? <FlatlistVer lempar={this.state.dataku} judul={'Result'} nav={navigation}/> : null}
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