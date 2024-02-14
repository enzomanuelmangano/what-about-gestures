import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CustomTouchable } from './components/custom-touchable';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function blockThreadForIterations(iterations: number): void {
  for (let i = 0; i < iterations; i++) {
    // Perform some dummy computation to simulate blocking behavior
    let sum = 0;
    for (let j = 0; j < 1000000; j++) {
      sum += Math.random();
    }
  }
}

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <StatusBar style="auto" />
        <CustomTouchable
          onPress={() => {
            console.log('pressed');
          }}
        >
          <View style={styles.squareButton} />
        </CustomTouchable>
        <TouchableOpacity
          style={{ marginTop: 20 }}
          onPress={() => {
            console.log('pressed');
          }}
        >
          <View style={styles.squareButton} />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          blockThreadForIterations(40);
        }}
        style={styles.button}
      >
        <Text style={{ fontSize: 20, fontWeight: '600', color: 'white' }}>
          Lock JS Thread
        </Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  squareButton: {
    height: 150,
    aspectRatio: 1, // width: 150,
    backgroundColor: 'rgba(0,0,255,0.5)',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    position: 'absolute',
    bottom: 60,
    backgroundColor: '#111111',
    height: 55,
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
});
