import { View, Text, TextInput } from "react-native";
import { formStyles } from "../styles";
import React, { ChangeEvent } from "react";
import { SelectList } from "react-native-dropdown-select-list";

type LabelTextAreaProps = {
  label: string;
  value: string;
  onChangeText: (e: string | ChangeEvent<any>) => void;
  onBlur: (e: any) => void;
  maxLength: number;
  numberOfLines: number;
};
export const LabelTextArea = ({
  label,
  value,
  onChangeText,
  onBlur,
  maxLength,
  numberOfLines,
}: LabelTextAreaProps) => {
  //CGU: return form container with label and text area
  return (
    <View style={formStyles.formContainer}>
      <Text style={formStyles.label}>{label}:</Text>
      <TextInput
        value={value}
        style={formStyles.input}
        onChangeText={onChangeText}
        onBlur={onBlur}
        multiline={true}
        maxLength={maxLength}
        numberOfLines={numberOfLines}
      />
    </View>
  );
};

type LabelSelectProps = {
  label: string;
  setSelected: (e: string | ChangeEvent<any>) => void;
  defaultOption?: {
    key: string;
    value: string;
  };
  data: any;
  error: string | undefined;
  isTouched: boolean | undefined;
  saveField: "value" | "key" | undefined;
};
export const LabelSelect = ({
  label,
  setSelected,
  defaultOption,
  data,
  error,
  isTouched,
  saveField = "value",
}: LabelSelectProps) => {
  //CGU: return form container with label and select
  return (
    <View style={formStyles.formContainer}>
      <Text style={formStyles.label}>{label}:</Text>
      {defaultOption ? (
        <SelectList
          defaultOption={defaultOption}
          boxStyles={formStyles.select}
          setSelected={setSelected}
          data={data}
          save={saveField}
        />
      ) : (
        <SelectList
          boxStyles={formStyles.select}
          setSelected={setSelected}
          data={data}
          save={saveField}
        />
      )}
      {error && isTouched && (
        <Text style={formStyles.errorMessage}>{error}</Text>
      )}
    </View>
  );
};

type LabelInputProps = {
  label: string;
  value?: string | undefined;
  maxLength: number;
  onChangeText: (e: string | ChangeEvent<any>) => void;
  onBlur: (e: any) => void;
  error: string | undefined;
  isTouched: boolean | undefined;
};
export const LabelInput = ({
  label,
  value,
  maxLength,
  onChangeText,
  onBlur,
  error,
  isTouched,
}: LabelInputProps) => {
  //CGU: return form container with label and input
  return (
    <View style={formStyles.formContainer}>
      <Text style={formStyles.label}>{label}:</Text>
      <TextInput
        value={value}
        maxLength={maxLength}
        onChangeText={onChangeText}
        onBlur={onBlur}
        style={formStyles.input}
      />
      {error && isTouched && (
        <Text style={formStyles.errorMessage}>{error}</Text>
      )}
    </View>
  );
};
