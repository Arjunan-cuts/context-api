import Contacts from 'react-native-contacts';
import { useState, useEffect, useMemo, useRef } from 'react';
import { RequestContactPermission } from '../config/permissions';
import { View, Text, ScrollView, SectionList, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { parsePhoneNumber } from 'libphonenumber-js/mobile';

interface state {
    name: string,
    number: number
}
interface ContactItem {
    name: string;
    number: string;
    icon: string;
}

interface Section {
    title: string;
    data: ContactItem[];
}

const Alphabets = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
export default function GetContacts() {
    const [contacts, setContacts] = useState<Section[]>([]);
    const [char, setChar] = useState('');
    const Listref=useRef<SectionList>(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const callHandler = async () => {
            const granted = await RequestContactPermission();
            if (granted) {
                const con = await Contacts.getAll();
                if (con) {
                    console.log("Contacts fetched feom the mobile is ", con);
                    const num = parsePhoneNumber(con[con.length - 1].phoneNumbers[0].number, 'IN');
                    const numbers: any = [];
                    con.forEach(item1 => {

                        item1.phoneNumbers.forEach(item2 => {
                            try {
                                const obj: any = {};
                                obj.name = item1.givenName;
                                if (item1.hasThumbnail) {
                                    obj.icon = item1.thumbnailPath;
                                } else {
                                    obj.icon = '';
                                }
                                obj.number = parsePhoneNumber(item2.number, 'IN').nationalNumber;
                                numbers.push(obj);

                            } catch (err) {
                                console.log("error in parsing", err)
                            }

                        })
                    });
                    const real = numbers.reduce((accu: Section[], item: any) => {
                        const char = item.name.charAt(0).toUpperCase();
                        const sectionTitle = /[A-Z]/.test(char) ? char : '#';
                        const exis = accu.find(i => i.title === sectionTitle);
                        if (exis) {
                            exis.data.push(item);
                        } else {
                            accu.push({
                                title: sectionTitle,
                                data: [item]
                            })
                        }
                        return accu.sort((a, b) => a.title.localeCompare(b.title));
                    }, []);
                    setContacts(real)
                    setLoading(false);
                    console.log("grouped data", real)
                    console.log("inside useeffect", numbers)

                }
            }
        }
        callHandler();
    }, [])

    function RenderItem({ item }) {
        return (
            <>
                <View style={{
                    // height:100,
                    width: '92%',
                    flexDirection: "row",
                    backgroundColor: "#F4FFFECB",
                    marginTop: 10,
                    padding: 10,
                    gap: 4,
                    elevation: 1
                }}>
                    <View style={{
                        height: 60,
                        width: 60,
                        borderRadius: 40,
                        overflow: "hidden"
                    }}>
                        {item.icon.length>0 ? (
                        <Image source={{ uri: item.icon }} style={{
                            height: "100%",
                            width: "100%",
                            resizeMode: "cover"
                        }} />
                    ):(
                        <Image source={require('../../assets/images/boy.png')}style={{
                            height: "100%",
                            width: "100%",
                            resizeMode: "cover"
                        }} />
                        )}
                        
                    </View>
                    <View style={{
                        // backgroundColor:"#C5FCD1",
                        flex: 1
                    }}>
                        <View style={{
                            // backgroundColor:"#F6FEEA",
                            padding: 5
                        }}>
                            <Text style={{
                                fontFamily: "Lora-Regular",
                                fontSize: 17
                            }}>{item.name}</Text>

                        </View>
                        <View style={{
                            // backgroundColor:"#C5CBFC",
                            padding: 8
                        }}>
                            <Text style={{
                                fontFamily: "Lora-Regular",
                                fontSize: 17
                            }}>{item.number}</Text>
                        </View>
                    </View>
                </View>

            </>
        )
    }

    const findIndex = () => {
        const index = contacts.findIndex(i => i.title === char);
        if(Listref.current){
            Listref.current.scrollToLocation({
                sectionIndex:index,
                itemIndex:0,
                animated:true,
                viewOffset:0,
                viewPosition:0
            })
        }
        console.log(`the index of the element received is =====${index}`)
    }

    return (
        <>{
            loading ? ( <ActivityIndicator size={'large'} style={{
                justifyContent:"center",
                alignItems:"center"
            }}/>
        ):(
                <>
                <View style={{
                    position: "absolute",
                    top: 2,
                    right: 10,
                    zIndex: 10,
                    padding: 2
                }}>
    
                    {
                        Alphabets.map((item, index) => (
                            <TouchableOpacity key={index}
                            onPress={() => {
                                setChar(item)
                                findIndex()
                            }}
                            >
                                <Text style={{
                                    fontFamily: "Lora-Regular",
                                    fontSize: 17
                                }}
                                    
                                >{item}</Text>
                            </TouchableOpacity>
                        ))
                    }
                </View>
                {
                   
                    <SectionList
                        ref={Listref}
                        sections={contacts}
                        showsVerticalScrollIndicator={false}
                        renderItem={
                            ({ item }) => (
                                <RenderItem item={item} />
                            )}
                        renderSectionHeader={({ section }) => (
                            <View style={{
                                // backgroundColor: "#D5F9F0",
                                padding: 3,
                                width: "92%"
                            }}>
                                <Text style={{
                                    fontFamily: "PlayfairDisplay-Black",
                                    fontSize: 20,
                                }}>{section.title}</Text>
                            </View>
                        )}
    
                    />
                }
                </>
            )
        }
       
        </>
    )
}

