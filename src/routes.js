import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';

const stack =  createStackNavigator();

/**Import das telas */
import Main from "./pages/Main";
import User from "./pages/User";

export default function Routes(){
        return(
            <NavigationContainer>
                    <stack.Navigator
                        screenOptions={
                            {
                                headerStyle:{
                                    backgroundColor: '#7159c1',
                                },
                                headerTintColor: '#fff',
                                headerTitleAlign:'center',
                                headerBackTitleVisible: false
                            }
                        }
                    >
                        <stack.Screen
                            name="Main"
                            component={Main}
                            options={
                                {title:'Usuários'}
                            }
                        />
                        <stack.Screen name="User"
                            component={User}
                            options={
                                ({route})=>({
                                    title: route.params.user.name
                                })
                            }
                        />
                    </stack.Navigator>
            </NavigationContainer>
        );

}
