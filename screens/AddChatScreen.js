import { StyleSheet, Text, View } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import {Buton, Button, Icon, Input } from 'react-native-elements'
import { db } from '../components/firebase' 

const AddChatScreen = ({ navigation }) => {
    const [input, setInput] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            title: 'Add new Chat',
            headerBackTitle: "Chats",
        });     
    }, [navigation]);

    const createChat = async () => {
        await db.collection('chats').add({
            chatName: input
        }).then(() => {
            navigation.goBack();
        }).catch(err => alert(err));
    }

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter Chat Name"
        value={input}
        onChangeText={text => setInput(text)}
        onSubmitEditing={createChat}
        leftIcon={
            <Icon name="wechat" type="antdesign" size={24} color="black" />
        }
      />
      <Button disabled={!input} onPress={createChat} title="Create new Chat" />
    </View>
  )
}

export default AddChatScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        padding: 30,
        height:"100%",
    },
})