import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function ComentarioStack(){
    return(
    <Stack.Navigator>
        <Stack.Screen name="Comentar posteo" component={ComentarPosteo} options={{headerShown: false}}/>
    </Stack.Navigator>
)}