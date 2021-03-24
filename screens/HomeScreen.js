import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, LayoutAnimation,SafeAreaView,Modal, TextInput, ScrollView } from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
//import Modal from 'modal-react-native-web';
import InputSpinner from "react-native-input-spinner";
import * as firebase from 'firebase';
import { YellowBox } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import TimePicker from 'react-native-simple-time-picker';




export default class HomeScreen extends React.Component {
    state = {
        userid:"",
        email: "",
        displayName: "",
        mode:"",
        name:"",
        age:15,
        gender:0,
        weight:30,
        height:100,
        sportLike:1,
        foodSick:"ไม่มี",
        HighBlood:0,
        Diabetes:0,
        modalMode: false,
        modalInput: false,
        modalTime: false,
        monday:"",
        tuesday:"",
        wednesday:"",
        thursday:"",
        friday:"",
        saturday:"",
        sunday:"",
        showtime1:"00:00",
        showtime2:"00:00",
        showtime3:"00:00",
        showtime4:"00:00",
        showtime5:"00:00",
        showtime6:"00:00",
        showtime7:"00:00",
        showtime8:"00:00",
        showtime9:"00:00",
        showtime10:"00:00",
        showtime11:"00:00",
        showtime12:"00:00",
        showtime13:"00:00",
        showtime14:"00:00",
        timeweight:"1",
        changeweight:"1",
        radio_props : [
            {label: 'ไม่ใช่  ', value: 0 },
            {label: 'ใช่', value: 1 }
          ],
      radio_props2 : [
            {label: 'หญิง ', value: 0 },
            {label: 'ชาย', value: 1 }
          ]
    };
    setModalModeVisible = (visible) => {
        this.setState({ modalMode: visible });
      };
      setModalItemVisible = (visible) => {
        this.setState({ modalTime: visible });
      };

    savedata = () => {
        AsyncStorage.setItem(
            'name',
            this.state.name
        )
    };
    readUserData() {
        firebase.database().ref('Users/'+this.state.userid).on('value', snapshot => {
            this.getData(snapshot.val());
          });
    }
    setShowTime(hr,mn)
    {
        var hh = "00"
        var mm = "00"
        if(hr < 10)
        {
            hh = "0"+hr
        }
        else
        {
            hh = hr
        }
        if(mn < 10)
        {
            mm = "0"+mn
        }
        else
        {
            mm = mn
        }
        return hh+":"+mm;
       
    }
    getData(values)
    {
        console.log(values);
        if(values != null)
        {
        this.setState({name:values.name});
        this.setState({mode:values.mode});
        this.setState({displayName:values.displayName});
        this.setState({age:values.age});
       
        this.setState({weight:values.weight});
        this.setState({height:values.height});
        this.setState({foodSick:values.foodSick});
        this.setState({sportLike:values.sportLike});
     
        const t1 = values.monday+"";
        this.setState({showtime1:t1.split('-')[0]});
        this.setState({showtime2:t1.split('-')[1]});
        const t2 = values.tuesday+"";
        this.setState({showtime3:t2.split('-')[0]});
        this.setState({showtime4:t2.split('-')[1]});
        const t3 = values.wednesday+"";
        this.setState({showtime5:t3.split('-')[0]});
        this.setState({showtime6:t3.split('-')[1]});
        const t4 = values.thursday+"";
        this.setState({showtime7:t4.split('-')[0]});
        this.setState({showtime8:t4.split('-')[1]});
        const t5 = values.friday+"";
        this.setState({showtime9:t5.split('-')[0]});
        this.setState({showtime10:t5.split('-')[1]});
        const t6 = values.saturday+"";
        this.setState({showtime11:t6.split('-')[0]});
        this.setState({showtime12:t6.split('-')[1]});
        const t7 = values.sunday+"";
        this.setState({showtime13:t7.split('-')[0]});
        this.setState({showtime14:t7.split('-')[1]});
       
       
        this.setState({timeweight:values.timeweight});
        this.setState({changeweight:values.changeweight});
        this.state.gender = values.gender;
        this.state.HighBlood = values.HighBlood;
        this.state.Diabetes = values.Diabetes;
        }
        else
        {
            console.log('new acc');
            this.writeNewData();
            
            //this.readUserData();
        }
    }
    writeUserData(){
        try {
        firebase.database().ref('Users/'+this.state.userid).update({
            email:this.state.email,
            displayName:this.state.displayName,
            mode:this.state.mode,
            name:this.state.name,
            age:this.state.age,
            gender:this.state.gender,
            weight:this.state.weight,
            height:this.state.height,
            sportLike:this.state.sportLike,
            foodSick:this.state.foodSick,
            HighBlood:this.state.HighBlood,
            Diabetes:this.state.Diabetes,
            monday:this.state.showtime1+"-"+this.state.showtime2,
            tuesday:this.state.showtime3+"-"+this.state.showtime4,
            wednesday:this.state.showtime5+"-"+this.state.showtime6,
            thursday:this.state.showtime7+"-"+this.state.showtime8,
            friday:this.state.showtime9+"-"+this.state.showtime10,
            saturday:this.state.showtime11+"-"+this.state.showtime12,
            sunday:this.state.showtime13+"-"+this.state.showtime14,
            timeweight:this.state.timeweight,
            changeweight:this.state.changeweight
            
        }).then(()=>{
            console.log('updated');
            this.readUserData();
            this.props.navigation.navigate("Menu")
           
        }).catch((error)=>{
            console.log(error)
            
        })

    }
    catch ({error}) {
            
    }
    };
    writeNewData(){
        console.log('statedisplayname: '+ this.state.displayName);
        try {
        firebase.database().ref('Users/'+this.state.userid).set({
            email:this.state.email,
            displayName:this.state.displayName,
            mode:'',
            name:this.state.name,
            age:'0',
            gender:'0',
            weight:'0',
            height:'0',
            sportLike:1,
            foodSick:'ไม่มี',
            HighBlood:'1',
            Diabetes:'1',
            monday:"00:00-00:00",
            tuesday:"00:00-00:00",
            wednesday:"00:00-00:00",
            thursday:"00:00-00:00",
            friday:"00:00-00:00",
            saturday:"00:00-00:00",
            sunday:"00:00-00:00",
            timeweight:this.state.timeweight,
            changeweight:this.state.changeweight,
            mondayStatus:0,
            tuesdayStatus:0,
            wednesdayStatus:0,
            thursdayStatus:0,
            fridayStatus:0,
            saturdayStatus:0,
            sundayStatus:0,
        }).then(()=>{
           console.log('create suucess')
           
        }).catch((error)=>{
            
        })
        
    }
    catch ({error}) {
            
    }
    };
   
