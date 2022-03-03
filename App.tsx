import React from 'react';
import {Provider} from 'react-redux';
import {View, Text} from 'react-native';
import {store} from './src/store/store';
import {BrowserViewControllerConnected} from './src/browser/BrowserViewController.tsx';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

interface Props {}

interface State {}

function HomeScreen() {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}
const Stack = createNativeStackNavigator();

class AppContainer extends React.Component<Props, State> {
  render() {
    const {} = this.props;

    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <NavigationContainer>
            <BrowserViewControllerConnected />
          </NavigationContainer>
        </Provider>
      </SafeAreaProvider>
    );
  }
}

export default AppContainer;
