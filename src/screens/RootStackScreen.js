import React from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './SplashScreen';
import SelectAccountScreen from './SelectAccountScreen'
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import CompleteProfileScreen from './CompleteProfileScreen'
const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SelectAccountScreen" component={SelectAccountScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="CompleteProfileScreen" component={CompleteProfileScreen}/>
    </RootStack.Navigator>
);

export default RootStackScreen;