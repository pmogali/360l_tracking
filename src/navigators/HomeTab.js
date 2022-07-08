import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Auth} from 'aws-amplify';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Activities from '../screens/Activities';
import Starting from '../screens/Starting';
import SettingsStack from './SettingsStack';
const Tab = createBottomTabNavigator();

function HomeTab({navigation}) {
  React.useEffect(() => {}, []);
  return (
    <Tab.Navigator
      screenOptions={{
        headerRight: () => (
          <Ionicon
            name="exit-outline"
            size={20}
            style={{marginRight: 15}}
            onPress={() => {
              Auth.signOut();
              // navigation.navigate('Landing');
            }}
          />
        ),
      }}>
      <Tab.Screen
        name="Menu"
        component={Starting}
        options={({navigation, route}) => ({
          tabBarIcon: () => (
            <Ionicon
              name="ios-home-outline"
              size={20}
              style={{marginLeft: 10}}
              onPress={() => navigation.navigate('Menu')}
            />
          ),
          tabBarShowLabel: false,
        })}
      />
      <Tab.Screen
        name="Log Activities"
        component={Activities}
        options={({navigation, route}) => ({
          tabBarIcon: () => (
            <TouchableOpacity
              onPress={() => navigation.navigate('Log Activities')}
              style={{
                backgroundColor: 'transparent',
              }}>
              <LinearGradient
                colors={['#FF00D6', '#FF4D00']}
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: 40,
                  width: 80,
                  borderRadius: 20,
                }}>
                <AntIcon name="plus" size={20} style={{color: 'white'}} />
              </LinearGradient>
            </TouchableOpacity>
          ),
          tabBarShowLabel: false,
        })}
      />
      <Tab.Screen
        name="SettingsStack"
        component={SettingsStack}
        options={({navigation, route}) => ({
          tabBarIcon: () => (
            <Ionicon
              name="person-outline"
              size={20}
              style={{marginLeft: 10}}
              onPress={() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'SettingsStack'}],
                });
              }}
            />
          ),
          tabBarShowLabel: false,
          headerShown: false,
        })}
      />
    </Tab.Navigator>
  );
}

export default HomeTab;
