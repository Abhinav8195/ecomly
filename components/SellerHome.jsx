import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FeatureProducts from './FeatureProducts'
import PopularProduct from './PopularProduct'

const SellerHome = () => {
  return (
    <View>
      <FeatureProducts/>
      <PopularProduct/>
    </View>
  )
}

export default SellerHome

const styles = StyleSheet.create({})