    componentDidMount() {
        YellowBox.ignoreWarnings(['Setting a timer']);
        const {email, displayName,uid} = firebase.auth().currentUser;
        console.log(uid);
        console.log('didmount');

        this.setState({ email, displayName });
        this.state.name = displayName;
        this.state.displayName = displayName;
        this.state.userid = uid;
      
        this.readUserData();
       
           
    };
    
    signOutUser = () => {
        firebase.auth().signOut();
    };

     

    render() {
        console.disableYellowBox = true; 
        LayoutAnimation.easeInEaseOut();
        return (
        
            <SafeAreaView style={styles.container}>                   
                <ScrollView> 
                <Text style={styles.sayhi}> สวัสดี {this.state.displayName} ♡ </Text>
                
                <Text style={styles.status}>
                        สถานะ : <Text style={{ fontWeight: "500", color:"#e9446a"}}> 
                                    {this.state.mode === '' ? 'ยังไม่ได้เลือก' : this.state.mode} </Text>
                </Text>

                <View>
                        <Text style={styles.inputTitle}>ชื่อ-นามสกุล : </Text>
                        <TextInput 
                        style={styles.input} 
                        autoCapitalize="none" 
                        onChangeText={name => this.setState({ name })}
                        value={this.state.name}
                        ></TextInput>

                        <Text style={styles.inputTitle}>อายุ(ปี): </Text>
                        <InputSpinner
                            max={50}
                            min={15}
                            step={1}
                            colorMax={"#f04048"}
                            colorMin={"#40c5f4"}
                            value={this.state.age}
                            onChange={(num) => {
                               // console.log(num);
                                this.setState({ age:num })
                            }}
                        />
                     

                        <Text style={styles.inputTitle}>เพศ: </Text>
                        <RadioForm
                            formHorizontal={true}
                            radio_props={this.state.radio_props2}
                            initial={this.state.gender}
                           
                            onPress={(value) => {this.setState({gender:value})}}
                            />
                        <Text style={styles.inputTitle}>น้ำหนัก(กิโลกรัม) : </Text>
                        <InputSpinner
                            max={200}
                            min={30}
                            step={1}
                            colorMax={"#f04048"}
                            colorMin={"#40c5f4"}
                            value={this.state.weight}
                            onChange={(num) => {
                              //  console.log(num);
                                this.setState({ weight:num })
                            }}
                        />

                        <Text style={styles.inputTitle}>ส่วนสูง(เซ็นติเมตร) : </Text>
                        <InputSpinner
                            max={250}
                            min={130}
                            step={1}
                            colorMax={"#f04048"}
                            colorMin={"#40c5f4"}
                            value={this.state.height}
                            onChange={(num) => {
                               // console.log(num);
                                this.setState({ height:num })
                            }}
                        />
                        

                        <Text style={styles.inputTitle}>กีฬาที่ชอบ : </Text>
                        <DropDownPicker
                        items={[
                            {label:"วิ่ง",value:1},
                            {label:"ว่ายน้ำ",value:2},
                            {label:"ฟุตบอล",value:3},

                           ]}
                        defaultValue={this.state.sportLike}
                        containerStyle={{height: 40}}
                        style={{backgroundColor: '#fafafa'}}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={item => this.setState({
                            sportLike: item.value
                        })}
                    />
                        
                        <Text style={styles.inputTitle}>อาหารที่แพ้ : </Text>
                        <DropDownPicker
                        items={[
                            {label:"ไม่มี",value:"ไม่มี"},
                            {label:"กุ้ง",value:"กุ้ง"},
                            {label:"ปลาหมึก",value:"ปลาหมึก"},

                           ]}
                        defaultValue={this.state.foodSick}
                        containerStyle={{height: 40}}
                        style={{backgroundColor: '#fafafa'}}
                        itemStyle={{
                            justifyContent: 'flex-start'
                        }}
                        dropDownStyle={{backgroundColor: '#fafafa'}}
                        onChangeItem={item => this.setState({
                            fodSick: item.value
                        })}
                    />
                       
                        <Text style={styles.inputTitle}>เป็นโรคความดันโลหิตสูงหรือไม่ : </Text>
                        <RadioForm
                            formHorizontal={true}
                            radio_props={this.state.radio_props}
                            initial={this.state.HighBlood}
                           
                            onPress={(value) => {this.setState({HighBlood:value})}}
                           
                            />
                       
                       

                        <Text style={styles.inputTitle}>เป็นโรคเบาหวานหรือไม่ : </Text>
                        <RadioForm
                            formHorizontal={true}
                            radio_props={this.state.radio_props}
                            initial={this.state.Diabetes}
                           
                            onPress={(value) => {this.setState({Diabetes:value})}}
                           
                            />
                </View>
                                
                <View style={styles.buttoncenter}> 
                <TouchableOpacity style={styles.buttonMode} onPress={ () =>  {this.setModalModeVisible(true)}} >
                    <Text> เลือกโหมดน้ำหนัก </Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.buttonTime} onPress={ () => {this.setModalItemVisible(true)}} >
                    <Text> เวลาว่างของผู้ใช้ </Text>
                </TouchableOpacity>
                </View>   

                <View style={styles.buttoncentersave}>
                <TouchableOpacity style={styles.buttonSave} onPress = { () => {this.writeUserData()}} >
                    <Text> บันทึก </Text>
                </TouchableOpacity> 
                </View>   

                <Modal
                    animationType="slide"
                    visible={this.state.modalMode}
                >                  
            
                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <TouchableOpacity style={styles.buttonLose}
                        onPress={()=> {this.setState({mode: 'ลดน้ำหนัก', modalMode: !this.state.modalMode, modalInput: true})}} >
                        <Text> ลดน้ำหนัก </Text>
                    </TouchableOpacity>

                    <Text style={{ marginTop: 32, textAlign: 'center'}}> หรือ </Text>

                    <TouchableOpacity style={styles.buttonGain} 
                        onPress={()=> {this.setState({mode: 'เพิ่มน้ำหนัก', modalMode: !this.state.modalMode, modalInput: true})}} >
                        <Text> เพิ่มน้ำหนัก </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{marginTop: 20}} 
                    onPress={ () => {this.setState({modalMode: !this.state.modalMode})}}>
                    <Text style={{ fontWeight: "500", color:"#e9446a", textAlign: "center"}}> ปิด </Text>
                    </TouchableOpacity>
                </View>
                </Modal>

