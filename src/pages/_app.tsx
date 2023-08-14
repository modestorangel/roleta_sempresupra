import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { AwardProvider } from '../context/saveAward'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AwardProvider>
      <div className="container">
        <Component {...pageProps} />
      </div>
    </AwardProvider>
  )
}

export default MyApp
