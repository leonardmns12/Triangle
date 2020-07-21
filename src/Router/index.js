import React from 'react';
import { Login, Splash, Register, Home, Profile, Chat, Timeline, ChatWindow, FindFriend } from '../Pages/';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

const Router = () => {
    return(
        <Stack.Navigator>
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
            <Stack.Screen name="Home" component={Home}
            options={{
                headerShown: false,
            }}
            
            />
            <Stack.Screen name="Chat" component={Chat}
            options={{
                headerShown: false,
            }}
            
            />
            <Stack.Screen name="Profile" component={Profile}
            options={{
                headerShown: false,
            }}
            
            />
            <Stack.Screen name="Timeline" component={Timeline}
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
        </Stack.Navigator>
    );
};

export default Router