                <Modal
                    animationType="slide"
                    visible={this.state.modalInput}
                >                    
               
                    <Text style={styles.status}>
                    สถานะ : <Text style={{ fontWeight: "500", color:"#e9446a"}}> {this.state.mode === ''? 'ยังไม่ได้เลือก' : this.state.mode} </Text>
                    </Text>
            
                    <View >
                        <Text style={styles.inputTitle}> {' จำนวนน้ำหนักที่ต้องการลด/เพิ่ม (1-10 กิโลกรัม)'} : </Text>
                        <InputSpinner
                            max={10}
                            min={0}
                            step={1}
                            colorMax={"#f04048"}
                            colorMin={"#40c5f4"}
                            value={this.state.changeweight}
                            onChange={(num) => {
                               // console.log(num);
                                this.setState({ changeweight:num })
                            }}
                        />
                       
                        <Text style={styles.inputTitle}> {' ระยะเวลาที่ใช้ (1-4 สัปดาห์)'} : </Text>
                        <InputSpinner
                            max={4}
                            min={0}
                            step={1}
                            colorMax={"#f04048"}
                            colorMin={"#40c5f4"}
                            value={this.state.timeweight}
                            onChange={(num) => {
                               // console.log(num);
                                this.setState({ timeweight:num })
                            }}
                        />
                             
