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
            state.subprofiles.push(newSubprofile);
        },
        deleteSubprofile(state,id){
            let index =state.subprofiles.map(x=>{return x.id}).indexOf(id);
            state.subprofiles.splice(index,1)
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
                .then(() => {
                    //get changes -> update the local store
                    commit("addMainProfile", newProfile.profile);
                    return { success: true };
                }, (error) => {
                    console.log("Error: ", error);
                    return { success: false, error: error };
                });
            return result;
        },
        addSubprofile: async function ({ commit }, data) {
            var newSubprofile = { subprofile: data.subprofile, status: "editing", created_at: firebase.firestore.FieldValue.serverTimestamp() }
            let result = await db.collection("users").doc(data.user.uid)
                .collection("subprofiles")
                .add(newSubprofile)
                .then((data) => {
                    newSubprofile['id'] = data.id;
                    commit("addSubprofile", newSubprofile);
                    return { success: true }
                }, error => {
                    console.log("Error: ", error);
                    return { success: false, error: error };
                });
            return result;
        },
        deleteSubprofile: async function ({ commit }, data) {
            let result = await db.collection("users").doc(data.user.uid)
                .collection("subprofiles")
                .doc(data.id)
                .delete()
                .then(() => {
                    commit("deleteSubprofile", data.id); return { success: true }
                },
                    (error) => {
                        return { success: false, error: error }
                    });
            return result;
        },
        // removeSubprofile:function({commit},user,profile){

        // },
        // updateSubprofile:function({commit},user,profile){

        // },
        /**
         *  When usiing bindig we need to ensure that we do not mutate the local store - will not be the same as the firebase  
         *  When making actions - append to the firebase 
         *  Firebase would auto sync with the firebase firestore database
         */
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