import { wrapper } from '../redux/store';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'
import {useStore} from 'react-redux'
import 'tailwindcss/tailwind.css'
import '../styles/globals.css'

const MyApp = ({ Component, pageProps }) => {
  const store = useStore();
  const persistor = persistStore(store,null)

  return (
    <PersistGate loading={null} persistor={persistor}>
      <Component {...pageProps}/>
    </PersistGate>
  )
}

//withRedux wrapper that passes the store to the App Component
export default wrapper.withRedux(MyApp);