                </View>

                <View style={styles.buttoncenter}>
                <TouchableOpacity style={styles.buttonSave} 
                    onPress={()=> {this.setState({modalInput: !this.state.modalInput})}}>
                    <Text> บันทึก </Text>
                </TouchableOpacity>
                </View>

                <TouchableOpacity style={{marginTop: 20}} 
                    onPress={ () => {this.setState({modalInput: !this.state.modalInput})}}>
                    <Text style={{ fontWeight: "500", color:"#e9446a", textAlign: "center"}}> ปิด </Text>
                    </TouchableOpacity>
                
                </Modal>

                <Modal
                    animationType="slide"
                    visible={this.state.modalTime}
                >                   
                    <Text style={{ marginTop: 32 , fontSize: 17}}> {' เวลาว่างแต่ละวันของผู้ใช้ภายใน 1 สัปดาห์'}</Text>

                <View>
                  <ScrollView>
                    <Text style={styles.inputTitle}> {' วันจันทร์ '} : {this.state.showtime1} - {this.state.showtime2}</Text>
    
                    <View style={styles.row}>
                    <View style={styles.timechoose}>
                        <TimePicker
                        selectedHours={parseInt(this.state.showtime1.split(':')[0])}
                        selectedMinutes={parseInt(this.state.showtime1.split(':')[1])}
                        onChange={(hours, minutes) =>
                            
                            this.state.showtime1 = this.setShowTime(hours,minutes)
                            
                          }
                        />
                        </View>
                        <View style={styles.timechoose2}>
                        <Text>-</Text> 
                        </View>
                        <View style={styles.timechoose}>
                        <TimePicker
                       selectedHours={parseInt(this.state.showtime2.split(':')[0])}
                       selectedMinutes={parseInt(this.state.showtime2.split(':')[1])}
                        onChange={(hours, minutes) => 
                            this.state.showtime2 = this.setShowTime(hours,minutes)
                        }
                        />
                       </View>
                       </View>
                    <Text style={styles.inputTitle}> {' วันอังคาร '} : {this.state.showtime3} - {this.state.showtime4}</Text>
  
                    <View style={styles.row}>
                    <View style={styles.timechoose}>
                        <TimePicker
                        selectedHours={parseInt(this.state.showtime3.split(':')[0])}
                        selectedMinutes={parseInt(this.state.showtime3.split(':')[1])}
                        onChange={(hours, minutes) =>
                            this.state.showtime3 = this.setShowTime(hours,minutes)
                          }
                        />
                        </View>
                        <View style={styles.timechoose2}>
                        <Text>-</Text> 
                        </View>
                        <View style={styles.timechoose}>
                        <TimePicker
                       selectedHours={parseInt(this.state.showtime4.split(':')[0])}
                       selectedMinutes={parseInt(this.state.showtime4.split(':')[1])}
                        onChange={(hours, minutes) => 
                            tthis.state.showtime4 = this.setShowTime(hours,minutes)
                        }
                        />
                       </View>
                       </View>
                    <Text style={styles.inputTitle}> {' วันพุธ '} : {this.state.showtime5} - {this.state.showtime6}</Text>
                  
