import React, {Component} from 'react'
import { ScrollView, Text, SafeAreaView,ImageBackground, View,FlatList,TouchableOpacity,Image,ActivityIndicator, } from 'react-native'
import { bg2, logo } from '../../assets'
import { FlatlistMov, FlatlistVer, HeaderTop } from '../../components'
import {stylescss} from '../../Styless'
import {apiserver, subhistory, token,userid} from '../../Valiable'
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
    
    
    
    export default class History extends Component {
        
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
        
        getScreenSize = () => {  
            const screenWidth = Math.round(Dimensions.get('window').width);  
            const screenHeight = Math.round(Dimensions.get('window').height);  
            this.setState({ screenWidth: screenWidth, screenHeight: screenHeight })  
            }
    
        loadAll(){
            fetch(apiserver+subhistory, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'bearer '+token,
                    'X-User-Id': userid,
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

        pindah=(navigation)=>{
            
            {navigation.navigate('Login')}
        }
    
        render() {
            const { navigation } = this.props;

            return(
                <SafeAreaView style={{backgroundColor: '#210200',flex:1}}>
             

                        <View style={{flex:1,height: 50,position:'absolute',right:5}}>{this.state.isFetchSuccess == false ? <ActivityIndicator size="large" color="rgba(255,255,255,0.7)"/> : null}</View>

            <ScrollView style={{backgroundColor: 'rgba(0,0,0,0.3)'}}>
            <View style={{height: 75, backgroundColor: 'rgba(255,0,0,0)',justifyContent: 'flex-start',flexDirection: 'row' ,}}>
                    
                    <View><Image style={stylescss.imageLogoTop}source={logo}/>
                                </View></View>
                <View style={{flex: 1, flexDirection: 'column' ,justifyContent: 'center',
                alignItems: 'stretch',}}>
                    {this.state.isFetchSuccess == true && this.state.dataku.length != 0 ? <FlatlistVer lempar={this.state.dataku} judul={'Last Watch'} nav={navigation}/> : null}
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