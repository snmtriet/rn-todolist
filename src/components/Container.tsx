import {ScrollView} from 'react-native';
import React, {ReactNode} from 'react';
import {globalStyles} from '../styles/globalStyles';

interface Props {
  title?: string;
  isBack?: boolean;
  right?: ReactNode;
  children: ReactNode;
}

const Container = (props: Props) => {
  const {children} = props;

  return <ScrollView style={globalStyles.container}>{children}</ScrollView>;
};

export default Container;