                    <View style={styles.row}>
                    <View style={styles.timechoose}>
                        <TimePicker
                        selectedHours={parseInt(this.state.showtime5.split(':')[0])}
                        selectedMinutes={parseInt(this.state.showtime5.split(':')[1])}
                        onChange={(hours, minutes) =>
                            this.state.showtime5 = this.setShowTime(hours,minutes)
                          }
                        />
                        </View>
                        <View style={styles.timechoose2}>
                        <Text>-</Text> 
                        </View>
                        <View style={styles.timechoose}>
                        <TimePicker
                        selectedHours={parseInt(this.state.showtime6.split(':')[0])}
                        selectedMinutes={parseInt(this.state.showtime6.split(':')[1])}
                        onChange={(hours, minutes) => 
                            this.state.showtime6 = this.setShowTime(hours,minutes)
                        }
                        />
                       </View>
                       </View>
                    <Text style={styles.inputTitle}> {' วันพฤหัสบดี '} : {this.state.showtime7} - {this.state.showtime8}</Text>
 
                    <View style={styles.row}>
                    <View style={styles.timechoose}>
                        <TimePicker
                        selectedHours={parseInt(this.state.showtime7.split(':')[0])}
                        selectedMinutes={parseInt(this.state.showtime7.split(':')[1])}
                        onChange={(hours, minutes) =>
                            this.state.showtime7 = this.setShowTime(hours,minutes)
                          }
                        />
                        </View>
                        <View style={styles.timechoose2}>
                        <Text>-</Text> 
                        </View>
                        <View style={styles.timechoose}>
                        <TimePicker
                       selectedHours={parseInt(this.state.showtime8.split(':')[0])}
                       selectedMinutes={parseInt(this.state.showtime8.split(':')[1])}
                        onChange={(hours, minutes) => 
                            this.state.showtime8 = this.setShowTime(hours,minutes)
                        }
                        />
                       </View>
                       </View>
                    <Text style={styles.inputTitle}> {' วันศุกร์ '} : {this.state.showtime9} - {this.state.showtime10}</Text>
                
                    <View style={styles.row}>
                    <View style={styles.timechoose}>
                        <TimePicker
                        selectedHours={parseInt(this.state.showtime9.split(':')[0])}
                        selectedMinutes={parseInt(this.state.showtime9.split(':')[1])}
                        onChange={(hours, minutes) =>
                            this.state.showtime9 = this.setShowTime(hours,minutes)
                          }
                        />
                        </View>
                        <View style={styles.timechoose2}>
                        <Text>-</Text> 
                        </View>
                        <View style={styles.timechoose}>
                        <TimePicker
                        selectedHours={parseInt(this.state.showtime10.split(':')[0])}
                        selectedMinutes={parseInt(this.state.showtime10.split(':')[1])}
                        onChange={(hours, minutes) => 
                            this.state.showtime10 = this.setShowTime(hours,minutes)
                        }
                        />
                       </View>
                       </View>
                    <Text style={styles.inputTitle}> {' วันเสาร์ '} : {this.state.showtime11} - {this.state.showtime12}</Text>
                   
