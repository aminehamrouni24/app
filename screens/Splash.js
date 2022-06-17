import { View, Text, ImageBackground, Image, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import FadeInOut from "react-native-fade-in-out";
import { SIZES, COLORS, FONTS, dummyData, icons } from "../constants";

const Splash = () => {
  const navigation = useNavigation();
  const [translation, setTranslation] = useState(0);
  const [visible, setVisible] = useState(true);

  const toggleVisible = () => {
    setVisible(!visible);
  };
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("OnBoarding");
    }, 5000);
  }, []);
  // useEffect(() => {
  //   for (let i = 0; i < 50; i++) {
  //     setTimeout(() => {
  //       setTranslation(i);
  //     }, 100 * i);
  //   }
  // }, []);
  return (
    <LinearGradient
      colors={["goldenrod", "black"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        flex: 1,
        alignSelf: "center",
        width: "100%",
      }}
    >
      {/* <ImageBackground 
    source={require('../assets/gbg.png')}
    style={{
      width:"100%",flex: 1,
      alignSelf: "center",
    }}
    > */}
      <View
        style={{
          flex: 1,
          alignSelf: "center",
        }}
      >
        <Image
          source={require("../assets/logo10.png")}
          resizeMode="contain"
          style={{
            width: 300,
            height: 300,
            flex: 1,
            alignSelf: "center",
            marginTop: "-10%",
            zIndex: 1,
            left: 2,
          }}
        />
        <Image
          source={require("../assets/whitepng.png")}
          resizeMode="contain"
          style={{
            width: 120,
            height: 120,
            marginTop: "50%",
            alignSelf: "center",
            position: "absolute",
          }}
        />
      </View>
      {/* </ImageBackground> */}
    </LinearGradient>
  );
};

export default Splash;
