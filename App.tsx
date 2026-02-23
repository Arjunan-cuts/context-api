
import RootNavigator from "./src/Navigator/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import { Modal } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
export default function App(){

  return(
    <>
    <GestureHandlerRootView>
    <Provider store={store}>
    <NavigationContainer>
      <RootNavigator/>
    </NavigationContainer>
    </Provider>
    </GestureHandlerRootView>
    </>
  )
}