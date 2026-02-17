import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, TouchableOpacity, View } from 'react-native';
import { Header } from '../Components/Header';
import { useContext, useState } from 'react';
import { lanContext } from '../Contexts/LangContext';
import { useAppSelector } from '../Hooks/reduxHooks';
import GetContacts from '../Services/Contact';
export function Bills() {
    const language=useAppSelector(state=>state.lang.lang);
    return (
        <>

            <View style={{
                flex: 1,
                // backgroundColor: "#E3FEFF",
                paddingHorizontal: 10,
                justifyContent: "center"
            }}>
               <GetContacts/> 
                </View>
            {/* </View> */}
        </>
    )
}