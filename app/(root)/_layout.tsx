import { useGlobalContext } from "@/lib/global-provider";
import { Redirect, Slot } from "expo-router";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AppLayout({children}: {children: React.ReactNode}){

    const {isLoggedIn, loading} = useGlobalContext();

    //这里的代码显示app加载时的三种情况，每种情况都用一个组件来显示。

    //1. 如果正在加载，则显示一个加载中的状态。

    if(loading){
        return (
            <SafeAreaView className="bg-white h-full flex items-center justify-center">
                <ActivityIndicator className="text-primary-300" size="large"/>
            </SafeAreaView>
        )
    }

    //2. 如果未登录，则显示登录页面。

    if(!isLoggedIn){
        return <Redirect href="/sign-in"/>
    }
        
    //3. 如果已登录，则显示主页。
    return <Slot/>
        
}