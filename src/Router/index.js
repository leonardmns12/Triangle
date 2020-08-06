import React from 'react';
import { View, Text} from 'react-native';
import { Login, Splash, Register, Home, Profile, Chat, Timeline, ChatWindow, FindFriend , Invitation, EditProfile } from '../Pages/';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
const Stack = createStackNavigator();
  
  const Tab = createBottomTabNavigator();
  
  function MyTabs() {
    return (
      <Tab.Navigator
      initialRouteName="Feed"
      >
        <Tab.Screen name="Home" options={{
         tabBarIcon: ({color}) => <Icon name="home" color={color} size={24} />,
        }} component={HomeStack} />
        <Tab.Screen name="Chat" options={{
         tabBarIcon: ({color}) => <Icon name="wechat" color={color} size={24} />,
        }}  component={ChatStack} />
        <Tab.Screen name="Timeline" options={{
         tabBarIcon: ({color}) => <Icon name="bell" color={color} size={24} />,
        }} component={TimelineStack} />
        <Tab.Screen name="Profile" options={{
         tabBarIcon: ({color}) => <Icon name="user-circle-o" color={color} size={24} />,
        }} component={ProfileStack} />
      </Tab.Navigator>
    );
  }

  const HomeStack = () => {
      return(
        <Stack.Navigator
        screenOptions = {{
            gestureEnabled : true,
            gestureDirection : "horizontal"
        }}
        >
        <Stack.Screen name="Home" component={Home}
            options={{
                headerShown: false,
            }}
        />   
        <Stack.Screen name="FindFriend" component={FindFriend}
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen name="Invitation" component={Invitation}
            options={{
                headerShown: false,
            }}
        />
        </Stack.Navigator>
      )
  }

  const ChatStack = () => {
      return(
        <Stack.Navigator
        screenOptions = {{
            gestureEnabled : true,
            gestureDirection : "horizontal"
        }}
        >
        <Stack.Screen name="Chat" component={Chat}
            options={{
                headerShown: false,
            }}
        />    
        <Stack.Screen name="FindFriend" component={FindFriend}
            options={{
                headerShown: false,
            }}
        />
        <Stack.Screen name="Invitation" component={Invitation}
            options={{
                headerShown: false,
            }}
        />
        </Stack.Navigator>    
      )
  }

  const TimelineStack = () => {
      return(
        <Stack.Navigator
        screenOptions = {{
            gestureEnabled : true,
            gestureDirection : "horizontal"
        }}
        >
        <Stack.Screen name="Timeline" component={Timeline}
            options={{
                headerShown: false,
            }}
        />       
        </Stack.Navigator>  
      )
  }

  const ProfileStack = () => {
      return(
        <Stack.Navigator
        screenOptions = {{
            gestureEnabled : true,
            gestureDirection : "horizontal"
        }}
        >
        <Stack.Screen name="Profile" component={Profile}
        options={{
             headerShown: false,
        }}
        />

        </Stack.Navigator>  
      )
  }




const Router = () => {
    return(
        <Stack.Navigator
        screenOptions = {{
            gestureEnabled : true,
            gestureDirection : "horizontal"
        }}
        >
            <Stack.Screen name="Splash" component={Splash} 
            options={{
                headerShown: false,
            }}
            />
            <Stack.Screen name="Login" component={Login}
            options={{
                headerShown: false,
            }}
            />
            <Stack.Screen name="Register" component={Register}
            options={{
                headerShown: false,
            }}
            
            />
            <Stack.Screen name="Home" component={MyTabs}
            options={{
                headerShown: false,
            }}
            
            />
            
            <Stack.Screen name="ChatWindow" component={ChatWindow}
            options={{
                headerShown: false,
            }}
            />
            <Stack.Screen name="FindFriend" component={FindFriend}
            options={{
                headerShown: false,
            }}
            />
            <Stack.Screen name="Invitation" component={Invitation}
            options={{
                headerShown: false,
            }}
            />
            <Stack.Screen name="EditProfile" component={EditProfile}
            options={{
                headerShown: false,
            }}
            />
            
        </Stack.Navigator>
    );
};

export default Router