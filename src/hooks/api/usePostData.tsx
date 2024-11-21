import { useState } from "react"
import axios, { AxiosRequestConfig } from "axios"
import { useAuth } from "../../components/subjectRelated/auth/context/AuthContext"

interface UsePostDataProps<T> {
  url: string
  data: T
  config?: AxiosRequestConfig
}

interface UsePostDataResult<R> {
  responseData: R | null
  loading: boolean
  error: string | null
  postData: () => Promise<void>
}

export function usePostData<T, R>({ url, data, config }: UsePostDataProps<T>): UsePostDataResult<R> {
  const [responseData, setResponseData] = useState<R | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  // const {} = useAuth()

  const postData = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await axios.post<R>(url, data, config)
      setResponseData(response.data)
    } catch (err: any) {
      setError(err.response?.data || err.message || "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  return { responseData, loading, error, postData }
}
