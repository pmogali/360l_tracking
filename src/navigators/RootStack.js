import {createStackNavigator} from '@react-navigation/stack';
import {API, Auth, Hub} from 'aws-amplify';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import AntIcon from 'react-native-vector-icons/AntDesign';
import * as mutations from '../graphql/mutations';
import * as queries from '../graphql/queries';
import Landing from '../screens/Landing';
import IsAuthStack from './IsAuthStack';

const queryStr = 'getUserInfo';
const queryStr1 = 'createUserInfo';
const Stack = createStackNavigator();

function RootStack({navigation}) {
  const [user, setUser] = useState(undefined);
  // const dispatch = useDispatch();
  // const user = useSelector(state => state.user);

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      console.log(authUser.signInUserSession.idToken.payload);
      fetchData(authUser);
      setUser(authUser);
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

    Hub.listen('auth', listener);
    return () => Hub.remove('auth', listener);
  }, []);

  const fetchData = async userData => {
    try {
      const userInfo = await API.graphql({
        query: queries[queryStr],
        variables: {id: userData?.signInUserSession?.idToken?.payload?.sub},
      });

      const {email, sub, phone_number} =
        userData?.signInUserSession?.idToken?.payload;

      const now = new Date();

      let userInput = {
        Email: email,
        Last_Update: now.toISOString(),
        Name: userData?.signInUserSession?.idToken?.payload['cognito:username'],
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
      console.log('ERROR: ', JSON.stringify(e, null, 2));
    }
  };

  if (user === undefined) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <Stack.Navigator screenOptions={{headerMode: 'screen'}}>
      {/* <Stack.Screen
        name="Home"
        component={HomeTab}
        options={{headerShown: false}}
      /> */}
      {!!user ? (
        <Stack.Screen
          name="Register"
          component={IsAuthStack}
          options={({navigation, route}) => ({
            headerLeft: () => (
              <AntIcon
                name="back"
                size={20}
                style={{marginLeft: 10}}
                onPress={() => navigation.goBack()}
              />
            ),
            headerShown: false,
          })}
        />
      ) : (
        <>
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Register"
            component={IsAuthStack}
            options={({navigation, route}) => ({
              headerLeft: () => (
                <AntIcon
                  name="back"
                  size={20}
                  style={{marginLeft: 10}}
                  onPress={() => navigation.goBack()}
                />
              ),
              headerShown: false,
            })}
          />
        </>
      )}
      {/* <Stack.Screen
        name="Login"
        component={Login}
        options={({navigation, route}) => ({
          headerLeft: () => (
            <AntIcon
              name="back"
              size={20}
              style={{marginLeft: 10}}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      /> */}
      {/* <Stack.Screen
        name="Home"
        component={HomeTab}
        options={{headerShown: false}}
      /> */}
      {/* <Stack.Screen
        name="Home"
        component={HomeTab}
        options={{headerShown: false}}
      /> */}
    </Stack.Navigator>
  );
}

export default RootStack;
