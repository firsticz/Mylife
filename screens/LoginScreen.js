import React from 'react';
import { ImageBackground,View, Text, StyleSheet, TextInput, TouchableOpacity, Image, StatusBar, LayoutAnimation} from 'react-native';
import * as firebase from 'firebase';


export default class LoginScreen extends React.Component {
    static navigationPotions = {
        headerShown: false
    };

    state = {
        email: "",
        password: "",
        errorMessage: null
    };

    handleLogin = () => {
        const { email, password } = this.state
        
        firebase
        .auth()
        .signInWithEmailAndPassword(email,password)
        .catch(error => this.setState({ errorMessage: error.message }));
        
    }; 

    render() {
        //LayoutAnimation.easeInEaseOut();

        return (
            <View style={styles.container}>
                <StatusBar barStyle="light-content"></StatusBar>
                <ImageBackground source={require("./bonjang.png")} style={styles.imageBackground}>
              
                <Text style={styles.greeting}>{'Healthy life schedule\nMobile Application.'}</Text>
                
                <View style={styles.errorMessage}>
                    {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
                </View>

                <View style={styles.form}>
                    <View>
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

                <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
                    <Text style={{ color: "#FFF", fontWeight: "500"}}>เข้าสู่ระบบ</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={{ alignSelf: "center", marginTop: 32}}
                    onPress={() => this.props.navigation.navigate("Register")}>

                    <Text style={{ color:"#414959", fontSize: 13}}>
                        คุณมีบัญชีหรือยัง ? <Text style={{ fontWeight: "500", color:"#e9446a"}}>ลงทะเบียน</Text>
                    </Text>
                </TouchableOpacity>
                </ImageBackground>
            </View>
          
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1      
    },

    greeting: {
        marginTop: -10,
        fontSize: 18,
        fontWeight: "400",
        textAlign: "center"

    },
    imageBackground: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
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
        fontSize: 15
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
    }

});