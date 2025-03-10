import { View, Text, Image } from "react-native";
import images from "../../../constants/images";

export default function Favorites() {
  return (
    <View className="flex-1 bg-white pt-12 px-4 items-center justify-center">
      <Image 
        source={images.noResult} 
        className="w-48 h-48 mb-4"
        resizeMode="contain"
      />
      <Text className="text-xl font-bold mb-2">暂无收藏</Text>
      <Text className="text-gray-500 text-center">您还没有收藏任何房源，浏览并收藏您喜欢的房源</Text>
    </View>
  );
} 