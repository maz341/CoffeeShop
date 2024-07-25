import styled from 'styled-components/native';
import { Colors } from '../const/AppColors';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Coffee } from '../services/models/coffe';
import { useNavigation } from '@react-navigation/native';

interface CoffeeProps {
  item: Coffee;
  handleOnFavourite: (updatedCoffee: Coffee) => void;
}

const MainContainer = styled.TouchableOpacity`
  width: 160px;
  background-color: ${Colors.lightBrownColor};
  border-radius: 20px;
  margin-right: 20px;
  margin-top: 20px;
  padding-bottom: 20px;
`;

const CoffeeImage = styled.Image`
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  height: 120px;
  width: 100%;
  align-self: center;
`;

const FirstRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-right: 10px;
  padding-left: 10px;
  margin-top: 10px;
`;
const Title = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: bold;
  width: 75%;
`;
const PriceText = styled.Text`
  color: ${Colors.darkBrownColor};
  font-size: 16px;
`;
const DescriptionText = styled.Text`
  color: ${Colors.darkBrownColor};
  margin-top: 10px;
  font-size: 12px;
  padding-right: 10px;
  padding-left: 10px;
  font-weight: bold;
`;

const IconTouchable = styled.TouchableOpacity`
  right: 10px;
  top: 10px;
  position: absolute;
  z-index: 1;
`;

const SingleCoffee = (props: CoffeeProps) => {
  const { item, handleOnFavourite } = props;
  const navigation = useNavigation<any>();

  function handleOnTap(favorite: boolean): void {
    const updatedCoffee = { ...item, favorite: !favorite };
    handleOnFavourite(updatedCoffee);
  }

  function handleNavigation(): void {
    navigation.navigate('CoffeeDetail', { item });
  }

  return (
    <MainContainer onPress={handleNavigation}>
      <IconTouchable onPress={() => handleOnTap(item.favorite)}>
        <Ionicons
          name={item.favorite ? 'heart' : 'heart-outline'}
          size={25}
          color={'red'}
        />
      </IconTouchable>
      <CoffeeImage
        resizeMode="cover"
        source={{
          uri: item.image,
        }}
      />
      <FirstRow>
        <Title>{item?.title ?? 'N/A'}</Title>
        <PriceText>${item.id * 20}</PriceText>
      </FirstRow>
      <DescriptionText numberOfLines={2}>{item?.description}</DescriptionText>
    </MainContainer>
  );
};

export default SingleCoffee;
