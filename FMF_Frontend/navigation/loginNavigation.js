/* import React from 'react';
import { View } from 'react-native-animatable';
import { StackActions, NavigationContainer } from '@react-navigation/native';


class LoginNav extends React.Component{

    render(){
        if (this.state.isLoading){
            return null;
        }

        return (
            <View styles = {styles.container}>
            <NavigationContainer>
            <Stack.Navigator>
                {this.state.userToken == null ? (
                    <Stack.screen
                        name = "Sign in"
                        Component = {loginScreen}
                        options={{
                            title: 'Sign in',

                            animation when logging out. 
                            can be removed for standard push animation
                            animationTypeForReplace: this.state.isSignout ? 'pop' : 'push',
                        }}
                        />
                ): (
                    <Stack.Screen name = "Home" Component={HomeScreen} />
                )}
            </Stack.Navigator>
            </NavigationContainer>
            </View>
        );
    }
}

export default LoginNav;

const styles = Stylesheet.create({
    container: {
        martintop: 10,
        justifyContent: 'center',
        alignSelf: 'center',

    }
}) */