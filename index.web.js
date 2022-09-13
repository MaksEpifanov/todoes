import {AppRegistry} from 'react-native';
import App from './App.tsx';
import AppInfo from './app.json';

if (module.hot) {
  module.hot.accept();
}

AppRegistry.registerComponent(AppInfo.name, () => App);
AppRegistry.runApplication(AppInfo.name, {
  rootTag: document.getElementById('root'),
});
