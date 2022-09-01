import React from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";

import Icon from "react-native-vector-icons/Ionicons";
import OcticonsIcon from "react-native-vector-icons/Octicons";
import AntDesignIcon from "react-native-vector-icons/AntDesign";
import EvilIconsIcon from "react-native-vector-icons/EvilIcons";

import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import ReelsPage from "./src/screens/Reels";

class DiscoverScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ReelsPage />
      </View>
    );
  }
}

class StarScreen extends React.Component {
  render() {
    return (
      <SafeAreaView>
        <View style={[styles.container, styles.starView]}>
          <Text>StarScreen</Text>
        </View>
      </SafeAreaView>
    );
  }
}

class AddScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ReelsPage />
      </View>
    );
  }
}

class CartScreen extends React.Component {
  render() {
    return (
      <View style={[styles.container, styles.cartView]}>
        <Text>CartScreen</Text>
      </View>
    );
  }
}
class HistoryScreen extends React.Component {
  render() {
    return (
      <View style={[styles.container, styles.historyView]}>
        <Text>HistoryScreen</Text>
      </View>
    );
  }
}

const TabNavigator = createMaterialBottomTabNavigator(
  {
    Discover: {
      screen: DiscoverScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon
            style={[{ color: tintColor }]}
            size={25}
            name={"compass-outline"}
          />
        ),
      },
    },
    Stars: {
      screen: StarScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon
            style={[{ color: tintColor }]}
            size={25}
            name={"search-outline"}
          />
        ),
      },
    },
    Add: {
      screen: AddScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <OcticonsIcon
            style={[{ color: tintColor }]}
            size={25}
            name={"diff-added"}
          />
        ),
      },
    },
    Cart: {
      screen: CartScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <AntDesignIcon
            style={[{ color: tintColor }]}
            size={25}
            name={"shoppingcart"}
          />
        ),
      },
    },
    History: {
      screen: HistoryScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <EvilIconsIcon
            style={[{ color: tintColor }]}
            size={30}
            name={"user"}
          />
        ),
      },
    },
  },
  {
    // initialRouteName: "Home",
    activeColor: "#f71e78",
    // inactiveColor: "#fffff",
    barStyle: {
      backgroundColor: "transparent",
      borderTopWidth: 0,
      position: "absolute",
      left: 0,
      right: 0,
      bottom: 0,
      height: 80,
    },
  }
);

export default createAppContainer(TabNavigator);

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
  },
  starView: {
    display: "flex",
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  cartView: {
    display: "flex",
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  historyView: {
    display: "flex",
    flex: 1,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
});
