import { PropsWithChildren } from 'react';

import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

type CustomTouchableProps = PropsWithChildren<{
  onPress?: () => void;
}>;

export const CustomTouchable: React.FC<CustomTouchableProps> = ({
  children,
  onPress,
}) => {
  const isActive = useSharedValue(false);

  const gesture = Gesture.Tap()
    .maxDuration(10000)
    .onTouchesDown(() => {
      isActive.value = true;
    })
    .onTouchesUp(() => {
      // fire onPress
      if (onPress) runOnJS(onPress)();
    })
    .onFinalize(() => {
      // onFinalize
      isActive.value = false;
    });

  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isActive.value ? 0.5 : 1, {
        duration: 100,
      }),
      transform: [
        {
          rotate: withSpring(isActive.value ? `${Math.PI / 4}rad` : '0rad'),
        },
        {
          scale: withSpring(isActive.value ? 0.9 : 1),
        },
      ],
    };
  });

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={rStyle}>{children}</Animated.View>
    </GestureDetector>
  );
};
