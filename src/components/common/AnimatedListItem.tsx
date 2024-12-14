import React, {useEffect} from 'react';
import {Animated, ViewStyle} from 'react-native';

interface AnimatedListItemProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

export const AnimatedListItem = ({children, style}: AnimatedListItemProps) => {
  const translateY = React.useRef(new Animated.Value(50)).current;
  const opacity = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animation = Animated.parallel([
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
        tension: 20,
        friction: 6,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]);

    animation.start();

    return () => {
      animation.stop();
      translateY.setValue(50);
      opacity.setValue(0);
    };
  }, [opacity, translateY]);

  return (
    <Animated.View
      style={[
        style,
        {
          transform: [{translateY}],
          opacity,
        },
      ]}>
      {children}
    </Animated.View>
  );
};
