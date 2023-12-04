'use client'
// import {lusitana} from '@/app/ui/fonts'
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline'
import {ArrowRightIcon} from '@heroicons/react/20/solid'
import {Button} from './Button'
import {useFormState, useFormStatus} from 'react-dom'
import Link from 'next/link'
import {useForm, SubmitHandler} from 'react-hook-form'
import {signIn} from 'next-auth/react'

type IFormInput = {
  email: string
  password: string
}

export default function LoginForm() {
  const {register, handleSubmit} = useForm<IFormInput>()
  const onSubmit: SubmitHandler<IFormInput> = async data => {
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      callbackUrl: `${window.location.origin}/dashboard`,
    })
    if (result?.error) {
      console.log('result.error : ', result.error)
    } else {
      console.log('result : ', result)
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
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                placeholder="Enter your email address"
                required
                {...register('email')}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="password"
                type="password"
                placeholder="Enter password"
                required
                // minLength={6}
                {...register('password')}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
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
      </div>
    </form>
  )
}

function LoginButton() {
  // const {pending} = useFormStatus()
  return (
    <Button className="mt-4 w-full" aria-disabled={false} type="submit">
      Log in <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  )
}