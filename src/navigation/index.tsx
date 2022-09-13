import React, {useEffect, useState} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home, AddTodo, Shredder, UpdateTodo} from '../screens';
import SyncIndicator from '../components/SyncIndicator';

import useLocalStorage from '../hooks/useLocalStorage';
import {useAppDispatch} from '../store/store.hooks';
import {updateTodos} from '../store/features/todos/todos.slice';

import type {RootStackParamsList, RootTabParamList} from './types';
// import Icon from 'react-native-vector-icons/Ionicons';
import {Icon} from '@ui-kitten/components';

const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator<RootStackParamsList>();

const Root = () => {
  const dispatch = useAppDispatch();
  const [loadingDataFromLS, setLoadingDataFromLS] = useState<boolean>(false);
  const [failedLoading, setFailedLoading] = useState<boolean>(false);
  const {getTodosFromLS, getInitTodosFromLS} = useLocalStorage();

  useEffect(() => {
    getInitTodosFromLS().then(todos => todos && dispatch(updateTodos(todos)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (!failedLoading) {
        setLoadingDataFromLS(true);
        getTodosFromLS()
          .then(todos => {
            if (todos && todos.length) {
              dispatch(updateTodos(todos));
            }
            setLoadingDataFromLS(false);
          })
          .catch(() => {
            setLoadingDataFromLS(false);
            setFailedLoading(true);
          });
      }
    }, 5000);

    if (failedLoading) {
      clearInterval(timerId);
    }
    return () => clearInterval(timerId);
  }, [dispatch, getTodosFromLS, failedLoading]);

  return (
    <Tab.Navigator id="tab" initialRouteName="Home">
      <Tab.Screen
        name="AddTodo"
        component={AddTodo}
        options={{
          title: 'Добавить задачу',
          headerRight: () => (
            <SyncIndicator
              isLoad={loadingDataFromLS}
              isError={failedLoading}
              restart={() => setFailedLoading(false)}
            />
          ),
          tabBarIcon: ({color}) => (
            <Icon
              fill={color}
              name="plus-circle"
              style={{width: 26, height: 26}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Главная',
          headerRight: () => (
            <SyncIndicator
              isLoad={loadingDataFromLS}
              isError={failedLoading}
              restart={() => setFailedLoading(false)}
            />
          ),
          tabBarIcon: ({color}) => (
            <Icon fill={color} name="home" style={{width: 26, height: 26}} />
          ),
        }}
      />
      <Tab.Screen
        name="Shredder"
        component={Shredder}
        options={{
          title: 'Корзина',
          headerRight: () => (
            <SyncIndicator
              isLoad={loadingDataFromLS}
              isError={failedLoading}
              restart={() => setFailedLoading(false)}
            />
          ),
          tabBarIcon: ({color}) => (
            <Icon fill={color} name="trash-2" style={{width: 26, height: 26}} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const Navigation = () => (
  <Stack.Navigator id="stack">
    <Stack.Screen name="Root" component={Root} options={{headerShown: false}} />
    <Stack.Screen
      name="UpdateTodo"
      component={UpdateTodo}
      options={{
        title: 'Редактирование todo',
      }}
    />
  </Stack.Navigator>
);

export default Navigation;
