import * as React from "react"
import { StyleProp, TextStyle, StyleSheet, ViewStyle, Dimensions, View } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, textSize, typography } from "../../theme"
import { Screen, Text } from "../"
import Modal from "react-native-modal"

const { height } = Dimensions.get("screen")

export interface AddExpensesModalProps {
  visible: boolean,
  setVisible: (boolean: boolean) => void,
  type: "income" | "expenses"
}

/**
 * Describe your component here
 */
export const AddExpensesModal = observer(function AddExpensesModal(props: AddExpensesModalProps) {
  const { visible, setVisible, type } = props

  const closeVisible = () => {
    setVisible(false)
  }

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={closeVisible}
      coverScreen
      deviceHeight={height}
      statusBarTranslucent
      style={styles.modalStyle}
    >
      <View style={styles.contentStyle} >
        <View style={styles.titleContainer} >
          <Text
            textColor={color.lightBlue}
            textSize={textSize.titleHeader}
            text={`Thêm ${type === "income" ? "doanh thu" : "chi tiêu"}`} />
        </View>

      </View>
    </Modal>
  )
})

const styles = StyleSheet.create({
  modalStyle: {
    justifyContent: "flex-end",
    margin: 0,
  },
  contentStyle: {
    backgroundColor: color.background,
    borderTopLeftRadius: spacing[4],
    borderTopRightRadius: spacing[4],
    padding: spacing[3]
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});
