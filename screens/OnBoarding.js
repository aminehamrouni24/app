import { View, Text, Image } from "react-native";
import React from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import Icon from 'react-native-ionicons'
import LinearGradient from "react-native-linear-gradient";

import { useNavigation } from "@react-navigation/native";
import { FONTS } from "../constants";
const OnBoarding = () => {
  const navigation = useNavigation();
  const slides = [
    {
      key: 1,
      title: "Innovative way to manage your life ",
      text: "Connect your financial assets  \n\n And embrace the future...",
      image: require("../assets/13.png"),
      // backgroundColor: "#59b2ab",
    },
    {
      key: 2,
      title: "Get your first Gold Cryptocurrency Coin ",
      text: "Be a part of a revolutionnary asset.",
      image: require("../assets/logo1.png"),
      // backgroundColor: "#febe29",
    },
    {
      key: 3,
      title: "Let's Get Started",
      text: "Together for the future",
      image: require("../assets/trois.png"),
      // backgroundColor: "#22bcb5",
    },
  ];

  // rendering items
  const _renderItem = ({ item }) => {
    return (
      //   <LinearGradient
      //   colors={["#000", "#fff"]}
      //   style={{
      //     height: "100%",
      //     flex: 1,
      //   }}
      // >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        //   backgroundColor: "lightgrey",
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "flex-end",
            paddingStart: "8%",
            paddingRight: "8%",
          }}
        >
          <Text
            style={{
              color: "goldenrod",
              fontSize: 25,
              fontWeight: "bold",
              textAlign: "center",
              ...FONTS.h1, 
         
            }}
          >
            {item.title}
          </Text>
        </View>
      
       
        <View style={{ flex: 3, justifyContent: "center" }}>
          <Image
            source={item.image}
            style={{ width: 390, height: 340, resizeMode: "contain" }}
          />
        </View>

        <View
          style={{
            flex: 1,
            justifyContent: "flex-start",
            paddingStart: "8%",
            paddingRight: "8%",
          }}
        >
          <Text
            style={{ textAlign: "center", fontWeight: "bold", color: "black",fontSize:20 ,...FONTS.h2 , lineHeight:22}}
          >
            {item.text}
          </Text>
        </View>
      </View>
      // </LinearGradient>
    );
  };

  const _renderNextButton = () => {
    return (
      <View
        style={{
          width: 40,
          height: 40,
          backgroundColor: "goldenrod",
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon name="arrow" color="rgba(0,0,0, .9 )" size={24} />
      </View>
    );
  };

  const _renderDoneButton = () => {
    return (
      <View
        style={{
          width: 40,
          height: 40,
          backgroundColor: "goldenrod",
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Icon name="arrow" color="#000" size={24} />
      </View>
    );
  };

  const _renderSkipButton = () => {
    return (
      <View style={{ color: "black", fontWeight: "bold" }}>
        <Text
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center",
            color: "black",
          }}
        >
          Skip
        </Text>
      </View>
    );
  };

  const _onEndReached = () => {
    navigation.navigate("Register");
  };

  return (
    <AppIntroSlider
      data={slides}
      renderItem={_renderItem}
      renderDoneButton={_renderDoneButton}
      renderNextButton={_renderNextButton}
      renderSkipButton={_renderSkipButton}
      onDone={_onEndReached}
      onSkip={_onEndReached}
      dotClickEnabled={true}
      showNextButton={true}
      showDoneButton={true}
      showSkipButton={true}
    ></AppIntroSlider>
  );
};

export default OnBoarding;
