import { useNavigation, useRoute } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Coffee } from '../services/models/coffe';
import { ActivityIndicator, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { useEffect, useState } from 'react';
import useFont from '../hooks/useFont';

const mWidth = Dimensions.get('screen').width;
const mHeight = Dimensions.get('screen').height;

const NormalBrownTextColor = '#c18c58';
const DarkBrownTextColor = '#2e1e05';

interface CoffeeDetailProps {
  item?: Coffee;
}
const ParentContainer = styled.View`
  flex: 1;
  width: ${mWidth}px;
  background-color: #543a20;
`;

const MainContainer = styled.View`
  flex: 1;
  padding: 20px;
`;

const BottomButton = styled.TouchableOpacity`
  background-color: #ce9760;
  height: 65px;
  width: ${mWidth}px;
  justify-content: center;
  align-self: center;
`;
const ButtonText = styled.Text`
  font-family: 'jost_bold';

  color: ${DarkBrownTextColor};
  font-size: 20px;
  align-self: center;
`;
const BannerImageView = styled.View`
  /* margin-top: 20px; */
`;

const BannerImage = styled.Image`
  height: ${mHeight*0.5}px;
  width: ${mWidth}px;
  border-bottom-left-radius: 30px;
  border-bottom-right-radius: 30px;
`;
const NormalHeading = styled.Text`
  font-size: 16px;
  color: #ffffffab;
`;

const BigName = styled.Text`
  font-family: 'jost';
  font-size: 30px;
  color: #fff;
`;
const QuantityandPrice = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const PriceText = styled.Text`
  font-size: 22px;
  color: ${NormalBrownTextColor};
  font-family: 'jost_bold';
`;

const QuantityContainer = styled.View`
  margin-top: 10px;
  border: ${NormalBrownTextColor};
  border-width: 2px;
  height: 45px;
  width: 140px;
  border-radius: 30px;
  padding: 0px 10px;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;
const QuantityText = styled.Text`
  font-size: 18px;
  color: #fff;
`;

const DescriptionText = styled.Text`
  margin-top: 20px;

  font-size: 14px;
  color: #ffffffa9;
`;

const IngredientsContainer = styled.View`
  flex-direction: row;
  margin-top: 20px;
`;
const IngredientsLabel = styled.Text`
  color: white;
  font-size: 16px;
`;
const IngredientsText = styled.Text`
  color: ${NormalBrownTextColor};
  font-size: 16px;
  margin-left: 10px;
  font-family: 'jost';
`;

const UniversalClickableView = styled.TouchableOpacity``;
const CustLoading = styled.View`
  flex: 1;
  justify-content: center;
`;

const CoffeeDetail = (props: CoffeeDetailProps) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params as { item: Coffee };
  const [number, setNumber] = useState<number>(1);
  const [isReady, setReady] = useState<boolean>(false);
  function decrementMethod() {
    if (number < 2) return;

    setNumber(number - 1);
  }
  function incrementMethod() {
    setNumber(number + 1);
  }
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
        <BannerImageView>
          <BannerImage source={{ uri: item?.image }} />
          <Ionicons
            onPress={() => navigation.goBack()}
            style={{ position: 'absolute', top: 40, left: 20}}
            name="arrow-back"
            color={NormalBrownTextColor}
            size={30}
          />
        </BannerImageView>
        <MainContainer>
          <NormalHeading>BREWING</NormalHeading>
          <BigName>{item?.title}</BigName>
          <QuantityandPrice>
            <QuantityContainer>
              <UniversalClickableView onPress={decrementMethod}>
                <Ionicons
                  name="remove"
                  color={NormalBrownTextColor}
                  size={20}
                />
              </UniversalClickableView>
              <QuantityText>{number}</QuantityText>
              <UniversalClickableView onPress={incrementMethod}>
                <Ionicons name="add" color={NormalBrownTextColor} size={20} />
              </UniversalClickableView>
            </QuantityContainer>
            <PriceText>${item.id * 20}</PriceText>
          </QuantityandPrice>
          <DescriptionText>{item.description}</DescriptionText>
          <IngredientsContainer>
            <IngredientsLabel>Ingredients:</IngredientsLabel>
            <IngredientsText>{item.ingredients}</IngredientsText>
          </IngredientsContainer>
        </MainContainer>
        <BottomButton>
          <ButtonText>Order Now</ButtonText>
        </BottomButton>
      </ParentContainer>
    );
};

export default CoffeeDetail;
