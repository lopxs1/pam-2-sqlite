import react from 'react';
import { View, Button } from 'react-native';
import * as SQLite from 'expo-sqlite';

let db;

//componente
const Banco = () => {
    async function Banco() {
        db = await SQLite.openDatabaseAsync('PAM2');
        if (db) {
            console.log("Banco criado");
            return db;
        }
        else {
            console.log("Erro ao criar Banco");
        }
    }

    //criar tabela
    async function CriarTabela() {
        try {
            await db.execAsync(`
                PRAGMA journal_mode = WAL;
                CREATE TABLE IF NOT EXISTS USUARIOS (id INTEGER PRIMARY KEY NOT NULL, NAME TEXT NOT NULL);`
            )
            console.log("tabela criada")
        } catch (erro) {
            console.log("Erro")
        }


    }

    async function InserirDados() {
        db = await Banco();
        try {
            db.execAsync(
                ` INSERT INTO USUARIOS (NOME) VALUES ('Ricardo'), ('Zé Matraca'), ('Maria'); `
            );
            console.log("Inserido");
        }
        catch (erro) {
            console.log("Erro ao inserir" + erro)
        }
    }
    async function ExibirDados() {
        db = await Banco();
        const allRows = await db.getAllAsync('SELECT * FROM USUARIOS');
        for (const row of allRows) {
            console.log(row.id, row.NAME);
        }
    }

    return (
        <View>
            <Button
                title="Criar BD"
                onPress={Banco}
            />
            <Button
                title="Criar Tabela"
                onPress={CriarTabela}
            />
            <Button
                title="Inserir Dados"
                onPress={InserirDados}
            />
            <Button
                title="Exibir Dados"
                onPress={ExibirDados}
            />
        </View>
    )
}

export default Banco;