import { appWithTranslation } from 'next-i18next'

// This will throw "Module not found: Can't resolve 'fs'""
// import tracer from 'dd-trace';

const MyApp = ({ Component, pageProps }) => <Component {...pageProps} />

// https://github.com/i18next/next-i18next#unserialisable-configs
export default appWithTranslation(MyApp/*, nextI18NextConfig */)
