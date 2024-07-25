import styled from 'styled-components/native';
import { ActivityIndicator, Dimensions, ImageBackground } from 'react-native';
import React, { useEffect, useState } from 'react';
import useFont from '../hooks/useFont';
import { useNavigation } from '@react-navigation/native';

const ImageH = Dimensions.get('screen').height;
const ImageW = Dimensions.get('screen').width;
const NormalBrownTextColor = '#c18c58';

const ParentContainer = styled(ImageBackground).attrs({
  source: require('../assets/images/bg_coffee.png'),
})`
  background-color: #d3a271;
  flex: 1;
  justify-content: center;
`;
const MainContainer = styled.View`
  align-items: center;
`;

const MyText = styled.Text`
  font-family: 'jost_bold';
  font-size: 30px;
  margin-top: 10px;
  color: #572a0c;
`;

const MyImage = styled.Image`
  height: 120px;
`;
const CustLoading = styled.View`
  flex: 1;
  justify-content: center;
`;
const SplashScreen = () => {
  const [isReady, setReady] = useState<boolean>(false);

  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('ChaiScreen' as never);
    }, 1000);

    const loadFonts = async () => {
      await useFont();
    };
    loadFonts();
  }, []);

  useEffect(() => {
    const loadFonts = async () => {
      await useFont();
      setReady(true);
    };

    loadFonts();
  }, []);

  if (!isReady)
    return (
      <CustLoading>
        <ActivityIndicator size="large" color={NormalBrownTextColor} />
      </CustLoading>
    );
  else
    return (
      <ParentContainer>
        <MainContainer>
          <MyImage
            resizeMode="contain"
            source={require('../assets/images/logo.png')}
          />
          <MyText>My Coffee Store</MyText>
        </MainContainer>
      </ParentContainer>
    );
};

export default SplashScreen;
