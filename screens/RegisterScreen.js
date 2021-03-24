import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar } from 'react-native';
import {Ionicons} from '@expo/vector-icons';
import * as firebase from 'firebase';

export default class RegisterScreen extends React.Component {
    static navigationOptions = {
        headerShown: false
    };

    state = {
        name: "",
        email: "",
        password: "",
        errorMessage: null
    };

    handleSignUp = () => {
        firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(userCredentials => {
                return userCredentials.user.updateProfile({
                    displayName: this.state.name
                });
            })
            .catch(error => this.setState({ errorMessage: error.message }));

    };
    

    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>

                <Image source={require("./bonjang.png")}
                style={{ marginTop: -700, marginLeft: -10}}
                ></Image>

                <Image source={require("./cutejang.png")} style={{position: "absolute", bottom: -375, right: -175 }}
                ></Image>

                <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name="ios-arrow-round-back" size={32} color="#fff"></Ionicons>
                </TouchableOpacity>

                <View style={{position: "absolute", top: 64, alignItems: "center", width: "100%"}}>
                    <Text style={styles.greeting}>{'สวัสดี !\n ลงทะเบียนเพื่อเข้าสู่ระบบกันเถอะ'}</Text>
                    <TouchableOpacity style={styles.avatar}>
                        <Ionicons 
                            name="ios-add" 
                            size={40} color="#fff" 
                            style={{ marginTop: 6, marginLeft: 2}}
                            ></Ionicons>
                    </TouchableOpacity>
                </View>

              
                
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>

                    <View>
                        <Text style={styles.inputTitle}>ชื่อ-นามสกุล</Text>
                        <TextInput 
                        style={styles.input} 
                        autoCapitalize="none" 
                        onChangeText={name => this.setState({ name })}
                        value={this.state.name}
                        ></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>บัญชี E-mail</Text>
                        <TextInput 
                        style={styles.input} 
                        autoCapitalize="none" 
                        onChangeText={email => this.setState({ email })}
                        value={this.state.email}
                        ></TextInput>
                    </View>

                    <View style={{marginTop: 32}}>
                        <Text style={styles.inputTitle}>รหัสผ่าน</Text>
                        <TextInput 
                            style={styles.input} 
                            secureTextEntry
                            autoCapitalize="none" 
                            onChangeText={password => this.setState({ password })}
                            value={this.state.password}
                        ></TextInput>
                    </View>
                </View>

                <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
                    <Text style={{ color: "#FFF", fontWeight: "500"}}>ลงทะเบียน</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{ alignSelf: "center", marginTop: 32}} 
                    onPress={() => this.props.navigation.navigate("Login")}
                    >
                    <Text style={{ color:"#414959", fontSize: 13}}>
                        คุณมีบัญชีอยู่แล้ว ? <Text style={{ fontWeight: "500", color:"#e9446a"}}>เข้าสู่ระบบ</Text>
                    </Text>
                </TouchableOpacity>


            </View>
          
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1      
    },

    greeting: {
        marginTop: -20,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center",
        color: "#e9446a"

    },
    errorMessage: {
        height: 72,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 30
    },
    error: {
        color: "#e9446a",
        fontSize: 13,
        fontWeight: "600",
        textAlign: "center"
    },
    form: {
        marginBottom: 48,
        marginHorizontal: 30
    },
    inputTitle: {
        color: "#8a8f9e",
        fontSize: 13,
        textTransform: "uppercase"
    },
    input: {
        borderBottomColor: "#8a8f9e",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 40,
        fontSize: 15,
        color: "#161f3d"
    },
    button: {
        marginHorizontal: 30,
        backgroundColor: "#e9446a",
        borderRadius: 4,
        height: 52,
        alignItems: "center",
        justifyContent: "center"
    },
    back: {
        position: "absolute",
        top: 15,
        left: 20,
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: "rgba(21, 22, 48, 0.1)",
        alignItems: "center",
        justifyContent: "center"
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: "#e1e2e6",
        marginTop: 40,
        justifyContent: "center",
        alignItems: "center"
    }

});