import React, {useRef, useState, useContext} from 'react';
import {Alert, View, AppState} from 'react-native';
import {setJSExceptionHandler} from 'react-native-exception-handler';
import Navigators from './navigators';
import {DataStore, Auth, Hub} from 'aws-amplify';
import {SQLiteAdapter} from '@aws-amplify/datastore-storage-adapter/SQLiteAdapter';

DataStore.configure({
  storageAdapter: SQLiteAdapter,
  maxRecordsToSync: 20000,
  fullSyncInterval: 5,
});

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
