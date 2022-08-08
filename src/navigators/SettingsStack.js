import {createStackNavigator} from '@react-navigation/stack';
import {Auth} from 'aws-amplify';
import React from 'react';
import AntIcon from 'react-native-vector-icons/AntDesign';
import Ionicon from 'react-native-vector-icons/Ionicons';
import SelectVehicle from '../screens/SelectVehicle';
import Settings from '../screens/Settings';
const Stack = createStackNavigator();

export default function SettingsStack() {
  React.useEffect(() => {}, []);

  return (
    <Stack.Navigator
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
      <Stack.Screen
        name="Settings"
        component={Settings}
        options={({navigation, route}) => ({
          headerLeft: () => (
            <AntIcon
              name="back"
              size={20}
              style={{marginLeft: 10}}
              onPress={() => navigation.navigate('Home', {screen: 'Menu'})}
            />
          ),
          headerShown: true,
        })}
      />
      <Stack.Screen
        name="Select Vehicle"
        component={SelectVehicle}
        options={({navigation, route}) => ({
          headerLeft: () => (
            <AntIcon
              name="back"
              size={20}
              style={{marginLeft: 10}}
              onPress={() => navigation.navigate('Home', {screen: 'Menu'})}
            />
          ),
          headerShown: true,
        })}
      />
    </Stack.Navigator>
  );
}
