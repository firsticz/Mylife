import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default class CalculateScreen extends React.Component {

    state = {
        email: "",
        displayName: "",
        mode:"",
        name:"",
        age:"",
        gender:"",
        weight:"",
        height:"",
        modalMode: false,
        modalInput: false,
        modalTime: false
    };

    calcbmi = () => {
        var bmi = this.state.weight / ( this.state.height * this.state.height );
        if ( bmi <= 18.4 ) {
            return "น้ำหนักต่ำกว่าเกณฑ์";
        }
        else if ( bmi >= 18.5 && bmi <= 22.9 ) {
            return "สมส่วน";
        }
        else if ( bmi >= 23.0 && bmi <= 24.9 ) {
            return "น้ำหนักเกิน";
        }
        else if ( bmi >= 25.0 && bmi <= 29.9 ) {
            return "โรคอ้วน";
        }
        else {
            return "โรคอ้วนอันตราย";
        }
    }
  

    calcbmr = () => {
        if ( this.state.gender == "man" ) {
            return 66*(13.7 + this.state.weight) + (5* this.state.height) - (6.8* this.state.age);
        }
        else if( this.state.gender == "woman" ) {
            return 665*(9.6 + this.state.weight) + (1.8* this.state.height) - (4.7* this.state.age);
        }
        else {
            return -1;
        }
    }

    calctdee_relax = () => {
        if ( this.state.gender == "man" ) {
            var tdeeman = 1.2 * this.calcbmr();
            return tdeeman;
        }
        else if ( this.state.gender == "woman" ) {
            var tdeewoman = 1.2 * this.calcbmr();
            return tdeewoman;
        }
        
    }

    calctdee_ex1to3days = () => {
        if ( this.state.gender == "man" ) {
            var tdeeman = 1.375 * this.calcbmr();
            return tdeeman;
        }
        else if ( this.state.gender == "woman" ) {
            var tdeewoman = 1.375 * this.calcbmr();
            return tdeewoman;
        }
    }

    calctdee_ex4to5days = () => {
        if ( this.state.gender == "man" ) {
            var tdeeman = 1.55 * this.calcbmr();
            return tdeeman;
        }
        else if ( this.state.gender == "woman" ) {
            var tdeewoman = 1.55 * this.calcbmr();
            return tdeewoman;
        }
    }

    calctdee_ex6to7days = () => {
        if ( this.state.gender == "man" ) {
            var tdeeman = 1.7 * this.calcbmr();
            return tdeeman;
        }
        else if ( this.state.gender == "woman" ) {
            var tdeewoman = 1.7 * this.calcbmr();
            return tdeewoman;
        }
    }

    calctdee_2timesin1day = () => {
        if ( this.state.gender == "man" ) {
            var tdeeman = 1.9 * this.calcbmr();
            return tdeeman;
        }
        else if ( this.state.gender == "woman" ) {
            var tdeewoman = 1.9 * this.calcbmr();
            return tdeewoman;
        }
    }
    selectmode_relax = () => {
        if ( this.state.mode == 'loseweight') {
            return this.calctdee_relax - 500;
        }   
        else if (this.state.mode == 'gainweight') {
            return this.calctdee_relax + 500;
        }
    }

    selectmode_ex1to3days = () => {
        if ( this.state.mode == 'loseweight') {
            return this.calctdee_ex1to3days - 500;
        }   
        else if (this.state.mode == 'gainweight') {
            return this.calctdee_ex1to3days + 500;
        }
    }

    selectmode_ex4to5days = () => {
        if ( this.state.mode == 'loseweight') {
            return this.calctdee_ex4to5days - 500;
        }   
        else if (this.state.mode == 'gainweight') {
            return this.calctdee_ex4to5days + 500;
        }
    }

    selectmode_ex6to7days = () => {
        if ( this.state.mode == 'loseweight') {
            return this.calctdee_ex6to7days - 500;
        }   
        else if (this.state.mode == 'gainweight') {
            return this.calctdee_ex6to7days + 500;
        }
    }

    selectmode_2timesin1day = () => {
        if ( this.state.mode == 'loseweight') {
            return this.calctdee_2timesin1day - 500;
        }   
        else if (this.state.mode == 'gainweight') {
            return this.calctdee_2timesin1day + 500;
        }
    }

    render() {

        return (
            <View style={styles.container}>
                <Text style={styles.sayhi}> สวัสดี {this.state.displayName}  </Text>

                <Text style={styles.status}>
                        สถานะ : <Text style={{ fontWeight: "500", color:"#e9446a"}}> 
                                    {this.state.mode === '' ? "Not Selected" : this.state.mode} </Text>
                </Text>

                s

            <View style={styles.buttoncenter}> 
                <TouchableOpacity style={styles.buttonMode} onPress={ () => {this.setState({modalMode: true})}} >
                    <Text> Select mode </Text>
                </TouchableOpacity>
            </View>

            <Modal
                    animationType="slide"
                    visible={this.state.modalMode}
                >                  
            
                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={styles.buttonLose}
                        onPress={()=> {this.setState({mode: 'loseweight', modalMode: !this.state.modalMode, modalInput: true})}} >
                        <Text> loseweight </Text>
                    </TouchableOpacity>

                    <Text style={{ marginTop: 32, textAlign: 'center'}}> or </Text>

                    <TouchableOpacity style={styles.buttonGain} 
                        onPress={()=> {this.setState({mode: 'gainweight', modalMode: !this.state.modalMode, modalInput: true})}} >
                        <Text> gainweight </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{marginTop: 20}} 
                    onPress={ () => {this.setState({modalMode: !this.state.modalMode})}}>
                    <Text style={{ fontWeight: "500", color:"#e9446a", textAlign: "center"}}> close </Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            </View>

            
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop : 30,
        marginLeft : 30              
    },
    sayhi:{
        marginTop: 10,         
        fontWeight: "100", 
        fontSize: 25,
        textAlign: "center"
    }
});