import React from 'react';
import {View, Text, TouchableOpacity,StyleSheet, TextInput} from 'react-native';

export default function InputField({
  label,
  icon,r,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,value,onChangeText,style
}) {
  
  // let bool=false;
 
  // console.log("bool:"+bool);
  return (
<>
    <View
      style={{
        flexDirection: 'row',
        // borderBottomColor: '#ccc',
        // borderBottomWidth: 1,
        // paddingBottom: 2,
        marginBottom: 25
      }}>
  
     <TouchableOpacity onPress={fieldButtonFunction}>
          
        <Text style={{color: '#AD40AF', fontWeight: '700'}}>{fieldButtonLabel}</Text>
      </TouchableOpacity>
    
      {inputType == 'password' ? (
       <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={styles.StyleInput}
          secureTextEntry={r}
        value={value}
        onChangeText={onChangeText}
        
        
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={styles.StyleInput}
         
          value={value}
          onChangeText={onChangeText}
          required
        />
      )}
     
     
       {icon}
    
      
   
   
    </View>
    
     </>
  );
}
const styles = StyleSheet.create({
StyleInput: {
  flex: 1, 
  width: '60%',
padding: 15,textAlign:"center",
marginBottom: 1,
backgroundColor: '#fff',
borderRadius: 50,
borderColor: '#FE3539',
borderWidth: 1   
  },});
