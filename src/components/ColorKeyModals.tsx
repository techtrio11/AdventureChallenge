import { Modal, Text, View } from "react-native";
import { modalStyles } from "../styles";
import React, { ReactNode } from "react";
import { ButtonContainer, Container, SolidButton, TextButton } from ".";

type ModalContainerProps = {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
};
export const ModalContainer = ({
  modalVisible,
  setModalVisible,
  children,
}: ModalContainerProps) => {
  return (
    <ButtonContainer>
      <>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={modalStyles.centeredView}>
            <View style={modalStyles.modalView}>
              <Text style={modalStyles.modalText}>{children}</Text>
              <SolidButton
                onPress={() => setModalVisible(!modalVisible)}
                buttonText="&nbsp;&nbsp;&nbsp;Close&nbsp;&nbsp;&nbsp;&nbsp;"
              />
            </View>
          </View>
        </Modal>
        <TextButton
          onPress={() => setModalVisible(true)}
          buttonText="Show Color Key"
        />
      </>
    </ButtonContainer>
  );
};
