import { useEffect } from 'react'
import Router from 'next/router'
import useSWR from 'swr'
import {userFetcher} from "@utils/fetchJson"

export default function useUser({ redirectTo = false, redirectIfFound = false} = {}) {

  const {data:user, mutateUser} = useSWR('/api/user/account', userFetcher)

  useEffect(() => {

    if (!redirectTo || !user) {
      return
    }

    if (
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      (redirectIfFound && user?.isLoggedIn)
    ) {
      Router.push(redirectTo)
    }
  }, [user, redirectIfFound, redirectTo])

  return { user, mutateUser }
}



