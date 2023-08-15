'use client'
import Image from 'next/image'
import { useState } from 'react'
import { storefront } from '../services/storefront'

const gql = String.raw

const checkoutMutation = gql`
  mutation CheckoutCreate($variantId: ID!) {
    checkoutCreate(
      input: { lineItems: { variantId: $variantId, quantity: 1 } }
    ) {
      checkout {
        webUrl
      }
    }
  }
`

interface ProductData {
  product: {
    variantId: string
    name: string
    description: string
    updatedAt: string
    updatedAtFormatted: string
    tag: string
    price: string
    imageSrc: string
    imageAlt: string
  }
}

export function Product({ product }: ProductData) {
  const [checkoutIsLoading, setCheckoutIsLoading] = useState(false)

  async function handleCheckout() {
    setCheckoutIsLoading(true)
    const { data } = await storefront(checkoutMutation, {
      variantId: product.variantId,
    })

    const { webUrl } = data.checkoutCreate.checkout

    window.location.href = webUrl
  }

  return (
    <div className="lg:gap-7-10 xl:gap-x16 lg:grid lg:grid-cols-7 lg:gap-x-8">
      {/* Product image */}
      <div className="lg:col-span-4">
        <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.imageSrc}
            alt={product.imageAlt}
            className="object-cover object-center"
            fill
          />
        </div>
      </div>

      {/* Product details */}
      <div className="mx-auto mt-14 max-w-2xl sm:mt-16 lg:col-span-3 lg:mt-0 lg:max-w-none">
        <div className="flex flex-col-reverse">
          <div>
            <h1 className=" text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              {product.name}
            </h1>
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              {product.tag} &middot; Updated{' '}
              <time dateTime={product.updatedAt}>
                {product.updatedAtFormatted}
              </time>
            </p>
          </div>
        </div>
        <p className="mt-6 text-gray-500">{product.description}</p>
        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
          <button
            onClick={handleCheckout}
            type="button"
            className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-900 px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            <span className="flex flex-row items-center justify-center">
              {checkoutIsLoading && (
                <svg
                  aria-hidden="true"
                  role="status"
                  className="mr-3 inline h-4 w-4 animate-spin text-white"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="#E5E7EB"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentColor"
                  />
                </svg>
              )}
              Pay {product.price}
            </span>
          </button>
          <button
            type="button"
            className="flex w-full items-center justify-center rounded-md border bg-white px-8 py-3 text-base font-medium text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-50"
          >
            Preview
          </button>
        </div>
        <div className="pt-10 sm:mt-10 sm:border-t">
          <h3 className="text-sm font-medium text-gray-900">Demo only</h3>
          <p className="mt-4 text-sm text-gray-500">
            For personal and development use only. You cannot order or pay in
            this site version.
          </p>
        </div>
      </div>
    </div>
  )
}
