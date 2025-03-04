import * as React from "react";
import { Image, StyleSheet } from "react-native";

const Bgelement = () => {
  return (
    <Image
      source={require("@/assets/images/BG.png")}
      style={styles.backgroundImage}
    />
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    position: "absolute",
    top: -250,
    width: "100%",
    height: "80%",
  },
});

export default Bgelement;