import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert,
  ActivityIndicator,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import LinearGradient from "react-native-linear-gradient";
import { FONTS } from "../constants";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigation();
  const handleSubmit = () => {
    axios
      .post("http://192.168.1.108:5000/api/auth/login", {
        email,
        password,
      })

      .then((res) => Alert.alert(res.data.msg))
      .then(() => {
        setEmail(""), setPassword("");
      })
      .then(() => navigation.navigate("Authentication"))
      .catch((err) => console.log(err));
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        // backgroundColor: "black",
      }}
    >
      {/* <LinearGradient
        colors={["#fffabf", "#fff","#fffabf"]}
        style={{
          height: "100%",
          flex: 1,
        }}
      > */}
      <View
        style={{
          paddingLeft: 20,
          paddingRight: 20,
        }}
      >
        <ScrollView showsHorizontalScrollIndicator={false}>
          {/* header content */}
          <View
            style={{
              flex: 1,
              flexDirection: "column",
              margin: 10,
              alignSelf: "center",
              // flexWrap:"wrap",
              marginTop: 50,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "goldenrod",
                fontSize: 30,
                fontWeight: "bold",
                margin: 2,
                fontFamily:"Philosopher-Bold"
              }}
            >
              Welcome !
            </Text>
            <Text
              style={{
                color: "black",
                fontSize: 30,
                fontWeight: "bold",
                margin: 2,
              }}
            >
              Please Login In
            </Text>
            <Text
              style={{
                color: "#000",
                fontSize: 30,
                fontWeight: "bold",
                margin: 2,
              }}
            ></Text>
            <View>
              <Image
                source={require("../assets/logo.png")}
                resizeMode="contain"
                style={{
                  width: 80,
                  height: 80,
                  margin: -5,
                }}
              />
            </View>
          </View>
          {/* Inputs fields */}
          <View>
            {/* logo field */}
            <View
              style={{
                flex: 1,
                alignSelf: "center",
                marginTop: 20,
              }}
            >
              {/* <Image
                source={require("../assets/earth.png")}
                resizeMode="contain"
                style={{
                  width: 350,
                  height: 200,
                  margin: 2,
                }}
              /> */}
            </View>
            {/* text Input field */}
            <Text
              style={{
                marginLeft: 12,
                fontSize: 15,
              }}
            >
              Email
            </Text>
            <TextInput
              style={{
                borderColor: "grey",
                height: 60,
                margin: 10,
                borderWidth: 1,
                padding: 12,
                color: "#000",
                borderRadius: 15,
                // borderStyle:"solid"
              }}
              returnKeyLabel="Email"
              onChangeText={(email) => setEmail(email)}
              value={email}
              placeholder="Email"
              keyboardType="email-address"
              placeholderTextColor="grey"
            />
            <Text
              style={{
                marginLeft: 12,
                fontSize: 15,
              }}
            >
              Password
            </Text>
            <TextInput
              style={{
                borderColor: "grey",
                height: 60,
                margin: 10,
                borderWidth: 1,
                padding: 10,
                color: "black",
                borderRadius: 15,
              }}
              onChangeText={(password) => setPassword(password)}
              value={password}
              placeholder="Enter password"
              placeholderTextColor="grey"
              secureTextEntry={true}
              inlineImageLeft="search_icon"
            />
          </View>

          <View
            style={{
              alignSelf: "flex-end",
              margin: 15,
            }}
          >
            <Text
              style={{
                color: "goldenrod",
              }}
            >
              Forget Password ?
            </Text>
          </View>

          <View
            style={{
              flex: 1,
              width: 200,
              alignSelf: "center",
              margin: 20,
            }}
          >
            <TouchableOpacity 
  
        
            style={{
              borderRadius: 15,
              height: 45,
              backgroundColor:"goldenrod"
            }}
            onPress={() => handleSubmit()}
          >
             <Text style={{
               textAlign:"center",
               padding:10,
               color:"white",
               fontSize:15
             }}>
               Login
             </Text>
            </TouchableOpacity>
              
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: "black",
                margin: 5,
              }}
            >
              Not a user already ?
            </Text>
            <Text
              style={{
                color: "goldenrod",
                margin: 5,
                fontWeight: "bold",
              }}
              onPress={() => navigation.navigate("Register")}
            >
              Sign Up
            </Text>
          </View>
        </ScrollView>
      </View>
      {/* </LinearGradient> */}
    </SafeAreaView>
  );
};

export default Login;
