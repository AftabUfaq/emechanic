import React from 'react'
import styles from '../screens/Styles/authstyles'
import *  as Animatable from 'react-native-animatable'
import {View,Text, TextInput} from 'react-native'
import { useTheme } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
 const MyTextInput =  (props) => {
    const { colors } = useTheme();
return (
<View style = {{marginBottom:5,}}>
        <Text style={[styles.text_footer, {
                color: colors.text
        }]}>{props.label}</Text>
            <View style={styles.action}>
               {props.lefticonname?  <FontAwesome 
                    name={props.lefticonname}
                    color={colors.text}
                    size={20}
                />: null} 
              
                <TextInput 
                    defaultValue={props.value}
                    value={props.value}
                    placeholder={props.placeholdertext}
                    placeholderTextColor={colors.placeholdertextcolor}
                    style={[styles.textInput, {
                        color: colors.text
                    }]}
                    multiline={true}
                    numberOfLines={props.numberofline}
                    autoCapitalize="none"
                    onChangeText={(val) => props.textInputChange(val)}
                    keyboardType={props.keyboardtype}
                    maxLength={props.lenght}
                />
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name={props.isvalid?"check-circle":"alert-circle"}
                        color={props.isvalid?"green":"red"}
                        size={20}
                    />
                </Animatable.View>
            </View>
              <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={styles.errorMsg}>{props.errormessage}</Text>
            </Animatable.View>
     
   </View>
)}


export  default MyTextInput;
