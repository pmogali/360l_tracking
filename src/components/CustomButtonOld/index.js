import React from 'react';
import styled from 'styled-components';
const ButtonContainer = styled.TouchableOpacity`
  background-color: ${props => props.bgColor || 'palevioletred'};
  padding: 10px 30px;
  margin: 10px;
  width: ${props => props.w || '100'}%;
  align-items: center;
  border: 1px solid ${props => props.brColor || 'black'};
  border-radius: 5px;
`;

const ButtonText = styled.Text`
  color: ${props => props.color || 'white'};
  text-transform: uppercase;
  font-weight: bold;
`;
const Dummy = () => {};
export default function CustomButtonOld({
  onPress,
  title = '',
  color,
  bgColor,
  w,
  brColor,
  disabled = false,
}) {
  React.useEffect(() => {}, []);
  return (
    <ButtonContainer
      onPress={disabled ? Dummy : onPress}
      bgColor={bgColor}
      w={w}
      brColor={brColor}>
      <ButtonText color={color}>{title}</ButtonText>
    </ButtonContainer>
  );
}
