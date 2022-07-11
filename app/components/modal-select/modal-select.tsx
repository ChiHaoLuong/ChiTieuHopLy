/* eslint-disable react-native/sort-styles */
import React from "react"
import { observer } from "mobx-react-lite"
import {
  Dimensions,
  StyleSheet,
  View,
  Image,
  ViewStyle,
  TextStyle,
  StyleProp,
  TouchableOpacity,
} from "react-native"
import { Icon, Text } from "../"
import Modal from "react-native-modal"

import { color, spacing } from "../../theme"
import { textSize } from "../../theme/textSize"

const { height, width } = Dimensions.get("window")

interface ModalSelectInterface {
  listData: string[]
  itemSelected: string
  setShowModal: (value: boolean) => void
  visible: boolean
  callback: (value: string) => void
}

export const ModalSelect = observer(function ModalSelect(props: ModalSelectInterface) {
  const { visible, listData, itemSelected, setShowModal, callback } = props

  const handlePressItem = (item: string) => {
    setShowModal(false)
    callback(item)
  }

  const viewItem = (
    item: string,
    index: number,
    styleItemView: StyleProp<ViewStyle>,
    textStyle: StyleProp<TextStyle>,
    showIcon: boolean,
  ) => {
    return (
      <TouchableOpacity style={styleItemView} key={index} onPress={() => handlePressItem(item)}>
        <Text style={textStyle}>{item}</Text>
        {showIcon && <Icon icon="checked" style={styles.iconChecked} />}
      </TouchableOpacity>
    )
  }

  const renderItem = () => {
    return listData.map((item, index) =>
      item === itemSelected
        ? viewItem(
          item,
          index,
          [styles.viewItem, styles.viewSelected],
          [styles.itemText, styles.itemTextSelected],
          true,
        )
        : viewItem(item, index, styles.viewItem, styles.itemText, false),
    )
  }

  return (
    <Modal
      onBackdropPress={() => setShowModal(false)}
      coverScreen
      isVisible={visible}
      deviceHeight={height + width}
      statusBarTranslucent
      style={styles.modal}
    >
      <View style={styles.container}>{renderItem()}</View>
    </Modal>
  )
})

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  container: {
    backgroundColor: color.palette.white,
    borderTopRightRadius: spacing[3],
    borderTopLeftRadius: spacing[3],
    paddingVertical: spacing[5],
    paddingHorizontal: spacing[3],
  },
  viewItem: {
    backgroundColor: color.palette.white,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: spacing[1],
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[2],
  },
  viewSelected: {
    backgroundColor: color.palette.deepPurple,
  },
  itemText: {
    color: color.palette.black,
    fontSize: textSize.medium,
  },
  itemTextSelected: {
    color: color.palette.lightBlue,
  },
  iconChecked: {
    tintColor: color.palette.lightBlue,
    width: spacing[4],
    height: spacing[4],
  },
})
