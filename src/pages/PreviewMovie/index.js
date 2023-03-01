
import React from 'react'
import { View, Text,TouchableOpacity, Image,ScrollView,SafeAreaView,StyleSheet,Alert } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwe from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {stylescss} from '../../Styless'
import { logo,imgc } from '../../assets'
import { FlatLimit, FlatlistMov,FlatlistVerRec, HeaderTop } from '../../components'
import {apiserver, removelist, token,premov, userid, addlist,ufo} from '../../Valiable'
import Video from 'react-native-video';
import Spinner from 'react-native-loading-spinner-overlay';
import AsyncStorage from '@react-native-async-storage/async-storage';

function handleErrors(response) {
    console.log(response.status)
    if (!response.ok && response.status == 401) {
        
        return response.json();
    } else if (!response.ok && response.status != 401)  {
        throw Error(response.statusText);
    } else {
        return response.json();
    }
}


export default class Player extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            usr:"",
          currentTime: 0,
          duration: 0.1,
          paused: false,
          overlay: true,
          fullscreen: false,
          loading:false,
          isLoading: true,
          isFetchSuccess: false,
          dataku: [],
          like:false,
          dislike:false,
          datafilm:"",
          buyed:false,
          listed:false,
          load:false,
          toked:""
        };
      }

componentDidMount(){
    this.getMyStringValue('token')
    
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

    console.log(tokennya)
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
                            objku: obj,
                            usr:obj.userId

                        })
                console.log(obj.userId)
    const { navigation,route } = this.props;
    this.preview(route.params.listitem.movieId,obj.userId,this.state.toked)
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



      playbtn(navigation,route){
       if (this.state.buyed !== false) {
        navigation.replace('Player',{movieUrl:route.params.listitem.movieMediaUrl,listit:route.params.listitem,judul:route.params.listitem.movieName,idmov:route.params.listitem.movieId})
        }
        else{
            navigation.replace('Player',{movieUrl:route.params.listitem.movieMediaUrl,listit:route.params.listitem,judul:route.params.listitem.movieName,idmov:route.params.listitem.movieId})
            //Alert.alert('Informasi', "Anda belum membeli film ini");
            /*this.setState({buyed:true})*/
        } 
    }

