import { signInWithGoogle } from "../services/GoogleAuthService";

const SignIn = () => {
  const handleGoogleSignIn = async () => {
    try {
      const user = await signInWithGoogle();
      // Update UI or redirect user after successful sign-in
      console.log("User signed in:", user);
    } catch (error) {
      console.error("Error during Google Sign-In:", error);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <button onClick={handleGoogleSignIn}>Sign in with Google</button>
    </div>
  );
};

export default SignIn;