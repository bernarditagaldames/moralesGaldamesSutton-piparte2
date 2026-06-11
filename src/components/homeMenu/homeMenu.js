import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../../screens/Home/Home";
import MiPerfil from "../../screens/MiPerfil/MiPerfil";
import CrearPosteo from "../../screens/CrearPosteo/CrearPosteo";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import ComentarioStack from "../ComentarioStack/ComentarioStack";


const Tab = createBottomTabNavigator();

export default function HomeMenu(){
    return(
        <Tab.Navigator screenOptions={{tabBarShowLabel: false, headerShown: false}}>
            <Tab.Screen name="Home" component={Home} options={
                {tabBarIcon: () => <FontAwesome name="home" size={24} color="black"/>}
            }/>
            <Tab.Screen name="Mi perfil" component={MiPerfil} options={
                {tabBarIcon: () => <Ionicons name="person-circle" size={24} color="black" />}
            }/>
            <Tab.Screen name="Crear posteo" component={CrearPosteo} options={
                {tabBarIcon: () => <Ionicons name="create" size={24} color="black" />}
            }/>
            <Tab.Screen name="Comentar posteo" component={ComentarioStack} options={
                {tabBarIcon: () => <FontAwesome5 name="comment-alt" size={24} color="black" />}
            }/>
        </Tab.Navigator>
    )
}