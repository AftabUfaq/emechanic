import React from 'react';
import { View, StatusBar,ScrollView } from 'react-native';
import Notification from '../Components/Notification'

const NotificationScreen = ({navigation}) => {
    return (
      <View style={{marginTop:0,}}>
        <StatusBar  backgroundColor="#009387" barStyle="dark-content"/>
      <ScrollView
       showsVerticalScrollIndicator={false}
       showsHorizontalScrollIndicator={false}
      >
        <Notification  
        count = {1}
        title ="Enginee Failed"
        description="I as going there and my Engine Is Failed Please Help Me "
        status="solved"
        />

        <Notification count = {2}
        title ="Enginee Repair"
        description="I as going there and my Engine Is Failed and also the brake is not Working So plz GHelp Me. It very emergency 
        I as going there and my Engine Is Failed and also the brake is not Working So plz GHelp Me. It very emergency
        I as going there and my Engine Is Failed and also the brake is not Working So plz GHelp Me. It very emergency
        I as going there and my Engine Is Failed and also the brake is not Working So plz GHelp Me. It very emergency
        "
        status="pending"
        />

        <Notification count = {2}
        title ="Brake Repair"
        description="I as going there and my Engine Is Failed and also the brake is not Working So plz GHelp Me. It very emergency 
        I as going there and my Engine Is Failed and also the brake is not Working So plz GHelp Me. It very emergency
        "
        status="pending"
        />
   
       <Notification count = {2}
        title ="Oil Change"
        description="I as going there and my Engine Is Failed and also the brake is not Working So plz GHelp Me. It very emergency 
        "
        status="solved"
        />

        <Notification count = {2}
        title ="Tire change"
        description="I as going there and my Engine Is Failed and also the brake is not Working So plz GHelp Me. It very emergency 
        "
        status="solved"
        />
        <Notification count = {2}
        title ="Body Repair"
        description="I as going there and my Engine Is Failed and also the brake is not Working So plz GHelp Me. It very emergency 
        "
        status="pending"
        />
        <Notification count = {2}
        title ="Require Electictionn"
        description="I as going there and my Engine Is Failed and also the brake is not Working So plz GHelp Me. It very emergency 
        "
        status="solved"
        />
        <Notification count = {2}
        title ="Enginee Repair"
        description="I as going there and my Engine Is Failed and also the brake is not Working So plz GHelp Me. It very emergency 
        "
        status="pending"
        />
      </ScrollView>  
      </View>
    );
};

export default NotificationScreen;
