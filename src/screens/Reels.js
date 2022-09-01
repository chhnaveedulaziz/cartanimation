import * as React from "react";
import {
  View,
  StyleSheet,
  Button,
  Text,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Video, AVPlaybackStatus } from "expo-av";
import { getVideos } from "../utils/api";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";

export default function ReelsPage() {
  const video = React.useRef(null);
  const [status, setStatus] = React.useState({});
  const [allVideo, setVideosData] = React.useState({});
  const [likesCount, setLikesCount] = React.useState(0);
  const [activeTaskIndex, setActiveTaskIndex] = React.useState();
  const [commentsCount, setCommentsCount] = React.useState(0);
  const [addToCart, setAddToCart] = React.useState(false);
  const [videoToDisplay, setVideoToDisplay] = React.useState(1);

  const getVideosData = async () => {
    const videoData = await getVideos(videoToDisplay);
    setVideosData(videoData);
    setVideoToDisplay(videoToDisplay + 1);
  };

  React.useEffect(() => {
    getVideosData();
  }, []);

  const loadMore = async () => {
    const videoData = await getVideos(videoToDisplay + 1);
    setVideosData(videoData);
    setVideoToDisplay(videoToDisplay + 1);
  };

  if (allVideo.data === undefined) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={allVideo.data}
        onEndReached={loadMore}
        renderItem={(item) => (
          <View>
            <View
              style={{
                position: "absolute",
                zIndex: 2,
                top: 50,
                left: 60,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>
                Maged el Masry to All users
              </Text>
            </View>
            <TouchableOpacity
              onPress={() =>
                status.isPlaying
                  ? video.current.pauseAsync()
                  : video.current.playAsync()
              }
            >
              <Video
                ref={video}
                style={styles.video}
                source={{
                  uri: item.item.url,
                }}
                // useNativeControls
                resizeMode="cover"
                isLooping
                onPlaybackStatusUpdate={(status) => setStatus(() => status)}
              />
            </TouchableOpacity>
            <View
              style={{
                position: "absolute",
                zIndex: 2,
                bottom: 250,
                right: 20,
              }}
            >
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 50,
                  width: 35,
                  height: 35,
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                {activeTaskIndex === item.index ? (
                  <AntDesignIcon
                    onPress={() => {
                      setLikesCount(
                        likesCount === 0 && activeTaskIndex === item.index
                          ? 1
                          : 0
                      );
                      setActiveTaskIndex(item.index);
                    }}
                    style={[{ color: "pink" }]}
                    size={25}
                    name={"heart"}
                  />
                ) : (
                  <AntDesignIcon
                    onPress={() => {
                      setLikesCount(likesCount === 0 ? 1 : 0);
                      setActiveTaskIndex(item.index);
                      setAddToCart(true);
                    }}
                    style={[{ color: "white" }]}
                    size={25}
                    name={"heart"}
                  />
                )}
              </View>
              <Text style={{ paddingLeft: 15, color: "white" }}>
                {activeTaskIndex === item.index ? likesCount : 0}
              </Text>
              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 50,
                  width: 35,
                  height: 35,
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                  marginTop: 20,
                }}
              >
                <Icon
                  style={[{ color: "white" }]}
                  size={25}
                  name={"chatbubble-ellipses-outline"}
                />
              </View>
              <Text style={{ paddingLeft: 15 }}>{commentsCount}</Text>
              <View
                style={{
                  borderWidth: 5,
                  borderRadius: 50,
                  width: 35,
                  height: 35,
                  // marginTop: 10,
                  marginVertical: 20,
                  borderColor: "white",
                  backgroundColor: "transparent",
                  justifyContent: "center",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  source={{ uri: item.item.talent.avatar_url }}
                  resizeMethod="resize"
                  resizeMode="center"
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 50,
                  }}
                />
              </View>

              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 50,
                  width: 35,
                  height: 35,
                  marginTop: 10,
                  justifyContent: "center",
                  backgroundColor: "transparent",
                  alignContent: "center",
                  alignItems: "center",
                }}
              >
                <Icon
                  style={[{ color: "white" }]}
                  size={25}
                  name={"volume-mute-outline"}
                />
              </View>
            </View>
            <View
              style={{
                position: "absolute",
                bottom: 100,
                borderWidth: 1,
                width: 350,
                marginHorizontal: 20,
                borderRadius: 10,
                height: 100,
                backgroundColor: addToCart ? "#ffffff" : "transparent",
                borderColor: "grey",
                flexDirection: "row",
                paddingVertical: 10,
                justifyContent: "center",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              {activeTaskIndex !== item.index ? (
                <View
                  style={{
                    backgroundColor: "pink",
                    height: 80,
                    borderRadius: 50,
                    width: 80,

                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: item.item.talent.avatar_url }}
                    resizeMethod="resize"
                    resizeMode="center"
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 50,
                    }}
                  />
                </View>
              ) : (
                <View
                  style={{
                    backgroundColor: "#56ba7e",
                    height: 80,
                    borderRadius: 50,
                    width: 80,
                    justifyContent: "center",
                    marginLeft: "-20%",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    style={[{ color: "white" }]}
                    size={45}
                    name={"checkmark-sharp"}
                  />
                </View>
              )}
              <View
                style={{
                  marginHorizontal: 10,
                }}
              >
                <Text
                  style={{
                    color: addToCart ? "black" : "white",
                    fontWeight: "bold",
                  }}
                >
                  #Eau de Perfum
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    color: addToCart ? "black" : "white",
                    paddingVertical: 5,
                  }}
                >
                  {item.item.talent.bio_en.length < 35
                    ? `${item.item.talent.bio_en}`
                    : `${item.item.talent.bio_en.substring(0, 20)}...`}
                </Text>
                <Text
                  style={{
                    color: addToCart ? "black" : "white",
                    fontWeight: "bold",
                  }}
                >
                  {item.item.talent.converted_currency}{" "}
                  {item.item.talent.cost_ios}
                </Text>
              </View>
              {activeTaskIndex !== item.index && (
                <TouchableOpacity
                  onPress={() => {
                    setAddToCart(true);
                    setLikesCount(likesCount === 0 ? 1 : 0);
                    setActiveTaskIndex(item.index);
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#f81f78",
                      height: 50,
                      borderRadius: "10",
                      width: 80,
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        textTransform: "capitalize",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Add to
                    </Text>
                    <Text
                      style={{
                        textTransform: "capitalize",
                        color: "white",
                        fontWeight: "bold",
                      }}
                    >
                      Cart
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
              {addToCart && activeTaskIndex === item.index && (
                <View
                  style={{
                    backgroundColor: "pink",
                    height: 60,
                    position: "absolute",
                    bottom: -30,
                    right: 100,
                    borderRadius: 50,
                    width: 60,

                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={{ uri: item.item.talent.avatar_url }}
                    resizeMethod="resize"
                    resizeMode="center"
                    style={{
                      width: 60,
                      height: 60,
                      borderRadius: 50,
                    }}
                  />
                </View>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: "center",
  },
  video: {
    alignSelf: "center",
    width: wp("100%"),
    height: hp("100%"),
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
