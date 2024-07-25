import * as Font from 'expo-font';

export default useFonts = async () =>
  await Font.loadAsync({
    jost: require('../assets/fonts/Jost-Regular.ttf'),
    jost_bold: require('../assets/fonts/Jost-Bold.ttf'),
  });
