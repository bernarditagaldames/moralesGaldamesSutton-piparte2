import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MiPerfil from "../../screens/MiPerfil/MiPerfil";
import CrearPosteo from "../../screens/CrearPosteo/CrearPosteo";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import ComentarioStack from "../ComentarioStack/ComentarioStack";

const Tab = createBottomTabNavigator();

export default function HomeMenu(){
    return(
        <Tab.Navigator screenOptions={{ headerShown: false}}>
            <Tab.Screen name="Home" component={ComentarioStack} options={
                {tabBarIcon: () => <FontAwesome name="home" size={24} color="black"/>}
            }/>
            <Tab.Screen name="Mi perfil" component={MiPerfil} options={
                {tabBarIcon: () => <Ionicons name="person-circle" size={24} color="black" />}
            }/>
            <Tab.Screen name="Crear posteo" component={CrearPosteo} options={
                {tabBarIcon: () => <Ionicons name="create" size={24} color="black" />}
            }/>
        </Tab.Navigator>
    )
}