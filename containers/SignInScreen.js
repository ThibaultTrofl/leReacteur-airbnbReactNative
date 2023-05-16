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

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  console.log(username);
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
          placeholder="Username"
          multiline={false}
          style={StyleSheet.inputConnect}
          onChangeText={(text) => {
            setUsername(text);
          }}
          value={username}
        />
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          style={StyleSheet.inputConnect}
        />
      </View>
      <View style={StyleSheet.blockConnect}>
        <Button
          title="Sign in"
          onPress={async () => {
            const userToken = "secret-token";
            setToken(userToken);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>No account ? Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
