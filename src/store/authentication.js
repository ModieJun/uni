import {Firebase} from "../firebase_conf"
const authentication ={
    state:{
        user:null
    },
    mutations:{
        setUser(state,user){
            state.user=user;
        }
    },
    actions:{
        loginWithEmail: async function({commit},user){
            // login to firestore and update the user object
            var result = null;
            await Firebase.auth().signInWithEmailAndPassword(user.email,user.password)
            .then((userRef)=>{
                commit("setUser",userRef.user.toJSON());
                result = {success:true};
            },
            (error)=>{
                result= {success:false, error:error};
            });
            return result;
        },
        registerWithEmail: async function({commit},user){
            var result = null;
            await Firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
            .then((userRef)=>{
                commit("setUser",userRef.user.toJSON());
                result = {success:true,}
            },(error)=>{
                result ={success:false,error:error}
            });
            return result;
        },
        logout:function({commit}){
            // Invalidate the user 
            Firebase.auth().signOut().then(()=>{
                commit("setUser",null)
                console.log("Logout Success");
            },(error)=>{
                console.log("Error on logout : "+ error);
            });
        }
    },
    getters:{
        user:state=>{
            return state.user
        }
    }
}

export default authentication;