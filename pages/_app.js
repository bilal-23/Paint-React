import '../styles/globals.css'
import Router from "next/router";
import { Provider as AuthProvider } from "next-auth/client";
import NProgress from "nprogress";
import '../styles/nprogress.css';

function MyApp({ Component, pageProps }) {
  Router.onRouteChangeStart = url => {
    NProgress.configure({ showSpinner: false }).start()
  }
  Router.onRouteChangeComplete = () => NProgress.done()
  Router.onRouteChangeError = () => NProgress.done()

  return <>
    <AuthProvider session={pageProps.session}>
      <Component {...pageProps} />
    </AuthProvider>
  </>

}

export default MyApp
