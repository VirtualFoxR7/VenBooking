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

  borderWith: 2
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

export const ProfileStyle = StyleSheet.create({
  global: {
    paddingLeft: 10,
    paddingRight: 10,
  },

  GeneralText: {
    color: Colors.primary,
  },

  Name: {
    fontWeight: "black",
    fontSize: 30,
    color: Colors.primary,
  },

  image: {
    width: 100,
    height: 100,
    position: "relative",
    margin: 2.5,
    borderRadius: 100,
  },

  userInfo: {
    backgroundColor: Colors.backgroundElement,

    borderTopWidth: Values.borderWith,
    borderRightWidth: Values.borderWith,
    borderLeftWidth: Values.borderWith,

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    borderColor: Colors.backgroundSelected,

    paddingBottom: 1000,
    paddingLeft: 10,
  },

  pressable: {
    color: Colors.tertiary,
    backgroundColor: Colors.secondary,

    height: 25,
    width: 100,
    borderRadius: 100,

    alignItems: "center",
    alignSelf: "center",
    marginLeft: 140,
  },
});

export const styles = StyleSheet.create({
    boton: {
        backgroundColor: '#10b981',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 8,
    },
    texto: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export const styless = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 8,
    marginBottom: 5,
  },
  inputError: { borderColor: "red" },
  errorText: { color: "red", marginBottom: 10 },
  button: {
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: { backgroundColor: "#a1caff" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  cancelButton: { padding: 15, alignItems: "center", marginTop: 10 },
  cancelButtonText: { color: Colors.tertiary, fontWeight: "bold" },
});

export const stylesSheets = StyleSheet.create({
  image: {
    width: 300,
    height: 150,
    alignSelf: "center",
    alignItems: "center",
    position: "relative",
    margin: 2.5,
    borderRadius: 20,
  },
  MainTextView: {
    marginLeft: 10,
    maxWidth: 200,
    maxHeight: 100,
  },
  TitleText: {
    fontSize: 25,
    fontWeight: "bold",
    color: Colors.text,
  },
  InfoView: {
    flexGrow: 100,
    paddingLeft: 15,
    flexShrink: 1,
  },
});

export const stylesl = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    borderRadius: 8,
    marginBottom: 5,
  },
  inputError: { borderColor: "red" },
  errorText: { color: "red", marginBottom: 10 },
  button: {
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },

  recoveryButton: {
    marginTop: 15,
    alignItems: "center",
  },
  recoveryButtonText: {
    color: Colors.tertiary,
    fontSize: 14,
    fontWeight: "500",
  },
});

export const Styletx = StyleSheet.create({
  global: {
    flex: 1,
    backgroundColor: Colors.background,
    color: Colors.text,
    marginTop: 35,
  },
});