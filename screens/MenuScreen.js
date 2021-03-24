import React from 'react';
import { View, Text, StyleSheet, LayoutAnimation, ScrollView, TouchableOpacity } from 'react-native';
import HomeScreen from './HomeScreen';
import * as firebase from 'firebase';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';

export default class MenuScreen extends React.Component {
           
    state = {
        radio_props : [
            {label: 'เลื่อน', value: 2 },
            {label: 'สำเร็จ', value: 1 }
           
          ],
        email: "",
        displayName: "",
        userid:"",
        mode:"",
        name:"",
        age:"",
        gender:"",
        weight:0,
        changeweight:0,
        timeweight:0,
        bmi:0,
        bmr:0,
        tdee:0,
        height:0,
        sportLike:"",
        foodSick:"",
        HighBlood:"",
        Diabetes:"",
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
        HeadTable: ['วัน', 'เวลา', 'เมนูอาหาร'],
        DataTable: [],
        tmpMessage:"",
        foodmenu:[],
        f11:"",
        f12:"",
        f13:"",
        f21:"",
        f22:"",
        f23:"",
        f31:"",
        f32:"",
        f33:"",
        f41:"",
        f42:"",
        f43:"",
        f51:"",
        f52:"",
        f53:"",
        f61:"",
        f62:"",
        f63:"",
        f71:"",
        f72:"",
        f73:""
       

    };
    readUserData() {
        firebase.database().ref('Users/'+this.state.userid).on('value', snapshot => {
            this.getData(snapshot.val());
          });
    }
    getData(values)
    {
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
            this.state.bmi = (parseFloat(values.weight)/((parseFloat(values.height)/100)*(parseFloat(values.height)/100)));
            if(values.gender ==0)
            {
                this.state.bmr = 66+(13.7*parseFloat(values.weight))+(5*parseFloat(values.height))-(6.8*parseFloat(values.age));
            }
            else
            {
                this.state.bmr = 665+(9.6*parseFloat(values.weight))+(1.8*parseFloat(values.height))-(4.7*parseFloat(values.age));
            }
            this.state.tdee = 1.375*this.state.bmr;
       
       
        }
        
    };
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
    };
     showItem()
    {   
        var menu = "";
       // type = 1;
       // var randomTime = //(min, max);
        //var limit = 1;
        // get 1 thought equal or after this timestamp
       
        firebase.database().ref('Foods').on('value', snapshot => {
            const data = snapshot.val()
            let foodData = []
            if(data){
                
                data.forEach((element)=> {
                    if(element !== undefined) {
                        foodData.push(element)
                    }
                })
                this.setState({foodmenu: foodData})
            }
            console.log(foodData);
            console.log("OK");
           //menu =  this.getData2(type,snapshot.val());
          });
          //console.log("output "+menu);
         // return menu+" kcal.";
    };
    getData2(type)
    {
        var fname = "";
        var fkcal = 0;
        var found = 0;
        var menu = this.state.foodmenu;
       
            menu.forEach(function(childSnapshot) {
             
                if(type == childSnapshot.type && found == 0)
                {
                    
                    fname = childSnapshot.name;
                    fkcal = childSnapshot.kcal;
                    found = 1;
                   
                    //this.state.tmpMessage = fname+" "+fkcal+" kcal.";
                   // exit;
                }
            });
            if(fname.length>0)
            {
            this.setState({tmpMessage:fname+" "+fkcal+" kcal."});
            console.log("result "+ this.state.tmpMessage);
            return fname+" "+fkcal+" kcal.";
            }
           
           // return 
           
        
    }
    calNormal()
    {
       
        if(this.state.bmi >= 40)
        {
           return "โรคอ้วนขั้นรุนแรง";
        }
        else if(this.state.bmi >= 30)
        {
           return "โรคอ้วน";
        }
        else if(this.state.bmi >= 25)
        {
           return "น้ำหนักเกิน";
        }
        else{
           return "ปกติ";
        }
    }
    writeFood(id,name,kcal,type){
        try {
        firebase.database().ref('Foods/'+id).set({
            id:id,
            name:name,
            kcal:kcal,
            type:type
           
        }).then(()=>{
           
           
        }).catch((error)=>{
            
        })
        
    }
    catch ({error}) {
            
    }
    };
    componentDidMount() {
        const {email, displayName,uid} = firebase.auth().currentUser;

        this.setState({ email, displayName });
        this.state.name = displayName;
        this.state.displayName = displayName;    
        this.state.userid = uid;  
        this.showItem();
        this.readUserData();
        console.log('didmount')
       
        
        //;
       // console.log("item show ==  "+this.state.tmpMessage);
      
    // for (let i = 0; i < data.length; i++) {
    //     const randomIndex = Math.floor(Math.random() * 10) + 1
    //     data[i].push(this.state.foodmenu[randomIndex])
    // }
    // data.forEach((ele, index)=> {
       
    //     ele.push(this.state.foodmenu[randomIndex])
    // })
    //this.setState({DataTable: data})
  /*  this.writeFood("1","
        this.state.DataTable = [
            ['วันจันทร์',"เช้า\n\n เที่ยง\n\n เย็น","123456"],
            ['วันอังคาร',"เช้า\n\n เที่ยง\n\n เย็น","123456"],
            ['วันพุธ',"เช้า\n\n เที่ยง\n\n เย็น","123456"],
            ['วันพฤหัสบดี',"เช้า\n\n เที่ยง\n\n เย็น","123456"],
            ['วันศุกร์',"เช้า\n\n เที่ยง\n\n เย็น","123456"],
            ['วันเสาร์',"เช้า\n\n เที่ยง\n\n เย็น","123456"],
            ['วันอาทิตย์',"เช้า\n\n เที่ยง\n\n เย็น","123456"]
        ]
      /*  this.writeFood("1","ข้าวต้มปลา",325,1);
        this.writeFood("2","โจ้กหมูสับไข่ลวก",250,1);
        this.writeFood("3","ข้าวยำปักษ์ใต้",248,1);
       
        this.writeFood("4","ข้าวหมูทอดกระเที่ยม",525,2);
        this.writeFood("5","ขนมจีนเขียวหวานไก่",594,2);
        this.writeFood("6","ข้าวฟัดกระเพรากุ้ง",540,2);

        this.writeFood("7","ไข่พะโล้กับข้าวกล้อง",200,3);
        this.writeFood("8","ต้มยำปลากะพงกับข้าวกล้อง",160,3);
        this.writeFood("9","ผัดวุ้นเส้นใส่ไข่",265,3);
        this.writeFood("10","น้ำลำไย",100,1);
        this.writeFood("11","น้ำส้มคั้น",160,1);
        this.writeFood("12","น้ำมะพร้าว",120,1);*/


    };

    renderFood(){
        const morning = this.state.foodmenu.filter(val => val.type === 1)
        const lunch = this.state.foodmenu.filter(val => val.type === 2)
        const dinner = this.state.foodmenu.filter(val => val.type === 3)
        const drink = this.state.foodmenu.filter(val => val.type === 4)
        const randomdrink = Math.floor(Math.random() * 3)
        const randommorning = Math.floor(Math.random() * 2)
        const randomlunch = Math.floor(Math.random() * 2)
        const randomdinner = Math.floor(Math.random() * 2)
        return `${morning[randommorning].name} ${morning[randommorning].kcal} kcal\n${drink[randomdrink].name} ${drink[randomdrink].kcal} kcal` + '\n' +
        `${lunch[randomlunch].name} ${lunch[randomlunch].kcal} kcal`+ '\n' +
        `${dinner[randomdinner].name} ${dinner[randomdinner].kcal} kcal`

    }


   
    render() {

        LayoutAnimation.easeInEaseOut();
        if(this.state.foodmenu !== [] && this.state.foodmenu[0] !== undefined) {
            console.log('foodstate');
            console.log(this.state.foodmenu);
            this.state.DataTable = [
                ['วันจันทร์',"เช้า\n\n เที่ยง\n\n เย็น", this.renderFood()],
                ['วันอังคาร',"เช้า\n\n เที่ยง\n\n เย็น", this.renderFood()],
                ['วันพุธ',"เช้า\n\n เที่ยง\n\n เย็น", this.renderFood()],
                ['วันพฤหัสบดี',"เช้า\n\n เที่ยง\n\n เย็น", this.renderFood()],
                ['วันศุกร์',"เช้า\n\n เที่ยง\n\n เย็น", this.renderFood()],
                ['วันเสาร์',"เช้า\n\n เที่ยง\n\n เย็น", this.renderFood()],
                ['วันอาทิตย์',"เช้า\n\n เที่ยง\n\n เย็น", this.renderFood()]
            ]
        }
       
        const element = (data, index) => (
           
            <View>
                <Text style={"align:left"}>undifined</Text>
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

                <View style={{ marginTop: 10}}>
                    <Text> {' ต้องการลดน้ำหนัก : '} 
                        <Text style={{ fontWeight: "500", color:"#e9446a"}}>{this.state.changeweight} กิโลกรัม </Text>
                    </Text>
                    <Text> {' ใช้ระยะเวลา : '}  
                        <Text style={{ fontWeight: "500", color:"#e9446a"}}>{this.state.timeweight} สัปดาห์ </Text>
                    </Text>
                    <Text> {' ค่าดัชนีมวลกาย (BMI) : '}  
                        <Text style={{ fontWeight: "500", color:"#e9446a"}}>{this.state.bmi.toFixed(2)} </Text>: {this.calNormal()}
                    </Text>
                    <Text> {' ค่าพลังงานที่ร่างกายเผาผลาญ(BMR): '}  
                        <Text style={{ fontWeight: "500", color:"#e9446a"}}>{this.state.bmr.toFixed(2)} kcal </Text>
                    </Text>
                    <Text> {' ค่าพลังงานหลังจากออกกำลังกาย(TDEE): '}  
                        <Text style={{ fontWeight: "500", color:"#e9446a"}}>{this.state.tdee.toFixed(2)} kcal </Text>
                    </Text>
                    
                </View>

                <Text style={styles.numweek}> {'สัปดาห์ที่ : 1'}</Text>
                <Table borderStyle={{borderColor: 'transparent'}}>
                <Row data={this.state.HeadTable} flexArr={[1, 1, 2]} style={styles.head} textStyle={styles.text}/>
                {
                    this.state.DataTable.map((rowData, index) => (
                    <TableWrapper key={index} style={styles.row}>
                        {
                        rowData.map((cellData, cellIndex) => (
                            <Cell key={cellIndex} flexArr={[1, 1, 2]} data={cellData} textStyle={styles.text}/>
                        ))
                        }
                    </TableWrapper>
                     
                    ))
                }
                </Table>       
                    <View style={styles.buttoncenter}>
                        <TouchableOpacity style={styles.buttonSave} >
                            <Text> เปลี่ยนเมนูอาหารทั้งหมดในตาราง </Text>                        
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
    HeadStyle:{
        height: 45,
        backgroundColor:"blue",
        color:"#000000",
        fontSize: 25,
        textAlign: "center"
       
    },
    TableText:{
        paddingTop:20,
        paddingBottom:20,
        fontSize: 16,
      
        textAlign: "center"
    },
    numweek: {
        marginTop: 18,
        fontSize: 20,
        textAlign: "center"   
    },
    line: {
        textDecorationLine: "line-through"
    },
    week: {
        flexDirection: 'row',
        justifyContent: "space-around"
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
        width: 250,
        height: 45,
        alignItems: "center",
        justifyContent: "center"
    },
    head: { height: 40, backgroundColor: '#68b2a0' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#cde0c9',elevation:-1 },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
});