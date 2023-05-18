import {
  Field,
  Form,
  Formik,
  ErrorMessage,
  useFormikContext,
  useFormik,
} from 'formik'

import * as Yup from 'yup'
import { JourneyFormFields } from '../../types/journey'
import { useState } from 'react'
import CloseButton from '../common/CloseButton'

interface JourneyFormProps {
  onCancel: () => void
  onSubmit: (value: JourneyFormFields) => void
}
interface Station {
  id: number
  Name: string
}

const JourneySchema = Yup.object().shape({
  Departure_station_name: Yup.string().required('Required'),
})
const dummyStations = [
  {
    id: 1,
    Name: 'Hanasaari',
  },
  {
    id: 2,
    Name: 'Keilalahti',
  },
  {
    id: 1,
    Name: 'Westendinasema',
  },
  {
    id: 1,
    Name: 'Golfpolku',
  },
]
export const AddJourneyForm = (props: JourneyFormProps) => {
  const { onCancel, onSubmit } = props
  const [stations] = useState<Station[]>(dummyStations)
  const [search, setSearch] = useState<string>('')
  const filtered = stations.filter((station) =>
    station.Name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <Formik
      validationSchema={JourneySchema}
      initialValues={{
        Departure_station_name: '',
        Departure_station_id: '',
      }}
      onSubmit={onSubmit}
    >
      {({ setFieldValue }) => (
        <Form className="bg-neutral-200 p-12 rounded-md">
          <div className="space-y-12 mt-16">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Create a new Journey
              </h2>
              <div className="md:mt-10 grid grid-cols-1 gap-x-6 md:gap-y-8 sm:grid-cols-6">
                {/* Departure_station_name*/}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="Departure_station_name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Departure station
                  </label>
                  <div className="mt-2 relative">
                    <Field
                      disabled={true}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      id="Departure_station_name"
                      name="Departure_station_name"
                      placeholder="Departure station name"
                      type="input"
                    />
                    <ErrorMessage
                      className="text-red-900"
                      name="Departure_station_name"
                    >
                      {(msg) => <div className="text-red-900">{msg}</div>}
                    </ErrorMessage>
                    <input
                      value={search}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearch(e.target.value)
                      }
                    />

                    {search && (
                      <div className="absolute mt-1 w-full bg-white shadow-lg rounded-bl rounded-br max-h-36 overflow-y-auto">
                        {filtered?.map((station, index) => (
                          <div
                            onClick={() => {
                              setFieldValue(
                                'Departure_station_name',
                                station.Name
                              )
                              setFieldValue('Departure_station_id', station.id)
                              setSearch('')
                            }}
                            className="cursor-pointer hover:bg-neutral-200 p-2"
                            key={index}
                          >
                            {station?.Name}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Operaattor
                <div className="sm:col-span-3">
                  <label
                    htmlFor="Operaattor"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Operaattor
                  </label>
                  <div className="mt-2">
                    <Field
                      id="Operaattor"
                      name="Operaattor"
                      placeholder="Operaattor"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage className="text-red-900" name="Operaattor">
                      {(msg) => <div className="text-red-900">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div> */}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                onClick={onCancel}
                type="button"
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                className=" bg-neutral-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}
