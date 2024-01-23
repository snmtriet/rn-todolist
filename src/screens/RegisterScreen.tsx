import {Text} from 'react-native';
import React, {useState} from 'react';
import {
  ButtonComponent,
  Container,
  InputComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../components';
import {globalStyles} from '../styles/globalStyles';
import {Lock, Sms} from 'iconsax-react-native';
import {colors} from '../constants/colors';
import {useNavigation} from '@react-navigation/native';
import {RegisterScreenNavigationProp} from '../types';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {fontFamilies} from '../constants/fontFamilies';

const initialValue = {
  email: '',
  password: '',
  confirmPassword: '',
};

const RegisterScreen = () => {
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const navigation = useNavigation<RegisterScreenNavigationProp>();

  const handleChange = (
    type: 'email' | 'password' | 'confirmPassword',
    value: string,
  ) => {
    setData(prev => ({...prev, [type]: value}));
  };

  const handleLogin = async () => {
    if (!data.email) {
      setErrorText('Please enter ur email');
      return;
    }
    if (!data.password) {
      setErrorText('Please enter ur password');
      return;
    }
    if (!data.confirmPassword) {
      setErrorText('Please enter ur confirm password');
      return;
    }
    if (data.password.length < 6) {
      setErrorText('Password at least 6 characters');
      return;
    }
    if (data.password !== data.confirmPassword) {
      setErrorText('Password must be match');
      return;
    }

    try {
      setErrorText('');
      setIsLoading(true);
      const {user} = await auth().createUserWithEmailAndPassword(
        data.email,
        data.password,
      );
      await firestore().collection('users').doc(user.uid).set({
        id: user.uid,
        email: user.email,
        photoURL: user.photoURL,
        providerId: user.providerId,
        displayName: user.displayName,
        emailVerified: user.emailVerified,
      });
      setIsLoading(false);
    } catch (error: any) {
      setErrorText(error.message);
      setIsLoading(false);
    }
  };

  return (
    <Container back>
      <SectionComponent
        styles={{
          flex: 1,
          justifyContent: 'flex-start',
        }}>
        <RowComponent styles={{marginBottom: 16}}>
          <TitleComponent text="Sign Up" size={32} flex={0} />
        </RowComponent>
        <InputComponent
          title="Email"
          value={data.email}
          onChange={val => handleChange('email', val)}
          placeholder="Email"
          prefix={<Sms size={22} color={colors.gray2} />}
          allowClear
          type="email-address"
        />
        <InputComponent
          title="Password"
          isPassword
          value={data.password}
          onChange={val => handleChange('password', val)}
          placeholder="Password"
          prefix={<Lock size={22} color={colors.gray2} />}
        />
        <InputComponent
          title="Confirm your password"
          isPassword
          value={data.confirmPassword}
          onChange={val => handleChange('confirmPassword', val)}
          placeholder="Confirm password"
          prefix={<Lock size={22} color={colors.gray2} />}
        />
        {errorText && (
          <TextComponent
            color={colors.error}
            text={errorText}
            flex={0}
            font={fontFamilies.regular}
            styles={{marginBottom: 8}}
          />
        )}
        <SpaceComponent height={16} />
        <ButtonComponent
          isLoading={isLoading}
          text="Sign up"
          onPress={handleLogin}
        />

        <RowComponent styles={{marginTop: 20}}>
          <Text style={[globalStyles.text]}>
            Already have an account?{' '}
            <Text
              style={{color: colors.blue, textDecorationLine: 'underline'}}
              onPress={() => navigation.navigate('LoginScreen')}>
              Sign up
            </Text>
          </Text>
        </RowComponent>
      </SectionComponent>
    </Container>
  );
};

export default RegisterScreen;
