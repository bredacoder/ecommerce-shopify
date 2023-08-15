import Image from 'next/image'
import Link from 'next/link'

interface RelatedProductsData {
  relatedProducts: {
    handle: string
    name: string
    price: string
    tag: string
    imageSrc: string
    imageAlt: string
  }[]
}

export function RelatedProducts({ relatedProducts }: RelatedProductsData) {
  return (
    <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
      <div className="flex items-center justify-between space-x-4">
        <h2 className="text-lg font-medium text-gray-900">
          Customers also viewed
        </h2>
        <a
          className="whitespace-nowrap text-sm font-medium text-gray-900 hover:text-gray-700"
          href="/"
        >
          View all<span aria-hidden="true"> →</span>
        </a>
      </div>

      <div className="mt-6 space-y-12 lg:grid lg:grid-cols-4 lg:gap-x-6 lg:space-y-0">
        {relatedProducts.map((product) => (
          <div key={product.handle} className="group relative">
            <div className="aspect-h-3 aspect-w-4 relative h-20 w-full overflow-hidden rounded-lg bg-white lg:aspect-h-3 lg:aspect-w-4 group-hover:opacity-75 sm:h-40 ">
              <Image
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center"
                fill
              />
            </div>
            <div className="mt-4 flex items-center justify-between space-x-8 text-base font-medium text-gray-900">
              <h3>
                <Link href={`${product.handle}`}>
                  <span aria-hidden="true" className="absolute inset-0"></span>
                  {product.name}
                </Link>
              </h3>
              <p>{product.price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
