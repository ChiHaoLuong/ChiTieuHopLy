import * as React from "react"
import { Pressable, PressableProps, StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, spacing, typography } from "../../theme"
import { Text } from "../text/text"
import { imgSize } from "../../theme/imgSize"
import { Icon } from "../icon/icon"

export interface FabProps extends PressableProps {
  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
}

/**
 * Describe your component here
 */
export const Fab = observer(function Fab(props: FabProps) {
  const { style, ...PressProps } = props
  const styles = Object.assign({}, CONTAINER, style)

  return (
    <Pressable   {...PressProps} style={styles}>
      <Icon
        icon="plus"

      />
    </Pressable>
  )
})

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  width: imgSize.fabContainer,
  height: imgSize.fabContainer,
  backgroundColor: color.background,
  elevation: 8,
  padding: spacing[2],
  alignSelf: "center",
  borderRadius: spacing[6],
  alignItems: "center"
}


