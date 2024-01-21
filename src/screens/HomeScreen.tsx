import React from 'react';
import {Container, RowComponent, TextComponent} from '../components';

const HomeScreen = () => {
  return (
    <Container>
      <RowComponent justify="space-between">
        <TextComponent text="HomeScreen" />
        <TextComponent text="HomeScreen" size={20} />
      </RowComponent>
    </Container>
  );
};

export default HomeScreen;
