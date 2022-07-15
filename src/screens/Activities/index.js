import Geolocation from '@react-native-community/geolocation';
import {API, Auth, DataStore} from 'aws-amplify';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import NetInfo from '@react-native-community/netinfo';
import {
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import FontistoIcon from 'react-native-vector-icons/Fontisto';
import CustomButton from '../../components/CustomButtonOld';
import CustomText from '../../components/CustomText';
import CustomTextInput from '../../components/CustomTextInput';
import {headerHeight, height, width} from '../../constants';
import {TripInfo, TripInfoVehicleInfo} from '../../models';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
import AsyncStorage from '@react-native-async-storage/async-storage';

const queryStr = 'getUserInfo';
const queryStr1 = 'createTripInfo';
const queryStr2 = 'createTripInfoVehicleInfo';
const today = new Date();
const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const daysInWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const hours = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
];

const minutes = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
  '09',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
  '19',
  '20',
  '21',
  '22',
  '23',
  '24',
  '25',
  '26',
  '27',
  '28',
  '29',
  '30',
  '31',
  '32',
  '33',
  '34',
  '35',
  '36',
  '37',
  '38',
  '39',
  '40',
  '41',
  '42',
  '43',
  '44',
  '45',
  '46',
  '47',
  '48',
  '49',
  '50',
  '51',
  '52',
  '53',
  '54',
  '55',
  '56',
  '57',
  '58',
  '59',
];
const AMPMs = ['AM', 'PM'];
const numberOfLines = 5;
let isOffline = false;
let GeoConfig = {
  enableHighAccuracy: true,
  timeout: 20000,
  maximumAge: 10000,
};

