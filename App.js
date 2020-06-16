import React, { useEffect, useContext } from 'react';
import { View, } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Flow } from 'react-native-animated-spinkit';

import { 
  Provider as PaperProvider, 
  DefaultTheme as PaperDefaultTheme,
  DarkTheme as PaperDarkTheme 
} from 'react-native-paper';

import { DrawerContent } from './src/screens/DrawerContent';
import MainTabScreen from './src/screens/MainTabScreen';
import SupportScreen from './src/screens/SupportScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import BookMechanicScreen from './src/screens/BookMechanicScreen';
import {Provider as AuthProvider } from './src/Context/AuthContext';
import {Provider as ProblemProvider} from './src/Context/ProblemContext'
import {Context as AuthContext} from './src/Context/AuthContext'
import RootStackScreen from './src/screens/RootStackScreen';
import AddProblemScreen from './src/screens/AddProblemScreen'
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const myscreenoptions = {
  headerStyle: {
    backgroundColor: '#009387',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
    fontWeight: 'bold'
    },
   
}

const Screens = ({navigation}) => (
  <Stack.Navigator screenOptions={myscreenoptions}>
           <Stack.Screen name="Home" component={MainTabScreen} options={{headerShown:false}} />

          <Stack.Screen name="SupportScreen" component={SupportScreen} options={{
              title:'Support Us',
              headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
             }} />

          <Stack.Screen name="AddProblemScreen" component={AddProblemScreen} options={{
              title:'Add Your Problem',
             }} />

          <Stack.Screen name="BookMechanicScreen" component={BookMechanicScreen} options={{
              title:'Book Mecanic Here',
             }} />
  </Stack.Navigator>
  );
  

const App = () => {
    const {state,LocalSignIn} = useContext(AuthContext);
//    console.log('App State',state);
//  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const myscreenoptions = {
    headerStyle: {
      backgroundColor: '#009387',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
      fontWeight: 'bold'
      }
  }
  
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    ...PaperDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      ...PaperDefaultTheme.colors,
      background: '#ffffff',
      text: '#333333',
      menuitemcolor:"#009387",
      placeholdertextcolor:'#575757'
      
    }
  }
  
  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    ...PaperDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      ...PaperDarkTheme.colors,
      background: '#333333',
      text: '#ffffff',
      menuitemcolor:"#ffffff",
      placeholdertextcolor:'#cfcfcf'
      
    }
  }

useEffect(() => {
  LocalSignIn();
}, [])

  const theme = state.isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;

if(state.isLoading) {
    return(
      <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
        <Flow size={70} color="#009387"></Flow>
      </View>
    );
  }
  return (
    <PaperProvider theme={theme}>
    <NavigationContainer theme={theme}>
       {state.userToken !== null && state.profiledata !==null ? (
        <Drawer.Navigator screenOptions={myscreenoptions} drawerContent={props => <DrawerContent {...props} />}>
           <Drawer.Screen name ="Screens" >
                {props => <Screens {...props}/>}
           </Drawer.Screen>
        </Drawer.Navigator>
      )
    :
  
      <RootStackScreen/> 
       } 
    </NavigationContainer>
    </PaperProvider>
  );
}

export default () => {
  
  return(
      <ProblemProvider>  
        <AuthProvider>
          <App />
        </AuthProvider>
      </ProblemProvider>
)};