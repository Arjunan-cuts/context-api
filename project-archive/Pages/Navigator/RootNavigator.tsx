import { Home, Bills, Coach, Plan, Wealth } from '../Screens';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LangProvider from '../Contexts/LangContext';
import { Header } from '../Components/Header';
import { View } from 'react-native';

const Tab = createBottomTabNavigator();
export default function RootNavigator() {
    return (
        <>
            <LangProvider>

                <Header/>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let icon = "";
                            let name = route.name;
                            if (name === 'Home') {
                                icon = focused ? 'home' : 'home-outline'
                            }else if(name ==='Bills'){
                                icon = focused ? 'receipt-sharp':'receipt'
                            }else if(name ==='Plan'){
                                icon = focused ? 'calendar-sharp':'calendar'
                            }else if(name ==='Wealth'){
                                icon = focused ? 'cash-sharp':'cash-outline'
                            }else if(name ==='Coach'){
                                icon = focused ? 'bandage-sharp':'bandage-outline'
                            }
                            return <Ionicons name={icon} color={color} size={size} />
                        },
                        tabBarActiveTintColor: '#15547E',
                        tabBarInactiveTintColor: '#617E82',
                       

                    })}
                >
                    <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
                    <Tab.Screen name="Bills" component={Bills} options={{ headerShown: false }} />
                    <Tab.Screen name="Plan" component={Plan} options={{ headerShown: false }} />
                    <Tab.Screen name="Coach" component={Coach} options={{ headerShown: false }} />
                    <Tab.Screen name="Wealth" component={Wealth} options={{ headerShown: false }} />
                </Tab.Navigator>
            </LangProvider>
        </>
    )
}