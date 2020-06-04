import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket:process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

class Firebase {
    constructor() {
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
    }
    //AUTH API

    doCreateUserWithEmailAndPassword = (email,password) =>
        this.auth.createUserWithEmailAndPassword(email,password)

    doSignInWithEmailAndPassword = (email,password) =>
        this.auth.signInWithEmailAndPassword(email,password)

    doSignOut = () => this.auth.signOut();

    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged(authUser => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then(snapshot => {
                        const dbUser = snapshot.val();

                        // default empty roles
                        if (!dbUser.roles) {
                            dbUser.roles = {};
                        }

                        // merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            ...dbUser,
                        };

                        next(authUser);
                    });
            } else {
                fallback();
            }
        });


    user = uid => this.db.ref(`users/${uid}`);
    users=() => this.db.ref('users');

    orders = () => this.db.ref('orders')
    order = uid => this.db.ref(`orders/${uid}`)

    siteInfo = () => this.db.ref('siteInfo');
    foundations = () => this.db.ref('siteInfo/foundations');
    foundationsItem = name => this.db.ref(`siteInfo/foundations/${name}`);

    organizations = () => this.db.ref('siteInfo/organizations');
    organizationsItem = name => this.db.ref(`siteInfo/organizations/${name}`);

    local = () => this.db.ref('siteInfo/local');
    localItem = name => this.db.ref(`siteInfo/local/${name}`);
}

export default Firebase;