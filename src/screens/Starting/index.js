import Geolocation from '@react-native-community/geolocation';
import ActivityRecognition from 'react-native-activity-recognition';
import BackgroundService from 'react-native-background-actions';
import {API, Auth} from 'aws-amplify';
import moment from 'moment';
import React, {useEffect, useState, useContext} from 'react';
import {
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import CustomText from '../../components/CustomText';
import CustomView from '../../components/CustomView';
import {width} from '../../constants';

import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
const queryStr = 'getUserInfo';
const queryStr1 = 'createTripInfo';
const queryStr2 = 'createTripInfoVehicleInfo';
let intervalX;
let GeoConfig = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 10000,
};
const numberOfLines = 5;
let DefaultActivity = 'UNKNOWN';
let lt = 37.23365833333333;
let lg = -121.80182333333333;

const options = {
  taskName: 'SXM 360L Tracker',
  taskTitle: 'SXM 360L Tracker',
  taskDesc: '',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  color: '#ff00ff',
  linkingURI: '',
  parameters: {
    delay: 30000,
  },
};

export default function Starting({navigation}) {
  const [tripInfo, setTripInfo] = useState([]);
  const [recordActivities, setRecordActivities] = useState(false);

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);
  const [items1, setItems1] = React.useState([]);
  const [value1, setValue1] = React.useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [activity, setActivity] = useState(DefaultActivity);
  const [activities, setActivities] = useState([]);

  const checkUser = async () => {
    setLoading(true);
    try {
      const authUser = await Auth.currentAuthenticatedUser();
      setUser(authUser.signInUserSession.idToken.payload);
      fetchData(authUser.signInUserSession.idToken.payload.sub);
    } catch (e) {
      Alert.alert('Oops', JSON.stringify(e), [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
      console.log('Fetch Error:', e);
    }
  };
  const locationWatcher = async () => {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Access Required',
        message: 'This App needs to Access your location',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      setInterval(() => {
        Geolocation.getCurrentPosition(
          pos => {
            lt = pos?.coords?.latitude;
            lg = pos?.coords?.longitude;
          },
          error => {},
          GeoConfig,
        );
      }, 5000);
    }
  };

  const fetchData = async id => {
    try {
      const userInfo = await API.graphql({
        query: queries[queryStr],
        variables: {id},
      });
      setItems1(
        userInfo.data[queryStr].vehicleinfos.items.map(i => {
          return {
            label: `${i.vehicleInfo.Make} ${i.vehicleInfo.Model}`,
            value: i.vehicleInfo.id,
          };
        }),
      );

      setValue1(
        userInfo.data[queryStr].vehicleinfos.items?.find(
          e => e.vehicleInfo?.Selected,
        )?.vehicleInfo.id,
      );

      setLoading(false);
    } catch (e) {
      Alert.alert('Oops', JSON.stringify(e), [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);

      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
    // backAppRunning();
    locationWatcher();
    getActivity();
    let unsub = navigation.addListener('focus', () => {
      checkUser();
      // ActivityRecognition.stop();
    });

    return () => {
      unsub();
      // clearInterval(intervalX);
    };
  }, []);

  const getActivity = async () => {
    console.log('ACT', ActivityRecognition);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
        {
          title: 'ACTIVITY_RECOGNITION Access Required',
          message: 'This App needs to Access your ACTIVITY_RECOGNITION',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted) {
        console.log('Starting activity Record');
        const detectionIntervalMillis = 1000;
        const unsubscribe = await ActivityRecognition.subscribe(
          detectedActivities => {
            console.log('Activity1', detectedActivities);
            const mostProbableActivity = detectedActivities.sorted[0];
            console.log('Activity2', mostProbableActivity);
            DefaultActivity = mostProbableActivity.type;
            mostProbableActivity.confidence > 25 &&
              setActivity(mostProbableActivity.type);
          },
        );
        let resp = await ActivityRecognition.start(detectionIntervalMillis);
        console.log('After Start', resp);
      }
    } catch (error) {
      Alert.alert('Oops', JSON.stringify(error), [
        {
          text: 'OK',
          onPress: () => {},
        },
      ]);
      console.log('Activity Error', error);
    }
  };

  const backAppRunning = async () => {
    // await BackgroundService.stop();
    await BackgroundService.start(veryIntensiveTask, options);
  };

  const veryIntensiveTask = async taskDataArguments => {
    const {delay} = taskDataArguments;
    await new Promise(async resolve => {
      intervalX = setInterval(() => {
        createTrip();
      }, delay);
    });
  };

  const handleRecordActivities = async () => {
    if (!items1.length) {
      Alert.alert('', 'Please register atleast one vehicle');
      return;
    }
    if (!recordActivities) {
      if (Platform.OS !== 'ios') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        let gFlag = granted === PermissionsAndroid.RESULTS.GRANTED;
        if (!gFlag) {
          return;
        }
      }
      createTripWithGeo();
      setRecordActivities(!recordActivities);
      backAppRunning();
    } else {
      // setActivities([]);
      setRecordActivities(!recordActivities);
      clearInterval(intervalX);
      await BackgroundService.stop();
    }
  };
  // amplify pull --appId d1hvwuhp47fd9p --envName dev

  const createTripWithGeo = async () => {
    const now = new Date();

    let newTrip = {
      Event: `Recorded Event from ${user['cognito:username']}'s Phone`,
      Event_Time: now.toISOString(),
      Latitude: lt,
      Longitude: lg,
      Type: 'RECORDING',
      Notes: 'Recorded Note',
      Core_Motion: DefaultActivity,
    };

    setActivities(act => [
      ...act,
      `${moment(now).format('L')} ${moment(now).format(
        'LT',
      )} : ${DefaultActivity}  (${newTrip.Latitude.toFixed(
        5,
      )}, ${newTrip.Longitude.toFixed(5)})`,
    ]);
    // console.log(newTrip);
    // return;
    const newTripInfoData = await API.graphql({
      query: mutations[queryStr1],
      variables: {input: newTrip},
    });

    let newTripVehicleInfo = {
      vehicleInfoID: value1,
      tripInfoID: newTripInfoData?.data[queryStr1].id,
    };

    const newTripVehicleInfoData = await API.graphql({
      query: mutations[queryStr2],
      variables: {input: newTripVehicleInfo},
    });
    console.log(newTripVehicleInfoData);
  };
  const createTrip = async () => {
    try {
      createTripWithGeo();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CustomView f={1} bgColor="white" jc="space-between">
      <CustomView f="0.5"></CustomView>
      <CustomView f="3">
        <CustomView
          f="1"
          bbw={StyleSheet.hairlineWidth}
          ai="flex-start"
          jc="center">
          <TouchableOpacity
            style={{flex: 1, flexDirection: 'row'}}
            onPress={() =>
              !recordActivities
                ? Alert.alert('', 'Your activities will be tracked.', [
                    {
                      text: 'OK',
                      onPress: handleRecordActivities,
                    },
                    {
                      text: 'Cancel',
                      onPress: () => {},
                    },
                  ])
                : handleRecordActivities()
            }>
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: '#81BAE5',
                marginTop: 15,
                borderRadius: 31,
                marginLeft: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 36,
                  height: 36,
                  backgroundColor: recordActivities ? '#FF3A2F' : 'gray',
                  borderRadius: 18,
                  borderColor: 'white',
                  borderWidth: 1,
                }}></View>
            </View>
            <CustomText fontS={20} m={20} lh={25} style={{paddingTop: 10}}>
              {recordActivities ? 'Recording' : 'Record'} Activities
            </CustomText>
          </TouchableOpacity>
        </CustomView>
        <CustomView
          f="1"
          bbw={StyleSheet.hairlineWidth}
          ai="flex-start"
          jc="center">
          <TouchableOpacity
            style={{flex: 1, flexDirection: 'row'}}
            onPress={() => navigation.navigate('Log Activities')}>
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: '#81BAE5',
                marginTop: 15,
                borderRadius: 25,
                marginLeft: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Ionicon
                name="document-text-outline"
                size={30}
                color="#ffffff99"

                // onPress={() => navigation.navigate('Menu')}
              />
            </View>
            <CustomText fontS={20} m={20} lh={25} style={{paddingTop: 10}}>
              Log Activities
            </CustomText>
          </TouchableOpacity>
        </CustomView>
        <CustomView
          f="1"
          bbw={StyleSheet.hairlineWidth}
          ai="flex-start"
          jc="center">
          <TouchableOpacity
            style={{flex: 1, flexDirection: 'row'}}
            onPress={() =>
              navigation.jumpTo('SettingsStack', {screen: 'Select Vehicle'})
            }>
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: '#81BAE5',
                marginTop: 15,
                borderRadius: 25,
                marginLeft: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Image
                style={{
                  width: '70%',
                  resizeMode: 'contain',
                }}
                source={require('../../images/Group_80.png')}
              />
            </View>
            <CustomText fontS={20} m={20} lh={25} style={{paddingTop: 10}}>
              Select / Add New Vehicle
            </CustomText>
          </TouchableOpacity>
        </CustomView>
        <CustomView
          f="1"
          bbw={StyleSheet.hairlineWidth}
          ai="flex-start"
          jc="center">
          <TouchableOpacity style={{flex: 1, flexDirection: 'row'}}>
            <View
              style={{
                width: 50,
                height: 50,
                backgroundColor: '#81BAE5',
                marginTop: 15,
                borderRadius: 25,
                marginLeft: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Ionicon name="person-outline" size={30} color="#ffffff99" />
            </View>
            <CustomText fontS={20} m={20} lh={25} style={{paddingTop: 10}}>
              Manage Settings
            </CustomText>
          </TouchableOpacity>
        </CustomView>
      </CustomView>
      <View
        style={{
          flex: 2,
          borderWidth: StyleSheet.hairlineWidth,
          width: width - 20,
          height: 200,
          padding: 5,
          margin: 5,
        }}>
        <ScrollView style={{flex: 1, padding: 5}}>
          {activities.map((e, i) => (
            <Text
              style={{
                fontSize: 14,
                fontWeight: 'bold',
                color: '#FF3A2F',
                marginTop: 2,
              }}>
              {e}
            </Text>
          ))}
        </ScrollView>
      </View>
      {/* <CustomView f="2">
        <TextInput
          style={{
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: width - 20,
          }}
          placeholder={activities.join('\n')}
          value={activities.join(',\n')}
          multiline={true}
          editable={false}
          selectTextOnFocus={false}
          numberOfLines={Platform.OS === 'ios' ? null : numberOfLines}
          minHeight={
            Platform.OS === 'ios' && numberOfLines ? 20 * numberOfLines : null
          }
          textAlignVertical="top"
          placeholderTextColor="#FF3A2F"
        />
      </CustomView> */}
    </CustomView>
  );
}
