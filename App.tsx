
import RootNavigator from "./src/Navigator/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
export default function App(){

  return(
    <>
    <Provider store={store}>
    <NavigationContainer>
      <RootNavigator/>
    </NavigationContainer>
    </Provider>
    </>
  )
}