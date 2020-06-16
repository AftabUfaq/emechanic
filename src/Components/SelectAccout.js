import React from 'react';
import { View, Text, TouchableOpacity, Dimensions,StyleSheet,} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme , useNavigation } from '@react-navigation/native';
import {Context as AuthContext} from '../Context/AuthContext'
const SelectAccountScreenItem = (props) => {
    const {selectaccount} = React.useContext(AuthContext);
    const { colors } = useTheme();
    const navigation = useNavigation();
    return (
        <View style={styles.header}>         
        <Animatable.View 
            style={[styles.footer, {
                backgroundColor: colors.background
            }]}
            animation="zoomInUp"
        >
            <Text style={[styles.title, {
                color: colors.text
            }]}>{props.accounttype}</Text>
            <Animatable.Text style={styles.text} animation="zoomInUp" iterationCount={1} direction="alternate">Tap Below Button To Continue </Animatable.Text>
            <View style={styles.button}>
            <TouchableOpacity onPress={()=> selectaccount(props.accounttype, navigation)}>
                <LinearGradient
                    colors={['#08d4c4', '#01ab9d']}
                    style={styles.signIn}
                >
                    <Text style={styles.textSign}>Let's Go</Text>
                    <MaterialIcons 
                        name="navigate-next"
                        color="#fff"
                        size={20}
                    />
                </LinearGradient>
            </TouchableOpacity>
            </View>
        </Animatable.View>
        </View>
    );
};

export default SelectAccountScreenItem;

const {height} = Dimensions.get("screen");
const height_logo = height * 0.23;
const styles = StyleSheet.create({
  header: {
      flex: 2,
      height:height_logo
  },
  footer: {
      flex: 1,
      backgroundColor:'transparent',
      borderRadius:30,
      margin:10,
      paddingVertical: 50,
      paddingHorizontal: 30,
      marginBottom:10,
      borderWidth:2,
  },
  logo: {
      width: height_logo,
      height: height_logo
  },
  title: {
      color: '#05375a',
      fontSize: 30,
      fontWeight: 'bold',
      textAlign:'center'
  },
  text: {
      color: '#009783',
      marginTop:5,
      textAlign:'center'
  },
  button: {
      alignItems: 'flex-end',
      marginTop: 30,
  },
  signIn: {
      width: 150,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 50,
      flexDirection: 'row'
  },
  textSign: {
      color: 'white',
      fontWeight: 'bold'
  }
});

