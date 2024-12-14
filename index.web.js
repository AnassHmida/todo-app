import {AppRegistry} from 'react-native';
import App from './App';
import './src/styles/global.web.css';

// Import MaterialIcons font
import MaterialIconsFont from 'react-native-vector-icons/Fonts/MaterialIcons.ttf';

// Create the @font-face style
const iconFontStyles = `@font-face {
  src: url(${MaterialIconsFont});
  font-family: MaterialIcons;
}`;

// Create stylesheet
const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}

// Inject stylesheet
document.head.appendChild(style);

AppRegistry.registerComponent('ToDoApp', () => App);
AppRegistry.runApplication('ToDoApp', {
  rootTag: document.getElementById('root'),
});
