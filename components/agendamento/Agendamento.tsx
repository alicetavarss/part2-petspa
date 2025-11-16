import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MyScrollView from '../MyScrollView';
import AgendamentoList from '../AgendamentoList';
import AgendamentoModal from '../modals/AgendamentoModal';

export default function Agendamento() {
  const [agendamentos, setAgendamentos] = useState<any[]>([]);
  const [modalVisivel, setModalVisivel] = useState(false);

  function adicionarAgendamento(servico: string, preco: number, descricao: string, data: string, hora: string) {
    const novo = { id: Math.random().toString(), servico, preco, descricao, data, hora };
    setAgendamentos([...agendamentos, novo]);
    setModalVisivel(false);
  }

  return (
    <MyScrollView>
      <View style={styles.container}>
        <Text style={styles.titulo}>Lista de Agendamentos</Text>

        <AgendamentoList agendamentos={agendamentos} />

        <TouchableOpacity style={styles.botao} onPress={() => setModalVisivel(true)}>
          <Text style={styles.textoBotao}>+ Novo Agendamento</Text>
        </TouchableOpacity>

        <AgendamentoModal visible={modalVisivel} onAdd={adicionarAgendamento} onCancel={() => setModalVisivel(false)} />
      </View>
    </MyScrollView>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', padding: 20 },
  titulo: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  botao: {
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 5,
    marginTop: 20,
  },
  textoBotao: { color: '#fff', fontWeight: 'bold' },
});
