import {StyleSheet} from 'react-native';
import { max } from 'react-native-reanimated';

export const stylescss=StyleSheet.create(
    {
        safestyle:{
            flex:1
        },
        centerMid:{
            flex:1,
            justifyContent:'center',
            alignItems:'center'
        },  
        centerTop:{
            flex:1,
            justifyContent:'flex-start',
            alignItems:'center'
        },
        contentIsiCenter:{
            justifyContent:'flex-start',
            marginHorizontal:5,
            marginVertical:5
        },
        backstyle:{
            flex:1
        },
        contentstyle:{
            flex:1,
            justifyContent:'center',
            flexDirection:'column',
        },
        imageLogo:{
            height:55,
            resizeMode:'contain'
        },
        imageLogoTop:{
            height:35,
            width:140,
            resizeMode:'contain',
            marginTop:25,
            marginLeft:10
        },
        imageLogoright:{
            height:30,
            resizeMode:'contain',
        },
        buttonTab:{
            flexDirection:'row',
            backgroundColor:'#000000',
            justifyContent:'space-between',
            paddingHorizontal:10,
            paddingVertical:15
        },
        buttonplay:{
            flexDirection:'column',
            borderRadius:5,
            backgroundColor:'#ffffff',
            justifyContent:'center',
            paddingHorizontal:10,
            paddingVertical:5,
            margin:5
        },
        spinnerTextStyle: {
            color: '#FFF'
          },
          judul:{
            backgroundColor:'#FF0000',
            justifyContent:'center'
        },
        container : {   
            backgroundColor:'black',           
            flex: 1,           
            alignItems:'center',
            justifyContent :'center'           
            },
            imgfl:{width:120, height: 160, resizeMode:'cover',borderRadius:5,},
            imgfl2:{width:400, height: 275, resizeMode:'cover',borderRadius:5,},
            imgflbunder:{width:120, height: 120, resizeMode:'cover',borderRadius:120/2},
            txttt : {
                width:100,textAlign:'center',fontSize:11, color:'white',fontWeight:'bold',textShadowColor:'black',textShadowRadius:4
            
            },
            txtttA : {
                width:100,textAlign:'center',fontSize:18, color:'white',fontWeight:'bold',textShadowColor:'black',textShadowRadius:4
            
            },
            txtexa : {
                width:200,textAlign:'left',fontSize:14, padding:10, color:'white',fontWeight:'bold'
                },
                txtexax : {
                    flex:5,width:200,textAlign:'left',fontSize:20, padding:10, color:'white',fontWeight:'bold'
            },
    flatListItem: {
        padding: 10,
        flex:1,
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'stretch',
        elevation: 2,
    },
    imgfli:{
        flex: 1, flexDirection: 'column',justifyContent: 'center',
        alignItems: 'center',
        borderRadius:15,
        borderWidth: 0,
        borderColor: "#f2f5f8",
        shadowOffset: {width: 5, height: 5},
        shadowColor: 'black',
        shadowOpacity: 0.3,
    },
    
    imgfli2:{
        flex: 1, flexDirection: 'column',justifyContent: 'center',
        alignItems: 'center',
        borderRadius:15,
        borderWidth: 0,
        borderColor: "#f2f5f8",
        shadowOffset: {width: 5, height: 5},
        shadowColor: 'black',
        shadowOpacity: 0.3,
    },
    imgflibunder:{
        flex: 1, flexDirection: 'column',justifyContent: 'center',
        alignItems: 'center',
        borderRadius:120/2,
        borderWidth: 2,
        borderColor: "#f2f5f8",
        shadowOffset: {width: 5, height: 5},
        shadowColor: 'black',
        shadowOpacity: 0.3,
    },
    textsis:{

    },
    textjudul:{
        
    },
    inputBox: {
        flex:5,
        height:40,
        backgroundColor:'rgba(255, 255,255,0.2)',
        
        borderRadius: 5,
        
        paddingHorizontal:16,
        
        fontSize:16,
        
    
        color:'#ffffff',
        marginTop:5,
        marginHorizontal:10
        
        }
    }
);