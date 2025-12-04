import React, { useState } from 'react';
import {
    Modal, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert
} from 'react-native';

interface UserModalProps {
    isVisible: boolean;
    onClose: () => void;
    // Função que recebe o nome e email do novo usuário
    onSave: (user: { name: string, email: string }) => void; 
}

export const UserModal: React.FC<UserModalProps> = ({ isVisible, onClose, onSave }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');

    const handleSubmit = () => {
        if (name.trim() === '' || email.trim() === '') {
            Alert.alert('Erro', 'Preencha Nome e Email.');
            return;
        }

        // 1. Envia os dados para a tela principal (UserScreen)
        onSave({ name: name.trim(), email: email.trim() });

        // 2. Limpa o formulário
        setName('');
        setEmail('');
    };

    const handleClose = () => {
        // Limpa e fecha
        setName('');
        setEmail('');
        onClose();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={handleClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Novo Usuário</Text>

                    <TextInput style={styles.input} placeholder="Nome" value={name} onChangeText={setName} />
                    <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.buttonCreate]} onPress={handleSubmit}>
                            <Text style={styles.textStyle}>Salvar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={handleClose}>
                            <Text style={styles.textStyle}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
    modalView: { margin: 20, backgroundColor: 'white', borderRadius: 15, padding: 30, alignItems: 'center', elevation: 10, width: '90%' },
    modalTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#333' },
    input: { height: 45, borderColor: '#ccc', borderWidth: 1, borderRadius: 8, marginBottom: 15, paddingHorizontal: 15, width: '100%', backgroundColor: '#f9f9f9' },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 15 },
    button: { borderRadius: 8, padding: 12, elevation: 2, flex: 1, marginHorizontal: 5 },
    buttonCreate: { backgroundColor: '#4CAF50' },
    buttonClose: { backgroundColor: '#F44336' },
    textStyle: { color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 16 },
});