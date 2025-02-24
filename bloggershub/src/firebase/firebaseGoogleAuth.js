import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { firebaseAuth } from "./firebaseConfig";

const firebaseGoogleAuth = async () => {
  const provider = new GoogleAuthProvider();

  const { user } = await signInWithPopup(firebaseAuth, provider);

  const formData = {
    name: user.displayName,
    email: user.email,
    profileImage: user.photoURL,
  };

  return formData;
};

export default firebaseGoogleAuth;
