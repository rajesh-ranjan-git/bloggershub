import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "./firebaseConfig";

const firebaseGoogleAuth = async () => {
  const provider = new GoogleAuthProvider();

  const { loggedInUser } = await signInWithPopup(firebaseAuth, provider);

  const formData = {
    name: loggedInUser.displayName,
    email: loggedInUser.email,
    profileImage: loggedInUser.photoURL,
  };

  return formData;
};

export default firebaseGoogleAuth;
