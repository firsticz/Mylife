import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {Ionicons} from '@expo/vector-icons';

import LoadingScreen from './screens/LoadingScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';


import HomeScreen from './screens/HomeScreen';
import MenuScreen from './screens/MenuScreen';
import SportScreen from './screens/SportScreen';
import NotificationScreen from './screens/NotificationScreen';
import SettingScreen from './screens/SettingScreen';


import * as firebase from 'firebase'


var firebaseConfig = {
  apiKey: "AIzaSyDCUQLwQq-hmkhqOA_w3okVO87f7tXt0qM",
  authDomain: "mylife-b4dc6.firebaseapp.com",
  databaseURL: "https://mylife-b4dc6.firebaseio.com/",
  projectId: "mylife-b4dc6",
  storageBucket: "mylife-b4dc6.appspot.com",
  messagingSenderId: "1065466200083",
  appId: "1:1065466200083:web:cfacb364812356efd7bfe6"
};

if (!firebase.apps.length) {

firebase.initializeApp(firebaseConfig);
}

const AppTabNavigator = createBottomTabNavigator(
    {
        Home : { 
            screen: HomeScreen,
            navigationOptions: {
              tabBarIcon: ({tintColor}) => <Ionicons name="ios-person" size={24} color={tintColor}></Ionicons>
            }
        },

        Menu : { 
          screen: MenuScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name="ios-restaurant" size={24} color={tintColor}></Ionicons>
          }
        },

        Sport : { 
          screen: SportScreen,
          navigationOptions: {
              tabBarIcon: ({tintColor}) => <Ionicons name="ios-fitness" size={24} color={tintColor}></Ionicons>
            }
        },

        Notifacation : { 
          screen: NotificationScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name="ios-notifications" size={24} color={tintColor}></Ionicons>
          }
        },
    
        Setting : { 
          screen: SettingScreen,
          navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name="ios-settings" size={24} color={tintColor}></Ionicons>
          }
        }

    },

    {
        tabBarOptions: {
          activeTintColor: "#161f3d",
          inactiveTintColor: "#b8bbc4",
          showLabel: false
        }
    }

  );

const AuthStack = createStackNavigator({
  Login : LoginScreen,
  Register : RegisterScreen
});



export default createAppContainer(
  createSwitchNavigator(
    {
      Loading : LoadingScreen,
      App : AppTabNavigator,
      Auth : AuthStack
    },
    {
      initialRouteName : "Loading"
    }
  )
);