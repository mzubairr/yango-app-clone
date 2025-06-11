import AsyncStore from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
    // @ts-ignore
    getReactNativePersistence,
    initializeAuth,
} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCJ4pqq80epvyhb3BZKinYK6D0C6RYshrw",
    authDomain: "yango--app.firebaseapp.com",
    projectId: "yango--app",
    storageBucket: "yango--app.firebasestorage.app",
    messagingSenderId: "642998237411",
    appId: "1:642998237411:web:9e3dfcb9d7c3935afa2dd6",
    measurementId: "G-QFFMSDDXLB"
};

const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStore),

});
