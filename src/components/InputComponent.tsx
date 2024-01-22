import React, {ReactNode, useState} from 'react';
import {
  KeyboardTypeOptions,
  Platform,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../constants/colors';
import {globalStyles} from '../styles/globalStyles';
import RowComponent from './RowComponent';
import TitleComponent from './TitleComponent';
import {Eye, EyeSlash} from 'iconsax-react-native';

interface Props {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  title?: string;
  prefix?: ReactNode;
  affix?: ReactNode;
  allowClear?: boolean;
  multiline?: boolean;
  numberOfLine?: number;
  type?: KeyboardTypeOptions;
  isPassword?: boolean;
}

const InputComponent = (props: Props) => {
  const {
    value,
    onChange,
    placeholder,
    title,
    prefix,
    affix,
    allowClear,
    multiline,
    numberOfLine,
    type,
    isPassword,
  } = props;

  const [showPass, setShowPass] = useState(false);

  return (
    <View style={{marginBottom: 16}}>
      {title && <TitleComponent text={title} />}
      <RowComponent
        styles={[
          globalStyles.inputContainer,
          {
            marginTop: title ? 8 : 0,
            minHeight: multiline && numberOfLine ? 32 * numberOfLine : 32,
            paddingVertical: Platform.OS === 'ios' ? 12 : 2,
            paddingHorizontal: 10,
            alignItems: 'center',
          },
        ]}>
        {prefix && prefix}
        <View
          style={{
            flex: 1,
            paddingLeft: prefix ? 8 : 0,
            paddingRight: affix ? 8 : 0,
          }}>
          <TextInput
            style={[
              globalStyles.text,
              {margin: 0, padding: 0, paddingVertical: 6, flex: 1},
            ]}
            placeholder={placeholder}
            placeholderTextColor="#676767"
            value={value}
            onChangeText={onChange}
            multiline={multiline}
            numberOfLines={numberOfLine}
            keyboardType={type}
            secureTextEntry={isPassword ? !showPass : false}
            autoCapitalize="none"
          />
        </View>
        {affix && affix}

        {allowClear && value && (
          <TouchableOpacity onPress={() => onChange('')}>
            <AntDesign name="close" size={20} color={colors.white} />
          </TouchableOpacity>
        )}

        {isPassword && (
          <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            {showPass ? (
              <EyeSlash size={20} color={colors.desc} />
            ) : (
              <Eye size={20} color={colors.desc} />
            )}
          </TouchableOpacity>
        )}
      </RowComponent>
    </View>
  );
};

export default InputComponent;
