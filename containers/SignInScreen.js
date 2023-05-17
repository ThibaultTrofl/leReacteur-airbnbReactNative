import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { useWindowDimensions, Image, Pressable } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Constants from "expo-constants";

import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  TouchableHighlight,
  StyleSheet,
  // Image,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [alert, setAlert] = useState("");

  const styles = useStyle();

  const handleSubmit = async () => {
    // event.preventDefault();

    try {
      if (!email || !password) {
        setAlert("Please fill all fields");
      } else {
        setAlert("");
        const response = await axios.post(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
          {
            email: email,
            password: password,
          }
        );

        if (response.data) {
          const userToken = response.data.token;
          AsyncStorage.set("airbnbToken", userToken, { expire: 7 });
          setToken(userToken);
        } else {
          setAlert("Email or/and password incorrect");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <KeyboardAwareScrollView extraScrollHeight={50}>
      <View style={styles.container}>
        <View style={styles.blockConnect}>
          <Image
            source={require("../assets/airbnbLogo.png")}
            style={styles.logoConnect}
            resizeMode="contain"
          />
          <Text style={styles.title}>Sign in</Text>
        </View>

        <View style={styles.blockConnect}>
          <TextInput
            placeholder="Email"
            multiline={false}
            style={styles.inputConnect}
            onChangeText={(text) => {
              setEmail(text);
              setAlert("");
            }}
            value={email}
          />
          <View style={styles.inputConnect}>
            <TextInput
              placeholder="Password"
              secureTextEntry={hidePassword}
              onChangeText={(text) => {
                setPassword(text);
                setAlert("");
              }}
              value={password}
              style={styles.inputPassword}
            />
            <TouchableHighlight
              underlayColor="#EB5A62"
              onPress={() => {
                setHidePassword(!hidePassword);
              }}
            >
              {hidePassword ? (
                <Feather name="eye" size={24} style={styles.hidePassword} />
              ) : (
                <Feather name="eye-off" size={24} style={styles.hidePassword} />
              )}
            </TouchableHighlight>
          </View>
        </View>
        <View style={styles.blockConnect}>
          {alert ? (
            <Text style={[styles.text, styles.red]}>{alert}</Text>
          ) : (
            <Text style={styles.text}></Text>
          )}

          <Pressable
            onPress={async () => {
              handleSubmit();
            }}
            style={styles.button}
          >
            <Text style={styles.title}> Sign in</Text>
          </Pressable>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.text}>No account ? Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const useStyle = () => {
  const { height, width } = useWindowDimensions();

  const styles = StyleSheet.create({
    container: {
      backgroundColor: "white",
      paddingTop: Constants.statusBarHeight,
      // height: "0%",
    },

    text: {
      fontSize: 14,
      color: "#717171",
      height: 16,
    },

    red: {
      color: "#EB5A62",
    },
    blockConnect: {
      height: height / 3,
      // borderColor: "black",
      // borderWidth: 5,
      alignItems: "center",
      justifyContent: "center",
      gap: "15%",
    },
    blockSubmit: {
      height: height / 4,
      // borderColor: "black",
      // borderWidth: 5,
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
    },

    logoConnect: {
      height: "40%",
    },

    title: {
      fontSize: 22,
      color: "#717171",
      fontWeight: "bold",
    },

    inputConnect: {
      height: 40,
      marginHorizontal: 20,
      paddingLeft: 5,
      width: "92%",
      marginHorizontal: "4%",
      flexDirection: "row",
      borderBottomColor: "#EB5A62",
      borderBottomWidth: 1,
      justifyContent: "space-between",
      alignItems: "center",
    },

    inputPassword: {
      // paddingLeft: 10,
      justifyContent: "flex-start",
    },
    hidePassword: {
      color: "#717171",
      marginRight: 10,
    },
    button: {
      borderColor: "#EB5A62",
      borderWidth: 3,
      borderRadius: "50%",
      paddingHorizontal: 60,
      paddingVertical: 15,
      color: "#717171",
    },
  });

  return styles;
};
