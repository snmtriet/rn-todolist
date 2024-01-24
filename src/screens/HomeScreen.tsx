import {
  Add,
  Edit2,
  Element4,
  LogoutCurve,
  Notification,
  SearchNormal1,
} from 'iconsax-react-native';
import React, {useEffect, useState} from 'react';
import {ActivityIndicator, TouchableOpacity, View} from 'react-native';
import CardComponent from '../components/CardComponent';
import Container from '../components/Container';
import RowComponent from '../components/RowComponent';
import SectionComponent from '../components/SectionComponent';
import TextComponent from '../components/TextComponent';
import TitleComponent from '../components/TitleComponent';
import {colors} from '../constants/colors';
import {globalStyles} from '../styles/globalStyles';
import TagComponent from '../components/TagComponent';
import SpaceComponent from '../components/SpaceComponent';
import {
  CircularComponent,
  CardImageComponent,
  AvatarGroupComponent,
  ProgressBarComponent,
} from '../components';
import {fontFamilies} from '../constants/fontFamilies';
import {useNavigation} from '@react-navigation/native';
import {HomeScreenNavigationProp, Task} from '../types';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {
  const user = auth().currentUser;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<HomeScreenNavigationProp>();

  useEffect(() => {
    fetchNewTasks();
  }, []);

  const handleLogout = async () => {
    await auth().signOut();
  };

  const fetchNewTasks = async () => {
    try {
      setIsLoading(true);
      firestore()
        .collection('tasks')
        .orderBy('dueDate')
        .limitToLast(3)
        .onSnapshot(snap => {
          const items: Task[] = [];
          snap.forEach((item: any) => {
            items.push({
              id: item.id,
              ...item.data(),
            });
          });
          setTasks(items);
          setIsLoading(false);
        });
    } catch (error) {
      setIsLoading(false);
      console.log({error});
    }
  };

  return (
    <View style={{flex: 1}}>
      <Container isScroll>
        <SectionComponent>
          <RowComponent justify="space-between">
            <Element4 size={24} color={colors.desc} />
            <Notification size={24} color={colors.desc} />
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent>
            <View
              style={{
                flex: 1,
              }}>
              <RowComponent>
                <TextComponent
                  text={`Hi, ${user?.displayName || user?.email}`}
                />
                <TouchableOpacity onPress={handleLogout}>
                  <LogoutCurve size={22} color={colors.error} />
                </TouchableOpacity>
              </RowComponent>
              <TitleComponent text="Be Productive today" />
            </View>
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <RowComponent
            styles={[globalStyles.inputContainer]}
            onPress={() => console.log('Say hi')}>
            <TextComponent color="#696B6F" text="Search task" />
            <SearchNormal1 size={20} color={colors.desc} />
          </RowComponent>
        </SectionComponent>
        <SectionComponent>
          <CardComponent>
            <RowComponent>
              <View style={{flex: 1}}>
                <TitleComponent text="Task progress" />
                <TextComponent text="30/40 tasks done" />
                <SpaceComponent height={12} />
                <RowComponent justify="flex-start">
                  <TagComponent
                    text="Match 22"
                    onPress={() => console.log('Say Hi!!!')}
                  />
                </RowComponent>
              </View>
              <View>
                <CircularComponent value={80} />
              </View>
            </RowComponent>
          </CardComponent>
        </SectionComponent>
        {isLoading ? (
          <SectionComponent>
            <View>
              <ActivityIndicator color={colors.blue} size={40} />
            </View>
          </SectionComponent>
        ) : tasks.length ? (
          <SectionComponent>
            <RowComponent styles={{alignItems: 'flex-start'}}>
              {tasks[0] && (
                <View style={{flex: 1}}>
                  <CardImageComponent
                    onPress={() =>
                      navigation.navigate('TaskDetail', {
                        id: tasks[0].id!,
                        color: 'rgba(113, 77, 217, 0.9)',
                      })
                    }>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate('AddTaskScreen', {
                          task: tasks[0],
                        });
                      }}
                      style={globalStyles.iconContainer}>
                      <Edit2 size={20} color={colors.white} />
                    </TouchableOpacity>
                    <TitleComponent text={tasks[0].title} />
                    <TextComponent
                      line={2}
                      text={tasks[0].description}
                      size={13}
                    />
                    <View style={{marginVertical: 28}}>
                      <AvatarGroupComponent users={tasks[0].users} />
                      <ProgressBarComponent
                        percent={`${Math.floor(tasks[0].progress || 0 * 100)}%`}
                        color="#08ADFF"
                        size="large"
                      />
                    </View>
                    <TextComponent
                      text="Due, 2023 March 03"
                      size={12}
                      color={colors.desc}
                    />
                  </CardImageComponent>
                </View>
              )}

              {(tasks[1] || tasks[2]) && (
                <>
                  <SpaceComponent width={16} />
                  <View style={{flex: 1}}>
                    {tasks[1] && (
                      <CardImageComponent
                        onPress={() =>
                          navigation.navigate('TaskDetail', {
                            id: tasks[1].id!,
                            color: 'rgba(33, 150, 243, 0.9)',
                          })
                        }
                        color="rgba(33, 150, 243, 0.9)">
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('AddTaskScreen', {
                              task: tasks[1],
                            });
                          }}
                          style={globalStyles.iconContainer}>
                          <Edit2 size={20} color={colors.white} />
                        </TouchableOpacity>
                        <TitleComponent text={tasks[1].title} size={18} />
                        <AvatarGroupComponent users={tasks[1].users} />
                        <ProgressBarComponent
                          percent={`${Math.floor(
                            tasks[1].progress || 0 * 100,
                          )}%`}
                          color="#A2EE69"
                        />
                      </CardImageComponent>
                    )}
                    {tasks[2] && (
                      <>
                        <SpaceComponent height={16} />
                        <CardImageComponent
                          onPress={() =>
                            navigation.navigate('TaskDetail', {
                              id: tasks[2].id!,
                              color: 'rgba(18, 181, 22, 0.9)',
                            })
                          }
                          color="rgba(18, 181, 22, 0.9)">
                          <TouchableOpacity
                            onPress={() => {
                              navigation.navigate('AddTaskScreen', {
                                task: tasks[2],
                              });
                            }}
                            style={globalStyles.iconContainer}>
                            <Edit2 size={20} color={colors.white} />
                          </TouchableOpacity>
                          <TitleComponent text={tasks[2].title} />
                          <TextComponent
                            text={tasks[2].description}
                            size={13}
                            line={2}
                          />
                        </CardImageComponent>
                      </>
                    )}
                  </View>
                </>
              )}
            </RowComponent>
          </SectionComponent>
        ) : null}
        <SectionComponent styles={{paddingBottom: 60}}>
          <TextComponent
            flex={1}
            font={fontFamilies.bold}
            size={21}
            text="Urgents tasks"
          />
          <CardComponent>
            <RowComponent>
              <CircularComponent value={40} radius={36} color="#1E73B8" />
              <View
                style={{flex: 1, justifyContent: 'center', paddingLeft: 12}}>
                <TextComponent text="Title of task" />
              </View>
            </RowComponent>
          </CardComponent>
        </SectionComponent>
      </Container>
      <View
        style={{
          position: 'absolute',
          bottom: 0,
          right: 0,
          left: 0,
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddTaskScreen')}
          activeOpacity={1}
          style={[
            globalStyles.row,
            {
              backgroundColor: colors.blue,
              padding: 10,
              borderRadius: 12,
              width: '80%',
            },
          ]}>
          <TextComponent
            text="Add new tasks"
            flex={0}
            styles={{lineHeight: 19}}
          />
          <Add size={22} color={colors.white} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
