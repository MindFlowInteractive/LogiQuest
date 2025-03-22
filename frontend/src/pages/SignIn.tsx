import React, { useState } from "react";
import { signInWithGoogle } from "../services/GoogleAuthService";
import useAuth from "../hooks/useAuth";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAuth();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      await signInWithGoogle();
    } catch (error) {
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#033330] text-white flex flex-col items-center justify-center p-4">
      <div className="bg-[#004d43] p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Sign In</h1>
        {user ? (
          <div className="text-center">
            <p className="text-xl mb-4">Welcome, {user.displayName}!</p>
            <Link
              to="/"
              className="bg-[#CFFDED] text-[#033330] px-6 py-2 rounded-lg font-semibold hover:bg-[#A0E8D7] transition-colors"
            >
              Go to Home
            </Link>
          </div>
        ) : (
          <>
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full bg-white text-[#033330] px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 flex items-center justify-center"
            >
              <img
                src="/google-logo.svg"
                alt="Google Logo"
                className="w-6 h-6 mr-2"
              />
              {loading ? "Signing in..." : "Sign in with Google"}
            </button>
            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
          </>
        )}
      </div>
    </div>
  );
};

export default SignIn;