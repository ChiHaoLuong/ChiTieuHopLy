import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { createMaterialTopTabNavigator, MaterialTopTabNavigationOptions, } from "@react-navigation/material-top-tabs"
import { DoanhThuScreen } from "../doanh-thu/doanh-thu-screen"
import { KhoanChiScreen } from "../khoan-chi/khoan-chi-screen"
import { ThongKeScreen } from "../thong-ke/thong-ke-screen"
import { Header, Icon, Screen } from "../../components"
import { color } from "../../theme"
import { ImageStyle, TextStyle, ViewStyle } from "react-native"
import { textSize } from "../../theme/textSize"
import { imgSize } from "../../theme/imgSize"
import { SafeAreaView } from "react-native-safe-area-context"

const Tab = createMaterialTopTabNavigator<TopTabParamList>()

export type TopTabParamList = {
  doanhThu: undefined,
  khoanChi: undefined,
  thongKe: undefined
}

const screenOptions: MaterialTopTabNavigationOptions = {
  tabBarLabelStyle: {
    fontSize: textSize.small,
    color: color.text
  },
  tabBarStyle: {
    backgroundColor: color.lightBlue
  },
  swipeEnabled: true,
  tabBarIndicatorStyle: {
    backgroundColor: color.background
  }
}

const options = (title: string, icon: "expenses" | "chart" | "income") => {
  return {
    title,
    tabBarIcon() {
      return <Icon style={ICON} icon={icon} />
    },
  }
}

const HomeTopTabNavigator = () => (
  <Tab.Navigator
    screenOptions={screenOptions}
  >
    <Tab.Screen options={options("Doanh thu", "income")} name="doanhThu" component={DoanhThuScreen} />
    <Tab.Screen options={options("Khoản chi", "expenses")} name="khoanChi" component={KhoanChiScreen} />
    <Tab.Screen options={options("Thống kê", "chart")} name="thongKe" component={ThongKeScreen} />
  </Tab.Navigator>
)

export const HomeScreen: FC<StackScreenProps<NavigatorParamList, "home">> = observer(function HomeScreen() {
  return (
    <Screen preset="fixed" style={ROOT} >
      <Header
        titleContainerStyle={TITLE_CONTAINER}
        titleStyle={TITLE_STYLE}
        headerText="Quản lý thu chi" style={HEADER}
      />
      <HomeTopTabNavigator />
    </Screen>
  )
})

const ROOT: ViewStyle = {
  flex: 1
}

const HEADER: ViewStyle = {
  backgroundColor: color.lightBlue
}

const TITLE_STYLE: TextStyle = {
  fontSize: textSize.titleHeader
}

const TITLE_CONTAINER: ViewStyle = {
  justifyContent: "flex-start"
}

const ICON: ImageStyle = {
  width: imgSize.iconTabBar,
  height: imgSize.iconTabBar
}
