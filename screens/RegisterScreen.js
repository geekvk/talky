import React, { useLayoutEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { StatusBar} from "expo-status-bar";
import { Button, Input, Text } from "react-native-elements";
import { auth } from '../firebase';
const RegisterScreen = ({ navigation }) => {

    const[fullName, setFullName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[imageUrl, setImageUrl] = useState('');

    useLayoutEffect(() => {
        navigation.setOptions({
            headerBackTitle: "Login", 
        })
    }, [navigation]);

    const register = () => {
        auth.createUserWithEmailAndPassword(email, password)
        .then((authUser) => {
            authUser.user.updateProfile ({
                displayName: fullName,
                photoURL: imageUrl || "https://w1.pngwing.com/pngs/793/504/png-transparent-avatar-icon-ninja-samurai-icon-design-red-smile-circle.png",
            })
        }).catch((error) => alert(error.message));
    }
    return (
        <View behavior="padding" style={styles.container}>
            <Text h3 style={{ marginBottom: 20 , color: "#2EB67D"}}>
                Create a talky account
            </Text>
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Full Name"
                    autoFocus
                    value={fullName}
                    type="text"
                    onChangeText={(text) => setFullName(text)}

                />
                <Input 
                    placeholder="Email"  
                    type="Email" 
                    value={email} 
                    onChangeText={(text) => setEmail(text)} 
                />
                <Input 
                    placeholder="Password" 
                    secureTextEntry 
                    type="Password" 
                    value={password} 
                    onChangeText={(text) => setPassword(text)} 
                />
                <Input 
                    placeholder="Image URL" 
                    type="text" 
                    value={imageUrl} 
                    onChangeText={(text) => setImageUrl(text)} 
                />
                
            </View>
            <Button disabled={!input}  title="Register" containerStyle={styles.button} raised onPress={register}/>
        </View>
    )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white"



    },
    inputContainer: {
        color: "#ffff",
        width: 300,
        marginTop: 10,

    },
    button: {
        width: 200,
        marginTop: 10,
        marginBottom: 10,
    }

});
