import {db,Firebase} from '../firebase_conf';
import { vuexfireMutations,firestoreAction } from 'vuexfire'

const profileStore = {
    state:{
        profile:{},
        subprofiles:[]
    },
    mutations:{
        addMainprofile:function({state},newProfile){
            state.profile=newProfile;
        },
        addsubprofile:function({state},newSubprofile){
            state.subprofile.appendChild(newSubprofile);
        },
        ...vuexfireMutations
    },
    actions:{
        addMainProfile:function({commit},user,profile){
            // add the main profile to the cloud
            db.collection("users").doc(user.uid)
            .collection("mainprofile")
            .add({profile,created_at:Firebase.firestore.FieldValue.serverTimestamp()})
            .then((data)=>{
                //get changes -> update the local store
                console.log(data);
                commit("addMainProfile",data);
            },(error)=>{
                console.log("Error: ",error);
            })
        },
        addSubprofile:function({commit},user,subprofile){
            db.collection("users").doc(user.uid)
            .collection("subprofiles")
            .add({subprofile,created_at:Firebase.firestore.FieldValue.serverTimestamp()})
            .then((data)=>{
                console.log(data);
                commit("addSubprofile",data);
            },error=>{
                console.log("Error: ",error);
            })
        },
        // removeSubprofile:function({commit},user,profile){

        // },
        // updateSubprofile:function({commit},user,profile){

        // },
        bindUserProfile:function(user){
            firestoreAction(({bindFirestoreRef})=>{
                return bindFirestoreRef('profile',db.collection("users").doc(user.uid).collection('mainprofile'));
            })
        },
        bindSubprofile: function(user){
            firestoreAction(({bindFirestoreRef})=>{
                return bindFirestoreRef('subprofiles',db.collection("users").doc(user.uid).collection('subprofiles'))
            });
        },
        unbindUserProfileAndSubprofiles:function(){
            firestoreAction(({unbindFirestoreRef})=>{
                unbindFirestoreRef('profile');
                unbindFirestoreRef('subprofiles');
            })
        }
    },
    getters:{
        profile: (state)=>{
            return state.profile;
        },
        subprofiles:(state)=>{
            return state.subprofiles;
        },
        subprofileByID:(state)=>(id)=>{
            return state.subprofiles.find(subprofile=>subprofile.id==id)
        }
    }
}

export default profileStore;