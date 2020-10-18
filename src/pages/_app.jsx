

import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css'
import '@styles/globals.scss'
import '@styles/components/signin.scss'
import '@styles/components/Navbar.scss'
import '@styles/components/admin.scss'


export default function MyApp({Component, pageProps}) {
    return <Component {...pageProps}/>
}

