import { useNavigation } from "@react-navigation/core";
import { Button, Text, View } from "react-native";
import CardRoom from "../components/CardRoom";
import axios from "axios";
import { useEffect, useState } from "react";
import { FlatList } from "react-native-web";

export default function HomeScreen() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [dataRoom, setDataRoom] = useState([]);

  useEffect(() => {
    const FechDataRoom = async () => {
      try {
        const { data } = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        console.log(JSON.stringify(data, null, 2));
        setDataRoom(data);
        setIsLoading(!isLoading);
      } catch (error) {
        console.log(error.message);
      }
    };
    FechDataRoom();
  }, []);

  return (
    <View>
      <Text>Welcome home!</Text>
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
      {!isLoading && (
        <FlatList
          data={dataRoom}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => {
            // <CardRoom
            //   title={title}
            //   photos={photos}
            //   ratingValue={ratingValue}
            //   review={review}
            //   price={price}
            //   user={user}
            // />;

            console.log("ICI --------------- " + item.title);
          }}
        />
      )}
    </View>
  );
}
