import axios from 'axios'

const baseUrl = '/api/'
interface Props {
  file: File
  filetype: string
}
export const uploadFile = async (props: Props) => {
  const { filetype, file } = props
  if (filetype !== 'stations' && filetype !== 'journeys' && !file)
    throw new Error('Filetype is invalid')

  const formData = new FormData()
  formData.append('file', file)
  const { data } = await axios.post<FormData>(
    `${baseUrl}/${filetype}/add-many`,
    formData
  )
  return data
}
