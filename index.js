import {Amplify} from 'aws-amplify';
import React from 'react';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';
import awsconfig from './src/aws-exports';
import {LogBox} from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

Amplify.configure(awsconfig);
AppRegistry.registerComponent(appName, () => App);
