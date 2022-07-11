import React, { FC, useEffect, useState } from "react"
import { observer } from "mobx-react-lite"
import { FlatList, View, ViewStyle } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { Screen, Text, Header, Fab, AddExpensesModal } from "../../components"
import { Expenses, Source, useStores } from "../../models"
import { TopTabParamList } from "../home/home-screen"
import { isEmpty } from "validate.js"
import { spacing } from "../../theme"

export const DoanhThuScreen: FC<StackScreenProps<TopTabParamList, "doanhThu">> = observer(function DoanhThuScreen() {
  const { expensesStore } = useStores()

  const [addSourceModalVisible, setAddSourceModalVisible] = useState<boolean>()
  const [addIncomeModalVisible, setAddIncomeModalVisible] = useState<boolean>()
  const [addTitleModalVisible, setAddTitleModalVisible] = useState<boolean>()

  const sourceData: Source[] = expensesStore?.sourceData
  const listIncomeExpensesData: Expenses[] = expensesStore?.listIncomeData

  useEffect(() => {
    if (isEmpty(sourceData)) {

    }
  }, [])

  const renderItem = ({ item, index }: { item: Expenses, index: number }) => {

    return (
      <>
      </>
    )
  }


  return (
    <Screen unsafe style={ROOT} preset="fixed">
      <FlatList
        data={listIncomeExpensesData}
        renderItem={renderItem}
        keyExtractor={(item) => item?.id}
        style={FLATLIST_CONTAINER}
      />
      <View style={ADD_BTN} >
        <Fab
          onPress={() => { setAddIncomeModalVisible(true) }}
        />
      </View>
      <AddExpensesModal
        visible={addIncomeModalVisible}
        setVisible={setAddIncomeModalVisible}
      />
    </Screen>
  )
})

const ROOT: ViewStyle = {
  flex: 1,
}

const ADD_BTN: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  marginBottom: spacing[5]
}

const FLATLIST_CONTAINER: ViewStyle = {
  flex: 1
}