import { View, Text, TouchableOpacity, Modal, TouchableWithoutFeedback } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from "react";
import { useContext } from 'react';
import { lanContext } from '../Contexts/LangContext';
import { useAppDispatch,useAppSelector } from "../Hooks/reduxHooks";
import { en,sp} from "../redux/LangSlice";
export function Header() {
    const [modalVisible, setModalvisible] = useState(false);
    //  const {language,setLanguage}=useContext(lanContext);
     const language=useAppSelector(state=>state.lang.lang);
     const dispatch=useAppDispatch();
    const handleClick = () => {
        dispatch(language==='en'?sp():en())
    }
    return (
        <>
            <View style={{
                overflow: "hidden",
                paddingBottom: 5,
                backgroundColor: "transparent",
                
            }}>
               
                    <View
                        style={{
                            height: 40,
                            backgroundColor: "white",
                            width: "100%",
                            elevation: 3,
                            justifyContent: "center",
                            alignItems: "flex-end",
                            padding: 10
                        }}
                    >
                     <TouchableOpacity
                    onPress={() => handleClick()}
                >
                    <Text>
                        <FontAwesome name="language" color="#15547E" size={26} />
                    </Text>
                    <Text style={{
                        fontSize:10,
                        color:"grey"
                    }}>
                        {language==='en'?'Eng':'Spn'}
                    </Text>
                </TouchableOpacity>
                </View>
                {
                    <Modal
                        visible={modalVisible}
                        animationType="none"
                        onRequestClose={() => setModalvisible((prev) => !prev)}
                        transparent
                    >
                        <TouchableWithoutFeedback onPress={() => setModalvisible(false)}>

                            <View style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center"
                            }}>
                                <TouchableWithoutFeedback>
                                    <View style={{
                                        
                                        backgroundColor: "#FFFFFF",
                                        position: "absolute",
                                        top: 40,
                                        right: 10,
                                        borderRadius: 6,
                                        elevation:2,
                                        padding:20,
                                        gap:10
                                    }}>
                                        <TouchableOpacity
                                        style={{
                                            padding:5,
                                            borderBlockColor:"grey"
                                        }}
                                        onPress={()=>{
                                            setModalvisible(false)
                                            setLanguage('en')
                                        }}
                                        ><Text style={{
                                            fontFamily:"Avenir Medium",
                                            fontSize:15
                                        }}>English</Text></TouchableOpacity>
                                        <TouchableOpacity style={{
                                            padding:5,
                                            borderBlockColor:"grey"
                                        }}
                                        onPress={()=>{
                                            setModalvisible(false)
                                            setLanguage('es')
                                        }}
                                        ><Text style={{
                                            fontFamily:"Avenir Medium",
                                            fontSize:15
                                        }}>Spanish</Text></TouchableOpacity>
                                    </View>
                                </TouchableWithoutFeedback>


                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                }
            </View>
        </>
    )
}