import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import {app} from "../firebase.js";
import { useDispatch } from "react-redux";
import { signInSuccess } from "../redux/user/userSlice.js"

export default function OAuth() {
     const dispatch = useDispatch();

    const handleGoogleClick = async () =>{

       
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);
            const result = await signInWithPopup(auth, provider);

          //  console.log("Successfully logged in with Google", result);

          const res = await fetch("/api/auth/google", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: result.user.displayName,
                email: result.user.email,
                photoURL: result.user.photoURL,
            }),
          });
          const data = await res.json();
          dispatch(signInSuccess(data));
            


        }catch(error){
            console.log("Could not log in with Google", error);
        }
    }
    return (
        <button type='button' onClick={handleGoogleClick} className="bg-red-700 text-white rounded-lg p-3 uppercase hover:opacity-95"> Continue with google </button>
    )
}