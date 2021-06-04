import { db } from '../firebase_conf';
import firebase from 'firebase'
import { vuexfireMutations, firestoreAction } from 'vuexfire'

const profileStore = {
    state: {
        profile: null,
        subprofiles: []
    },
    mutations: {
        addMainProfile(state, newProfile) {
            state.profile = newProfile;
        },
        addSubprofile(state, newSubprofile) {
            state.subprofile.push(newSubprofile);
        },
        ...vuexfireMutations
    },
    actions: {
        addMainProfile: async function ({ commit }, data) {
            let newProfile = { profile: data.profile, created_at: firebase.firestore.FieldValue.serverTimestamp() };
            // add the main profile to the cloud
            let result = await db.collection("users").doc(data.user.uid)
                .collection("mainprofile")
                .add(newProfile)
                .then((data) => {
                    //get changes -> update the local store
                    console.log(data);
                    commit("addMainProfile", newProfile.profile);
                    return { success: true };
                }, (error) => {
                    console.log("Error: ", error);
                    return { success: false, error: error };
                });
            return result;
        },
        addSubprofile: function ({ commit }, data) {
            db.collection("users").doc(data.user.uid)
                .collection("subprofiles")
                .add({ subprofie: data.subprofile, created_at: firebase.firestore.FieldValue.serverTimestamp() })
                .then((ref) => {
                    console.log(ref);
                    commit("addSubprofile", data.subprofie);
                }, error => {
                    console.log("Error: ", error);
                })
        },
        // removeSubprofile:function({commit},user,profile){

        // },
        // updateSubprofile:function({commit},user,profile){

        // },
        bindUserProfile: function (user) {
            firestoreAction(({ bindFirestoreRef }) => {
                return bindFirestoreRef('profile', db.collection("users").doc(user.uid).collection('mainprofile'));
            })
        },
        bindSubprofile: function (user) {
            firestoreAction(({ bindFirestoreRef }) => {
                return bindFirestoreRef('subprofiles', db.collection("users").doc(user.uid).collection('subprofiles'))
            });
        },
        unbindUserProfileAndSubprofiles: function () {
            firestoreAction(({ unbindFirestoreRef }) => {
                unbindFirestoreRef('profile');
                unbindFirestoreRef('subprofiles');
            })
        }
    },
    getters: {
        profile: (state) => {
            return state.profile;
        },
        subprofiles: (state) => {
            return state.subprofiles;
        },
        subprofileByID: (state) => (id) => {
            return state.subprofiles.find(subprofile => subprofile.id == id)
        }
    }
}

export default profileStore;