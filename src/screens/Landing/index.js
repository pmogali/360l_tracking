import AsyncStorage from '@react-native-async-storage/async-storage';
import {API, Auth} from 'aws-amplify';
import React, {useState} from 'react';
import {Image, ImageBackground, StyleSheet, View} from 'react-native';
import CustomButtonOld from '../../components/CustomButtonOld';
import CustomText from '../../components/CustomText';
import CustomView from '../../components/CustomView';
import * as queries from '../../graphql/queries';

const queryStr = 'getUserInfo';

export default function Landing({navigation, authState}) {
  const [user, setUser] = useState(null);
  // console.log('Auth');

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      // setUser(authUser);
      await AsyncStorage.setItem('user', JSON.stringify(authUser));
      console.log(
        JSON.stringify(authUser.signInUserSession.idToken.payload.sub, null, 2),
      );
      // fetchData(authUser.signInUserSession.idToken.payload.sub);
    } catch (e) {
      // setUser(null);
      await AsyncStorage.setItem('user', null);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('user');
      if (value !== null) {
        // value previously stored
        // setUser(value);
      }
    } catch (e) {
      // error reading value
    }
  };

  const fetchData = async id => {
    try {
      const tripInfo = await API.graphql({
        query: queries[queryStr],
        variables: {id},
      });
      // setTripInfo(tripInfo?.data[queryStr]?.items);
      console.log(
        '\n User Info:',
        JSON.stringify(tripInfo.data[queryStr], null, 2),
      );
    } catch (e) {
      console.log('ERROR: ', JSON.stringify(e, null, 2));
    }
  };

  React.useEffect(() => {
    // checkUser();
  }, []);

  return (
    <CustomView f={1}>
      <CustomView f={2}>
        <ImageBackground
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          source={require('../../images/landing.png')}>
          <View style={{width: 130, height: 100, paddingTop: 60}}>
            <Image
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
              source={require('../../images/SiriusXM-Logo.png')}
            />
          </View>
          <View style={{width: 300, height: 100, paddingBottom: 30}}>
            <Image
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
              source={require('../../images/360LTracker.png')}
            />
          </View>
        </ImageBackground>
      </CustomView>
      <CustomView bgColor="#334856" p={20}>
        {/* <LinearGradient
          colors={['#FF00D6', '#FF4D00']}
          style={styles.linearGradient}>
          <Text style={styles.buttonText}>Sign in with Facebook</Text>
        </LinearGradient> */}
        <CustomText color="white" fontS="16">
          Track your daily events to help us improve our product offering and
          make SiriusXM the #1 audio entertain service.
        </CustomText>
        {/* <CustomText color="white" fontS="16">
          {!!user && JSON.stringify(user)}
        </CustomText> */}
        {/* <CustomText color="white" fontS="16">
          {JSON.stringify(location)}
        </CustomText> */}
        <CustomView fd="row" p={10}>
          <CustomButtonOld
            title="Log in"
            color="black"
            bgColor="white"
            w={50}
            brColor="black"
            onPress={() => {
              // getData();
              navigation.navigate('SignIn');
              // Auth.signOut();
              // Hub.dispatch('auth', {event: 'signIn'});
            }}
          />
          <CustomButtonOld
            title="Register"
            color="white"
            bgColor="black"
            w={50}
            onPress={() => navigation.navigate('SignUp')}
          />
        </CustomView>
      </CustomView>
    </CustomView>
  );
}

var styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});
