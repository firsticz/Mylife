import React from 'react';
import { View, Text, StyleSheet, LayoutAnimation, TouchableOpacity, AsyncStorage } from 'react-native';
import * as firebase from 'firebase';

export default class SettingScreen extends React.Component {
    
    state = {
        name: '',
        age: ''
    };

    signOutUser = () => {
        firebase.auth().signOut();
    };

    savedata = () => {
        AsyncStorage.setItem(
            'name',
            this.state.name
        )
    };



    render() {
        
        return (
            
            <View style={styles.container}>

                <TouchableOpacity style={{marginTop: 35}} onPress = { () => this.props.navigation.navigate("Home")}>
                    <Text style={{ fontWeight: "500" }}> หน้าโปรไฟล์ </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: 20}} >
                    <Text style={{ fontWeight: "500" }}> โหมดน้ำหนักผู้ใช้ </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: 20}} onPress = { () => this.props.navigation.navigate("Menu")}>
                    <Text style={{ fontWeight: "500" }}> ตารางเมนูอาหาร </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: 20}} onPress = { () => this.props.navigation.navigate("Sport")}>
                    <Text style={{ fontWeight: "500" }}> ตารางการออกกำลังกาย </Text>
                </TouchableOpacity>                        
                     
                <TouchableOpacity style={{marginTop: 20}} >
                    <Text style={{ fontWeight: "500" }}> การแจ้งเตือน </Text>
                </TouchableOpacity>

                <TouchableOpacity style={{marginTop: 20}} onPress={this.signOutUser}>
                    <Text style={{ fontWeight: "500", color:"#e9446a"}}>ออกจากระบบ</Text>
                </TouchableOpacity>
            </View>

            


        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop : 30,
        marginLeft : 30              
    }
});