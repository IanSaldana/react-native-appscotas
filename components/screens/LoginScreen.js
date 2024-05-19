import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import { THEME } from "../constants";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const handleLogin = () => {
    navigation.navigate("Home");
  };
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <View style={styles.wFull}>
          <View style={styles.row}>
            <Text style={styles.brandName}>Appscotas</Text>
          </View>

          <Text style={styles.loginContinueTxt}>
            Inicia sesión para continuar
          </Text>
          <TextInput style={styles.input} placeholder="email@email.com" />
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="contraseña"
          />

          <View style={styles.loginBtnWrapper}>
            {/******************** LOGIN BUTTON *********************/}
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.loginBtn}
              onPress={handleLogin}
            >
              <Text style={styles.loginText}>Inicia sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text style={styles.forgotPassText}>Forgot Password</Text>
            </TouchableOpacity>
          </View>

          {/***************** FORGOT PASSWORD BUTTON *****************/}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  container: {
    padding: 15,
    width: "100%",
    position: "relative",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  brandName: {
    fontSize: 62,
    textAlign: "center",
    fontWeight: "bold",
    color: THEME.primary,
    opacity: 0.8,
  },
  loginContinueTxt: {
    fontSize: 21,
    textAlign: "center",
    color: THEME.gray,
    marginBottom: 16,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: THEME.grayLight,
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    height: 55,
    paddingVertical: 0,
  },
  // Login Btn Styles
  loginBtnWrapper: {
    height: 55,
    marginTop: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  linearGradient: {
    width: "100%",
    borderRadius: 50,
  },
  loginBtn: {
    textAlign: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 55,
    backgroundColor: THEME.primary,
    borderRadius: 40,
  },
  loginText: {
    color: THEME.white,
    fontSize: 16,
    fontWeight: "400",
  },
  forgotPassText: {
    color: THEME.primary,
    textAlign: "center",
    fontWeight: "bold",
    marginTop: 15,
  },
  // footer
  footer: {
    position: "absolute",
    bottom: 20,
    textAlign: "center",
    flexDirection: "row",
  },
  footerText: {
    color: THEME.gray,
    fontWeight: "bold",
  },
  signupBtn: {
    color: THEME.primary,
    fontWeight: "bold",
  },
  // utils
  wFull: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  mr7: {
    marginRight: 7,
  },
});
export default LoginScreen;
