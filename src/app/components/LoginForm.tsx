'use client'

import {AtSymbolIcon, KeyIcon} from '@heroicons/react/24/outline'
import {ArrowRightIcon} from '@heroicons/react/20/solid'
import {Button} from './Button'
import {useFormStatus} from 'react-dom'
import Link from 'next/link'
import {useForm, SubmitHandler} from 'react-hook-form'
import {signIn} from 'next-auth/react'
import {SignInSchema, SignInSchemaType} from '../lib/types'
import {zodResolver} from '@hookform/resolvers/zod'
import {getClassNames} from '../lib/utils'
import {toast} from 'sonner'
import {useRouter} from 'next/navigation'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faGithub, faDiscord, faGoogle} from '@fortawesome/free-brands-svg-icons'

type IFormInput = {
  email: string
  password: string
}

export default function LoginForm() {
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<IFormInput>({
    resolver: zodResolver(SignInSchema),
  })
  const onSubmit: SubmitHandler<SignInSchemaType> = async data => {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: `${window.location.origin}/dashboard`,
      redirect: false,
    })

    if (result?.error) {
      toast.error(result.error)
    } else {
      toast.success('Login successful')
      router.push('/dashboard')
    }
  }

  // const [code, action] = useFormState(authenticate, undefined)
  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Please log in to continue.</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className={getClassNames(
                  'peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500',
                  errors.email,
                )}
                placeholder="Enter your email address"
                {...register('email')}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div className="h-2">
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                className={getClassNames(
                  'peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500',
                  errors.password,
                )}
                id="password"
                type="password"
                placeholder="Enter password"
                {...register('password')}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
            <div className="h-2">
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
        </div>
        <LoginButton />
        <div className="flex flex-col align-center h-8 space-x-1 mb-4">
          <div className="text-center text-sm leading-6 text-gray-500 flex  justify-center gap-2">
            <span>Not a member?</span>
            <Link
              href="/signup"
              className="font-semibold text-blue-600 hover:text-blue-500"
            >
              Sign Up
            </Link>
          </div>
          {/* Add form errors here */}
          {/* {code === 'CredentialSignin' && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p aria-live="polite" className="text-sm text-red-500">
                Invalid credentials
              </p>
            </>
          )} */}
        </div>
        <div className="relative mt-10">
          <div
            className="absolute inset-0 flex items-center"
            aria-hidden="true"
          >
            <div className="w-full border-t border-gray-200" />
          </div>
          <div className="relative flex justify-center text-sm font-medium leading-6">
            <span className="bg-white px-6 text-gray-900">
              Or continue with
            </span>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4">
          <button
            onClick={() =>
              signIn('discord', {
                callbackUrl: `${window.location.origin}/dashboard`,
              })
            }
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-md bg-[#7289da] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1D9BF0]"
          >
            <FontAwesomeIcon icon={faDiscord} />
            <span className="text-sm font-semibold leading-6">Discord</span>
          </button>
          <button
            onClick={() =>
              signIn('github', {
                callbackUrl: `${window.location.origin}/dashboard`,
              })
            }
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
          >
            <FontAwesomeIcon icon={faGithub} />
            <span className="text-sm font-semibold leading-6">GitHub</span>
          </button>
          <button
            onClick={() =>
              signIn('google', {
                callbackUrl: `${window.location.origin}/dashboard`,
              })
            }
            type="button"
            className="flex w-full items-center justify-center gap-3 rounded-md bg-[#24a0ed] px-3 py-1.5 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]"
          >
            <FontAwesomeIcon icon={faGoogle} />
            <span className="text-sm font-semibold leading-6">Google</span>
          </button>
        </div>
      </div>
    </form>
  )
}

function LoginButton() {
  const {pending} = useFormStatus()
  return (
    <Button
      className="mt-4 w-full"
      aria-disabled={pending}
      disabled={pending}
      type="submit"
    >
      {pending && (
        <div className="text-left rtl:text-right">
          <div role="status">
            <svg
              aria-hidden="true"
              className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  )
}
