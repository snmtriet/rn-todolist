import {Text} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {LoginScreenNavigationProp} from '../types';
import auth from '@react-native-firebase/auth';
import {fontFamilies} from '../constants/fontFamilies';

const initialValue = {
  email: '',
  password: '',
};

const LoginScreen = () => {
  const [data, setData] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState('');

  const navigation = useNavigation<LoginScreenNavigationProp>();

  const handleChange = (type: 'email' | 'password', value: string) => {
    setData(prev => ({...prev, [type]: value}));
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setErrorText('');
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [errorText]);

  const handleLogin = async () => {
    if (!data.email || !data.password) {
      setErrorText('Please enter ur email and password');
      return;
    }

    try {
      setIsLoading(true);
      const {user, additionalUserInfo} =
        await auth().signInWithEmailAndPassword(data.email, data.password);
      console.log({user, additionalUserInfo});
      setIsLoading(false);
    } catch (error: any) {
      setErrorText(error.message);
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <SectionComponent
        styles={{
          flex: 1,
          justifyContent: 'center',
        }}>
        <RowComponent styles={{marginBottom: 16}}>
          <TitleComponent text="Sign In" size={32} flex={0} />
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
          text="Sign in"
          onPress={handleLogin}
        />

        <RowComponent styles={{marginTop: 20}}>
          <Text style={[globalStyles.text]}>
            You don't have an account?{' '}
            <Text
              style={{color: colors.blue, textDecorationLine: 'underline'}}
              onPress={() => navigation.navigate('RegisterScreen')}>
              Sign up
            </Text>
          </Text>
        </RowComponent>
      </SectionComponent>
    </Container>
  );
};

export default LoginScreen;
