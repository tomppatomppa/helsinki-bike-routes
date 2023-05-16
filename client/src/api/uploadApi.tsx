import axios from 'axios'

const baseUrl = '/api'

interface Props {
  file: File
  filetype: string
}
export const uploadFile = async (props: Props) => {
  const { filetype, file } = props

  const formData = new FormData()
  formData.append('file', file)

  const { data } = await axios.post<FormData>(
    `${baseUrl}/${filetype}/add-many`,
    formData
  )
  return data
}
