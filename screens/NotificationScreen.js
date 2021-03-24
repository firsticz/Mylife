import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class NotificationScreen extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.notiday}> การแจ้งเตือน </Text>
                    

              
            </View>

        );
    };
}

const styles = StyleSheet.create({
    container: {
        marginTop : 30,
        marginLeft : 15              
    },
    notiday: {
        marginTop: 20,
        fontSize: 18,
        textDecorationLine: 'underline'
    },
    notification: {
        marginTop: 10
    },
    line: {
        textDecorationLine: "line-through"
    }
});