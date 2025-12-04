import React, { useState, useEffect, useCallback } from 'react';
import { 
    View, Text, FlatList, Button, StyleSheet, Alert, 
    ListRenderItem 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { UserModal } from './modals/UserModal'; 

export interface User {
    id: string;
    name: string;
    email: string;
}
const STORAGE_KEY = '@petspa:users'; 

export default function UserScreen() {
    const [users, setUsers] = useState<User[]>([]);
    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

    const saveUsers = async (usersToSave: User[]): Promise<void> => {
        try {
            const jsonValue = JSON.stringify(usersToSave);
            await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
        } catch (e) { console.error('Erro ao salvar:', e); }
    };

    const loadUsers = useCallback(async () => {
        try {
            const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
            const storedUsers: User[] = jsonValue != null ? JSON.parse(jsonValue) : [];
            setUsers(storedUsers);
        } catch (e) { console.error('Erro ao carregar:', e); }
    }, []);

    const handleAddUser = (newUser: { name: string, email: string }): void => {
        const userWithId: User = {
            id: Date.now().toString(),
            name: newUser.name,
            email: newUser.email,
        };

        const updatedUsers = [...users, userWithId];
        setUsers(updatedUsers);       
        saveUsers(updatedUsers);      
        setIsModalVisible(false);     
    };
    
    // Carrega a lista ao iniciar
    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    // Renderiza cada item da lista
    const renderUserItem: ListRenderItem<User> = ({ item }) => (
        <View style={styles.userItem}>
            <Text style={styles.userName}>**Nome:** {item.name}</Text>
            <Text>**Email:** {item.email}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Usuários</Text>

            <Button
                title="Novo Usuário"
                onPress={() => setIsModalVisible(true)} 
                color="#4CAF50" 
            />

            {users.length === 0 ? (
                <Text style={styles.emptyText}>Nenhum usuário cadastrado.</Text>
            ) : (
                <FlatList
                    data={users}
                    renderItem={renderUserItem}
                    keyExtractor={item => item.id}
                    style={styles.list}
                />
            )}

            <UserModal
                isVisible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSave={handleAddUser} // Manda a função que SALVA e FECHA
            />
        </View>
    );
}
const styles = StyleSheet.create({
    container: { flex: 1, paddingTop: 50, paddingHorizontal: 20, backgroundColor: '#f5f5f5' },
    header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#333' },
    list: { marginTop: 15 },
    userItem: { backgroundColor: '#fff', padding: 15, borderRadius: 8, marginBottom: 10, borderLeftWidth: 5, borderLeftColor: '#4CAF50', elevation: 2 },
    userName: { fontWeight: 'bold', marginBottom: 5, color: '#333' },
    emptyText: { textAlign: 'center', marginTop: 50, fontSize: 16, color: '#999' },
});