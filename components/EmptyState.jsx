import { router } from "expo-router";
import React from "react";
import { Image, Text, View } from "react-native";
import { images } from "../constants";
import CustomButton from "./CustomButton";

const EmptyState = ({ title, subtitle, explore = false }) => {
  return (
    <View className="justify-center items-center px-4">
      <Image
        source={images.empty}
        className="w-[270px] h-[215px]"
        resizeMode="contain"
      />
      <Text className="text-xl text-center font-psemibold text-white mt-2">
        {title}
      </Text>
      <Text className="font-pmedium text-sm text-gray-100">{subtitle}</Text>
      {explore ? (
        <CustomButton
          title="Explore"
          handlePress={() => router.push("/home")}
          containerStyles="w-full my-5"
        />
      ) : (
        <CustomButton
          title="Create video"
          handlePress={() => router.push("/create")}
          containerStyles="w-full my-5"
        />
      )}
    </View>
  );
};

export default EmptyState;
