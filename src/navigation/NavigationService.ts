import {createNavigationContainerRef} from '@react-navigation/native';
import {RootStackParamList} from './types';

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export const NavigationService = {
  navigate: (name: keyof RootStackParamList, params?: any) => {
    if (navigationRef.isReady()) {
      navigationRef.navigate(name, params);
    }
  },
  reset: () => {
    if (navigationRef.isReady()) {
      navigationRef.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
    }
  },
};
