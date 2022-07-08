import {Auth} from 'aws-amplify';
import React from 'react';

import {Alert, StyleSheet} from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
import {useForm} from 'react-hook-form';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButtonOld from '../../components/CustomButtonOld';
import CustomText from '../../components/CustomText';
import CustomTextInput from '../../components/CustomTextInput';
import CustomView from '../../components/CustomView';
import {headerHeight, height, width} from '../../constants';

const queryStr = 'createVehicleInfo';
const queryStr1 = 'createVehicleInfoUserInfo';
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

export default function Register({navigation}) {
  const [number, onChangeNumber] = React.useState('');
  const [text, onChangeText] = React.useState('');
  const [autoMake, onChangeAutoMake] = React.useState('');
  const [autoModel, onChangeAutoModel] = React.useState('');
  const [autoYear, onChangeAutoYear] = React.useState('');
  const [autoVin, onChangeAutoVin] = React.useState('');
  const [page, setPage] = React.useState(1);
  const {control, handleSubmit, watch} = useForm();
  const pwd = watch('password');

  navigation.setOptions({headerTitle: 'Register: User Details'});

  // const navigation = useNavigation();

  const onRegisterPressed = async data => {
    const {username, password, email, name} = data;
    try {
      let newAuth = await Auth.signUp({
        username,
        password,
        attributes: {email, name, preferred_username: username},
      });
      console.log('New Auth', JSON.stringify(newAuth, null, 2));
      navigation.navigate('ConfirmEmail', {username});
      let response = {
        user: {
          username: 'sushil_amplify3',
          pool: {
            userPoolId: 'us-east-1_tiqv194EZ',
            clientId: '783ju5sbnvi16mm0ac95li2hle',
            client: {
              endpoint: 'https://cognito-idp.us-east-1.amazonaws.com/',
              fetchOptions: {},
            },
            advancedSecurityDataCollectionFlag: true,
          },
          Session: null,
          client: {
            endpoint: 'https://cognito-idp.us-east-1.amazonaws.com/',
            fetchOptions: {},
          },
          signInUserSession: null,
          authenticationFlowType: 'USER_SRP_AUTH',
          keyPrefix:
            'CognitoIdentityServiceProvider.783ju5sbnvi16mm0ac95li2hle',
          userDataKey:
            'CognitoIdentityServiceProvider.783ju5sbnvi16mm0ac95li2hle.sushil_amplify3.userData',
        },
        userConfirmed: false,
        userSub: '7ad2cbf5-faad-46e9-b791-84ce2cf14f5a',
      };
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  // const handleSubmit = async () => {
  //   // return Auth.signOut();
  //   let vehicleInput = {
  //     Make: autoMake,
  //     Model: autoModel,
  //     Trim: '',
  //     VIN: text,
  //     Year: autoYear,
  //   };
  //   // return console.log(vehicleInput);
  //   const newVehicle = await API.graphql({
  //     query: mutations[queryStr],
  //     variables: {input: vehicleInput},
  //   });
  //   const authUser = await Auth.currentAuthenticatedUser();

  //   let newVehicleUserInfo = {
  //     userInfoID: authUser.signInUserSession.idToken.payload.sub,
  //     vehicleInfoID: newVehicle?.data[queryStr].id,
  //   };

  //   const newVehicleUserInfoData = await API.graphql({
  //     query: mutations[queryStr1],
  //     variables: {input: newVehicleUserInfo},
  //   });

  //   navigation.navigate('Home');
  // };
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
                Full Name
              </CustomText>
              <CustomTextInput
                brW={1}
                name="name"
                control={control}
                rules={{
                  required: 'Name is required',
                  minLength: {
                    value: 3,
                    message: 'Name should be at least 3 characters long',
                  },
                  maxLength: {
                    value: 24,
                    message: 'Name should be max 24 characters long',
                  },
                }}
              />

              <CustomText fontS={16} m={5}>
                Username
              </CustomText>
              <CustomTextInput
                brW={1}
                name="username"
                control={control}
                rules={{
                  required: 'Username is required',
                  minLength: {
                    value: 3,
                    message: 'Username should be at least 3 characters long',
                  },
                  maxLength: {
                    value: 24,
                    message: 'Username should be max 24 characters long',
                  },
                }}
              />
              <CustomText fontS={16} m={5}>
                Email Address
              </CustomText>
              <CustomTextInput
                brW={1}
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {value: EMAIL_REGEX, message: 'Email is invalid'},
                }}
              />
              <CustomText fontS={16} m={5}>
                Password
              </CustomText>
              <CustomTextInput
                brW={1}
                name="password"
                control={control}
                secureTextEntry
                rules={{
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password should be at least 8 characters long',
                  },
                }}
              />
              <CustomText fontS={16} m={5}>
                Confirm Password
              </CustomText>
              <CustomTextInput
                brW={1}
                name="password-repeat"
                control={control}
                secureTextEntry
                rules={{
                  validate: value => value === pwd || 'Password do not match',
                }}
              />
            </CustomView>
            <CustomView f="1" ai="center" p={10}>
              <CustomButtonOld
                title="Register"
                color="white"
                bgColor="#324ea1"
                brColor="#324ea1"
                w={100}
                onPress={handleSubmit(onRegisterPressed)}
              />
            </CustomView>
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
              {/* <DropDownPicker
                open={open1}
                value={value1}
                items={items1}
                setOpen={setOpen1}
                setValue={setValue1}
                setItems={setItems1}
                style={{
                  borderWidth: 1,
                  borderRadius: 0,
                  height: 30,
                  padding: 0,
                  marginTop: 10,
                  marginBottom: 20,
                  maxHeight: 20,
                }}
                zIndex={3000}
                zIndexInverse={1000}
              /> */}
              <CustomTextInput
                brW={1}
                onChangeText={onChangeAutoMake}
                placeholder=""
                value={autoMake}
              />
              <CustomText fontS={16} m={5}>
                Auto Model
              </CustomText>
              {/* <DropDownPicker
                open={open2}
                value={value2}
                items={items2}
                setOpen={setOpen2}
                setValue={setValue2}
                setItems={setItems2}
                style={{
                  borderWidth: 1,
                  borderRadius: 0,
                  height: 30,
                  padding: 0,
                  marginTop: 10,
                  marginBottom: 20,
                  maxHeight: 20,
                }}
                zIndex={2000}
                zIndexInverse={2000}
              /> */}
              <CustomTextInput
                brW={1}
                onChangeText={onChangeAutoModel}
                placeholder=""
                value={autoModel}
              />
              <CustomText fontS={16} m={5}>
                Year
              </CustomText>
              {/* <DropDownPicker
                open={open3}
                value={value3}
                items={items3}
                setOpen={setOpen3}
                setValue={setValue3}
                setItems={setItems3}
                style={{
                  borderWidth: 1,
                  borderRadius: 0,
                  height: 30,
                  padding: 0,
                  marginTop: 10,
                  marginBottom: 30,
                  maxHeight: 20,
                }}
                zIndex={1000}
                zIndexInverse={3000}
              /> */}
              <CustomTextInput
                brW={1}
                onChangeText={onChangeAutoYear}
                placeholder=""
                value={autoYear}
              />
              <CustomText fontS={16} m={5}>
                Vehicle Identification Number (VIN)
              </CustomText>
              <CustomTextInput
                brW={1}
                onChangeText={onChangeAutoVin}
                placeholder=""
                value={autoVin}
              />
            </CustomView>
            <CustomView f="1" ai="center" p={10}>
              <CustomButtonOld
                title="Submit"
                color="white"
                bgColor="#324ea1"
                brColor="#324ea1"
                w={100}
                onPress={handleSubmit}
              />
            </CustomView>
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