preview = (movId,usid,toked) =>{
    console.log(movId)
    this.setState({
        isFetchSuccess: false,
    })
    fetch(apiserver+premov+movId, {
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
                this.setState({
                    isFetchSuccess: true,
                    datafilm: obj.data,
                    listed:obj.data.myList
                })
                console.log(this.state.datafilm)
            } else {
               
            }
        }).catch((error) => {
        
    })
}

    load = ({  }) => this.setState({ isLoading:false })

    onLoadStart=()=> {
        this.setState({ isLoading:true })
       
      }

    addlist(movId){
   if (this.state.listed!==true) {    
    console.log(this.state.listed+movId)
    fetch(apiserver+addlist+movId, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer '+this.state.toked,
            'X-User-Id': this.state.usr,
        },
    })
        .then(handleErrors)
        .then((obj) => {
            if (obj.status) {
                Alert.alert('Informasi', 'Movie Added');
                this.preview(movId,this.state.usr,this.state.toked)
            } else {
                Alert.alert('Informasi', obj.message);
            }
        }).catch((error) => {
        //Alert.alert('Informasi', 'Tidak Dapat Terambung Dengan Server');
    })}
    else{
        console.log(movId)
        fetch(apiserver+removelist+movId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer '+this.state.toked,
                'X-User-Id': this.state.usr,
            },
        })
            .then(handleErrors)
            .then((obj) => {
                if (obj.status) {
                    Alert.alert('Informasi', 'Movie Removed');
                    this.preview(movId,this.state.usr,this.state.toked)
                } else {
                    Alert.alert('Informasi', obj.message);
                }
            }).catch((error) => {
            //Alert.alert('Informasi', 'Tidak Dapat Terambung Dengan Server');
        })  
    }
    }

    like(movieId){
        Alert.alert('Like', "Like Movie");
        this.setState({
            like: true,
            dislike: false
        })
    }

    dislike(movieId){
        Alert.alert('Dislike', "Dislike Movie");
        this.setState({
            like: false,
            dislike: true
        })
    }

    buy(movieId){
        Alert.alert('Sukses', "Anda berhasil membeli film ini");
        this.setState({buyed:true})
    }

    render () {
        const { navigation,route } = this.props;
    return(
<SafeAreaView style={{flex:1,flexDirection:'column',backgroundColor:'#210200'}}>
    
            <View style={{height:210}}><Video repeat={true} style={{height:210}} resizeMode='cover' source={{uri:'https://api.mktv.id/video-api-film/film/v1/stream/trailer/'+route.params.listitem.movieId}}
                        onLoadStart={this.onLoadStart}
                        onLoad={this.load}
            ></Video>
                        {this.state.isLoading == true || this.state.isFetchSuccess == false ?<Spinner
          visible={true}
          textContent={'Loading...'}
          textStyle={stylescss.spinnerTextStyle}
        />:<Spinner
        visible={false}
        textContent={'Loading...'}
        textStyle={stylescss.spinnerTextStyle}
      />}
            </View>
            
            <TouchableOpacity style={{position:'absolute',right:25,top:25}} onPress={() =>{navigation.goBack()}}>
            <Text style={{color:'white',fontWeight:'bold',fontSize:32,textAlign:'center',}}><Icon name='closecircleo' style={{color:'white',fontWeight:'bold',fontSize:32}}></Icon></Text>
            </TouchableOpacity>
          <ScrollView>

          <Text style={{color:'white',left:10}}> </Text>
    
    <TouchableOpacity style={{...stylescss.buttonplay,alignItems:'center'}} onPress={() =>{this.playbtn(navigation,route)}}><Text style={{color:'black',fontWeight:'bold',fontSize:20,textAlign:'center',}}><FontAwe name='play' style={{color:'black',fontWeight:'bold',fontSize:20}}></FontAwe> Play </Text></TouchableOpacity>
    <Text style={{color:'white',left:10}}> <Text style={{color:'yellow',left:11}}>{this.state.datafilm.reguler!==true?'Premium':'Reguler'}</Text> {route.params.listitem.movieYear}  {route.params.listitem.genreName} {route.params.listitem.ageMin}+ </Text>
    <Text style={{color:'white',left:10,fontWeight:'bold',fontSize:24,marginTop:1}}>{route.params.listitem.movieName}</Text>
    <Text style={{color:'white',left:10}}>{route.params.listitem.movieSinopsis}</Text>
    <Text style={{color:'white',left:10}}> </Text>
    <View style={{flex:1,flexDirection:'row',backgroundColor:'#210200',marginTop:20,marginLeft:20,marginRight:20}}>
        <View style={{flex:1.5,backgroundColor:'#ff020000'}}>
        <TouchableOpacity style={{flex:1,backgroundColor:'#ff020000'}} onPress={() =>{this.addlist(route.params.listitem.movieId)}}><Text style={{color:'white',fontSize:20,textAlign:'left',}}><Entypo name={this.state.listed==true?'check':'add-to-list'} style={{color:'white',fontWeight:'bold',fontSize:20}}></Entypo> My List</Text></TouchableOpacity>
        </View>
        
        <View style={{flex:1.5,flexDirection:'row',backgroundColor:'#ff020000',marginLeft:-30}}>
        <TouchableOpacity style={{flex:1,backgroundColor:'#ff020000'}} onPress={() =>{this.buy(route.params.listitem.movieId)}}><Text style={{color:'white',fontSize:20,textAlign:'left',}}><Icon name='shoppingcart' style={{color:'white',fontWeight:'bold',fontSize:20}}></Icon> Buy </Text></TouchableOpacity>
        </View>

        <View style={{flex:0.75,flexDirection:'row',backgroundColor:'#ff020000',marginLeft:20}}>
        <TouchableOpacity style={{flex:1,backgroundColor:'#ff020000'}} onPress={() =>{this.like(route.params.listitem.movieId)}}><Text style={{color:'white',fontSize:20,textAlign:'center',}}><Icon name={this.state.like==true?'like1':'like2'} style={{color:'white',fontWeight:'bold',fontSize:20}}></Icon> </Text></TouchableOpacity>
        <TouchableOpacity style={{flex:1,backgroundColor:'#ff020000'}} onPress={() =>{this.dislike(route.params.listitem.movieId)}}><Text style={{color:'white',fontSize:20,textAlign:'center',}}><Icon name={this.state.dislike==true?'dislike1':'dislike2'} style={{color:'white',fontWeight:'bold',fontSize:20}}></Icon> </Text></TouchableOpacity>
        </View>

    </View>

    <FlatlistVerRec lempar={route.params.lempar} judul={'Recommendation'} datafilter={route.params.listitem.movieId} nav={navigation}/>
    </ScrollView>
           
        </SafeAreaView>
    );
    
    }

}
    

var styles = StyleSheet.create({
    backgroundVideo: {
      height:200,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
    },
  });
