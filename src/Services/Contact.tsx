import Contacts from 'react-native-contacts';
import { useState, useEffect } from 'react';
import { RequestContactPermission } from '../config/permissions';
import { View, Text, ScrollView } from 'react-native';
import { parsePhoneNumber } from 'libphonenumber-js/mobile';

export default function GetContacts() {
    const [contacts, setContacts] = useState<string[]>([]);
    useEffect(() => {
        const callHandler = async () => {
            const granted = await RequestContactPermission();
            if (granted) {
                const con = await Contacts.getAll();
                if (con) {
                    console.log("Contacts fetched feom the mobile is ", con);
                    const num = parsePhoneNumber(con[con.length - 1].phoneNumbers[0].number, 'IN');
                    console.log("number extrcted", num)
                    const numbers: string[] = [];

                    con.forEach(item1 => {
                        item1.phoneNumbers.forEach(item2 => {
                            const number = parsePhoneNumber(item2.number, 'IN');
                            if (number) {
                                numbers.push(number.nationalNumber);
                            }
                        })
                    });

                    setContacts(numbers);

                }
            }
        }
        callHandler();
    }, [])

    return (
        <>
            {/* <View style={{flexGrow:1}}> */}
                {/* <ScrollView> */}
                <Text>HI THIS IS THE MAIN PAGE </Text>
                {
                    contacts &&
                    contacts.map((item, index) => (
                        <View key={index} style={{
                            padding: 10,
                            backgroundColor: "#D0FCE3",
                            width:'50%',
                            marginBottom: 2,
                            alignItems:"center",
                            borderRadius:10
                        }}>

                            <Text style={{

                            }}>{item}</Text>
                        </View>
                    ))
                }
                {/* </ScrollView> */}
            {/* </View> */}
        </>
    )
}