export default function Activities({navigation}) {
  const [event, onChangeEvent] = React.useState('');
  const [note, onChangeNote] = React.useState('');
  const [open1, setOpen1] = React.useState(false);
  const [value1, setValue1] = React.useState(null);
  const [items1, setItems1] = React.useState([]);

  const [openHH, setOpenHH] = React.useState(false);
  const [valueHH, setValueHH] = React.useState(0);
  const [itemsHH, setItemsHH] = React.useState([
    ...hours.map(hh => {
      return {
        label: hh,
        value: +hh,
      };
    }),
  ]);

  const [openMM, setOpenMM] = React.useState(false);
  const [valueMM, setValueMM] = React.useState(0);
  const [itemsMM, setItemsMM] = React.useState([
    ...minutes.map(mm => {
      return {
        label: mm,
        value: +mm,
      };
    }),
  ]);

  const [openAMPM, setOpenAMPM] = React.useState(false);
  const [valueAMPM, setValueAMPM] = React.useState('AM');
  const [itemsAMPM, setItemsAMPM] = React.useState([
    ...AMPMs.map(ampm => {
      return {
        label: ampm,
        value: ampm,
      };
    }),
  ]);

  const [loading, setLoading] = useState(true);
  const [loading2, setLoading2] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [user, setUser] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const {control, handleSubmit, watch, reset} = useForm();
  const [dateToFormat, setDateToFormat] = useState(null);

  const minDate = new Date(2020, 1, 1); // Today
  const maxDate = new Date();
  const startDate = selectedStartDate ? selectedStartDate.toISOString() : '';
  const endDate = selectedEndDate ? selectedEndDate.toISOString() : '';

  const onDateChange = (date, type) => {
    if (type === 'END_DATE') {
      setSelectedEndDate(new Date(date));
    } else {
      setSelectedStartDate(new Date(date));
      setSelectedEndDate(new Date(date));
    }

    let datesd = date;
    setDateToFormat(moment(datesd).format('l'));
    setShowCalendar(false);
  };
  const checkUser = async () => {
    // StartDataStore();

    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        isOffline = false;
      } else {
        isOffline = true;
      }
      console.log(isOffline);
    });
    setLoading(true);
    try {
      const authUser = await Auth.currentAuthenticatedUser({bypassCache: true});
      // console.log(authUser);
      setUser(authUser.signInUserSession.idToken.payload);
      fetchData(authUser.signInUserSession.idToken.payload.sub);
      setLoading(false);
    } catch (e) {
      setLoading(false);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
    Geolocation.getCurrentPosition(
      pos => {
        setLatitude(pos?.coords?.latitude);
        setLongitude(pos?.coords?.longitude);
      },
      error => {},
      GeoConfig,
    );
    let watchId = Geolocation.watchPosition(
      pos => {
        setLatitude(pos?.coords?.latitude);
        setLongitude(pos?.coords?.longitude);
      },
      error => {},
      GeoConfig,
    );

    let unsub = navigation.addListener('blur', () => {
      clearData();
    });

    let unsub2 = navigation.addListener('focus', () => {
      checkUser();
    });

    return () => {
      unsub();
      unsub2();
      // clearInterval(intervalX);
    };

    return () => {
      Geolocation.clearWatch(watchId);
      unsub();
    };
  }, []);

  const createTripWithGeo = data => {
    const now = !!dateToFormat
      ? new Date(`${dateToFormat} ${valueHH}:${valueMM} ${valueAMPM}`)
      : new Date();
    Geolocation.getCurrentPosition(
      async pos => {
        let newTrip = {
          Event: data.Event,
          Event_Time: now.toISOString(),
          Latitude: pos?.coords?.latitude,
          Longitude: pos?.coords?.longitude,
          Type: 'MANUAL',
          Notes: note,
          Core_Motion: '',
        };

        // Offline Code ------------------
        if (isOffline) {
          const tripsList = await AsyncStorage.getItem('Trips');
          let trips = tripsList != null ? JSON.parse(tripsList) : [];
          const newTripInfoData1 = await DataStore.save(new TripInfo(newTrip));
          const {
            id,
            Event,
            Event_Time,
            Notes,
            Latitude,
            Longitude,
            Type,
            Core_Motion,
          } = newTripInfoData1;
          trips.push({
            id,
            Event,
            Event_Time,
            Notes,
            Latitude,
            Longitude,
            Type,
            Core_Motion,
          });
          await AsyncStorage.setItem('Trips', JSON.stringify(trips));

          let newTripVehicleInfo1 = {
            vehicleInfoID: value1,
            tripInfoID: newTripInfoData1?.id,
          };

          const newTripVehicleInfoData1 = await DataStore.save(
            new TripInfoVehicleInfo(newTripVehicleInfo1),
          );

          const {id: tvId} = newTripVehicleInfoData1;
          const vInfoList = await AsyncStorage.getItem('TripVehicleInfos');
          let vinfos = vInfoList != null ? JSON.parse(vInfoList) : [];
          vinfos.push({
            id: tvId,
            tripInfoID: newTripVehicleInfoData1.tripInfo.id,
            vehicleInfoID: newTripVehicleInfoData1.vehicleInfo.id,
          });
          await AsyncStorage.setItem(
            'TripVehicleInfos',
            JSON.stringify(vinfos),
          );

          return Alert.alert('Success', 'Activity added successfully.', [
            {
              text: 'OK',
              onPress: () => {
                clearData();
                navigation.navigate('Menu');
              },
            },
          ]);
        }

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

        Alert.alert('Success', 'Activity added successfully.', [
          {
            text: 'OK',
            onPress: () => {
              clearData();
              navigation.navigate('Menu');
            },
          },
        ]);
      },
      error => {},
      GeoConfig,
    );
  };
  const handleSave = async data => {
    if (!items1.length) {
      Alert.alert('', 'Please register atleast one vehicle');
      return;
    }
    setLoading2(true);
    try {
      if (Platform.OS === 'ios') {
        createTripWithGeo(data);
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
            createTripWithGeo(data);
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
      // return console.log(newTrip);
    } catch (error) {
      Alert.alert('Error', 'Something went wrong.', [
        {text: 'OK', onPress: () => clearData()},
      ]);
    }
    setLoading2(false);
  };
  const clearData = () => {
    setValue1(null);
    onChangeEvent('');
    onChangeNote('');
    reset();
    // setLoading(true);
  };

  if (!!loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <KeyboardAwareScrollView
      style={{
        flex: 1,
      }}
      contentContainerStyle={{
        width,
        height: height - headerHeight,
      }}>
      <View style={{flex: 1, padding: 20, backgroundColor: 'white'}}>
        <View
          style={{
            flex: 0.1,
            width,
            flexDirection: 'row',
            backgroundColor: 'white',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flex: 4,
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              alignContent: 'flex-start',
            }}>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                marginTop: 5,
              }}
              onPress={() => setShowCalendar(!showCalendar)}>
              <FontistoIcon name="nav-icon-grid" size={15} />
              <Text style={{marginLeft: 10}}>Calendar</Text>
            </TouchableOpacity>
          </View>
          {!!showCalendar && (
            <View
              style={{
                flex: 3,
                flexDirection: 'row',
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 5,
                }}
                onPress={() => setShowCalendar(!showCalendar)}>
                <FontistoIcon name="close" size={15} />
                <Text style={{marginLeft: 10}}>Close</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {!!showCalendar && (
          <View
            style={{
              flex: 1,
              backgroundColor: 'white',
            }}>
            <CalendarPicker
              startFromMonday={true}
              allowRangeSelection={false}
              minDate={minDate}
              maxDate={maxDate}
              todayBackgroundColor="#f2e6ff"
              selectedDayColor="#7300e6"
              selectedDayTextColor="#FFFFFF"
              onDateChange={onDateChange}
            />
          </View>
        )}

        <View style={{flex: 0.8, padding: 10, marginTop: -20}}>
          <View style={{flexDirection: 'row', marginBottom: 20}}>
            <Text>
              {
                MONTHS[
                  !!selectedStartDate
                    ? selectedStartDate.getMonth()
                    : today.getMonth()
                ]
              }{' '}
              {!!selectedStartDate
                ? selectedStartDate.getDate()
                : today.getDate()}
            </Text>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                marginTop: -5,
                marginLeft: 10,
              }}>
              {
                daysInWeek[
                  !!selectedStartDate
                    ? selectedStartDate.getDay()
                    : today.getDay()
                ]
              }
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              height: 100,
            }}>
            <View style={{marginTop: -2}}>
              <DropDownPicker
                listMode="SCROLLVIEW"
                open={openHH}
                value={valueHH}
                items={itemsHH}
                setOpen={setOpenHH}
                setValue={setValueHH}
                setItems={setItemsHH}
                loading={loading}
                style={{
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: 'grey',
                  borderRadius: 0,
                  padding: 0,
                  marginBottom: 20,
                  width: 100,
                }}
                dropDownContainerStyle={{
                  borderWidth:
                    Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 0,
                  borderRadius: 5,
                  shadowOffset: {
                    width: 4,
                    height: -4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 4.65,
                  elevation: 8,
                  width: 100,
                }}
                placeholder="HH"
                zIndex={4000}
                zIndexInverse={1000}
              />
            </View>
            <View style={{marginTop: -2}}>
              <DropDownPicker
                listMode="SCROLLVIEW"
                open={openMM}
                value={valueMM}
                items={itemsMM}
                setOpen={setOpenMM}
                setValue={setValueMM}
                setItems={setItemsMM}
                loading={loading}
                style={{
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: 'grey',
                  borderRadius: 0,
                  padding: 0,
                  marginBottom: 20,
                  width: 100,
                }}
                dropDownContainerStyle={{
                  borderWidth:
                    Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 0,
                  borderRadius: 5,
                  shadowOffset: {
                    width: 4,
                    height: -4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 4.65,
                  elevation: 8,
                  width: 100,
                }}
                placeholder="MM"
                zIndex={4000}
                zIndexInverse={1000}
              />
            </View>
            <View style={{marginTop: -2}}>
              <DropDownPicker
                listMode="SCROLLVIEW"
                open={openAMPM}
                value={valueAMPM}
                items={itemsAMPM}
                setOpen={setOpenAMPM}
                setValue={setValueAMPM}
                setItems={setItemsAMPM}
                loading={loading}
                style={{
                  borderWidth: StyleSheet.hairlineWidth,
                  borderColor: 'grey',
                  borderRadius: 0,
                  padding: 0,
                  marginBottom: 20,
                  width: 100,
                }}
                dropDownContainerStyle={{
                  borderWidth:
                    Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 0,
                  borderRadius: 5,
                  shadowOffset: {
                    width: 4,
                    height: -4,
                  },
                  shadowOpacity: 0.3,
                  shadowRadius: 4.65,
                  elevation: 8,
                  width: 100,
                }}
                placeholder="AM"
                zIndex={4000}
                zIndexInverse={1000}
              />
            </View>
          </View>
          <CustomText fontS={16} m={5} style={{marginTop: 60}}>
            Vehicle
          </CustomText>
          <DropDownPicker
            open={open1}
            value={value1}
            items={items1}
            setOpen={setOpen1}
            setValue={setValue1}
            setItems={setItems1}
            loading={loading}
            style={{
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: 'grey',
              borderRadius: 0,
              padding: 0,

              marginBottom: 10,
            }}
            dropDownContainerStyle={{
              borderWidth: Platform.OS === 'ios' ? StyleSheet.hairlineWidth : 0,
              borderRadius: 5,
              shadowOffset: {
                width: 4,
                height: -4,
              },
              shadowOpacity: 0.3,
              shadowRadius: 4.65,
              elevation: 8,
            }}
            placeholder="Select a Vehicle"
            zIndex={3000}
            zIndexInverse={2000}
          />
          <CustomText fontS={16} m={5}>
            Events
          </CustomText>
          <CustomTextInput
            brW={StyleSheet.hairlineWidth}
            name="Event"
            control={control}
            rules={{
              required: 'Event Title is required',
              minLength: {
                value: 3,
                message: 'Event Title should be at least 3 characters long',
              },
            }}
          />
          <CustomText fontS={16} m={5}>
            Notes
          </CustomText>
          <TextInput
            style={{
              borderWidth: StyleSheet.hairlineWidth,
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}
            onChangeText={onChangeNote}
            value={note}
            multiline={true}
            numberOfLines={Platform.OS === 'ios' ? null : numberOfLines}
            minHeight={
              Platform.OS === 'ios' && numberOfLines ? 20 * numberOfLines : null
            }
            textAlignVertical="top"
          />
          <View
            style={{
              marginTop: 50,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <CustomButton
              title="Submit"
              color="white"
              bgColor={loading2 ? 'rgba(50, 78, 161, 0.7)' : '#324ea1'}
              brColor={loading2 ? 'rgba(50, 78, 161, 0.7)' : '#324ea1'}
              w={100}
              disabled={loading2}
              onPress={handleSubmit(handleSave)}
            />
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
