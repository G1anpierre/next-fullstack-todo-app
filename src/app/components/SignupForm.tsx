'use client'
import {
  AtSymbolIcon,
  KeyIcon,
  ExclamationCircleIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'
import {Button} from './Button'
import Link from 'next/link'
import {signUpUser} from '../lib/api'
import {useRouter} from 'next/navigation'
import {useForm, SubmitHandler} from 'react-hook-form'

type IFormRegister = {
  name: string
  email: string
  password: string
}

export const SignupForm = () => {
  const {register, handleSubmit} = useForm<IFormRegister>()

  const router = useRouter()
  const onSubmit: SubmitHandler<IFormRegister> = async form => {
    const data = await signUpUser(form)
    if (data.success) {
      router.push('/dashboard')
    } else {
      console.log('error', data)
    }
  }

  return (
    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex-1 rounded-lg bg-gray-50 px-6 pb-4 pt-8">
        <h1 className="mb-3 text-2xl">Please Sign up to continue.</h1>
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="name"
            >
              Name
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="name"
                type="text"
                placeholder="Enter your Name"
                required
                {...register('name')}
              />
              <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="email"
            >
              Email
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="email"
                type="email"
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
                minLength={6}
                {...register('password')}
              />
              <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
        </div>
        <SubmitButton />
        <div className="flex flex-col align-center  h-8 space-x-1">
          <div className="text-center text-sm leading-6 text-gray-500 flex justify-center gap-2">
            <div>
              <span>Already a member?</span>
              <Link
                href="/login"
                className="font-semibold text-blue-600 hover:text-blue-500"
              >
                Login
              </Link>
            </div>
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

function SubmitButton() {
  return (
    <Button className="mt-4 w-full" aria-disabled={false}>
      Sign Up <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
    </Button>
  )
}
