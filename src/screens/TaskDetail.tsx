import firestore from '@react-native-firebase/firestore';
import {
  AddSquare,
  ArrowLeft2,
  CalendarEdit,
  Clock,
  TickCircle,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {ScrollView, StatusBar, TouchableOpacity, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Task} from '../types';
import {
  AvatarGroupComponent,
  CardComponent,
  RowComponent,
  SectionComponent,
  SpaceComponent,
  TextComponent,
  TitleComponent,
} from '../components';
import {colors} from '../constants/colors';
import {globalStyles} from '../styles/globalStyles';
import {fontFamilies} from '../constants/fontFamilies';

const TaskDetail = ({navigation, route}: any) => {
  const {id, color}: {id: string; color?: string} = route.params;
  const [data, setData] = useState<Task>();

  useEffect(() => {
    getTaskDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const getTaskDetail = () => [
    firestore()
      .doc(`tasks/${id}`)
      .onSnapshot((snap: any) => {
        if (snap.exists) {
          setData({
            id,
            ...snap.data(),
          });
        }
      }),
  ];

  return data ? (
    <ScrollView style={{flex: 1, backgroundColor: colors.bgColor}}>
      <StatusBar barStyle="light-content" />
      <SectionComponent
        color={color ?? 'rgba(113, 77, 217, 0.9)'}
        styles={{
          paddingTop: 60,
          paddingBottom: 18,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
        }}>
        <RowComponent styles={{alignItems: 'center'}}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ArrowLeft2
              size={28}
              color={colors.white}
              style={{marginTop: -8, marginRight: 12}}
            />
          </TouchableOpacity>
          <TitleComponent flex={1} text={data.title} size={22} />
        </RowComponent>
        <View style={{marginTop: 20}}>
          <TextComponent text="Due date" />
          <RowComponent styles={{justifyContent: 'space-between'}}>
            <RowComponent
              styles={{
                flex: 1,
                justifyContent: 'flex-start',
              }}>
              <Clock size={20} color={colors.white} />
              <SpaceComponent width={4} />
              {data.end && data.start && (
                <TextComponent flex={0} text={'1PM - 1PM'} size={16} />
              )}
            </RowComponent>
            {data.dueDate && (
              <RowComponent
                styles={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <CalendarEdit size={20} color={colors.white} />
                <SpaceComponent width={4} />

                <TextComponent flex={0} size={16} text={'20 Dec 2023'} />
              </RowComponent>
            )}
            <View
              style={{
                flex: 1,

                alignItems: 'flex-end',
              }}>
              <AvatarGroupComponent users={data.users} />
            </View>
          </RowComponent>
        </View>
      </SectionComponent>
      <SectionComponent>
        <TitleComponent text="Description" size={22} />
        <CardComponent
          bgColor={colors.bgColor}
          styles={{
            borderWidth: 1,
            borderColor: colors.gray,
            borderRadius: 12,
            marginTop: 12,
          }}>
          <TextComponent text={data.description} />
        </CardComponent>
      </SectionComponent>
      <SectionComponent>
        <CardComponent>
          <RowComponent>
            <TextComponent text="Files & Links" flex={0} />
            <RowComponent styles={{flex: 1}}>
              <Ionicons
                name="document-text"
                size={38}
                color={'#0263D1'}
                style={globalStyles.documentImg}
              />
              <AntDesign
                name="pdffile1"
                size={32}
                color={'#E5252A'}
                style={globalStyles.documentImg}
              />
              <MaterialCommunityIcons
                style={globalStyles.documentImg}
                name="file-excel"
                size={38}
                color={'#00733B'}
              />
              <AntDesign name="addfile" size={32} color={colors.white} />
            </RowComponent>
          </RowComponent>
        </CardComponent>
      </SectionComponent>
      <SectionComponent>
        <RowComponent>
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: 100,
              borderWidth: 2,
              borderColor: colors.success,
              marginRight: 4,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: colors.success,
                width: 16,
                height: 16,
                borderRadius: 100,
              }}
            />
          </View>
          <TextComponent
            flex={1}
            text="Progress"
            font={fontFamilies.medium}
            size={18}
          />
        </RowComponent>
        <SpaceComponent height={12} />
        <RowComponent>
          <View style={{flex: 1}}>
            <TextComponent text="Slide" />
          </View>
          <TextComponent
            text={'70%'}
            font={fontFamilies.bold}
            size={18}
            flex={0}
          />
        </RowComponent>
      </SectionComponent>
      <SectionComponent>
        <RowComponent>
          <TitleComponent flex={1} text="Sub tasks" size={20} />
          <TouchableOpacity>
            <AddSquare size={24} color={colors.success} variant="Bold" />
          </TouchableOpacity>
        </RowComponent>
        <SpaceComponent height={12} />
        {Array.from({length: 3}).map((item, index) => (
          <CardComponent key={`subtask${index}`} styles={{marginBottom: 12}}>
            <RowComponent>
              <TickCircle variant="Bold" color={colors.success} size={22} />
              <SpaceComponent width={8} />
              <TextComponent text="fafa" />
            </RowComponent>
          </CardComponent>
        ))}
      </SectionComponent>
    </ScrollView>
  ) : (
    <></>
  );
};

export default TaskDetail;
