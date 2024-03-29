import React from 'react';
import {TextComponent} from '.';
import {fontFamilies} from '../constants/fontFamilies';

interface Props {
  text: string;
  size?: number;
  font?: string;
  color?: string;
  flex?: number;
}

const TitleComponent = (props: Props) => {
  const {text, font, size, color, flex} = props;

  return (
    <TextComponent
      size={size ?? 20}
      font={font ?? fontFamilies.semiBold}
      color={color}
      text={text}
      flex={flex ?? 1}
    />
  );
};

export default TitleComponent;
