export function Hero() {
  return (
    <div className="mx-auto mt-24 max-w-7xl px-4 sm:mt-32">
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
          Beatiful digital design assets
        </h1>
        <p className="mx-auto mt-3 max-w-md text-base leading-8 text-gray-600 sm:text-lg md:mt-5 md:max-w-2xl md:text-xl">
          Simple ecommerce website with Tailwind UI, Shopify and Next.js.
          Products from Shopify using the Storefront GraphQL API, and build
          front-end by from Tailwind UI. <br />
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <a
            href="#"
            className="divide-x divide-gray-600 rounded-md bg-gray-900 px-6 py-4 text-base font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 md:text-lg"
          >
            <span className="pr-6">Get the bundle</span>
            <span className="pl-6">$199</span>
          </a>
        </div>
      </div>
    </div>
  )
}
