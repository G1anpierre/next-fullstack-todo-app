import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import {inter, lusitana} from '../lib/fonts'

interface Breadcrumb {
  label: string
  href: string
  active?: boolean
}

export const Breadcrumbs = ({breadcrumbs}: {breadcrumbs: Breadcrumb[]}) => {
  return (
    <nav aria-label="Breadcrumb" className="mb-6 block">
      <ol className={classNames(inter.className, 'flex text-xl md:text-2xl')}>
        {breadcrumbs.map((breadcrumb, index) => (
          <li
            key={breadcrumb.href}
            aria-current={breadcrumb.active}
            className={classNames(
              breadcrumb.active ? 'text-gray-900' : 'text-gray-500',
            )}
          >
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            {index < breadcrumbs.length - 1 ? (
              <span className="mx-3 inline-block">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  )
}
