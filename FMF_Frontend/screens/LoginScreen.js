import React, { useEffect, useState } from 'react';
import { AsyncStorage, Button, StyleSheet, Text, View, Image } from 'react-native';
import * as AppAuth from 'expo-app-auth';
import { ScrollView } from 'react-native-gesture-handler';


export default function Login() {
  let [authState, setAuthState] = useState(null);

  useEffect(() => {
    (async () => {
      let cachedAuth = await getCachedAuthAsync();
      if (cachedAuth && !authState) {
        setAuthState(cachedAuth);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Image
            source={
              __DEV__
                ? require('../assets/images/icon.png')
                : require('../assets/images/icon.png')
            }
            style={styles.loginImg}
          />
          <Button
            title="Google Signin "
            onPress={async () => {
              const _authState = await signInAsync();
              setAuthState(_authState);
            }}
          />
          {/* <Button
            title="Sign Out "
            onPress={async () => {
              await signOutAsync(authState);
              setAuthState(null);
            }}
          /> */}
          {/* <Text>{JSON.stringify(authState, null, 2)}</Text> */}
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginImg:{
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginBottom: 50,
  },
});

let config = {
  issuer: 'https://accounts.google.com',
  scopes:[ 
  'openid', 
  'profile',
  'email',
  ''
],
  /* This is a ios clientid from console.developers.google.com*/
  clientId: '763542689360-jj5ibnjo9rtf0lhf6lpd9cs6j7iqq9k6.apps.googleusercontent.com',
};

let StorageKey = '@MyApp:CustomGoogleOAuthKey';

export async function signInAsync() {
  let authState = await AppAuth.authAsync(config);
  await cacheAuthAsync(authState);
  console.log('signInAsync', authState);
  return authState;
}

async function cacheAuthAsync(authState) {
  return await AsyncStorage.setItem(StorageKey, JSON.stringify(authState));
}

export async function getCachedAuthAsync() {
  let value = await AsyncStorage.getItem(StorageKey);
  let authState = JSON.parse(value);
  console.log('getCachedAuthAsync', authState);
  if (authState) {
    if (checkIfTokenExpired(authState)) {
      return refreshAuthAsync(authState);
    } else {
      return authState;
    }
  }
  return null;
}

function checkIfTokenExpired({ accessTokenExpirationDate }) {
  return new Date(accessTokenExpirationDate) < new Date();
}

async function refreshAuthAsync({ refreshToken }) {
  let authState = await AppAuth.refreshAsync(config, refreshToken);
  console.log('refreshAuth', authState);
  await cacheAuthAsync(authState);
  return authState;
}

export async function signOutAsync({ accessToken }) {
  try {
    await AppAuth.revokeAsync(config, {
      token: accessToken,
      isClientIdProvided: true,
    });
    await AsyncStorage.removeItem(StorageKey);
    return null;
  } catch (e) {
    alert(`Failed to revoke token: ${e.message}`);
  }
}