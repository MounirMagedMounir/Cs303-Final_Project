import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function Botton({label, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: '100%',
    backgroundColor: '#539165',
    padding: 10,
    borderRadius: 50,
    marginTop: 0,
    marginLeft: 0,
      }}>
      <Text style={{   color:"white",textAlign:"center"}}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}