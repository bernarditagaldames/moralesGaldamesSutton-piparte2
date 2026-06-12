import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ComentarPosteo from "../../screens/ComentarPosteo/ComentarPosteo";
import Home from "../../screens/Home/Home";

const Stack = createNativeStackNavigator();

export default function ComentarioStack(){
    return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Comentar posteo" component={ComentarPosteo}/>
    </Stack.Navigator>
)}