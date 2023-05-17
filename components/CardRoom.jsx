import { Image, ScrollView, Text, View, FlatList } from "react-native";

export default function CardRoom({
  title,
  photos,
  ratingValue,
  review,
  price,
  user,
}) {
  return (
    <View style={StyleSheet.cardRoom}>
      {/* <ScrollView vertical>
        <FlatList
          data={photos}
          keyExtractor={(item) => String(item.url)}
          renderItem={({ item }) => (
            <Image
              source={require(item.url)}
              style={styles.logoConnect}
              resizeMode="contain"
            />
          )}
        />
      </ScrollView> */}
    </View>
  );
}
