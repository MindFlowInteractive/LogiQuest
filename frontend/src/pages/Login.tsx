export default function Login() {
    return (
        <>
            <div className="flex min-h-screen flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#141516]">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-[#0A746D]">
                        Sign in with
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <div className="w-4/5 mx-auto flex flex-col gap-4">
                        <a
                            href="#"
                            className="flex w-full items-center justify-center gap-3 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-[#0A746D] ring-inset hover:bg-gray-800 focus-visible:ring-transparent"
                        >
                            <span className="text-sm/6 font-semibold text-[#0A746D]">Google</span>
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                                <path
                                    d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z"
                                    fill="#EA4335"
                                />
                                <path
                                    d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z"
                                    fill="#4285F4"
                                />
                                <path
                                    d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z"
                                    fill="#FBBC05"
                                />
                                <path
                                    d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z"
                                    fill="#34A853"
                                />
                            </svg>
                        </a>

                        <a
                            href="#"
                            className="flex w-full items-center justify-center gap-3 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-[#0A746D] ring-inset hover:bg-gray-800 focus-visible:ring-transparent"
                        >
                            <span className="text-sm/6 font-semibold text-[#0A746D]">Apple</span>
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                                <path
                                    d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
                                    fill="#ffffff"
                                />
                            </svg>
                        </a>

                        <a
                            href="#"
                            className="flex w-full items-center justify-center gap-3 rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-[#0A746D] ring-inset hover:bg-gray-800 focus-visible:ring-transparent"
                        >
                            <span className="text-sm/6 font-semibold text-[#0A746D]">Microsoft</span>
                            <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
                                <path d="M11.5 3H3v9.5h8.5V3z" fill="#f25022" />
                                <path d="M11.5 12H3v9.5h8.5V12z" fill="#7fba00" />
                                <path d="M21 3h-8.5v9.5H21V3z" fill="#00a4ef" />
                                <path d="M21 12h-8.5v9.5H21V12z" fill="#ffb900" />
                            </svg>
                        </a>
                    </div>

                    <div className="relative mt-10 w-4/5 mx-auto">
                        <div aria-hidden="true" className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-[#033330]" />
                        </div>
                        <div className="relative flex justify-center text-sm/6 font-medium">
                            <span className="bg-[#141516] px-6 text-[#033330]">Or</span>
                        </div>
                    </div>

                    <div className="bg-tranparent px-6 py-6 shadow-sm sm:rounded-lg sm:px-12">
                        <form action="#" method="POST" className="space-y-6">
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        placeholder="Email"
                                        className="border block w-full rounded-md bg-transparent px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>

                            <div>
                                <div className="mt-2">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        placeholder="****"
                                        className="border block w-full rounded-md bg-transparent px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex gap-3">
                                    <div className="flex h-6 shrink-0 items-center">
                                        <div className="group grid size-4 grid-cols-1">
                                            <input
                                                id="remember-me"
                                                name="remember-me"
                                                type="checkbox"
                                                className="col-start-1 row-start-1 appearance-none rounded-sm border border-gray-300 bg-white checked:border-indigo-600 checked:bg-indigo-600 indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                            />
                                            <svg
                                                fill="none"
                                                viewBox="0 0 14 14"
                                                className="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-disabled:stroke-gray-950/25"
                                            >
                                                <path
                                                    d="M3 8L6 11L11 3.5"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="opacity-0 group-has-checked:opacity-100"
                                                />
                                                <path
                                                    d="M3 7H11"
                                                    strokeWidth={2}
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="opacity-0 group-has-indeterminate:opacity-100"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                    <label htmlFor="remember-me" className="block text-sm/6 text-gray-300">
                                        Remember me
                                    </label>
                                </div>

                                <div className="text-sm/6">
                                    <a href="#" className="font-semibold text-[#0A746D] hover:text-indigo-500">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-[#033330] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    Sign in
                                </button>
                            </div>
                        </form>
                    </div>

                    <p className="text-center text-sm/6 text-gray-500">
                        Don't have an account?{' '}
                        <a href="#" className="font-semibold text-[#0A746D] hover:text-indigo-500">
                            Create One
                        </a>
                    </p>
                </div>
            </div>
        </>
    )
}
