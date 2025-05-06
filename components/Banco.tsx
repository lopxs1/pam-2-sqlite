import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import * as SQLite from 'expo-sqlite';

let db;

const Banco = () => {
    const [isDbCreated, setIsDbCreated] = useState(false);
    const [isTableCreated, setIsTableCreated] = useState(false);

    async function CriarBanco() {
        db = await SQLite.openDatabaseAsync('PAM2');
        if (db) {
            console.log("Banco criado");
            setIsDbCreated(true);
            Alert.alert('Banco criado', 'O banco foi devidamente criado');
        } else {
            console.log("Erro ao criar Banco");
            Alert.alert('Erro', 'Erro ao criar o banco de dados');
        }
    }

    async function CriarTabela() {
        try {
            await db.execAsync(`
                PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS USUARIOS (id INTEGER PRIMARY KEY NOT NULL, NAME TEXT NOT NULL);`
            );
            console.log("Tabela criada");
            setIsTableCreated(true);
            Alert.alert('Tablea criada', 'A tabela foi devidamente criada');
            
        } catch (erro) {
            console.log("Erro ao criar tabela", erro);
            Alert.alert('Erro', 'Erro ao criar a tabela');
        }
    }

    async function InserirDados() {
        try {
            await db.execAsync(`
                INSERT INTO USUARIOS (NAME) VALUES 
                ('Ricardo'), 
                ('Zé Matraca'), 
                ('Maria');`
            );
            console.log("Dados inseridos");
            Alert.alert('Dados inseridos', 'Os dados foram devidamente inseridos');
            
        } catch (erro) {
            console.log("Erro ao inserir dados", erro);
            Alert.alert('Erro', 'Erro ao inserir os dados');
        }
    }

    async function ExibirDados() {
        try {
            const allRows = await db.getAllAsync('SELECT * FROM USUARIOS');
            console.log("Estrutura dos dados:", allRows);
            for (const row of allRows) {
                console.log('Usuário:', row.id, row.NAME);
            }
            Alert.alert('Dados exibidos', 'Veja os dados no console');
        } catch (erro) {
            console.log("Erro ao exibir dados:", erro);
            Alert.alert('Dados exibidos', 'Veja os dados no console');
        }
    }

    async function DeletarDados() {
        try {
            await db.runAsync(
                `DELETE FROM USUARIOS`
            );
            console.log("Deletado com sucesso!");
            Alert.alert('Dados deletados', 'Dados deletados com sucesso');
        } catch (erro) {
            console.log("Erro ao deletar dados", erro);
            Alert.alert('Erro', 'Erro ao deletar dados');
        }
    }

    async function AtualizarDados() {
        try {
            await db.runAsync(
                `UPDATE USUARIOS SET NAME = ? WHERE id = ?`,
                ['testando', 1]
            );
            console.log("Atualizado com sucesso!");
            Alert.alert('Dados atualizados', 'Veja os dados no console');
        } catch (erro) {
            console.log("Erro ao atualizar dados", erro);
            Alert.alert('Erro', 'Erro ao atualizar os dados');
        }
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={styles.button}
                onPress={CriarBanco}
            >
                <Text style={styles.buttonText}>Criar Banco</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, !isDbCreated && styles.disabled]}
                onPress={CriarTabela}
                disabled={!isDbCreated}
            >
                <Text style={styles.buttonText}>Criar Tabela</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, !isDbCreated || !isTableCreated ? styles.disabled : null]}
                onPress={InserirDados}
                disabled={!isDbCreated || !isTableCreated}
            >
                <Text style={styles.buttonText}>Inserir Dados</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, !isDbCreated || !isTableCreated ? styles.disabled : null]}
                onPress={AtualizarDados}
                disabled={!isDbCreated || !isTableCreated}
            >
                <Text style={styles.buttonText}>Atualizar Dados</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, !isDbCreated || !isTableCreated ? styles.disabled : null]}
                onPress={DeletarDados}
                disabled={!isDbCreated || !isTableCreated}
            >
                <Text style={styles.buttonText}>Deletar Dados</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, !isDbCreated || !isTableCreated ? styles.disabled : null]} 
                onPress={ExibirDados}
                disabled={!isDbCreated || !isTableCreated}
            >
                <Text style={styles.buttonText}>Exibir Dados</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    button: {
        backgroundColor: '#007BFF',
        width: 150,
        padding: 10,
        borderRadius: 5,
        marginBottom: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    disabled: {
        backgroundColor: '#D3D3D3',
    }
});

export default Banco;
