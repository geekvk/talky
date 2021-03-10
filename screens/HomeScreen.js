import React, { useEffect, useLayoutEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { SafeAreaView, TouchableOpacity } from "react-native";
import CustomListItems from "../component/CustomListItem";
import { Avatar } from "react-native-elements";
import { auth, db } from '../firebase';
import { AntDesign, EvilIcons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
    const[chats, setChats] = useState([]);

    useEffect(() => {
         const unsubscribe = db.collection('chats').onSnapshot((snapshot) => {
             setChats(snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
             })))
         });
         return unsubscribe;
        
    }, [])
    const signOut = () => {
        auth.signOut().then(() => {
            navigation.replace("Login");    
        });
    };

    const enterChat = (id, chatName) => {
        navigation.navigate("Chat", {
            id,
            chatName,
        });
    }
    useLayoutEffect(() => {
            navigation.setOptions({
                title: "talky",
                headerLeft: () => (
                    <View style={{ marginLeft: 20 }}>
                        <TouchableOpacity onPress={signOut}  activeOpacity={0.5}>
                            <Avatar
                                rounded source={{ uri: auth?.currentUser?.photoURL }} />
                        </TouchableOpacity>  
                    </View>
                ),
                headerRight: () => (
                    <View style={{marginRight: 20,
                                 flexDirection: "row",
                                 justifyContent: 'space-between',
                                 width: 120
                        }}>
                        <TouchableOpacity activeOpacity={0.5}>
                                <AntDesign name='camerao' size={ 24 } color="white" onPress={() => navigation.navigate("Camera") } />
                            
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5}>
                            <AntDesign name="adduser" size={24} color="white" onPress={() => navigation.navigate("AddChat")} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.5}>
                            <EvilIcons name="gear" size={ 28 } color="white" onPress={() => navigation.navigate("Settings")}/>
                        </TouchableOpacity>
                    </View>
                ), 
                
            });
    }, [ navigation ]);
    return (
        <SafeAreaView>
            <ScrollView style={styles.container}>
                { chats.map(({id, data: { chatName}}) =>(
                    <CustomListItems 
                        key={id} 
                        id={id} 
                        chatName={chatName} 
                        enterChat={enterChat}
                        />
                ))}
                
            </ScrollView>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
})