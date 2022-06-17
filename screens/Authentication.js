import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import TouchID from "react-native-touch-id";

const Authentication = () => {
  const navigation = useNavigation();
  const optionalConfigObject = {
    title: "Provide your TOUCH ID",
    imageColor: "goldenrod",
    imageErrorColor: "goldenrod",
    sensorDescription: "Touch Sensor",
    sensorErroDescription: "Failed",
    cancelText: "Cancel",
    fallBackLabel: "Show Passcode",
    LAErrorUserFallback: "Show Passcode",

    unifiedErrors: false,
    passcodeFallback: false,
  };
  const [isAuth, setIsAuth] = useState("false");
  useEffect(() => {
    handleBiometric;
  });
  const handleBiometric = () => {
    TouchID.isSupported().then((biometryType) => {
      if (biometryType === "FaceID") {
        console.log("FaceID is supported !!");
      } else {
        console.log("TouchID is supported !!");
        TouchID.authenticate("", optionalConfigObject)
          .then((success) => {
            console.log("Success", success);
            setIsAuth(success);
          })
          .then(() => Alert.alert("Access Granted !!"))
          .then(() => navigation.navigate("MainLayout"))
          .catch((err) => console.log("Error", err));
      }
    });
  };
  return (
    <View
      style={{
        flex: 1,
      }}
    >
    
          {/* <LinearGradient
          colors={["#fff", "#fff", "#fff"]}
          style={{
            alignSelf: "center",
            alignItems:"center",
            backgroundColor:"black",
            width:"100%",
            borderBottomLeftRadius:20,
            borderBottomRightRadius:20,
            height:150,
            marginBottom:25,
            alignContent:"center",
            padding:19

          }}
        >
          <Text style={{
            textAlign:"center",
            margin:5,
            padding:5,
            fontSize:32,
            color:"black",
            fontWeight:"bold"
          }}>Please Secure your account !</Text>
          </LinearGradient> */}
        {/* </View> */}
        <Image
          source={require("../assets/security10.png")}
          resizeMode="cover"
          style={{
            width: 350,
            height: 300,
            alignSelf: "center",
            marginTop:60,
            marginBottom : 45
          }}
        />
        <TouchableOpacity
          onPress={handleBiometric}
          style={{
            // flex:1,
            backgroundColor: "#000",
            height: 50,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            marginTop: 15,
            width: 250,
            height: 50,
            textAlign:"center"
          }}
        >
          <Text style={{ color: "#fff", marginLeft: 5, fontSize: 18 , textAlign:"center"}}>
            Choose a Method Of Security
          </Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: "row",
            justifyContent:"space-evenly",
            margin:10,
            marginTop:50
          }}
        >
          <Image
            source={require("../assets/faceid.png")}
            style={{
              width: 50,
              height: 50,
              borderWidth:1,
              padding:5,
              borderColor:"goldenrod",
              borderRadius:10
            }}
          />
          <Image
            source={require("../assets/finger.png")}
            style={{
              width: 50,
              height: 50,
              borderWidth:1,
              padding:5,
              borderColor:"goldenrod",
              borderRadius:10
            }}
          />
          <Image
            source={require("../assets/passcode.png")}
            style={{
              width: 50,
              height: 50,
              borderWidth:1,
              padding:5,
              borderColor:"goldenrod",
              borderRadius:10
            }}
          />
        </View>
      {/* </LinearGradient> */}
    </View>
  );
};

export default Authentication;
