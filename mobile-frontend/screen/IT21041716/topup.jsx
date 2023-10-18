import React, { useState } from 'react';
import { View, Text, Modal, StyleSheet, TextInput, ScrollView, TouchableOpacity, ToastAndroid } from 'react-native';
import { NewTopUp } from './actions/topUpAction'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Row } from 'react-native-table-component';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 10,
        width: 300,
        height: 400,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 8,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    input: {
        height: 40,
        width: 250,
        margin: 10,
        borderWidth: 1,
        padding: 10,
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
});


const Topup = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [amount, setAmount] = useState('');
    const [cardholderName, setCardholderName] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiry, setExpiry] = useState('');
    const [cvv, setCvv] = useState('');

    const dispatch = useDispatch();
    const balance = useSelector((state) => state.topUp.balance);
    const trips = useSelector((state) => state.topUp.trips)
    const topUps = useSelector((state) => state.topUp.topUps);
    const user = useSelector((state) => state.auth.user);



    const sendData = () => {
        const form = {
            UID: UID,
            smartCardID: user.smartCardID,
            fullName: user.fullName,
            contactNo: user.contactNo,
            email: user.email,
            amount: parseFloat(amount),
        };
        dispatch(NewTopUp(form));
        setAmount('');
    }


    const tableHead = ['No', 'Date', 'Amount'];
    const magula = [
        {
            id: 1,
            date: '02-01-2023',
            amount: 2000.00
        },
        {
            id: 2,
            date: '03-01-2023',
            amount: 200.00
        },
        {
            id: 1,
            date: '02-01-2023',
            amount: 2000.00
        },
        {
            id: 2,
            date: '03-01-2023',
            amount: 200.00
        },
        {
            id: 1,
            date: '02-01-2023',
            amount: 2000.00
        },
        {
            id: 2,
            date: '03-01-2023',
            amount: 200.00
        },
    ];
    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <Text style={{ fontWeight: '700', fontSize: 34, marginVertical: 15, marginHorizontal: 120 }} >TOPUP</Text>
            <View style={{
                backgroundColor: "#000347",
                borderRadius: 15,
                marginHorizontal: 50,
                marginTop: 10,
                width: "70%",
                aspectRatio: 2,
                justifyContent: "center",
                alignItems: 'center'
            }}>
                <Text style={{ color: 'white', fontWeight: '700' }} >ACCOUNT BALANCE</Text>
                <Text style={{ color: 'white', fontWeight: '700' }}>Rs:{balance}.00</Text>
            </View>

            <View style={{
                backgroundColor: "#ffffff",
                borderRadius: 15,
                marginHorizontal: 20,
                marginVertical: 25,
                minHeight: 250,
                flexGrow: 1,
                alignItems: 'center',
                padding: 10,
            }}>
                <Text style={{ fontWeight: '700', fontSize: 25 }}>MOST RECENT TOPUP</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, borderBottomWidth: 1, paddingBottom: 5 }}>
                    <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>No</Text>
                    <Text style={{ flex: 2, fontWeight: 'bold', textAlign: 'center' }}>Date</Text>
                    <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>Amount</Text>
                </View>
                {magula.map((rowData, index) => (
                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                        <Text style={{ flex: 1, textAlign: 'center' }}>{rowData.id}</Text>
                        <Text style={{ flex: 2, textAlign: 'center' }}>{rowData.date}</Text>
                        <Text style={{ flex: 1, textAlign: 'center' }}>{rowData.amount}</Text>
                    </View>
                ))}
            </View>


            <View style={{
                backgroundColor: "#ffffff",
                borderRadius: 15,
                marginHorizontal: 20,
                marginVertical: 25,
                minHeight: 250,
                flexGrow: 1,
                alignItems: 'center',
                padding: 10,
            }}>
                <Text style={{ fontWeight: '700', fontSize: 25 }}>MOST RECENT TRIP FEE</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10, borderBottomWidth: 1, paddingBottom: 5 }}>
                    <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>No</Text>
                    <Text style={{ flex: 2, fontWeight: 'bold', textAlign: 'center' }}>Date</Text>
                    <Text style={{ flex: 1, fontWeight: 'bold', textAlign: 'center' }}>Amount</Text>
                </View>
                {magula.map((rowData, index) => (
                    <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
                        <Text style={{ flex: 1, textAlign: 'center' }}>{rowData.id}</Text>
                        <Text style={{ flex: 2, textAlign: 'center' }}>{rowData.date}</Text>
                        <Text style={{ flex: 1, textAlign: 'center' }}>{rowData.amount}</Text>
                    </View>
                ))}
            </View>

            <View style={{
                backgroundColor: "#ffffff",
                borderRadius: 15,
                marginHorizontal: 20,
                marginVertical: 25,
                minHeight: 250,
                flexGrow: 1,
                alignItems: 'center',
                padding: 10,
            }}>
                <Text style={{ fontWeight: '700' }}>RECHARGE ACCOUNT BALANCE</Text>
                <Text style={{ marginVertical: 20 }}>Keep your travel hassle-free by ensuring a sufficient account balance for our CITYLINK public transportation services. Recharge your balance promptly to avoid any interruptions during your travels.</Text>

                <TextInput
                    style={{ borderColor: 'black', borderWidth: 1, padding: 10, marginTop: 10 }}
                    placeholder="Enter recharge amount"
                    value={amount}
                    onChangeText={text => setAmount(text)}
                />

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{ fontWeight: 700, fontSize: 22 }}>Recharge SmartCard</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Cardholder Name"
                                value={cardholderName}
                                onChangeText={(text) => setCardholderName(text)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Card Number"
                                value={cardNumber}
                                onChangeText={(text) => setCardNumber(text)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Expiry"
                                value={expiry}
                                onChangeText={(text) => setExpiry(text)}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="CVV"
                                value={cvv}
                                onChangeText={(text) => setCvv(text)}
                            />
                            <View style={{ display: 'flex', flexDirection: 'row' }}>
                                <TouchableOpacity
                                    style={{ ...styles.openButton, backgroundColor: '#2196F3', marginHorizontal: 20 }}
                                    onPress={() => {
                                        setModalVisible(!modalVisible);
                                    }}
                                >
                                    <Text style={styles.textStyle}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
                                    onPress={() => {
                                        sendData();
                                    }}
                                >
                                    <Text style={styles.textStyle}>Recharge</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>






                {amount !== '' && (
                    <TouchableOpacity onPress={() => { setModalVisible(true) }} style={{
                        backgroundColor: '#000347',
                        padding: 10,
                        marginTop: 10,
                        borderRadius: 15,
                        width: 150,
                        height: 50,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'


                    }}>
                        <Text style={{ fontWeight: 700, color: 'white' }}>Recharge</Text>
                    </TouchableOpacity>
                )}
            </View>
        </ScrollView>
    );
};

export default Topup;
