import React from 'react';
import { View, Text, StyleSheet, LayoutAnimation, ScrollView, TouchableOpacity} from 'react-native';
import * as firebase from 'firebase';
import DropDownPicker from 'react-native-dropdown-picker';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';




export default class SportScreen extends React.Component {
    state = {
        email: "",
        displayName: "",
        mode:"",
        sportLike:1,
        kcal:0,
        sportName:"",
        userid:"",
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
        monday:"00:00-00:00",
        tuesday:"00:00-00:00",
        wednesday:"00:00-00:00",
        thursday:"00:00-00:00",
        friday:"00:00-00:00",
        saturday:"00:00-00:00",
        sunday:"00:00-00:00",
        HeadTable: ['วัน', 'เวลา', 'รายการ','ทำ/ไม่ได้ทำ'],
        dayDone:0,
        dayNotDone:0,
        DataTable: [],
        doSuccess :[3,3,3,3,3,3,3],
        radio_props : [
            {label: 'ไม่ได้ทำ', value: 0 },
            {label: 'ทำ', value: 1 }
           
          ],

       
    };
    readUserData() {
        firebase.database().ref('/Users/'+this.state.userid).on('value', snapshot => {
            this.getData(snapshot.val());
          });
    }
    readSportData() {
     
        firebase.database().ref('/Sports/'+this.state.sportLike).on('value', snapshot => {
            this.getData2(snapshot.val());
          });
    }
    writeSport(id,name,kcal){
        try {
        firebase.database().ref('Sports/'+id).set({
            id:id,
            name:name,
            kcal:kcal
           
        }).then(()=>{
           
           
        }).catch((error)=>{
            
        })
        
    }
    catch ({error}) {
            
    }
    };
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
        if(values != null)
        {
       
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
        this.setState({Diabetes:values.Diabetes});
        this.setState({timeweight:values.timeweight});
        this.setState({changeweight:values.changeweight});
       // this.setState({sportLike: values.sportLike});
        this.state.sportLike = values.sportLike;
        this.state.monday = this.calTime(values.monday);
        this.state.tuesday = this.calTime(values.tuesday);
        this.state.wednesday = this.calTime(values.wednesday);
        this.state.thursday = this.calTime(values.thursday);
        this.state.friday = this.calTime(values.friday);
        this.state.saturday = this.calTime(values.saturday);
        this.state.sunday = this.calTime(values.sunday);
        this.state.doSuccess = [
        values.mondayStatus,
        values.tuesdayStatus,
        values.wednesdayStatus,
        values.thursdayStatus,
        values.fridayStatus,
        values.saturdayStatus,
        values.sundayStatus
        ];
       
       
       
        }
        
    }
    calTime(time)
    {
        if(time=="00:00-00:00")
        {
            return "พัก";
        }
        else
        {
            return time;
        }
    }
    showItem(time,name,kcal)
    {
        if(time=="พัก")
        {
            return "พัก";
        }
        else
        {
            return 'คาร์ดิโอ 1 ชั่วโมง \n ด้วยการ '+name+'\n'+kcal+' kcal';
        }
    }
    writeUserData(){
        try {
        firebase.database().ref('Users/'+this.state.userid).update({
            mondayStatus:this.state.doSuccess[0],
            tuesdayStatus:this.state.doSuccess[1],
            wednesdayStatus:this.state.doSuccess[2],
            thursdayStatus:this.state.doSuccess[3],
            fridayStatus:this.state.doSuccess[4],
            saturdayStatus:this.state.doSuccess[5],
            sundayStatus:this.state.doSuccess[6]
            
        }).then(()=>{
            this.readUserData();
            this.props.navigation.navigate("Sport");
            var listday = this.state.doSuccess;
            var num1 = 0;
            var num2 = 0;
            listday.forEach(function(val) {
                console.log(val);
                if(val == 1)
                {
                    num1++;
                  
                    
                }
                else if(val == 0)
                {
                    num2++;
                   
                }
            });
            this.setState({dayDone:num1});
            this.setState({dayNotDone:num2});
           
        }).catch((error)=>{
            
        })

    }
    catch ({error}) {
            
    }
    };
    showButton(time)
    {
        if(time=="พัก")
        {
            return "พัก";
        }
        else
        {
            return 'สำเร็จ/เลื่อน';
        }
    }
    getData2(values)
    {
        if(values != null)
        {
            this.state.kcal = values.kcal;
            this.state.sportName = values.name;
            this.setState({sportLike: values.sportLike});
            this.setState({kcal: values.kcal});
        }
    }
    componentWillMount() {
        const {email, displayName,uid} = firebase.auth().currentUser;

        this.setState({ email, displayName });
        this.state.name = displayName;
        this.state.displayName = displayName;    
        this.state.userid = uid;  
        this.readUserData();
        this.readSportData();
        this.state.DataTable = [
            ['วันจันทร์',this.state.monday,this.showItem(this.state.monday,this.state.sportName,this.state.kcal),this.showItem(this.state.monday)],
            ['วันอังคาร',this.state.tuesday,this.showItem(this.state.tuesday,this.state.sportName,this.state.kcal),this.showItem(this.state.tuesday)],
            ['วันพุธ',this.state.wednesday,this.showItem(this.state.wednesday,this.state.sportName,this.state.kcal),this.showItem(this.state.wednesday)],
            ['วันพฤหัสบดี',this.state.thursday,this.showItem(this.state.thursday,this.state.sportName,this.state.kcal),this.showItem(this.state.thursday)],
            ['วันศุกร์',this.state.friday,this.showItem(this.state.friday,this.state.sportName,this.state.kcal),this.showItem(this.state.friday)],
            ['วันเสาร์',this.state.saturday,this.showItem(this.state.saturday,this.state.sportName,this.state.kcal),this.showItem(this.state.saturday)],
            ['วันอาทิตย์',this.state.sunday,this.showItem(this.state.sunday,this.state.sportName,this.state.kcal),this.showItem(this.state.sunday)]
        ]
        var listday = this.state.doSuccess;
        var num1 = 0;
        var num2 = 0;
        listday.forEach(function(val) {
            console.log(val);
            if(val == 1)
            {
                num1++;
              
                
            }
            else if(val == 0)
            {
                num2++;
               
            }
        });
        this.setState({dayDone:num1});
        this.setState({dayNotDone:num2});
       
    };
    _alertIndex(index) {
        Alert.alert(`This is row ${index + 1}`);
      }
    render() {
        LayoutAnimation.easeInEaseOut();
       
        const element = (data, index) => (
           <View>
              
               <RadioForm
            radio_props={this.state.radio_props}
            initial={this.state.doSuccess[index]}
            onPress={(value) => {
                this.state.doSuccess[index] = value;
                this.writeUserData();
            }}
            />
            
           </View>            
          );
         
       
        return (
            <View style={styles.container}>
                <ScrollView>
                <Text style={styles.sayhi}> สวัสดี {this.state.displayName}  </Text>
                <Text style={styles.status}>
                        สถานะ : <Text style={{ fontWeight: "500", color:"#e9446a"}}> 
                                    {this.state.mode === '' ? 'ลดน้ำหนัก' : this.state.mode} </Text>
                </Text>
                <Text style={styles.status}>
                        สรุป : <Text style={{ fontWeight: "500", color:"#e9446a"}}> 
                                    ทำได้ {this.state.dayDone} วัน / ทำไม่ได้ {this.state.dayNotDone} วัน</Text>
                </Text>

                <Text style={styles.numweek}> {'สัปดาห์ที่ : 1'}</Text>
                <Table borderStyle={{borderColor: 'transparent'}}>
                <Row data={this.state.HeadTable} style={styles.head} textStyle={styles.text}/>
                {
                    this.state.DataTable.map((rowData, index) => (
                    <TableWrapper key={index} style={styles.row}>
                        {
                       
                        rowData.map((cellData, cellIndex) => (
                         
                            <Cell key={cellIndex} data={cellIndex === 3 && cellData !="พัก" ? element(cellData, index) : cellData} textStyle={styles.text}/>
                            
                        ))
                        }
                    </TableWrapper>
                     
                    ))
                }
                </Table>
               
                <View style={styles.buttoncenter}>
                        <TouchableOpacity style={styles.buttonSave} >
                            <Text> เปลี่ยนตารางการออกกำลังกายทั้งหมดในตาราง </Text>                        
                        </TouchableOpacity>                        
                    </View> 
                    <Text style={{ marginTop: 28}}>{' '}</Text>
                </ScrollView>
            </View>

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
    numweek: {
        marginTop: 18,
        fontSize: 20,
        textAlign: "center"   
    },
    HeadStyle:{
        height: 45,
        backgroundColor:"blue",
        color:"#000000",
        fontSize: 14,
        textAlign: "center"
       
    },
    TableText:{
        paddingTop:20,
        paddingBottom:20,
        fontSize: 14,
      
        textAlign: "center"
    },
    line: {
        textDecorationLine: "line-through"
    },
    week: {
        flexDirection: 'row',
        justifyContent: 'space-around'
        
    },
    day: {
        flexDirection: 'column',
        justifyContent: 'center'
    },
    buttoncenter:{
        marginTop: 10,
        flexDirection : 'row',
        alignItems: "center",
        justifyContent: "space-evenly"
    },  
    buttonSave: {
        marginTop: 10,
        backgroundColor: "#ff7b89",
        borderRadius: 10,
        width: 300,
        height: 45,
        alignItems: "center",
        justifyContent: "center"
    },
    head: { height: 40, backgroundColor: '#e9765b' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#fcbd97',elevation:-1 },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
});