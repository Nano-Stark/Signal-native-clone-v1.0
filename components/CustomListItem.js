import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ListItem, Avatar } from 'react-native-elements'
import { db } from './firebase'

const CustomListItem = ({ id, chatName, enterChat }) => {
  const [chatMessages, setChatMessages] = useState([]);

  useEffect(() => {
    const unsubscribe = db
            .collection('chats')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'asc')
            .onSnapshot((snapshot) => 
              setChatMessages(snapshot.docs.map((doc)=> doc.data()))
            );
        return unsubscribe;
  }, []);
  // console.log(chatMessages?.[0]?.photoURL)
  return (
    <ListItem onPress={() => enterChat(id, chatName)} key={id} bottomDivider>
      <Avatar 
        rounded
        source={{
            uri: chatMessages?.[0]?.photoURL ||
                "https://blog.mozilla.org/internetcitizen/files/2018/08/signal-logo.png",
        }}
      />
      
      <ListItem.Content>
          <ListItem.Title style={{ fontWeight: "800" }}>
                {chatName}
          </ListItem.Title>
          <ListItem.Subtitle
             numberOfLines={1} 
             ellipsizeMode="tail"
            //  style={{ fontWeight: ""}}
            >
                {chatMessages[0]?.displayName}: {chatMessages?.[0]?.message}
          </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem

const styles = StyleSheet.create({})