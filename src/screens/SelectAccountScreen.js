import React from 'react';
import { View, StatusBar,} from 'react-native';
import { useTheme } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
import SelectAccountScreenItem from '../Components/SelectAccout'

const SelectAccountScreen = ({navigation}) => {
    const { colors } = useTheme();
    const theme = useTheme();

    return (
      <View style={{flex:1, backgroundColor:'#009387'}}>
          <StatusBar   barStyle= { theme.dark ? "light-content" : "dark-content" }/>
            <Animatable.Text 
                  style={{color:colors.text,fontSize: 30,fontWeight: 'bold',textAlign:'center', textDecorationLine:'underline',  textDecorationColor:colors.background}}
                  animation="zoomInUp" 
                  iterationCount={1} 
                  direction="alternate">
                    Select Your Account
            </Animatable.Text>
          
          <SelectAccountScreenItem 
           accounttype='Mechanic'
          />
          
          <SelectAccountScreenItem 
            accounttype='Customer'
          />
      </View>
    );
};

export default SelectAccountScreen;
