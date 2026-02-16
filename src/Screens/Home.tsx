import Ionicons from 'react-native-vector-icons/Ionicons';
import { Pressable, Text, View } from 'react-native';
import { Header } from '../Components/Header';
import { useContext } from 'react';
import { lanContext } from '../Contexts/LangContext';
import { useAppSelector, useAppDispatch } from '../Hooks/reduxHooks';
import {login, logout} from '../redux/AuthSlice';
export function Home() {
    // const { language } = useContext(lanContext);
    const dispatch=useAppDispatch();
    const count=useAppSelector(state=>state.Countreducer.counter);  
    const logi=useAppSelector(state=>state.auth.login);
    const language=useAppSelector(state=>state.lang.lang);
    return (    
        <>
            <View style={{
                flex: 1,
                backgroundColor: "#E3FEFF",
                paddingHorizontal: 10,
                justifyContent: "center"
            }}>
                <View style={{
                    // height: "90%",
                    width: "100%",
                    backgroundColor: "#ACF1C75C",
                    padding:10
                }}>
                    <View>
                        <Text style={{
                            fontSize: 26,
                            fontWeight: "700"
                        }}>
                            {language === `en` ? `this is he count of the State ${count} and the use is logged in ? ${logi}`:'¡Bienvenido a Inicio!'}
                           
                        </Text>
                        <Pressable onPress={()=>{
                            dispatch({type:'Increment'})
                            dispatch(logi?logout():login());
                            }}><Text>Click</Text></Pressable>
                    </View>
                </View>
                <View style={{
                    // height: "90%",
                    width: "100%",
                    backgroundColor: "#FCDEF45C",
                    padding:10
                }}>
                        <Text style={{
                            fontSize: 20,
                            fontWeight: "300"
                        }}>
                            {language === 'en' ? 'This is the Home page where you can view and explore content..':'Esta es la página de inicio donde puedes ver y explorar contenido.'}
                        </Text>
                    </View>
            </View>
        </>
    )
}