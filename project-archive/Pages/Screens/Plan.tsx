import Ionicons from 'react-native-vector-icons/Ionicons';
import { Text, View } from 'react-native';
import { Header } from '../Components/Header';
import { useContext } from 'react';
import { lanContext } from '../Contexts/LangContext';
export function Plan() {
    const { language } = useContext(lanContext)
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
                            {language === 'en' ? ' Hi Welcome to Plan Page !!':'¡Bienvenido a Planificación!'}
                           
                        </Text>
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
                            {language === 'en' ? 'This is the Plan page where you can organize your schedules and goals.':'Esta es la página de planificación donde puedes organizar tus horarios y objetivos.'}
                        </Text>
                    </View>

            </View>
        </>
    )
}