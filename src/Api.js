/* Tudo relacionado com FIREBASE estará nesse arquivo, se for trocar o backend depois é só mudar esse arquivo */

import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';

import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default {
    fbPopup:async () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        let result = await firebase.auth().signInWithPopup(provider);
        return result;
    },
    
    /* Função que adiciona no Banco de Dados um usário */
    addUser:async (u) => {
        await db.collection('users').doc(u.id).set({
            name: u.name,
            avatar: u.avatar,
        }, {merge:true});
    },

    /* Na lista de usuários vão pegar todos da lista users, menos o meu Id, e vai retornar a lista */
    getContactList:async (userId) => {
        let list = [];

        let results = await db.collection('users').get();
        results.forEach(result => {
            let data = result.data();

            if(result.id !== userId) {
                list.push({
                    id: result.id,
                    name: data.name,
                    avatar: data.avatar
                });
            }
        });

        return list;
    },
    addNewChat:async (user, user2) => {
        let newChat = await db.collection('chats').add({
            message:[],
            users:[user.id, user2.id]
        });

        db.collection('users').doc(user.id).update({
            chats: firebase.firestore.FieldValue.arrayUnion({
                chatId: newChat.id,
                title: user2.name,
                image: user2.avatar,
                with: user2.id
            }) 
        });

        db.collection('users').doc(user2.id).update({
            chats: firebase.firestore.FieldValue.arrayUnion({
                chatId: newChat.id,
                title: user.name,
                image: user.avatar,
                with: user.id
            }) 
        });
    }
};