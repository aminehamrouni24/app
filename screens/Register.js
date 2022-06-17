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
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import LinearGradient from "react-native-linear-gradient";
import { FONTS } from "../constants";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const [password, setPassword] = useState("");

  const navigation = useNavigation();

  const handleSubmit = async () => {
    await axios
      .post("http://192.168.1.108:5000/api/auth/register", {
        firstName,
        lastName,
        email,
        phoneNumber,
        password,
      })

      .then((res) => Alert.alert(res.data.msg))
      .then(() => navigation.navigate("Login"))
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
        colors={[ "#fff","#000"]}
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
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#000",
                fontSize: 30,
                fontWeight: "bold",
                margin: 2,
                fontFamily: "lucida grande",
              }}
            >
              Nice To meet you !
            </Text>

            <View>
              <Image
                source={require("../assets/logo.png")}
                resizeMode="contain"
                style={{
                  width: 70,
                  height: 70,
                  margin: 2,
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
              }}
            ></View>
            {/* text Input field */}

            <TextInput
              style={{
                borderColor: "grey",
                height: 60,
                margin: 10,
                borderWidth: 1,
                padding: 12,
                color: "#000",
                borderRadius: 15,
              }}
              onChangeText={(firstName) => setFirstName(firstName)}
              value={firstName}
              placeholder="Enter FirstName"
              placeholderTextColor="grey"
            />
            <TextInput
              style={{
                borderColor: "grey",
                height: 60,
                margin: 10,
                borderWidth: 1,
                padding: 12,
                color: "#000",
                borderRadius: 15,
              }}
              onChangeText={(lastName) => setLastName(lastName)}
              value={lastName}
              placeholder="Enter LastName"
              label="lastName"
              placeholderTextColor="grey"
            />
            <TextInput
              style={{
                borderColor: "grey",
                height: 60,
                margin: 10,
                borderWidth: 1,
                padding: 12,
                color: "#000",
                borderRadius: 15,
              }}
              onChangeText={(email) => setEmail(email)}
              value={email}
              placeholder="Enter Email"
              placeholderTextColor="grey"
              keyboardType="email-address"
            />
            <TextInput
              style={{
                borderColor: "grey",
                height: 60,
                margin: 10,
                borderWidth: 1,
                padding: 12,
                color: "#000",
                borderRadius: 15,
              }}
              onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
              value={phoneNumber}
              placeholder="Enter phone-number"
              placeholderTextColor="grey"
              keyboardType="number-pad"
            />
            <TextInput
              style={{
                borderColor: "grey",
                height: 60,
                margin: 10,
                borderWidth: 1,
                padding: 12,
                color: "#000",
                borderRadius: 15,
              }}
              onChangeText={(password) => setPassword(password)}
              value={password}
              placeholder="Enter password"
              placeholderTextColor="grey"
              secureTextEntry={true}
            />
          </View>

          <View
            style={{
              flex: 1,
              width: 200,
              alignSelf: "center",
              margin: 20,
            }}
          >
            <Button
              title="Register"
              color="goldenrod"
              style={{
                borderRadius: 15,
                height: 50,
              }}
              onPress={() => handleSubmit()}
            />
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
              Already have an account?
            </Text>
            <Text
              style={{
                color: "goldenrod",
                margin: 5,
                fontWeight: "bold",
              }}
              onPress={() => navigation.navigate("Login")}
            >
              Sign In
            </Text>
          </View>
        </ScrollView>
      </View>
      {/* </LinearGradient> */}
    </SafeAreaView>
  );
};

export default Register;
