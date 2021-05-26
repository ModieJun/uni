import {Firebase} from "../firebase_conf"
const authentication ={
    state:{
        user:""
    },
    mutations:{
        setUser:function(state,user){
            state.user=user;
        }
    },
    actions:{
        loginWithEmail:function({commit},user){
            // login to firestore and update the user object
            console.log(user);
            Firebase.auth().signInWithEmailAndPassword(user.email,user.password)
            .then(()=>{
                commit("setUser",user)
            },
            (error)=>{
                console.log(error)
                return error;
            })
        },
        registerWithEmail:function({commit},user){
            Firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
            .then(()=>{
                commit("setUser",{user});
            },(error)=>{
                alert(error);
            });
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
        
    }
}

export default authentication;