import { Platform } from 'react-native';
console.log('Platform in index.web.js:', Platform.OS);
import { AppRegistry } from 'react-native';
import App from './App';
import './src/styles/global.web.css';

AppRegistry.registerComponent('ToDoApp', () => App);
AppRegistry.runApplication('ToDoApp', {
    rootTag: document.getElementById('root'),
}); 