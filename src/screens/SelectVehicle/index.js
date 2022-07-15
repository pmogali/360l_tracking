import {API, Auth} from 'aws-amplify';
import React, {useEffect, useState} from 'react';
import {useForm} from 'react-hook-form';
import {ActivityIndicator, Platform, StyleSheet, View} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButton from '../../components/CustomButtonOld';
import CustomText from '../../components/CustomText';
import CustomTextInput from '../../components/CustomTextInput';
import CustomView from '../../components/CustomView';

import {headerHeight, height, width} from '../../constants';
import * as mutations from '../../graphql/mutations';
import * as queries from '../../graphql/queries';
const queryStr = 'createVehicleInfo';
const queryStr1 = 'createVehicleInfoUserInfo';
const queryStr2 = 'getUserInfo';
const queryStr3 = 'updateVehicleInfo';

export default function Register({route, navigation}) {
  const [page, setPage] = React.useState(1);
  const [items1, setItems1] = React.useState([]);
  const [value1, setValue1] = React.useState('');
  const [open1, setOpen1] = React.useState(false);
  const [loading, setLoading] = useState(true);
  console.log(route);

  const [user, setUser] = useState(null);
  const [btn, setBtn] = useState(1);

  const {control, handleSubmit, watch} = useForm();
  navigation.setOptions({headerTitle: 'Select / Add Vehicle'});

  useEffect(() => {
    checkUser();
    let unsub = navigation.addListener('blur', () => {
      clearData();
      navigation.reset({
        index: 0,
        routes: [{name: 'Settings'}],
      });
    });
    return () => {
      unsub();
    };
  }, []);
  useEffect(() => {
    if (route.params) {
      setPage(route.params.pageNo);
    }
  }, [route.params]);

  const checkUser = async () => {
    setLoading(true);

    try {
      const authUser = await Auth.currentAuthenticatedUser();
      setUser(authUser.signInUserSession.idToken.payload);
      fetchData(authUser.signInUserSession.idToken.payload.sub);
    } catch (e) {
      console.log('Fetch Error:', e);
    }
  };

  const fetchData = async id => {
    try {
      const userInfo = await API.graphql({
        query: queries[queryStr2],
        variables: {id},
      });
      setItems1(
        userInfo.data[queryStr2].vehicleinfos.items.map(i => {
          return {
            label: `${i.vehicleInfo.Make} ${i.vehicleInfo.Model}`,
            value: i.vehicleInfo.id,
          };
        }),
      );
      setValue1(
        userInfo.data[queryStr2].vehicleinfos.items?.find(
          e => e.vehicleInfo?.Selected,
        )?.vehicleInfo.id,
      );
      setLoading(false);
    } catch (e) {
      console.log('ERROR: ', JSON.stringify(e, null, 2));

      setLoading(false);
    }
  };

  const updateVehice = async () => {
    try {
      let vehicleInput = {
        Selected: true,
        id: value1,
      };
      // return console.log(vehicleInput);
      const newVehicle = await API.graphql({
        query: mutations[queryStr3],
        variables: {input: vehicleInput},
      });

      // console.log(items1);
      items1
        .filter(e => e.value !== value1)
        .forEach(async e => {
          let vehicleInputU = {
            Selected: false,
            id: e.value,
          };
          const nV = await API.graphql({
            query: mutations[queryStr3],
            variables: {input: vehicleInputU},
          });
        });
      navigation.navigate('Home', {screen: 'Menu'});
    } catch (error) {
      console.log('ERROR: ', JSON.stringify(error, null, 2));
    }
  };

  const handleSave = async data => {
    // return Auth.signOut();
    const {Make, Model, VIN, Year} = data;
    let vehicleInput = {
      Make: Make || '',
      Model: Model || '',
      Trim: '',
      VIN: VIN || '',
      Year: Year || '',
    };

    const newVehicle = await API.graphql({
      query: mutations[queryStr],
      variables: {input: vehicleInput},
    });
    const authUser = await Auth.currentAuthenticatedUser();

    let newVehicleUserInfo = {
      userInfoID: authUser.signInUserSession.idToken.payload.sub,
      vehicleInfoID: newVehicle?.data[queryStr].id,
    };

    const newVehicleUserInfoData = await API.graphql({
      query: mutations[queryStr1],
      variables: {input: newVehicleUserInfo},
    });
    clearData();
    navigation.navigate('Home', {screen: 'Menu'});
  };

  const handleVehicleSelect = data => {
    console.log(data());
    setBtn(2);
    setValue1(data());
  };

  const clearData = () => {
    setPage(1);
    setBtn(1);
  };

  if (!!loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <>
      {page === 1 && (
        <CustomView f={1} bgColor="white">
          <KeyboardAwareScrollView
            style={{
              flex: 1,
            }}
            contentContainerStyle={{
              width,
              height: height - headerHeight,
            }}>
            <CustomView f="4" ai="flex-start" jc="flex-start" p={10}>
              <CustomText fontS={16} m={5}>
                My Vehicles
              </CustomText>
              <DropDownPicker
                open={open1}
                value={value1}
                items={items1}
                setOpen={setOpen1}
                setValue={handleVehicleSelect}
                setItems={setItems1}
                loading={loading}
                style={{
                  borderWidth: StyleSheet.hairlineWidth,
                  borderRadius: 0,
                  borderColor: 'grey',
                  padding: 0,
                  marginTop: 10,
                  marginBottom: 20,
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
                }}
                placeholder="Select a Vehicle"
              />
            </CustomView>
            <CustomView f="1" ai="center" p={10}>
              {btn === 1 && (
                <CustomButton
                  title="Add Another Vehicle"
                  color="white"
                  bgColor="#324ea1"
                  brColor="#324ea1"
                  w={100}
                  onPress={() => setPage(page + 1)}
                />
              )}
              {btn === 2 && (
                <CustomButton
                  title="Save"
                  color="white"
                  bgColor="#324ea1"
                  brColor="#324ea1"
                  w={100}
                  onPress={() => {
                    updateVehice();
                    // setPage(1);
                    // setBtn(1);
                    // navigation.navigate('Home', {screen: 'Menu'});
                  }}
                />
              )}
            </CustomView>
            <CustomView f="0.2" ai="center" p={10}></CustomView>
          </KeyboardAwareScrollView>
        </CustomView>
      )}
      {page === 2 && (
        <KeyboardAwareScrollView
          style={{
            flex: 1,
          }}
          contentContainerStyle={{
            width,
            height: height - headerHeight,
          }}>
          <CustomView f={1} bgColor="white" jc="space-between">
            <CustomView f="4" ai="flex-start" jc="flex-start" p={10}>
              <CustomText fontS={16} m={5}>
                Auto Make
              </CustomText>
              <CustomTextInput
                brW={StyleSheet.hairlineWidth}
                name="Make"
                control={control}
                rules={{
                  required: 'Auto Make is required',
                  minLength: {
                    value: 3,
                    message: 'Auto Make should be at least 3 characters long',
                  },
                }}
              />
              <CustomText fontS={16} m={5}>
                Auto Model
              </CustomText>
              <CustomTextInput
                brW={StyleSheet.hairlineWidth}
                name="Model"
                control={control}
                rules={{
                  required: 'Auto Model is required',
                  minLength: {
                    value: 3,
                    message: 'Auto Model should be at least 3 characters long',
                  },
                }}
              />
              <CustomText fontS={16} m={5}>
                Year
              </CustomText>

              <CustomTextInput
                brW={StyleSheet.hairlineWidth}
                name="Year"
                control={control}
              />
              <CustomText fontS={16} m={5}>
                Vehicle Identification Number (VIN)
              </CustomText>
              <CustomTextInput
                brW={StyleSheet.hairlineWidth}
                name="VIN"
                control={control}
                rules={{
                  required: 'VIN is required',
                  minLength: {
                    value: 3,
                    message: 'VIN should be at least 3 characters long',
                  },
                }}
              />
            </CustomView>
            <CustomView f="1" ai="center" p={10}>
              <CustomButton
                title="Save"
                color="white"
                bgColor="#324ea1"
                brColor="#324ea1"
                w={100}
                onPress={handleSubmit(handleSave)}
              />
            </CustomView>
            <CustomView f="0.2" ai="center" p={10}></CustomView>
          </CustomView>
        </KeyboardAwareScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    width: '100%',
  },
});
