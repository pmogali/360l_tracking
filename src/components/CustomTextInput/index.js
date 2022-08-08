import React from 'react';
import {Controller} from 'react-hook-form';
import {StyleSheet, Text} from 'react-native';
import styled from 'styled-components';

const TextInput = styled.TextInput`
  height: ${props => props.h || '40'}px;
  border-width: ${props => props.brW || StyleSheet.hairlineWidth}px;
  padding: ${props => props.p || '10'}px;
  width: ${props => props.w || '100'}%;
`;

export default function CustomTextInput({
  h,
  brW,
  p,
  w,
  m,

  secureTextEntry,

  multiline = false,
  numberOfLines = 1,
  control,
  name,
  rules = {},
  placeholder,
}) {
  React.useEffect(() => {}, []);
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({field: {value, onChange, onBlur}, fieldState: {error}}) => (
        <>
          <TextInput
            h={h}
            brW={brW}
            p={p}
            w={w}
            m={m}
            onChangeText={onChange}
            secureTextEntry={secureTextEntry}
            value={value}
            multiline={multiline}
            numberOfLines={numberOfLines}
            onBlur={onBlur}
            placeholder={placeholder}
            style={{borderColor: error ? 'red' : 'black'}}
          />
          {error && (
            <Text style={{color: 'red', alignSelf: 'stretch'}}>
              {error.message || 'Error'}
            </Text>
          )}
        </>
      )}
    />
  );
}
