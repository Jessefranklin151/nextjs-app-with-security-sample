import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { useState } from 'react';
import useSecurityStore from '../stores/SecurityStore';
import type Credentials from '../types/Credentials';

interface LoginFormProps {
    closeModal: (open: boolean) => void
}

export default function LoginForm({ closeModal }: LoginFormProps) {

    const { login } = useSecurityStore();

    const [showWrongCredentialsMessage, setShowWrongCredentialsMessage] = useState(false);

    const onSubmit = (
        values: Credentials,
        { setSubmitting, resetForm }: FormikHelpers<Credentials>
    ) => {
        login(values as Credentials).then(response => {
            if (response.status === 200) {
                closeModal(false);
                setShowWrongCredentialsMessage(false)
            } else {
                setShowWrongCredentialsMessage(true)
            }
        });
        resetForm();
    };


    return (
        <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                </div>

                {showWrongCredentialsMessage ?
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <span className="block sm:inline">Wrong Username or password</span>
                        <span onClick={() => setShowWrongCredentialsMessage(false)} className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <title>Close</title>
                                <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
                        </span>
                    </div> : null
                }


                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    onSubmit={onSubmit}
                >
                    {(formik: FormikProps<Credentials>) => (<Form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="username-address" className="sr-only">
                                    Username
                                </label>
                                <Field
                                    id="username"
                                    name="username"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Username"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <Field
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group cursor-pointer relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                disabled={formik.isSubmitting}
                            >
                                Sign in
                            </button>
                        </div>
                    </Form>)}
                </Formik>
            </div>
        </div>
    )
}