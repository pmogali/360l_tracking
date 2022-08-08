import React from 'react';
import {Pressable, Text, View} from 'react-native';

export default function recorder() {
  const _onLongPress = () => {
    alert('Long Pressed');
  };

  const _onPressOut = () => {
    alert('Pressed out');
  };

  return (
    <View>
      <Pressable onLongPress={_onLongPress} onPressOut={_onPressOut}>
        <Text>Record</Text>
      </Pressable>
    </View>
  );
}
