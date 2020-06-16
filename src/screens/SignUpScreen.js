import React, { useEffect } from 'react';
import { View, Text,Alert, TouchableOpacity, TextInput,Platform,ScrollView,StatusBar} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { useTheme } from 'react-native-paper';
import {Context as AuthContext } from '../Context/AuthContext';
import { Flow } from 'react-native-animated-spinkit';
import  styles  from  './Styles/authstyles';
const SignUpScreen = ({navigation}) => {
     useEffect(() => {
        navigation.addListener('blur', () => {
            clearerrormessage();
          });
     },[navigation])        
    const { state,signUp, clearerrormessage } = React.useContext(AuthContext);
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const { colors } = useTheme();

    const [data, setData] = React.useState({
        email: '',
        isValidEmail:true,
        password: '',
        confirm_password: '',
        check_textInputChange: true,
        isValidPassword:true,
        check_same_password:true,
        secureTextEntry: true,
        confirm_secureTextEntry: true,
    });

    const textInputChange = (val) => {
        if(reg.test(val)) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true,
                isValidEmail:true,
            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false,
                isValidEmail:false
            });
        }
    }

    const handlePasswordChange = (val) => {
       if(val.trim().length >= 8){
        setData({
            ...data,
            password: val,
            isValidPassword:true,
        });
      }else {
        setData({
            ...data,
            password: val,
            isValidPassword:false,
        });
      }   
    }

    const handleConfirmPasswordChange = (val) => {
    if(val === data.password){
        setData({
            ...data,
            confirm_password: val,
            check_same_password:true
        });
    }
    else{
        setData({
            ...data,
            confirm_password: val,
            check_same_password:false
        });
    }    
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    const updateConfirmSecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry
        });
    }


    const handleValidEmail = (val) => {
    //    console.log(val);
        if(reg.test(val)) {
            setData({
                ...data,
                isValidEmail: true
            });
        } else {
            setData({
                ...data,
                isValidEmail: false
            });
        }
    }

   
    const SignUpHandle = (email, password, confirm_password, accounttype) => {
    if(email.trim().length === 0 ){
         setData({
             ...data,
             isValidEmail:false
         })
        return ;
    }else if(password.trim().length <= 7){
        setData({
            ...data,
        isValidPassword:false
        })
       return ;
  
    }else if(confirm_password.trim().length <= 7){
        setData({
            ...data,
            check_same_password:false
        })
       return ;
  
    }else if(password !== confirm_password){
        setData({
            ...data,
            check_same_password:false
        })
       return ;
    }else if(password === confirm_password){
        setData({
            ...data,
            check_same_password:true
        }); 
        if(data.isValidEmail && data.isValidPassword && data.check_same_password && data.password === data.confirm_password){
                  signUp(navigation, data.email, data.password, accounttype);
 
      }else{
          alert("Error");
      }
    } else {
            alert("Error");
    }
    }

   if(state.isauthenticating){
       return(
        <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
           <Flow size={70} color="#009387"></Flow>
           <Text style={{color:colors.text}}>Please Wait ... Signing Up You</Text>
         </View>
       )
   }
    return (
    
      <View style={styles.container}>
          <StatusBar backgroundColor='#009387' barStyle="light-content"/>
        <View style={styles.header}>
            <Text style={styles.text_header}>Sign Up</Text>
        </View>
        <Animatable.View 
            animation="fadeInUpBig"
            style={[styles.footer, {backgroundColor:colors.background}]}
        >
            <ScrollView
              showsVerticalScrollIndicator ={false}
              showsHorizontalScrollIndicator={false}
            >
            <Text style={[styles.text_footer, {color:colors.text}]}>Email</Text>
            <View style={styles.action}>
                <FontAwesome 
                    name="user-o"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your valid Email"
                    placeholderTextColor={colors.placeholdertextcolor}
                    style={styles.textInput}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={(val) => textInputChange(val)}
                    onEndEditing={(e)=>handleValidEmail(e.nativeEvent.text)}
                />
                {data.check_textInputChange ? 
                <Animatable.View
                    animation="bounceIn"
                >
                    <Feather 
                        name="check-circle"
                        color="green"
                        size={20}
                    />
                </Animatable.View>
                : null}
            </View>
            { data.isValidEmail ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Enter A valid Email</Text>
            </Animatable.View>
            }
            <Text style={[styles.text_footer, {
                marginTop: 35 , color:colors.text
            }]}>Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Your Password"
                    placeholderTextColor={colors.placeholdertextcolor}
                    secureTextEntry={data.secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handlePasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color={colors.text}
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color={colors.text}
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.isValidPassword ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
            </Animatable.View>
            }
      
            <Text style={[styles.text_footer, {
                marginTop: 35 , color:colors.text
            }]}>Confirm Password</Text>
            <View style={styles.action}>
                <Feather 
                    name="lock"
                    color={colors.text}
                    size={20}
                />
                <TextInput 
                    placeholder="Confirm Your Password"
                    placeholderTextColor={colors.placeholdertextcolor}
                    secureTextEntry={data.confirm_secureTextEntry ? true : false}
                    style={styles.textInput}
                    autoCapitalize="none"
                    onChangeText={(val) => handleConfirmPasswordChange(val)}
                />
                <TouchableOpacity
                    onPress={updateConfirmSecureTextEntry}
                >
                    {data.secureTextEntry ? 
                    <Feather 
                        name="eye-off"
                        color={colors.text}
                        size={20}
                    />
                    :
                    <Feather 
                        name="eye"
                        color={colors.text}
                        size={20}
                    />
                    }
                </TouchableOpacity>
            </View>
            { data.check_same_password ? null : 
            <Animatable.View animation="fadeInLeft" duration={500}>
            <Text style={styles.errorMsg}>Password Does not Match</Text>
            </Animatable.View>
            }
             {state.errormessage?<Text style={styles.errorMsg}>{state.errormessage}</Text>:  
            <View style={styles.textPrivate}>
                <Text style={styles.color_textPrivate}>
                    By signing up you agree to our
                </Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Terms of service</Text>
                <Text style={styles.color_textPrivate}>{" "}and</Text>
                <Text style={[styles.color_textPrivate, {fontWeight: 'bold'}]}>{" "}Privacy policy</Text>
            </View>}
            <View style={styles.button}>
                <TouchableOpacity
                    style={styles.signIn}
                    onPress={() => {SignUpHandle(data.email, data.password, data.confirm_password, state.accounttype)}}
                >
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={[styles.textSign, {
                        color:'#fff'
                    }]}>Sign Up</Text>
                </LinearGradient>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.signIn, {
                        borderColor: '#009387',
                        borderWidth: 2,
                        borderBottomWidth:3,
                        marginTop: 15
                    }]}
                >
                    <Text style={[styles.textSign, {
                        color: '#009387'
                    }]}>Sign In</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </Animatable.View>
      </View>
    );
};

export default SignUpScreen;
