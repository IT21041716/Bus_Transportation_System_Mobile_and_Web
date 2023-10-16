import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  StatusBar,
  Button
} from "react-native";
import React from "react";
import mobile from './images/mobile.png';

const SmartCard = () => {
  return (
    <SafeAreaView>
      <StatusBar backgroundColor="#4169e1" />
      <View
        style={{
          backgroundColor: "#87cefa",
          borderRadius: 15,
          marginHorizontal: 40,
          marginTop: 30,
          width: "80%",
          height: "15%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Text style={{ textAlign: "center", fontSize: 24, fontWeight: "bold" }}>
          Smart Card
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#7eebf8",
          height: 80,
          marginTop:30,
          marginHorizontal:20,
          width: "90%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* <Image source={mobile} style={{aspectRatio:1,marginHorizontal:250,marginTop:0, marginVertical:-20,height:80}}/> */}
        <Text style={{fontSize:18, marginTop:0, marginHorizontal:30}}>01 Buy</Text>
      </View>
      <View
        style={{
          backgroundColor: "#00bfff",
          height: 80,
          marginHorizontal:20,
          width: "90%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* <Image source={mobile} style={{aspectRatio:1,marginHorizontal:250,marginTop:0, marginVertical:-20,height:80}}/> */}
        <Text style={{fontSize:18, marginTop:0, marginHorizontal:30}}>02 Load</Text>
      </View>
      <View
        style={{
          backgroundColor: "#6495ed",
          height: 80,
          marginHorizontal:20,
          width: "90%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* <Image source={mobile} style={{aspectRatio:1,marginHorizontal:250,marginTop:0, marginVertical:-20,height:80}}/> */}
        <Text style={{fontSize:18, marginTop:0, marginHorizontal:30}}>02 Tap & Travel</Text>
      </View>

      <View style={{backgroundColor:"#a4c6fc" , height:'auto', width:'90%', borderRadius:15, marginHorizontal:20, marginTop:30}}>
        <Text  style={{textAlign:'center', fontSize:17}}>Eligibility List To Obtain Smart Card</Text>
        <Text style={{marginHorizontal:30, marginTop:10}}>01. National Identity Card</Text>
        <Text style={{marginHorizontal:30}}>02. Necessary Payment</Text>
        <Text style={{marginHorizontal:30}}>03. Full Name</Text>
        <Text style={{marginHorizontal:30}}>04. Date of Birth</Text>
        <Text style={{marginHorizontal:30}}>05. Address</Text>
        <Text style={{marginHorizontal:30}}>06. City</Text>
        <Text style={{marginHorizontal:30, marginBottom:10}}>07. Potal Code</Text>
      </View>

      
      <Button title='Active' color={"orange"} onPress={()=>console.log('hi')} />
    </SafeAreaView>
  );
};

export default SmartCard;

const style = StyleSheet.create({});
