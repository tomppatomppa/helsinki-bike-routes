import axios from 'axios'

const baseUrl = '/api/'

export const uploadFile = async (file: File, filetype: string) => {
  if (filetype !== 'stations' && filetype !== 'journeys')
    throw new Error('Filetype is invalid')

  const formData = new FormData()
  formData.append('file', file)
  const { data } = await axios.post<FormData>(
    `${baseUrl}/${filetype}/add-many`,
    formData
  )
  return data
}
