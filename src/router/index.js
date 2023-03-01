import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Splashscreen,Home, History, Allmovie, Search,Menu, Login, Profile,PreviewMovie,PlayerMovie,Player,Pickgenre, Storymovie, Genreshow } from '../pages';
import { BottomNav } from '../components';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
  return (
    <Tab.Navigator initialRouteName="Home" tabBar={props => <BottomNav {...props}/>}>
     
        <Tab.Screen name="Home" icos="home" component={homie} />
        <Tab.Screen name="Last Watch" icos="user" component={History} />
        <Tab.Screen name="Search" icos="search1" component={Search}/>
        <Tab.Screen name="Menu" icos="user" component={Menunih} /> 
      </Tab.Navigator>
  );
};

const homie = () =>{
  return (
    <Stack.Navigator initialRouteName='Home'>
    <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
    <Stack.Screen name="Pickgenre" component={Pickgenre} options={{headerShown:false}} />
    <Stack.Screen name="Genreshow" component={Genreshow} options={{headerShown:false}} />    
    <Stack.Screen name="Allmovie" component={Allmovie} options={{headerShown:false}} />    
  </Stack.Navigator>
)
}
const Menunih = () =>{
  return (
    <Stack.Navigator initialRouteName='Menu'>
    <Stack.Screen name="Menu" component={Menu} options={{headerShown:false}} />
    <Stack.Screen name="Profile" component={Profile} options={{headerShown:false}} />  
  </Stack.Navigator>
)
}

const router = () => {
    return (
        <Stack.Navigator initialRouteName='Splash' mode='modal'>
        <Stack.Screen name="Main" component={MainApp} options={{ headerShown: false }} />
        <Stack.Screen name="Splash" component={Splashscreen} options={{headerShown:false}} />
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}} />
        <Stack.Screen name="PlayerMovie" component={PlayerMovie} options={{headerShown:false}} />
        <Stack.Screen name="Player" component={Player} options={{headerShown:false}} />
        <Stack.Screen name="Storymovie" component={Storymovie} options={{headerShown:false}} />       
    <Stack.Screen name="PreviewMovie" component={PreviewMovie} options={{headerShown:false}} />   
      </Stack.Navigator>
    )
}

export default router

const styles = StyleSheet.create({})
