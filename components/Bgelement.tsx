import * as React from "react";
import { Image, StyleSheet } from "react-native";

const Bgelement = () => {
  return (
    <Image
      source={require("@/assets/images/Bgcycle.png")}
      style={styles.backgroundImage}
    />
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: -200,
    right: -180,
    width: "200%",
    height: "80%",
  },
});

export default Bgelement;