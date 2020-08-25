import React , { useEffect , useState, Fragment } from 'react';
import { Login, Splash, Register, Home, Profile, Chat, Timeline, ChatWindow, FindFriend , Invitation, EditProfile, FriendsProfile , PostReply, NewGroup , CreatePost, GroupInfo, InviteChat } from '../Pages/';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import { NewTimeline } from '../Component/Atoms';
const Stack = createStackNavigator();
  
  const Tab = createBottomTabNavigator();
  
  function MyTabs() {
        return (
            <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions = {{
                activeTintColor: 'rgba(27,176,233,1)'
            }}
            >
                 <Tab.Screen name="Home" options={{
                    tabBarIcon: ({color}) => <Icon name="home" color={color} size={24} />,
                   }} component={HomeStack} />
                   <Tab.Screen name="Chat" options={{
                    tabBarIcon: ({color}) => <Icon name="wechat" color={color} size={24} />,
                   }}  component={ChatStack} />
                    <Tab.Screen
                    listeners={{
                        tabPress: e => {
                            e.preventDefault()
                        }
                      }}
                    name="TimelinePlus" options={{
                    tabBarLabel : '',
                    tabBarIcon: ({color}) => <NewTimeline />,
                   }}  component={TimelineStack} />
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
        <Stack.Screen name="CreatePost" component={CreatePost}
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
    const [render, setrender] = useState(false)
    if(!render){
      setTimeout(()=>{
      setrender(true)
      console.log('last1')
    },10)
    }

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
            <Stack.Screen name="CreatePost" component={CreatePost}
            options={{
                headerShown: false,
            }}
            />    
            <Stack.Screen name="Register" component={Register}
            options={{
                headerShown: false,
            }}
            
            />
           
            {
                render ? (
                    <Stack.Screen name="Home" component={MyTabs}
                    options={{
                        headerShown: false,
                    }}
                    
                    />
                ) : (
                    <Stack.Screen name="Home" component={Home}
                    options={{
                        headerShown: false,
                    }}
                    
                    />
                )
            }
            
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
            <Stack.Screen name="FriendsProfile" component={FriendsProfile}
            options={{
                headerShown: false,
            }}
            
            />
               <Stack.Screen name="NewGroup" component={NewGroup}
            options={{
                headerShown: false,
            }}
            
            />
             <Stack.Screen name="PostReply" component={PostReply}
            options={{
                headerShown: false,
            }}
            />
            <Stack.Screen name="GroupInfo" component={GroupInfo}
            options={{
                headerShown: false,
            }}
            />
            {/* <Stack.Screen name="InviteChat" component={InviteChat}
            options={{
                headerShown: false,
            }}
            /> */}
        </Stack.Navigator>
    );
};

export default Router