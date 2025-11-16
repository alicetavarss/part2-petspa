import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native';

export type AgendamentoModalProps = {
  visible: boolean;
  onAdd: (servico: string, preco: number, descricao: string, data: string, hora: string) => void;
  onCancel: () => void;
};

export default function AgendamentoModal({ visible, onAdd, onCancel }: AgendamentoModalProps) {
  const [servico, setServico] = useState('');
  const [preco, setPreco] = useState('');
  const [descricao, setDescricao] = useState('');
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Novo Agendamento</Text>

          <TextInput style={styles.input} placeholder="Serviço" value={servico} onChangeText={setServico} />
          <TextInput style={styles.input} placeholder="Preço" value={preco} onChangeText={setPreco} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Descrição" value={descricao} onChangeText={setDescricao} />
          <TextInput style={styles.input} placeholder="Data" value={data} onChangeText={setData} />
          <TextInput style={styles.input} placeholder="Hora" value={hora} onChangeText={setHora} />

          <View style={styles.buttons}>
            <TouchableOpacity
              style={[styles.button, styles.add]}
              onPress={() => {
                onAdd(servico, parseFloat(preco), descricao, data, hora);
                setServico('');
                setPreco('');
                setDescricao('');
                setData('');
                setHora('');
              }}
            >
              <Text style={styles.textButton}>Adicionar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.cancel]} onPress={onCancel}>
              <Text style={styles.textButton}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 8,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  add: { backgroundColor: '#007bff' },
  cancel: { backgroundColor: '#888' },
  textButton: { color: '#fff', fontWeight: 'bold' },
});
