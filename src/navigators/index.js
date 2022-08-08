import NetInfo from '@react-native-community/netinfo';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';

import {API, Auth, Hub} from 'aws-amplify';
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
const queryStr = 'getUserInfo';
const queryStr1 = 'createUserInfo';

// import SignUpScreen from '../screens/SignUpScreen';

import HomeTab from './HomeTab';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const [user, setUser] = useState(undefined);

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      setUser(authUser);
      // console.log('Auth user:', JSON.stringify(authUser, null, 2));
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

      // return console.log(userInput);

      let checkFlag = !!userInfo?.data[queryStr];

      if (!checkFlag) {
        const newUser = await API.graphql({
          query: mutations[queryStr1],
          variables: {input: userInput},
        });
        console.log('new user created', newUser);
      } else {
        console.log('User already exists');
      }
    } catch (e) {
      setUser(null);
    }
  };

  React.useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    const listener = data => {
      if (data.payload.event === 'signIn' || data.payload.event === 'signOut') {
        checkUser();
      }
    };

    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
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
