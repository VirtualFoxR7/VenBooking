import { StyleSheet } from "react-native";
import { Colors } from "./colors";

const Values = {
  Radius: 10,

  Padding: 10,
  HalfPadding: 5,
  DoublePadding: 20,

  Margin: 10,
  HalfMargin: 5,
  DoubleMargin: 20,

  TitleSize: 30,
};

export const GlobalStyles = StyleSheet.create({
  Accent: {
    color: Colors.secondary,
    fontWeight: "bold",
  },
});

export const Images = StyleSheet.create({
  InnMinimal: {
    height: 100,
    width: 200,
    borderRadius: Values.Radius,
    padding: Values.Padding,
    margin: Values.Margin,
  },
});

export const InnStyles = StyleSheet.create({
  MinimalContainer: {
    padding: Values.Padding,
  },

  MinimalTitle: {
    fontSize: Values.TitleSize,
    fontWeight: "bold",
    color: Colors.primary,
  },
});

export const PressableStyles = StyleSheet.create({
    notPressed: {
        maxWidth: 220,
        width: 220,
    backgroundColor: Colors.backgroundElement,
    margin: Values.Margin,
    borderRadius: Values.Radius,
  },
  pressed: {
    backgroundColor: Colors.backgroundSelected,
    transform: [{ scale: 0.98 }],
    },
  
    FilterChipsS: {
        backgroundColor: Colors.secondary,
        margin: Values.HalfMargin,
        padding: Values.HalfPadding,
        borderRadius: Values.Radius,
    },
    
    FilterChipsUnS: {
        
    }
});

export const DetailsStyles = StyleSheet.create({
  General: {
    flex: 1,
    marginTop: 35,
    backgroundColor: Colors.background,
  },

  Image: {
    height: 200,
    margin: Values.DoubleMargin,
    borderRadius: Values.Radius,
  },

  Title: {
    fontSize: Values.TitleSize,
    fontWeight: "bold",
    color: Colors.primary,

    marginRight: Values.DoubleMargin,
  },
});