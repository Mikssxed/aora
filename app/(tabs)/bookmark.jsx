import React, { useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import VideoCard from "../../components/VideoCard";
import { searchBookmarked } from "../../lib/appwrite";
import useAppwrite from "../../lib/useAppwrite";

const Bookmark = () => {
  const { data: posts, refetch } = useAppwrite(searchBookmarked);
  const [refreshing, setRefreshing] = useState(false);
  const [query, setQuery] = useState("");

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  };

  return (
    <SafeAreaView className="bg-primary border-2 h-full">
      <FlatList
        data={posts.filter((post) => {
          if (!query) return true;
          return post.title.toLowerCase().includes(query.toLowerCase());
        })}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard video={item} />}
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-6">
            <View className="justify-between items-start flex-row mb-6">
              <Text className="text-2xl font-psemibold text-white">
                Bookmarked Videos
              </Text>
            </View>
            <SearchInput
              placeholder="Search your saved videos"
              onPress={setQuery}
              initialQuery={query}
            />
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            title="No Videos Found"
            subtitle="Bookmark videos to watch them later"
            explore
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Bookmark;
