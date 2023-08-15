import { Product } from '@/app/components/Product'
import { RelatedProducts } from '@/app/components/RelatedProducts'
import { storefront } from '@/app/services/storefront'
import { formatDate, formatPrice } from '@/app/utils/formatting'

const gql = String.raw

const singleProductQuery = gql`
  query SingleProduct($handle: String!) {
    productByHandle(handle: $handle) {
      title
      handle
      description
      updatedAt
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
      variants(first: 1) {
        edges {
          node {
            id
          }
        }
      }
    }
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

interface ProductData {
  params: {
    handle: string
  }
}

interface ProductQueryResponse {
  productByHandle: {
    title: string
    handle: string
    description: string
    updatedAt: string
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
    variants: {
      edges: {
        node: {
          id: string
        }
      }[]
    }
  }
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

export default async function SingleProduct({ params }: ProductData) {
  const {
    data: { productByHandle, products },
  }: { data: ProductQueryResponse } = await storefront(singleProductQuery, {
    handle: params?.handle,
  })

  const formattedProduct = {
    variantId: productByHandle.variants.edges[0].node.id,
    name: productByHandle.title,
    description: productByHandle.description,
    updatedAt: productByHandle.updatedAt,
    updatedAtFormatted: formatDate(productByHandle.updatedAt),
    tag: productByHandle.tags[0],
    price: formatPrice(
      Number(productByHandle.priceRange.minVariantPrice.amount),
    ),
    imageSrc: productByHandle.images.edges[0].node.transformedSrc,
    imageAlt: productByHandle.images.edges[0].node.altText,
  }

  const relatedProductsFormatted = products.edges
    .filter((item) => item.node.handle !== productByHandle.handle)
    .slice(0, 4)
    .map((item) => ({
      handle: item.node.handle,
      name: item.node.title,
      price: formatPrice(Number(item.node.priceRange.minVariantPrice.amount)),
      tag: item.node.tags[0],
      imageSrc: item.node.images.edges[0].node.transformedSrc,
      imageAlt: item.node.images.edges[0].node.altText,
    }))

  return (
    <main className="mx-auto px-4 pt-14 sm:px-6 sm:pt-24 lg:max-w-7xl lg:px-8">
      <Product product={formattedProduct} />

      <RelatedProducts relatedProducts={relatedProductsFormatted} />
    </main>
  )
}
