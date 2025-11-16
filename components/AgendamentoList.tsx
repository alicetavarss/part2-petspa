import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export type Agendamento = {
  id: string;
  servico: string;
  preco: number;
  descricao: string;
  data: string;
  hora: string;
};

type AgendamentoListProps = {
  agendamentos: Agendamento[];
};

export default function AgendamentoList({ agendamentos }: AgendamentoListProps) {
  return (
    <View>
      {agendamentos.map((item) => (
        <View key={item.id} style={styles.box}>
          <Text style={styles.servico}>{item.servico}</Text>
          <Text style={styles.descricao}>{item.descricao}</Text>
          <Text style={styles.preco}>💰 R$ {item.preco}</Text>
          <Text style={styles.data}>📅 {item.data}</Text>
          <Text style={styles.hora}>🕒 {item.hora}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    backgroundColor: '#E8F0FE',
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    width: 320,
  },
  servico: { fontWeight: 'bold', fontSize: 18 },
  descricao: { fontSize: 14 },
  preco: { color: 'green', fontSize: 16 },
  data: { color: '#555' },
  hora: { color: '#555' },
});
