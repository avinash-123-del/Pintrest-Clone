import './globals.css'
import { Poppins } from 'next/font/google'
import Provider from './Provider'
import Header from './Components/Header'
const pop = Poppins({ subsets: ['latin'], weight: '400' })
import AppContetxtProvider from './Components/AppContextProvider'

export const metadata = {
  title: 'Pintrest Clone',
  description: 'created by avinash',
  icon:'./icon.png'

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head><link rel="icon" href="./logo.png" sizes="any" /></head>
      <body className={pop.className}>
        <Provider>
          <AppContetxtProvider>
            <Header />
            {children}
          </AppContetxtProvider>
        </Provider>
      </body>
    </html>
  )
}
