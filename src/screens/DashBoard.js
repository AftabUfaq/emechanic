import React from 'react';
import { View, Text, StatusBar, Dimensions, ScrollView } from 'react-native';
import { useTheme } from '@react-navigation/native';
import styles from './Styles/Styles'
import MenuItem from '../Components/MeunItem'
const HomeScreen = () => {

  const theme = useTheme();
  
    return (
      <View style={styles.container}>
        <StatusBar barStyle= { theme.dark ? "light-content" : "dark-content" }/>
       
        <ScrollView> 
          <View style={styles.mainView}>  
           <MenuItem 
             name = "Add Problem"
             icon = "add"
             route = "AddProblemScreen"
           />

           <MenuItem 
             name = "Book Mechanic"
             icon = "playlist-add"
             route = "BookMechanicScreen"
           />
          </View>

          <View style={styles.mainView}>  
           <MenuItem 
             name = "Add Problem"
             icon = "add"
             route = "Home"
           />

           <MenuItem 
             name = "History"
             icon = "add"
             route = "Home"
           />
          </View>

          <View style={styles.mainView}>  
           <MenuItem 
             name = "Add Problem"
             icon = "add"
             route = "Home"
           />

           <MenuItem 
             name = "History"
             icon = "add"
             route = "Home"
           />
          </View>

      </ScrollView>
      </View>
    );
};

export default HomeScreen;