import React, {useRef, useState, useContext} from 'react';
import {Alert, View, AppState} from 'react-native';
import {setJSExceptionHandler} from 'react-native-exception-handler';
import Navigators from './navigators';

// // ADVANCED use case:
// const exceptionhandler = (error, isFatal) => {
//   // your error handler function
//   console.log('ERRor', error);

//   Alert.alert('Error Native:', JSON.stringify(error));
// };
// setJSExceptionHandler(exceptionhandler, true);

let intervalX;
const App = () => {
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);

  React.useEffect(() => {
    // backAppRunning();

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        // console.log('App has come to the foreground!');
      } else {
        // console.log('AppState-----', appState.current);
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  React.useEffect(() => {}, []);
  return (
    <View style={{flex: 1}}>
      <Navigators />
    </View>
  );
};

export default App;
