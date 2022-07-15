import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View, Text} from 'react-native';

import {DataStore, Auth, Hub, API} from 'aws-amplify';
import ConfirmEmailScreen from '../screens/ConfirmEmailScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
// import HomeScreen from '../screens/HomeScreen';
import LandingScreen from '../screens/Landing';
import NewPasswordScreen from '../screens/NewPasswordScreen';
// import SignInScreen from '../screens/SignInScreen';
import AntIcon from 'react-native-vector-icons/AntDesign';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';
import {UserInfo} from '../models';

import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeTab from './HomeTab';
const queryStr = 'getUserInfo';
const queryStr1 = 'createUserInfo';
const queryStr2 = 'createTripInfo';
const queryStr3 = 'createTripInfoVehicleInfo';

// import SignUpScreen from '../screens/SignUpScreen';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [user, setUser] = useState(undefined);

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      setUser(authUser);
      const {email, sub, phone_number} =
        authUser?.signInUserSession?.idToken?.payload;

      const userInfo = await API.graphql({
        query: queries[queryStr],
        variables: {id: authUser?.signInUserSession?.idToken?.payload?.sub},
      });

      const now = new Date();

      let userInput = {
        Email: email,
        Last_Update: now.toISOString(),
        Name: authUser?.signInUserSession?.idToken?.payload['cognito:username'],
        Phone: phone_number,
        Last_Update_User: '',
        Password: '',
        Titles: '',
        Status: '',
        id: sub,
      };

      let checkFlag = !!userInfo?.data[queryStr];

      if (!checkFlag) {
        const newUser = await API.graphql({
          query: mutations[queryStr1],
          variables: {input: userInput},
        });
        // console.log('new user created', newUser);
      } else {
        // console.log('User already exists');
      }
    } catch (e) {
      console.log('Create User Error', e);
      setUser(null);
    }
  };

  React.useEffect(() => {
    checkUser();
  }, []);

  const saveData = async () => {
    try {
      const value1 = await AsyncStorage.getItem('Trips');
      const value2 = await AsyncStorage.getItem('TripVehicleInfos');

      let trips = value1 != null ? JSON.parse(value1) : [];
      let vInfos = value2 != null ? JSON.parse(value2) : [];

      console.log(trips, vInfos);
      let tripPromises = trips.map(e =>
        API.graphql({
          query: mutations[queryStr2],
          variables: {input: e},
        }),
      );

      let vInfoPromises = vInfos.map(e =>
        API.graphql({
          query: mutations[queryStr3],
          variables: {input: e},
        }),
      );
      Promise.all(tripPromises).then(async res => {
        console.log('Trips Success');
        await AsyncStorage.setItem('Trips', JSON.stringify([]));
      });
      Promise.all(vInfoPromises).then(async res => {
        console.log('TripVehicleInfos Success');
        await AsyncStorage.setItem('TripVehicleInfos', JSON.stringify([]));
      });
    } catch (e) {
      // alert('Failed to save the data to the server');
    }
  };
  useEffect(() => {
    const listener = data => {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        checkUser();
      }
    };

    const listener2 = Hub.listen('datastore', async hubData => {
      const {event, data} = hubData.payload;
      console.log(event, data);
    });

    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        saveData();
      }
    });

    Hub.listen('auth', listener);
    return () => {
      Hub.remove('auth', listener);
      unsubscribe();
    };
  }, []);

  if (user === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerMode: 'screen'}}>
        {user ? (
          <Stack.Screen
            name="Home"
            component={HomeTab}
            options={({navigation, route}) => ({
              headerShown: false,
            })}
          />
        ) : (
          <>
            <Stack.Screen
              name="Landing"
              component={LandingScreen}
              options={({navigation, route}) => ({
                headerShown: false,
              })}
            />

            <Stack.Screen
              name="SignIn"
              component={LoginScreen}
              options={({navigation, route}) => ({
                headerLeft: () => (
                  <AntIcon
                    name="back"
                    size={20}
                    style={{marginLeft: 5}}
                    onPress={() => navigation.goBack()}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="SignUp"
              component={RegisterScreen}
              options={({navigation, route}) => ({
                headerLeft: () => (
                  <AntIcon
                    name="back"
                    size={20}
                    style={{marginLeft: 5}}
                    onPress={() => navigation.goBack()}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="ConfirmEmail"
              component={ConfirmEmailScreen}
              options={({navigation, route}) => ({
                headerLeft: () => (
                  <AntIcon
                    name="back"
                    size={20}
                    style={{marginLeft: 5}}
                    onPress={() => navigation.goBack()}
                  />
                ),
              })}
            />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
            <Stack.Screen
              name="NewPassword"
              component={NewPasswordScreen}
              options={({navigation, route}) => ({
                headerLeft: () => (
                  <AntIcon
                    name="back"
                    size={20}
                    style={{marginLeft: 5}}
                    onPress={() => navigation.goBack()}
                  />
                ),
              })}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
