import Card from '@/components/Card'
export default function PageTitle({ articles, title, subTitle }) {
  return (
    <div className="relative bg-gray-50 dark:bg-gray-700 pt-4 pb-4 px-4 sm:px-6 lg:pt-4 lg:pb-4 lg:px-8">
      <div className="absolute inset-0">
        <div className="bg-white dark:bg-gray-900 h-1/3 sm:h-2/3"></div>
      </div>
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-gray-100 sm:text-4xl">
            {title}
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-100 sm:mt-4">
            {subTitle}
          </p>
        </div>
        <div className="mt-12 max-w-lg mx-auto grid gap-5 lg:grid-cols-3 lg:max-w-none">
          {articles.map((article) => {
            return <Card key={article.url} article={article} />
          })}
        </div>
      </div>
    </div>
  )
}
