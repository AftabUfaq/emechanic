import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useTheme,  useNavigation } from '@react-navigation/native';
const DonateScreen = () => {
  const { colors } = useTheme();
    return (
      <View style={styles.container}>
        <Text style ={{color:colors.text, fontSize:24, fontWeight:'bold'}}>Donate Now</Text>
         <Text 
          adjustsFontSizeToFit={true}
          numberOfLines={4}
         style={[styles.text, {color:colors.text,  backgroundColor:colors.background}]}>
           E-Mecahnic Does not recieve funds form Government. We Relay on a small Donation from individuals like you, to power our compaigns that cares about you. 
         </Text>
         <Text></Text>
         <Text xt style={[styles.text, {color:colors.text,  backgroundColor:colors.background}]}>if you like to join E-Mechanic through a small regualr Conntrbution to E-Mechanics, Please Donate a small amount from below. </Text>
         
      </View>
    );
};

export default DonateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
  },
  text:{
    backgroundColor:'black',
    fontSize:16,
    justifyContent:'flex-start',
    alignContent:'flex-start',
    alignSelf:'flex-start',
    paddingHorizontal:20,
    borderRadius:5,
},
});
