import React from 'react';
import {TouchableOpacity, Text, Animated, } from 'react-native';
import { useTheme,  useNavigation } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import styles from '../screens/Styles/Styles'
import * as Animatable from 'react-native-animatable';
const MenuItem = (props) => {
  const navigation = useNavigation();
  const { colors } = useTheme();
    return (     
         <Animatable.View 
         animation="fadeInUp" iterationCount={1}
         >
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation.navigate(`${props.route}`)}
            style={{
              width: "100%",
              alignItems: "center",  
              justifyContent:'center',
              alignSelf:'center'  
            }}
          >
            <Animated.View style={[styles.homeIconView, { backgroundColor:colors.background,}]}
              animation="fadeInUpBig"
            >

              <MaterialIcons
                name ={props.icon}
                style={{ 
                width: 60,
                height: 60,
                zIndex: 1,
                marginTop:20,
                marginLeft:23,
                fontSize:70,
                fontWeight:'bold',
                color:colors.menuitemcolor
                }}
              />
              
              <Text
                style={{
                    color:colors.menuitemcolor,
                    fontSize: 14,
                    lineHeight: 16,
                    fontWeight: "bold",
                    textAlign: "center",
                    paddingTop: 4,
                    backgroundColor:'rgba(120, 120, 120, .2)',
                    flex:1,
                    paddingTop:10,
                    borderBottomLeftRadius:30,
                    borderBottomRightRadius:30,
                }}
              >
                {props.name}
              </Text>
          </Animated.View>
      </TouchableOpacity>  
      </Animatable.View>  
    );
};

export default MenuItem;
