import { KeyboardAvoidingView, StyleSheet, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { Button, Input, Text } from 'react-native-elements'
import { auth } from '../components/firebase'

const RegisterScreen = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [users, setUsers] = useState(false);
    // const [auths, setAuths] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: 'back to login',
        })
    }, [navigation])

    let authUsers;
    const register = () => {
        setUsers(true);
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                // authUsers = authUser;
                // console.log(authUser);
                authUser.user.updateProfile({
                    displayName: name,
                    photoURL: imageUrl || 
                        "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
                });
            })
            .catch((error) => alert(error.message))
    };

    // useEffect((authUsers) => {
    //   if (authUsers) {} else {
    //     setAuths(true);
    //   }
    // }, [authUsers])
    

  return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <StatusBar style='light' />

            <Text h3 style={{ marginBottom: 50 }}>
                Create a Signal account
            </Text>

            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Full Name"
                    autoFocus
                    type="text"
                    value={name}
                    onChangeText={text => setName(text)}
                />
                <Input 
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    onSubmitEditing={register}
                />
                <Input 
                    placeholder="Password"
                    type="password"
                    secureTextEntry
                    value={password}
                    onChangeText={text => setPassword(text)}
                />
                <Input 
                    placeholder="Profile Pic Url (optional)"
                    type="text"
                    value={imageUrl}
                    onChangeText={text => setImageUrl(text)}
                    onSubmitEditing={register}
                />
            </View>

            {!users ? (
            <Button 
                containerStyle={styles.button}
                raised
                onPress={register}
                title="Register"
            />
            ): (
                <Text style={{ marginTop: 10 }}>Loading....</Text>
            )}

            <View style={{ height: 100 }} />
        </KeyboardAvoidingView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',

    },
    inputContainer: {
        width: 300,

    },
    button: {
        width: 200, 
        marginTop: 10,
    },
})