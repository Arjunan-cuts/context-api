
import RootNavigator from "./Pages/Navigator/RootNavigator";
import { NavigationContainer } from "@react-navigation/native";


export default function App(){

  return(
    <>
    <NavigationContainer>
      <RootNavigator/>
    </NavigationContainer>
    </>
  )
}