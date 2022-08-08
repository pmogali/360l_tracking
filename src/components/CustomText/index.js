import React from 'react';
import styled from 'styled-components';

const Text = styled.Text`
  color: ${props => props.color || 'black'};
  font-weight: ${props => props.fontW || 'normal'};
  font-size: ${props => props.fontS || '12'}px;
  margin-left: ${props => props.ml || '0'}px;
  margin: ${props => props.m || '0'}px;
  line-height: ${props => props.lh || '25'}px;
`;

export default function CustomText({
  color,
  fontW,
  fontS,
  ml,
  mt,
  m,
  lh,
  style,
  children,
}) {
  return (
    <Text
      color={color}
      fontW={fontW}
      fontS={fontS}
      ml={ml}
      mt={mt}
      m={m}
      lh={lh}
      style={style}>
      {children}
    </Text>
  );
}
