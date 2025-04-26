import { useMutation } from '@tanstack/react-query';
// import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";

const api = import.meta.env.VITE_API_URL

const signIn = async ({ email, password }) => {

    try {
        const response = await fetch(`${api}/auth/sign-in`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data?.response.message || 'Failed to sign in, try again');
        }

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const useSignIn = () => {
    const navigate = useNavigate();

    // const { intendedPath, setIntendedPath, setOpenMobileDrawer } = useContext(AppContext);
    // const { setShowAuthModal, login } = useContext(AuthContext);

    return useMutation({
        mutationFn: signIn,
        onSuccess: (data) => {
            if (data.access_token) {
                // login(data.access_token);
                // setShowAuthModal(false);
                // toast.success('Sign-in successful!');
                // setOpenMobileDrawer(false)

                // Navigate to the intended path after successful sign-in
                // if (intendedPath) {
                //     navigate(intendedPath);
                //     setIntendedPath(null); // Clear the intended path after navigation
                // }
            }
        },
        onError: (error) => {
            // toast.error(error.message);
            console.log(error)
        },
    });
};