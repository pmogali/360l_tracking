import {useRoute} from '@react-navigation/native';
import {Auth} from 'aws-amplify';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Alert, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButtonOld from '../../components/CustomButtonOld';
import CustomText from '../../components/CustomText';
import CustomInput from '../../components/CustomTextInput';
import CustomView from '../../components/CustomView';

import {headerHeight, height, width} from '../../constants';

const ConfirmEmailScreen = ({navigation}) => {
  const route = useRoute();
  const {control, handleSubmit, watch} = useForm({
    defaultValues: {username: route?.params?.username},
  });

  const username = watch('username');

  // const navigation = useNavigation();

  const onConfirmPressed = async data => {
    try {
      await Auth.confirmSignUp(data.username, data.code);
      navigation.navigate('SignIn');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };

  const onResendPress = async () => {
    try {
      await Auth.resendSignUp(username);
      Alert.alert('Success', 'Code was resent to your email');
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
  };
  React.useEffect(() => {}, []);
  return (
    <CustomView f={1} bgColor="white">
      <KeyboardAwareScrollView
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          width,
          height: height - headerHeight,
        }}>
        <CustomView f="2" ai="flex-start" jc="flex-start" p={10}>
          {/* <Text style={styles.title}>Confirm your email</Text>

        <CustomInput
          name="username"
          control={control}
          placeholder="Username"
          rules={{
            required: 'Username code is required',
          }}
        />

        <CustomInput
          name="code"
          control={control}
          placeholder="Enter your confirmation code"
          rules={{
            required: 'Confirmation code is required',
          }}
        /> */}

          <CustomText fontS={16} m={5}>
            Username
          </CustomText>
          <CustomInput
            brW={1}
            name="username"
            control={control}
            rules={{
              required: 'Username is required',
            }}
          />
          <CustomText fontS={16} m={5}>
            Confirmation Code
          </CustomText>
          <CustomInput
            brW={1}
            name="code"
            control={control}
            rules={{
              required: 'Confirmation code is required',
            }}
          />
        </CustomView>
        <CustomView f="2" ai="center" jc="flex-start" p={10}>
          <CustomButtonOld
            title="Confirm"
            onPress={handleSubmit(onConfirmPressed)}
            color="white"
            bgColor="#324ea1"
            brColor="#324ea1"
            w={100}
          />

          <CustomButtonOld
            title="Resend code"
            onPress={onResendPress}
            color="white"
            bgColor="#324ea1"
            brColor="#324ea1"
            w={100}
          />

          <CustomButtonOld
            title="Back to Sign in"
            onPress={onSignInPress}
            color="white"
            bgColor="#324ea1"
            brColor="#324ea1"
            w={100}
          />
        </CustomView>
        <CustomView f="5" ai="center" jc="space-between" p={10}></CustomView>
      </KeyboardAwareScrollView>
    </CustomView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#051C60',
    margin: 10,
  },
  text: {
    color: 'gray',
    marginVertical: 10,
  },
  link: {
    color: '#FDB075',
  },
});

export default ConfirmEmailScreen;
