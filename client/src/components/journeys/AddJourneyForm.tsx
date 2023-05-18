import { Field, Form, Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { JourneyFormFields } from '../../types/journey'
import { useState } from 'react'
import DateTimePicker from '../common/DateTimePicker'
import { getDateDifferenceInMinutes } from '../../utils/getDateDifferenceInMinutes'
import { StationNameAndID } from '../../types/station'

interface JourneyFormProps {
  stations: StationNameAndID[]
  onCancel: () => void
  onSubmit: (value: JourneyFormFields) => void
}

const JourneySchema = Yup.object().shape({
  Departure_station_name: Yup.string().required('Required'),
  Departure_station_id: Yup.number().positive().required('Required'),
  Return_station_name: Yup.string().required('Required'),
  Return_station_id: Yup.number().positive().required('Required'),
  Departure: Yup.date().required('Required'),
  Duration: Yup.number().required('Required'),
  Return: Yup.date()
    .required('Required')
    .min(Yup.ref('Departure'), 'Must be after Departure date')
    .test(
      'time-difference',
      'Time difference must be at least 10 minutes',
      function (value: Date) {
        const departure = this.resolve(Yup.ref<Date>('Departure'))
        return getDateDifferenceInMinutes(value, departure) >= 600
      }
    ),
  Distance: Yup.number().required('Required').min(10, 'Minimum 10 meters'),
})

export const AddJourneyForm = (props: JourneyFormProps) => {
  const { onCancel, onSubmit, stations } = props
  const [activeInput, setActiveInput] = useState<string>('')
  const [search, setSearch] = useState<string>('')

  const filtered = stations.filter((station) =>
    station.Name.toLowerCase().includes(search.toLowerCase())
  )

  const handleResetSearch = () => {
    setSearch('')
    setActiveInput('')
  }
  return (
    <Formik
      validationSchema={JourneySchema}
      initialValues={{
        Departure_station_name: '',
        Departure_station_id: '',
        Return_station_name: '',
        Return_station_id: '',
        Departure: new Date(),
        Return: new Date(),
        Duration: '',
        Distance: '',
      }}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
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
                      onClick={() => setActiveInput('departure')}
                      value={search}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearch(e.target.value)
                      }
                    />
                    {activeInput === 'departure' && (
                      <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-bl rounded-br max-h-36 overflow-y-auto">
                        {filtered?.map((station, index) => (
                          <div
                            onClick={() => {
                              setFieldValue(
                                'Departure_station_name',
                                station.Name
                              )
                              setFieldValue('Departure_station_id', station.ID)
                              handleResetSearch()
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
                {/* Return_station_name*/}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="Departure_station_name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Return station
                  </label>
                  <div className="mt-2 relative">
                    <Field
                      disabled={true}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      id="Return_station_name"
                      name="Return_station_name"
                      placeholder="Return station name"
                      type="input"
                    />
                    <ErrorMessage
                      className="text-red-900"
                      name="Return_station_name"
                    >
                      {(msg) => <div className="text-red-900">{msg}</div>}
                    </ErrorMessage>
                    <input
                      onClick={() => setActiveInput('return')}
                      value={search}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setSearch(e.target.value)
                      }
                    />
                    {activeInput === 'return' && (
                      <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-bl rounded-br max-h-36 overflow-y-auto">
                        {filtered?.map((station, index) => (
                          <div
                            onClick={() => {
                              setFieldValue('Return_station_name', station.Name)
                              setFieldValue('Return_station_id', station.ID)
                              handleResetSearch()
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

                <div className="sm:col-span-3">
                  <label
                    htmlFor="Departure"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Departure Date
                  </label>
                  <div className="mt-2">
                    <DateTimePicker
                      selectedDate={values.Departure}
                      name="Departure"
                      onSelect={(value: Date) =>
                        setFieldValue('Departure', value)
                      }
                    />
                    <ErrorMessage className="text-red-900" name="Departure">
                      {(msg) => <div className="text-red-900">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="Return"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Return Date
                  </label>
                  <div className="mt-2">
                    <DateTimePicker
                      selectedDate={values.Return}
                      name="Return"
                      onSelect={(value: Date) => {
                        setFieldValue('Return', value)
                        setFieldValue(
                          'Duration',
                          getDateDifferenceInMinutes(
                            values.Departure,
                            value
                          ).toFixed(0)
                        )
                      }}
                    />
                    <ErrorMessage className="text-red-900" name="Return">
                      {(msg) => <div className="text-red-900">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="Duration"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Duration (sec.)
                  </label>
                  <div className="mt-2">
                    <Field
                      disabled={true}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      id="Duration"
                      name="Duration"
                      placeholder="Duration"
                      type="number"
                    />

                    <ErrorMessage className="text-red-900" name="Duration">
                      {(msg) => <div className="text-red-900">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="sm:col-span-3">
                  <label
                    htmlFor="Distance"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Distance (m)
                  </label>
                  <div className="mt-2">
                    <Field
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      id="Distance"
                      name="Distance"
                      placeholder="Distance"
                      type="number"
                    />
                    <ErrorMessage className="text-red-900" name="Distance">
                      {(msg) => <div className="text-red-900">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>
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
