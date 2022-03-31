import { KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Button, Input, Image } from 'react-native-elements'
import { StatusBar } from 'expo-status-bar'
import { auth } from '../components/firebase'

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
        // console.log(authUser)
        if (authUser) {
          navigation.replace('Home');
        }
    }) 
    return unsubscribe;
  }, [])
  

  const signIn = () => {
      auth
        .signInWithEmailAndPassword(email, password)
        .catch(err => alert(err.message));
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <StatusBar style="light" />
      <Image 
        source={require('./signal-logo.png')}
        // source={{ uri: "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png"}}
        style={{ width: 200, height: 200 }}
      />
      <View style={styles.inputContainer}>
          <Input 
              placeholder="Email" 
              autoFocus 
              type="email"
              value={email}
              onChangeText={text => setEmail(text)} 
          />
          <Input 
              placeholder="Password" 
              secureTextEntry 
              type="password"
              value={password} 
              onChangeText={text => setPassword(text)}
              onSubmitEditing={signIn}
          />
      </View>

      <Button containerStyle={styles.button} onPress={signIn} title="Login" />
      <Button 
        onPress={() => navigation.navigate("Register")}
        containerStyle={styles.button} 
        title="Register" 
        type="outline" 
      />
      <View style={{ height: 100 }} />
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: 'white'
  },
  inputContainer: {
    width: 300,
  },
  button: {
    width: 200,
    marginTop: 10,
  },
})