import { Account, Avatars, Client } from "react-native-appwrite";
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { OAuthProvider } from "react-native-appwrite";

export const config = {
    platform: 'com.jsm.restate',
    endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
}

export const client = new Client();

client
  .setEndpoint(config.endpoint!)
  .setProject(config.projectId!)
  .setPlatform(config.platform!)

export const avatars = new Avatars(client);
export const account = new Account(client);

export async function login(){
   try{
    const redirectUrl = await Linking.createURL('/');

    const response = await account.createOAuth2Token(
        OAuthProvider.Google, 
        redirectUrl);

    if(!response) throw new Error('Failed to login');

    const browserResult = await WebBrowser.openAuthSessionAsync(
        response.toString(),
        redirectUrl
    );

    if(browserResult.type !== 'success') throw new Error('Failed to login');
    
    const url = new URL(browserResult.url);

    const secret = url.searchParams.get('secret')?.toString();
    const userId = url.searchParams.get('userId')?.toString();

    if(!secret || !userId) throw new Error('Failed to login');

    const session = await account.createSession(userId, secret);

    if(!session) throw new Error('Failed to create session');
    
    return true;

   } catch(error){
    console.log(error);
    return false;
   }
}

export async function logOut(){
    try{
        await account.deleteSession('current');
        return true;


    } catch(error){
        console.log(error);
        return false;
    }
}

export async function getCurrentUser(){
    try{
        const response = await account.get();

        if(response.$id) {
            const userAvatar = avatars.getInitials(response.name);
            
            return {
                ...response,
                avatar: userAvatar.toString(),
            }
        }
        
    } catch(error){
        console.log(error);
        return null;
    }
}

