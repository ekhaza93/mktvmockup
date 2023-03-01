import React, {Component} from 'react'
import { ScrollView, Text, SafeAreaView,ImageBackground, View,FlatList,TouchableOpacity,Image,ActivityIndicator, } from 'react-native'
import { bg2, logo } from '../../assets'
import { FlatlistMov, FlatlistVer, HeaderTop } from '../../components'
import Icon from 'react-native-vector-icons/FontAwesome5';
import {stylescss} from '../../Styless'
import {apiserver, suballmov,subsearch, token} from '../../Valiable'
import Orientation from 'react-native-orientation';


    function handleErrors(response) {
        if (!response.ok && response.status == 401) {
            return response.json();
        } else if (!response.ok && response.status != 401)  {
            throw Error(response.statusText);
        } else {
            return response.json();
        }
    }
    
    export default class Genreshow extends Component {
        
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
            };
    
        }

        loadAll(){

            const { navigation,route } = this.props;
            fetch(apiserver+subsearch+'genreName==*'+route.params.kat.replace(' ','_')+'*', {
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
            this.loadhere()
        }
    
        loadhere=()=>{
        {this.loadAll()}
        }
    
        render() {
            const { navigation,route } = this.props;

            return(
                <SafeAreaView style={{backgroundColor: '#210200',flex:1}}>
            <ScrollView style={{backgroundColor: 'rgba(0,0,0,0.3)'}}>
            <View style={{height: 75, backgroundColor: 'rgba(255,0,0,0)',justifyContent: 'flex-start',flexDirection: 'row' ,}}>                   
                    <Image  style={stylescss.imageLogoTop}
    source={logo}/></View>
            <View style={{flex:1}}><TouchableOpacity style={{marginVertical:20}} onPress={() =>{navigation.navigate('Pickgenre')}}><Text style={{color:'white',fontSize:18}}> Genres  <Icon name='chevron-down' style={{color:'white',fontWeight:'bold',fontSize:12}}></Icon> </Text></TouchableOpacity></View>
                <View style={{flex: 1, flexDirection: 'column' ,justifyContent: 'center',
                alignItems: 'stretch',}}>
                    {this.state.isFetchSuccess == true && this.state.dataku.length != 0 ? <FlatlistVer lempar={this.state.dataku} judul={route.params.kat} nav={navigation}/> : null}
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