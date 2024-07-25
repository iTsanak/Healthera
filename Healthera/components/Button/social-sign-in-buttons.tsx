import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5'; // Or your preferred icon library

const SocialButton = ({ iconName, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ 
      width: 48, // w-12 equivalent
      height: 48, // h-12 equivalent
      borderRadius: 24, // rounded-full equivalent
      backgroundColor: '#77D733', // Your specific hex color
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Icon name={iconName} size={30} color="white" />
    </View>
  </TouchableOpacity>
);

export default SocialButton;