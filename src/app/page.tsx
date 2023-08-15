import Image from 'next/image'
import { Hero } from './components/Hero'
import { storefront } from './services/storefront'
import { formatPrice } from './utils/formatting'

const gql = String.raw

const productsQuery = gql`
  query Products {
    products(first: 6) {
      edges {
        node {
          title
          handle
          tags
          priceRange {
            minVariantPrice {
              amount
            }
          }
          images(first: 1) {
            edges {
              node {
                transformedSrc
                altText
              }
            }
          }
        }
      }
    }
  }
`

interface ProductsQueryResponse {
  products: {
    edges: {
      node: {
        title: string
        handle: string
        tags: string[]
        priceRange: {
          minVariantPrice: {
            amount: string
          }
        }
        images: {
          edges: {
            node: {
              transformedSrc: string
              altText: string
            }
          }[]
        }
      }
    }[]
  }
}

export default async function Home() {
  const { data }: { data: ProductsQueryResponse } = await storefront(
    productsQuery,
  )

  const products = data.products.edges.map((item) => ({
    handle: item.node.handle,
    name: item.node.title,
    price: formatPrice(Number(item.node.priceRange.minVariantPrice.amount)),
    tag: item.node.tags[0],
    imageSrc: item.node.images.edges[0].node.transformedSrc,
    imageAlt: item.node.images.edges[0].node.altText,
  }))

  return (
    <main className="bg-white">
      <Hero />

      <div className="mx-auto max-w-2xl px-4 py-24 pt-24 sm:px-6 sm:py-32 sm:pt-32 lg:max-w-7xl lg:px-8">
        <h2 id="products-heading" className="sr-only">
          Products
        </h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <a
              key={product.handle}
              href={`products/${product.handle}`}
              className="group"
            >
              <div className="aspect-h-3 aspect-w-4 w-full overflow-hidden rounded-lg">
                <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="object-cover object-center group-hover:opacity-75"
                  fill
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-base font-medium text-gray-900">
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </div>
              <p className="mt-1 text-sm italic text-gray-500">{product.tag}</p>
            </a>
          ))}
        </div>
      </div>
    </main>
  )
}