                    <View style={styles.row}>
                    <View style={styles.timechoose}>
                        <TimePicker
                        selectedHours={parseInt(this.state.showtime11.split(':')[0])}
                        selectedMinutes={parseInt(this.state.showtime11.split(':')[1])}
                        onChange={(hours, minutes) =>
                            this.state.showtime11 = this.setShowTime(hours,minutes)
                          }
                        />
                        </View>
                        <View style={styles.timechoose2}>
                        <Text>-</Text> 
                        </View>
                        <View style={styles.timechoose}>
                        <TimePicker
                       selectedHours={parseInt(this.state.showtime12.split(':')[0])}
                       selectedMinutes={parseInt(this.state.showtime12.split(':')[1])}
                        onChange={(hours, minutes) => 
                            this.state.showtime12 = this.setShowTime(hours,minutes)
                        }
                        />
                       </View>
                       </View>
                    <Text style={styles.inputTitle}> {' วันอาทิตย์ '} : {this.state.showtime13} - {this.state.showtime14} </Text>
                    <View style={styles.row}>
                    <View style={styles.timechoose}>
                        <TimePicker
                        selectedHours={parseInt(this.state.showtime13.split(':')[0])}
                        selectedMinutes={parseInt(this.state.showtime13.split(':')[1])}
                        onChange={(hours, minutes) =>
                            this.state.showtime13 = this.setShowTime(hours,minutes)
                          }
                        />
                        </View>
                        <View style={styles.timechoose2}>
                        <Text>-</Text> 
                        </View>
                        <View style={styles.timechoose}>
                        <TimePicker
                        selectedHours={parseInt(this.state.showtime14.split(':')[0])}
                        selectedMinutes={parseInt(this.state.showtime14.split(':')[1])}
                        onChange={(hours, minutes) => 
                            this.state.showtime14 = this.setShowTime(hours,minutes)
                        }
                        />
                       </View>
                       </View>
                    </ScrollView>             
                </View>
                <View style={styles.buttoncenter}>
                    <TouchableOpacity style={styles.buttonSave} 
                        onPress={()=> {this.setState({modalTime: !this.state.modalTime})}}>
                        <Text> บันทึก </Text>
                    </TouchableOpacity>
                </View> 

                    <TouchableOpacity style={{marginTop: 5}} 
                        onPress={ () => {this.setState({modalTime: !this.state.modalTime})}}>
                        <Text style={{ fontWeight: "500", color:"#e9446a", textAlign: "center"}}> ปิด </Text>
                    </TouchableOpacity>
                </Modal>

                <TouchableOpacity style={{marginTop: 10}} 
                    onPress={this.signOutUser}>
                    <Text style={{ fontWeight: "500", color:"#e9446a", textAlign: "center"}}>ออกจากระบบ</Text>
                </TouchableOpacity>
                    <Text style={{ marginTop: 28}}>{' '}</Text>
                </ScrollView>   
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop : 20,
        marginLeft : 10              
    },
    sayhi:{
        marginTop: 10,         
        fontWeight: "100", 
        fontSize: 25,
        textAlign: "center"
    },
    status: {
        marginTop: 8,
        color:"#414959", 
        fontSize: 13, 
        textAlign: "center"
    },
    greeting: {
        marginTop: 10,
        fontSize: 15,
        fontWeight: "400",
        textAlign: "center"

    },
    inputTitle: {
        marginTop: 10,
        color: "#8a8f9e",
        fontSize: 15
    },
    input: {
        borderBottomColor: "#8a8f9e",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 25,
        fontSize: 15,
        color: "#161f3d"
    },
    inputmodal:{
        marginLeft: 8,
        borderBottomColor: "#8a8f9e",
        borderBottomWidth: StyleSheet.hairlineWidth,
        height: 25,
        fontSize: 15,
        color: "#161f3d"
    },
    buttoncenter:{
       
        flexDirection : 'row',
        alignItems: "center",
        justifyContent: "space-evenly"
    },
    buttoncentersave :{
        alignItems: "center",
        justifyContent: "center"
    },   
    buttonSave: {
        marginTop: 15,
        backgroundColor: "#ff7b89",
        borderRadius: 10,
        width: 125,
        height: 45,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonMode: {        
        backgroundColor: "#b9d4db",
        borderRadius: 10,
        width: 150,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonTime: {      
        backgroundColor: "#bfb8da",
        borderRadius: 10,
        width: 150,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonLose: {
        marginTop: 32,
        backgroundColor: "#96d7c6",
        borderRadius: 10,
        width: 250,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonGain: {
        marginTop: 32,
        backgroundColor: "#5aa7a7",
        borderRadius: 10,
        width: 250,
        height: 50,
        alignItems: "center",
        justifyContent: "center"
    },
    row: {
        flex: 1,
        flexDirection: "row"
      },
    timechoose: {
    
        width:170,
        backgroundColor: '#fff',
        marginLeft: 10,
        justifyContent: "center"
      },
      timechoose2: { 
        width:10,
        backgroundColor: '#fff',
        marginLeft: 10,
        justifyContent: "center"
       
      }
      
});