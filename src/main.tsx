import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import type { InferResponseType } from 'hono/client'
import { hc } from 'hono/client'
import { AppType } from '../functions/api/[[route]]'
import { useEffect, useState } from 'react'

function App() {
  const client = hc<AppType>('/')
  const $get = client.api.hello.$get

  const [data, setData] = useState<InferResponseType<typeof $get>>()

  useEffect(() => {
    const fetchData = async () => {
      const res = await $get({
        query: {
          name: 'Pages',
        },
      })
      const responseData = await res.json()
      setData(responseData)
    }
    fetchData()
  }, [])

  return <h1>{data?.message}</h1>
}



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
