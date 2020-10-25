import React, { useRef, useEffect, useState } from "react";
import { Text, TextInput, StyleSheet } from "react-native";
import { useField } from "@unform/core";

function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);
  useEffect(() => {
    inputRef.current.value = defaultValue;
  }, [defaultValue]);
  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: "value",
      clearValue(ref) {
        ref.value = "";
        ref.clear();
      },
      setValue(ref, value) {
        ref.setNativeProps({ text: value });
        inputRef.current.value = value;
      },
      getValue(ref) {
        return ref.value;
      },
    });
  }, [fieldName, registerField]);

  return (
    <TextInput
      style={styles.input}
      ref={inputRef}
      keyboardAppearance="dark"
      defaultValue={defaultValue}
      placeholderTextColor="#666360"
      onChangeText={(value) => {
        if (inputRef.current) {
          inputRef.current.value = value;
        }
      }}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    height: 560,
    width: 327,
    marginBottom: 15,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 4,
    borderWidth: 2,
    fontSize: 15,
  },
});

export default Input;
