import styled from 'styled-components/native';
import { ActivityIndicator, Dimensions } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import useFont from '../hooks/useFont';
import SingleCoffee from '../component/SingleCoffeeComponent';
import { Colors } from '../const/AppColors';
import { ApiService } from '../services/api';
import { Coffee } from '../services/models/coffe';
import { ErrorType } from '../services/models/error';
import { AppImage } from '../const/AppImages';

const mHeight = Dimensions.get('screen').height;
const mWidth = Dimensions.get('screen').width;

const LoaderView = styled.View`
  justify-content: center;
  flex: 1;
`;

const MainContainer = styled.View`
  flex: 1;
  background-color: ${Colors.darkBrownColor};
`;

const Overlay = styled.View`
  height: ${mHeight * 0.4}px;
  width: ${mWidth}px;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
`;

const ImageMainView = styled.ImageBackground`
  height: ${mHeight * 0.4}px;
  width: ${mWidth}px;
  background-color: black;
`;

const MainImage = styled.Image`
  height: ${mHeight * 0.4}px;
  width: ${mWidth}px;
  background-color: rgba(0, 0, 0, 0.5);
`;

const MainBottomView = styled.View`
  height: ${mHeight * 0.7}px;
  width: ${mWidth}px;
  background-color: ${Colors.darkBrownColor};
  position: absolute;
  top: ${mHeight * 0.29}px;
  border-top-left-radius: 80px;
  border-top-right-radius: 80px;
`;
const NavView = styled.View`
  position: absolute;
  top: 20px;
  padding: 20px;
  justify-content: center;
  justify-content: space-between;
  width: ${mWidth}px;
  flex-direction: row;
`;
const AvatarImage = styled.Image`
  height: 40px;
  width: 40px;
  border-radius: 20px;
`;

const MyText = styled.Text`
  font-family: 'jost_bold';
  font-size: 30px;
  color: white;
`;

const InnerContent = styled.View`
  position: absolute;
  top: -120px;
  margin-left: 20px;
  margin-right: 20px;
  height: ${mHeight * 0.8}px;
`;

const MyFlatList = styled.FlatList`
  overflow: visible;
`;

const MyLoader = styled.ActivityIndicator``;

const CoffeeScreen = () => {
  const [MyList, setMyList] = useState<Coffee[]>();
  const [isReady, setReady] = useState(false);
  const [custError, setCustError] = useState<ErrorType | null>(null);

  const apiService = new ApiService();

  useEffect(() => {
    loadFonts();
    getAllCoffeeData();
  }, []);
  const loadFonts = async () => {
    await useFont();
    setReady(true);
  };
  const getAllCoffeeData = async () => {
    setReady(false);

    try {
      const response = await apiService.weMet<Coffee[]>(
        'https://api.sampleapis.com/coffee/hot'
      );
      const updatedResponse = response.map((coffee) => ({
        ...coffee,
        favorite: false,
      }));

      setMyList(updatedResponse);
    } catch (error) {
      setCustError(error as ErrorType);
    } finally {
      setReady(true);
    }
  };

  const onItemFavouriteClick = (updatedCoffee: Coffee) => {
    const updatedList = MyList.map((coffee) => {
      if (coffee && coffee.id && updatedCoffee && updatedCoffee.id) {
        return coffee.id === updatedCoffee.id ? updatedCoffee : coffee;
      }
      return coffee;
    });
    setMyList(updatedList);
  };

  if (!isReady)
    return (
      <LoaderView>
        <MyLoader size={40} />
      </LoaderView>
    );
  else
    return (
      <MainContainer>
        <ImageMainView>
          <MainImage source={{ uri: AppImage.coffeeShopBg }} />
          <Overlay></Overlay>
          <NavView>
            <AvatarImage
              source={{
                uri: AppImage.userAvatar,
              }}
            />

            <Ionicons name="search" size={30} color={Colors.lightBrownColor} />
          </NavView>
        </ImageMainView>
        <MainBottomView>
          <InnerContent>
            <MyText>Coffee Menu</MyText>

            <MyFlatList
              data={MyList}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <SingleCoffee
                  item={item}
                  handleOnFavourite={(updatedCoffee: Coffee) =>
                    onItemFavouriteClick(updatedCoffee)
                  }
                />
              )}
            />
          </InnerContent>
        </MainBottomView>
      </MainContainer>
    );
};

export default CoffeeScreen;

const CoffeeList: Coffee[] = [
  {
    id: 22,
    title: 'My Title',
    description: 'Some Stupid Description here',
    ingredients: ['Sugar', 'Spice', 'Everything Nice'],
    image:
      'https://static.vecteezy.com/system/resources/thumbnails/026/791/497/small/watercolor-cup-of-coffee-illustration-ai-generative-png.png',
    favorite: false,
  },
  {
    id: 22,
    title: 'My Title2 ',
    description: 'Some 2nd Stupid Description here',
    ingredients: ['Makhan', 'Sugar', 'Spice', 'Everything Nice'],
    image:
      'https://static.vecteezy.com/system/resources/previews/029/283/233/original/coffee-coffee-coffee-clipart-transparent-background-ai-generative-free-png.png',
    favorite: false,
  },
  {
    id: 24,
    title: 'Expresso',
    description: 'Description',
    image:
      'https://static.vecteezy.com/system/resources/previews/029/283/233/original/coffee-coffee-coffee-clipart-transparent-background-ai-generative-free-png.png',
    favorite: false,
    ingredients: ['Sugar', 'Spice', 'Everything Nice'],
  },
];
