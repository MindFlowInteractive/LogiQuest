/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";

export default function UnauthorizedResource() {
    const navigate = useNavigate();

    const handleGoBack = () => {
        if (window.history.state && window.history.state.idx > 0) {
            navigate(-1);
        } else {
            navigate("/", { replace: true });
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-brand-background-gray">
            <div className="text-center">
                <h1 className="text-9xl font-extrabold text-brand-primary-black">
                    401
                </h1>
                <p className="mt-4 text-lg font-medium text-gray-600">
                    Unauthorized Resource
                </p>
                <button
                    className={
                        "mt-6 inline-block rounded-md bg-brand-primary-blue text-white px-5 py-3 font-semibold text-sm transition hover:bg-brand-primary-black hover:text-white"
                    }
                    onClick={handleGoBack}
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}