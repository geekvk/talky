import React, { useEffect, useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native'
import { Button, Input, Image } from "react-native-elements";
import RegisterScreen from './RegisterScreen';
import { auth } from '../firebase';

const LoginScreen = ({ navigation }) => {

    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            console.log(authUser);
            if(authUser) {
                navigation.replace("Home");
            }
        });
        return unsubscribe; 
    }, []);

    const signIn = () => {
        auth.signInWithEmailAndPassword(email, password).catch((error) => {
            alert(error);
        });
    }

    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Image source={{
                uri: "https://3.bp.blogspot.com/-Jse-dFpoM5w/XILR7dDlcbI/AAAAAAAAIgA/bnyYvKro0Ak18SqrebMmWRk9gKKof8G6ACK4BGAYYCw/s1600/logo%2Bslack.png",
                
            }} 
            style={{ width: 100, height: 100}} />
            <View style={styles.inputContainer}>
                <Input 
                    placeholder="Email" 
                    autoFocus type="Email" 
                    value={email} 
                    onChangeText={(text) => setEmail(text)}
                />
                <Input 
                    placeholder="Password" 
                    secureTextEntry 
                    type="Password" 
                    value={password} 
                    onChangeText={(text) => setPassword(text)}
                    onSubmitEditing={signIn} 
                />
            </View>
            <Button containerStyle={styles.button} onPress={signIn} title='Login'  />
            <Button containerStyle={styles.button} type="outline" title='Register' onPress={() => navigation.navigate("Register") } />
            
        </View>
    )
}

export default LoginScreen;

const styles = StyleSheet.create({
    inputContainer: {
        width: 300,
        marginTop: 20
    },
    button: {
        width: 200,
        marginTop: 10,
        marginBottom: 10

    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        padding: 10,
        backgroundColor: "white"

        
 
    }

});
