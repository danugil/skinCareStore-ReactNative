import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import StyledText from './StyledText'

const OrderCartItem = ({cartItem}) => {
  return (
    <View>
        <StyledText>{cartItem.title}</StyledText>
    </View>
  )
}

export default OrderCartItem

const styles = StyleSheet.create({})