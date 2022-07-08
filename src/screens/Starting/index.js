import Geolocation from '@react-native-community/geolocation';
// import ActivityRecognition from 'react-native-activity-recognition';
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
let DefaultActivity = 'STILL';

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

let APP_To_Call = () => {
  console.log('App');
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

  const fetchData = async id => {
    try {
      const userInfo = await API.graphql({
        query: queries[queryStr],
        variables: {id},
      });
      // console.log('User Info', userInfo);

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
    let unsub = navigation.addListener('focus', () => {
      checkUser();
      // ActivityRecognition.stop();
    });

    return () => {
      unsub();
      // clearInterval(intervalX);
    };
  }, []);

  // const getActivity = async () => {
  //   try {
  //     const detectionIntervalMillis = 1000;
  //     await ActivityRecognition.start(detectionIntervalMillis);
  //     const unsubscribe = ActivityRecognition.subscribe(detectedActivities => {
  //       const mostProbableActivity = detectedActivities.sorted[0];
  //       console.log('Activity', mostProbableActivity);
  //       mostProbableActivity.confidence > 75 &&
  //         setActivity(mostProbableActivity.type);
  //     });
  //   } catch (error) {
  //     Alert.alert('Oops', JSON.stringify(error), [
  //       {
  //         text: 'OK',
  //         onPress: () => {},
  //       },
  //     ]);
  //     console.log('Activity Error', error);
  //   }
  // };

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
      createTrip();
      setRecordActivities(!recordActivities);
      backAppRunning();
    } else {
      setActivities([]);
      setRecordActivities(!recordActivities);
      await BackgroundService.stop();
      clearInterval(intervalX);
    }
  };
  // amplify pull --appId d1hvwuhp47fd9p --envName dev

  const createTripWithGeo = async () => {
    let flag = false;
    const now = new Date();
    Geolocation.getCurrentPosition(
      async pos => {
        let newTrip = {
          Event: `Recorded Event from ${user['cognito:username']}'s Phone`,
          Event_Time: now.toISOString(),
          Latitude: pos?.coords?.latitude,
          Longitude: pos?.coords?.longitude,
          Type: 'RECORDING',
          Notes: 'Recorded Note',
          Core_Motion: activity,
        };
        flag = true;
        console.log(newTrip);
        setActivities(act =>
          act.length > 10
            ? [
                `${moment(now).format('L')} ${moment(now).format(
                  'LT',
                )} :  (${newTrip.Latitude.toFixed(
                  5,
                )}, ${newTrip.Longitude.toFixed(5)})`,
              ]
            : [
                ...act,
                `${moment(now).format('L')} ${moment(now).format(
                  'LT',
                )} :  (${newTrip.Latitude.toFixed(
                  5,
                )}, ${newTrip.Longitude.toFixed(5)})`,
              ],
        );

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
      },
      error => {},
      GeoConfig,
    );
    if (!flag) {
      let newTrip = {
        Event: `Recorded Event from ${user['cognito:username']}'s Phone`,
        Event_Time: now.toISOString(),
        Latitude: 0.66,
        Longitude: 0.66,
        Type: 'RECORDING',
        Notes: 'Recorded Note',
        Core_Motion: activity,
      };
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
    }
  };
  const createTrip = async () => {
    console.log('working');

    try {
      if (Platform.OS === 'ios') {
        createTripWithGeo();
      } else {
        try {
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
            console.log('working till here');
            createTripWithGeo();
          } else {
            Alert.alert('Oops', 'Location Permission Denied', [
              {
                text: 'OK',
                onPress: () => {
                  PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                      title: 'Location Access Required',
                      message: 'This App needs to Access your location',
                      buttonNeutral: 'Ask Me Later',
                      buttonNegative: 'Cancel',
                      buttonPositive: 'OK',
                    },
                  );
                },
              },
            ]);
          }
        } catch (err) {
          console.warn(err);
        }
      }
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
              <Ionicon
                name="person-outline"
                size={30}
                color="#ffffff99"

                // onPress={() => navigation.navigate('Menu')}
              />
            </View>
            <CustomText fontS={20} m={20} lh={25} style={{paddingTop: 10}}>
              Manage Settings
            </CustomText>
          </TouchableOpacity>
        </CustomView>
      </CustomView>

      <CustomView f="2">
        <TextInput
          style={{
            borderWidth: StyleSheet.hairlineWidth,
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
      </CustomView>
    </CustomView>
  );
}
