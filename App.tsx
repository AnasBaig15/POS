import 'react-native-gesture-handler';
import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// import {createDrawerNavigator} from '@react-navigation/drawer';
import Login from './components/Login';
import Chart from './components/Dashboard';
import Profile from './components/Profile';
import Member from './components/Member';
import Archived from './components/Archived';
import Project from './components/Project';
import {Provider as PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {store} from './Redux/store';
import Task from './components/Task';
import Favorite from './components/Favorite';
import SplashScreen from './components/SplashScreen';
// const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

// function DrawerNavigator() {
//   return (
//     <Drawer.Navigator initialRouteName="Chart">
//       <Drawer.Screen name="Chart" component={Chart} />
//     </Drawer.Navigator>
//   );
// }

function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SplashScreen">
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{
                headerShown: false,
                presentation: 'modal',
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="Project"
              component={Project}
              options={{
                headerShown: false,
                presentation: 'modal',
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="Archived"
              component={Archived}
              options={{
                headerShown: false,
                presentation: 'modal',
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Member"
              options={{
                headerShown: false,
                presentation: 'modal',
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
              component={Member}
            />
            <Stack.Screen
              name="Chart"
              options={{
                headerShown: false,
                presentation: 'modal',
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
              component={Chart}
            />
            <Stack.Screen
              name="Profile"
              options={{
                headerShown: false,
                presentation: 'modal',
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
              component={Profile}
            />
            <Stack.Screen
              name="Task"
              options={{
                headerShown: false,
                presentation: 'modal',
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
              component={Task}
            />
            <Stack.Screen
              name="Favorite"
              options={{
                headerShown: false,
                presentation: 'modal',
                animationTypeForReplace: 'push',
                animation: 'slide_from_right',
              }}
              component={Favorite}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

export default App;
