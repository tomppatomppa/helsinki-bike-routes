import { Field, Form, Formik, ErrorMessage } from 'formik'

import * as Yup from 'yup'
import { JourneyFormFields } from '../../types/journey'

interface JourneyFormProps {
  onCancel: () => void
  onSubmit: (value: JourneyFormFields) => void
}

const JourneySchema = Yup.object().shape({
  Departure_station_name: Yup.string(),
})

export const AddJourneyForm = (props: JourneyFormProps) => {
  const { onCancel, onSubmit } = props

  return (
    <Formik
      initialValues={{
        Departure_station_name: '',
        Departure_station_id: '',
      }}
      validationSchema={JourneySchema}
      onSubmit={onSubmit}
    >
      {() => (
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
                  <div className="mt-2">
                    <Field
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      id="Departure_station_name"
                      name="Departure_station_name"
                      placeholder="Departure station name"
                      type="text"
                    />
                    <ErrorMessage className="text-red-900" name="ID">
                      {(msg) => <div className="text-red-900">{msg}</div>}
                    </ErrorMessage>
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
