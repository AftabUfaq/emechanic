import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Avatar,Title, Caption, Drawer, Text,TouchableRipple, Switch} from 'react-native-paper';
import { DrawerContentScrollView,DrawerItem} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import{  Context as AuthContext } from '../Context/AuthContext';
export function DrawerContent(props) {
    
    const paperTheme = useTheme();
    const {colors} = useTheme();

    const { state:{profiledata}, signOut, toggleTheme } = React.useContext(AuthContext);
    const Capitalize = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
        } 
    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style={styles.drawerContent}>
                    <View style={styles.userInfoSection}>
                        <View style={{flexDirection:'row',marginTop: 15}}>
                            <Avatar.Image 
                                 source={{
                                    uri:`${profiledata.photoURl}`
                                }}
                                size={70}
                            />
                            <View style={{marginLeft:15, flexDirection:'column'}}>
                               <View style ={{flexDirection:'row', justifyContent:'space-between'}}> 
                                <Title style={styles.title}>{Capitalize(profiledata.name)}</Title>
                                <Icon onPress={()=> alert("Eidt")} style={[styles.title,{marginTop:13, color:colors.text } ]} name="square-edit-outline" size={22} />
                                </View>
                               <Caption style={styles.caption}>{profiledata.email}</Caption>
                                <Caption style={styles.caption}>{profiledata.phoneNumber}</Caption>

                            </View>
                        </View>
                       <View style={{borderBottomWidth:.5,marginTop:10, borderBottomColor:'#4a4948', marginLeft:-100}}></View> 
                       <View style={{borderBottomWidth:.5,marginTop:.7, borderBottomColor:'#4a4948', marginLeft:-100}}></View> 

                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="home-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Home"
                            onPress={() => {props.navigation.navigate('Home')}}
                        />
                        <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="account-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Profile"
                            onPress={() => {props.navigation.navigate('Profile')}}
                        />
                         <DrawerItem 
                            icon={({color, size}) => (
                                <Icon 
                                name="bookmark-outline" 
                                color={color}
                                size={size}
                                />
                            )}
                            label="Feedback"
                            onPress={() => {props.navigation.navigate('FeedbackScreen')}}
                        />
                    </Drawer.Section>
                    <Drawer.Section title="Preferences">
                        <TouchableRipple onPress={() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents="none">
                                    <Switch value={paperTheme.dark}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem 
                    icon={({color, size}) => (
                        <Icon 
                        name="exit-to-app" 
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {signOut()}}
                />
            </Drawer.Section>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });