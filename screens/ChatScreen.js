import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Avatar } from "react-native-elements";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { auth, db } from '../firebase';
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { SafeAreaView, StatusBar, View, Text, KeyboardAvoidingView, StyleSheet } from 'react-native';
import { Platform, TextInput } from 'react-native';
import { Keyboard,TouchableWithoutFeedback } from 'react-native';
import * as firebase  from "firebase";

const ChatScreen = ({ navigation, route  }) => {
    
    const[inputMessage, setInputMessage] = useState('');
    const[messages, setMessages] = useState([]);

    const sendMessage = () => {
        Keyboard.dismiss();
        db.collection('chats').doc(route.params.id).collection("messages").add({
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            message: inputMessage,
            displayName: auth.currentUser.displayName,
            email: auth.currentUser.email,
            photoURL: auth.currentUser.photoURL,
        });
        setInputMessage("");
    };
    useLayoutEffect(() => {
        const unsubscribe = db.collection('chats').doc(route.params.id)
        .collection('messages').orderBy('timestamp', 'asc')
        .onSnapshot((snapshot) => setMessages(
            snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data()
            }))
        ));
        return unsubscribe;
    }, [route]); // depends on route

    useLayoutEffect(() => {
            navigation.setOptions({
                title: "Chat",
                headerTitleAlign: "left",
                headerBackTitleVisible: false,
                headerTitle: () => (
                    <View style={{
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                        <Avatar rounded source={{uri: messages[0]?.data.photoURL}}/>
                        <Text
                            style={{
                                color: "white",
                                marginLeft: 10,
                                fontWeight: "700"
                                
                            }}
                            >{route.params.chatName}</Text>
                    </View>
                ),
                headerLeft: () => (
                    <TouchableOpacity 
                        style={{ marginLeft: 10}}
                        onPress={navigation.goBack}
                    >
                        <AntDesign name="arrowleft" size={ 24 } color="white"  />
                    </TouchableOpacity>
                ),
            });
            
    }, [navigation, messages]);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white"}}>
            <StatusBar style="light" />
            <View 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.container}
                keyboardVerticalOffset={90}

            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <>
                    <ScrollView contentContainerStyle={{
                        paddingTop: 15,


                    }}>
                        {messages.map(({id, data}) => (
                            data.email === auth.currentUser.email ? (
                                <View key={id} style={styles.reciever} >
                                    <Avatar
                                        rounded
                                        // WEB
                                        containerStyle={{
                                            position: "absolute",
                                            bottom: -15,
                                            right: -5
                                        }}
                                        size={30}
                                        bottom={-15}
                                        right={-5}
                                        position="absolute"
                                        source={{
                                            uri: data.photoURL,
                                        }}
                                    />
                                    <Text style={styles.receiverText}>
                                        {data.message}
                                    </Text>
                                </View>
                            ) : (
                                <View key={id} style={styles.sender}>
                                    <Avatar  
                                        rounded
                                        containerStyle={{
                                            position: "absolute",
                                            bottom: -15,
                                            right: -5
                                        }}
                                        size={30}
                                        bottom={-15}
                                        right={-5}
                                        position="absolute"
                                        source={{
                                            uri: data.photoURL,
                                        }}  />
                                    <Text style={styles.senderText}>
                                        {data.message}
                                    </Text>
                                    <Text style={styles.senderName}>{data.displayName}</Text>
                                    

                                </View>

                            )
                        ))}
                    </ScrollView>
                    <View style={styles.footer}>
                        <TextInput 
                            placeholder="Type your message here" 
                            style={styles.textInput} 
                            value={inputMessage}
                            onChangeText={(text) => setInputMessage(text)}
                            onSubmitEditing={sendMessage}
                            />
                            <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                                <Ionicons name="send" size={24} color="#2b68e6" />
                            </TouchableOpacity>
                    </View>
                </>
                </TouchableWithoutFeedback>
 
            </View>
            
        </SafeAreaView>
    );
};

export default ChatScreen

const styles = StyleSheet.create({
     container: {
         flex: 1,


     },
     footer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        padding: 15,

     },
     textInput: {
         bottom: 0,
         height: 40,
         flex: 1,
         marginRight: 15,
         borderColor: "white",
         backgroundColor: "#ECECEC",
         borderWidth: 0,
         padding: 10,
         color: "#3E3E3E",
         borderRadius: 30
     },
     receiverText: {
         color: "black",
         fontWeight: "500",
         marginLeft: 10,
         marginBottom: 15

     },
     senderText: {
         color: "black",
         fontWeight: "500",
         marginLeft: 10,
         marginBottom: 5

     },
     reciever: {
         padding: 15,
         backgroundColor: "#ECECEC",
         alignSelf: "flex-end",
         borderRadius: 30,
         marginRight: 15,
         marginBottom: 20,
         maxWidth: "80%",
         position: "relative"

     },
     sender : {
         padding: 15,
         backgroundColor: "#36C5F0",
         borderRadius: 30,
         alignSelf: "flex-start",
         margin: 15,
         maxWidth: "80%",
         position: "relative"
     },
     senderName:{
         left: 10,
         paddingRight: 5,
         fontSize: 10,
         color: "black"
     }

});