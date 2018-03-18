import { User } from './model/user';

export function isAuthed() {
    return !!firebase.auth().currentUser;
}

export function getAuthedUser() {
    return new User(firebase.auth().currentUser);
}

export async function auth() {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/userinfo.profile');
    firebase.auth().languageCode = 'ja';
    const result = firebase.auth().signInWithPopup(provider);
    return new User(result.user);
}
