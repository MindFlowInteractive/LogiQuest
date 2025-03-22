import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-brand-background-gray">
            <div className="text-center">
                <h1 className="text-9xl font-extrabold text-brand-primary-black">404</h1>
                <p className="mt-4 text-lg font-medium text-gray-600">
                    Oops! The page you're looking for doesn't exist.
                </p>
                <Link
                    to="/"
                    className="mt-6 inline-block rounded-md bg-brand-primary-green text-white px-5 py-3 font-semibold text-sm transition hover:bg-brand-primary-black hover:text-white"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
}
