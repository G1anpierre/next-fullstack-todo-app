'use client'
import React from 'react'
import {Pricing, StripePlanType} from '../lib/types'
import {classNamesFilter} from '../lib/utils'
import {checkoutStripe} from '../lib/actions'

export const BuyPlan = ({
  tier,
}: {
  tier: Pricing & {mostPopular: boolean}
}) => {
  const checkoutStripeWithPlanID = checkoutStripe.bind(null, tier.id)

  return (
    <form action={checkoutStripeWithPlanID}>
      <button
        type="submit"
        aria-describedby={tier.id}
        className={classNamesFilter(
          tier.mostPopular
            ? 'bg-indigo-600 text-white shadow-sm hover:bg-indigo-500'
            : 'text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300',
          'mt-8 block w-full rounded-md py-2 px-3 text-center text-sm font-semibold leading-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600',
        )}
      >
        Buy plan
      </button>
    </form>
  )
}
