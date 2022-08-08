import {Auth} from 'aws-amplify';
import React from 'react';
import {useForm} from 'react-hook-form';
import {Alert, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomButtonOld from '../../components/CustomButtonOld';
import CustomText from '../../components/CustomText';
import CustomTextInput from '../../components/CustomTextInput';
import CustomView from '../../components/CustomView';
import {headerHeight, height, width} from '../../constants';
export default function Login({navigation}) {
  const [loading, setLoading] = React.useState(false);
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();
  navigation.setOptions({headerTitle: 'Login'});
  const onSignInPressed = async data => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await Auth.signIn(data.username, data.password);
      console.log(response);
    } catch (e) {
      console.log('user', e);
      Alert.alert('Oops', e.message);
    }
    setLoading(false);
  };

  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };
  return (
    <CustomView f={1} bgColor="white" jc="space-between">
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
            Username
          </CustomText>
          <CustomTextInput
            name="username"
            // placeholder="Username"
            control={control}
            rules={{required: 'Username is required'}}
          />
          <CustomText fontS={16} m={5}>
            Password
          </CustomText>
          <CustomTextInput
            secureTextEntry={true}
            name="password"
            // placeholder="Password"
            control={control}
            rules={{
              required: 'Password is required',
              minLength: {
                value: 3,
                message: 'Password should be minimum 3 characters long',
              },
            }}
          />
        </CustomView>
        <CustomView f="1" ai="flex-end">
          <CustomButtonOld
            title={loading ? 'Loading...' : 'Login'}
            onPress={handleSubmit(onSignInPressed)}
            color="white"
            bgColor="#324ea1"
            brColor="#324ea1"
            w={96}
            // onPress={() => navigation.navigate('Home')}
          />
        </CustomView>
      </KeyboardAwareScrollView>
    </CustomView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 10,
    width: '100%',
  },
});
