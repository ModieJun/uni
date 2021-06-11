import { db } from '../firebase_conf';
import firebase from 'firebase'
import { vuexfireMutations, firestoreAction } from 'vuexfire'
// https://vuex.vuejs.org/guide/actions.html#composing-actions - async actions using promise 
const profileStore = {
    state: {
        tempProfile: null, //used when creating a new profile - that has not been submitted 
        profile: [],//it will be an array
        subprofiles: null, 
    },
    mutations: {
        addMainProfile(state, newProfile) {
            state.profile = newProfile;
        },
        addSubprofile(state, newSubprofile) {
            state.subprofiles.push(newSubprofile);
        },
        deleteSubprofile(state, id) {
            let index = state.subprofiles.map(x => { return x.id }).indexOf(id);
            state.subprofiles.splice(index, 1)
        },
        staleMutation(state, paylaod) {
            state.tempProfile = paylaod
        },
        resetModule(state) {
            state.profile = [];
            state.subprofiles = [];
        },
        ...vuexfireMutations
    },
    actions: {
        async addMainProfile({ commit }, data) {
            let newProfile = { profile: data.profile, created_at: firebase.firestore.FieldValue.serverTimestamp() };
            // add the main profile to the cloud
            let result = await db.collection("users").doc(data.user.uid)
                .collection("mainprofile")
                .add(newProfile)
                .then(() => {
                    //get changes -> update the local store
                    commit("staleMutation", newProfile.profile);
                    return { success: true };
                }, (error) => {
                    console.log("Error: ", error);
                    return { success: false, error: error };
                });
            return result;
        },
        async addSubprofile({ commit }, data) {
            var newSubprofile = { subprofile: data.subprofile, status: "editing", created_at: firebase.firestore.FieldValue.serverTimestamp() }
            let result = await db.collection("users").doc(data.user.uid)
                .collection("subprofiles")
                .add(newSubprofile)
                .then((data) => {
                    newSubprofile['id'] = data.id;
                    commit("staleMutation", newSubprofile);
                    return { success: true }
                }, error => {
                    console.log("Error: ", error);
                    return { success: false, error: error };
                });
            return result;
        },
        async deleteSubprofile({ commit }, data) {
            let result = await db.collection("users").doc(data.user.uid)
                .collection("subprofiles")
                .doc(data.id)
                .delete()
                .then(() => {
                    commit("staleMutation", data.id); return { success: true }
                },
                    (error) => {
                        return { success: false, error: error }
                    });
            return result;
        },
        // removeSubprofile:function({commit},user,profile){

        // },
        updateSubprofile:firestoreAction(({rootState,getters},payload)=>{ //payload = id , completionblock
            const user = {...rootState.auth.user};
            const subprofile = {...getters.subprofileByID(payload.id)}; //using this syntax will not yield enum id of the doc
            subprofile.completionblocks= payload.completionblocks;

            return db.collection('users').doc(user.uid)
                .collection('subprofiles').doc(payload.id) 
                .set(subprofile)
                .then(
                    ()=>{
                        return {success:true}
                    },
                    (error)=>{
                        return {success:false, error:error}
                    }
                )
        }),
        /**
         *  When usiing bindig we need to ensure that we do not mutate the local store - will not be the same as the firebase  
         *  When making actions - append to the firebase 
         *  Firebase would auto sync with the firebase firestore database
         */
        bindProfileModule({ dispatch }, user) {
            dispatch("bindUserProfile", user);
            dispatch("bindSubprofile", user)
        },
        bindUserProfile: firestoreAction(({ bindFirestoreRef }, user) => {
            return bindFirestoreRef('profile', db.collection("users").doc(user.uid).collection('mainprofile'));
        }),
        bindSubprofile: firestoreAction(({ bindFirestoreRef }, user) => {
            return bindFirestoreRef('subprofiles', db.collection("users").doc(user.uid).collection('subprofiles'))
        }),
        unbindUserProfileAndSubprofiles({ dispatch }) {
            firestoreAction(({ unbindFirestoreRef }) => {
                unbindFirestoreRef('profile');
                unbindFirestoreRef('subprofiles');
            })
            dispatch("cleanProfile");
        },
        /**
         *  Used to rese the module state - once the user logs out, the exsting data should not be kept 
         *  in the store 
         */
        cleanProfile: function ({ commit }) {
            // this.unbindUserProfileAnd Subprofile should be executed and the stores should be reset
            commit('resetModule')
        }
    },
    getters: {
        profile: (state) => {
            /**
             *  ONly one main profile exists but based on the firebase bindings collections are in an array
             *  thus return only the first item
             */
            return state.profile.length !== 0 ? state.profile[0].profile : null;
        },
        subprofiles: (state) => {
            return state.subprofiles;
        },
        subprofileByID: (state) => (id) => {
            const subprofile = state.subprofiles.filter(e=> e.id ==id)
            return subprofile.length===1 ? subprofile[0] : null;
            // return state.subprofiles.find(subprofile => subprofile.subprofile.id == id)
        }
    }
}

export default profileStore;