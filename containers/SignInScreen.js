import { useNavigation } from "@react-navigation/core";
import { useState } from "react";
import {
  Button,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  // Image,
} from "react-native";
import axios from "axios";
import Cookies from "js-cookie";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");

  const handleSubmit = async () => {
    // event.preventDefault();
    if (!email || !password) {
      setAlert("Please fill all fields");
    } else {
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        {
          email: email,
          password: password,
        }
      );
      console.log(response);
      if (response.status === "401") {
        setAlert("Email or/and password incorrect");
      }
      console.log(response);
      const userToken = response.data;
      Cookies.set("airbnbToken", userToken, { expire: 7 });
      setToken(userToken);
    }
  };
  return (
    <View>
      <View style={StyleSheet.blockConnect}>
        {/* <Image
          source={require("../assets/airbnbLogo.png")}
          style={StyleSheet.logoConnect}
          resizeMode="contain"
        /> */}
        <Text style={StyleSheet.title}>Sign In</Text>
      </View>
      <View style={StyleSheet.blockConnect}>
        <TextInput
          placeholder="Email"
          multiline={false}
          style={StyleSheet.inputConnect}
          onChangeText={(text) => {
            setEmail(text);
          }}
          value={email}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={StyleSheet.inputConnect}
          onChangeText={(text) => {
            setPassword(text);
          }}
          value={password}
        />
      </View>
      <View style={StyleSheet.blockConnect}>
        {alert && (
          <Text style={[StyleSheet.text, StyleSheet.red]}>{alert}</Text>
        )}
        <Button
          title="Sign in"
          onPress={async () => {
            handleSubmit();
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text style={StyleSheet.text}>No account ? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
