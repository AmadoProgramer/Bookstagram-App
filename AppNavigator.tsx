import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importa tus screens
import IndexScreen from './view/index';
import LoginScreen from './view/Login/login';
import RegisterScreen from './view/register/Register';
import ProfileBookerScreen from './view/profile-booker';
import OpinionBookScreen from './view/opinion-book';
import MessagingScreen from './view/messaging';
import AddBookScreen from './view/add-book';
import NotFoundScreen from './view/notfound';
import LoginProblemScreen from './view/Login/login-problem';

export type RootStackParamList = {
  Index: undefined;
  Login: undefined;
  Register: undefined;
  ProfileBooker: undefined;
  OpinionBook: undefined;
  Messaging: undefined;
  AddBook: undefined;
  NotFound: undefined;
  LoginProblem: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Index"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Index" component={IndexScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ProfileBooker" component={ProfileBookerScreen} />
        <Stack.Screen name="OpinionBook" component={OpinionBookScreen} />
        <Stack.Screen name="Messaging" component={MessagingScreen} />
        <Stack.Screen name="AddBook" component={AddBookScreen} />
        <Stack.Screen name="NotFound" component={NotFoundScreen} />
        <Stack.Screen name="LoginProblem" component={LoginProblemScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}