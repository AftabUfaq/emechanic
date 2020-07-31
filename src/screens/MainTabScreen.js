import React from 'react';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Icon from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'

import HomeScreen from './DashBoard';
import DetailsScreen from './NotificationsScreen';
import ExploreScreen from './ExploreScreen';
import ProfileScreen from './ProfileScreen';

const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const ExploreStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SupportStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();
const myscreenoptions = {
  headerStyle: {
    backgroundColor: '#009387',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
    fontWeight: 'bold'
    }
}
const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
    >

      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={DetailsStackScreen}
        options={{
          tabBarLabel: 'Notifications',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-notifications" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />

      <Tab.Screen
        name="Explore"
        component={ExploreStackScreen}
        options={{
          tabBarLabel: 'Donate',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <FontAwesome5 name="hand-holding-usd" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);


const HomeStackScreen = ({navigation}) => (
<HomeStack.Navigator screenOptions={myscreenoptions}>
        <HomeStack.Screen name="Home" component={HomeScreen} options={{
        title:'Home',
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</HomeStack.Navigator>
);

const DetailsStackScreen = ({navigation}) => (
<DetailsStack.Navigator screenOptions={myscreenoptions}>
        <DetailsStack.Screen name="Notifications" component={DetailsScreen} options={{
        headerLeft: () => (
            <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
        )
        }} />
</DetailsStack.Navigator>
);


const ExploreStackScreen = ({navigation}) => (
  <ExploreStack.Navigator screenOptions={myscreenoptions}>
          <ExploreStack.Screen name="Explore" component={ExploreScreen} options={{
            title:"Chat",
          headerLeft: () => (
              <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
          )
          }} />
  </ExploreStack.Navigator>
  );


const ProfileStackScreen = ({navigation}) => (
  <ProfileStack.Navigator screenOptions={myscreenoptions}>
            <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{
            headerLeft: () => (
                <Icon.Button name="ios-menu" size={25} backgroundColor="#009387" onPress={() => navigation.openDrawer()}></Icon.Button>
            )
            }} />
    </ProfileStack.Navigator>
  );
        
export default MainTabScreen;
