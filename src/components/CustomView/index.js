import React from 'react';
import styled from 'styled-components';

const Container = styled.View`
  background-color: ${props => props.bgColor || 'transparent'};
  padding: ${props => props.p || '0'}px;
  margin: ${props => props.m || '0'}px;
  width: ${props => props.w || '100'}%;
  align-items: ${props => props.ai || 'center'};
  justify-content: ${props => props.jc || 'center'};
  flex: ${props => props.f || '1'};
  flex-direction: ${props => props.fd || 'column'};
  border-bottom-width: ${props => props.bbw || '0'}px;
`;

export default function CustomView({
  bgColor,
  p,
  m,
  w,
  ai,
  jc,
  f,
  fd,
  children,
  bbw,
  ref,
}) {
  React.useEffect(() => {}, []);
  return (
    <Container
      bgColor={bgColor}
      p={p}
      m={m}
      w={w}
      ai={ai}
      jc={jc}
      f={f}
      fd={fd}
      bbw={bbw}
      ref={ref}>
      {children}
    </Container>
  );
}
