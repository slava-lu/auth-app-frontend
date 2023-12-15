import Script from 'next/script'

function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID
  if (!gaId) return null
  return (
    <div className='container'>
      <Script strategy='lazyOnload' src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
      <Script strategy='lazyOnload' id='google-analytics'>
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date()); 
          gtag('config', '${gaId}');
        `}
      </Script>
    </div>
  )
}

export default GoogleAnalytics
