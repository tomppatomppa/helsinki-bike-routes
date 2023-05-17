import { Field, Form, Formik, ErrorMessage } from 'formik'
import { StationFormFields } from '../../types/station'
import * as Yup from 'yup'
import { getSwedishCityName } from '../../utils/getSwedishCityName'

interface StationFormProps {
  nextAvailableID: number | null
  onCancel: () => void
  onSubmit: (value: StationFormFields) => void
}

const StationSchema = Yup.object().shape({
  ID: Yup.number().integer().min(1, 'Min value 1').required('Required'),
  Nimi: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  Name: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  Namn: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  Osoite: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  Adress: Yup.string()
    .min(3, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  Operaattor: Yup.string().optional().max(50, 'Too Long!'),
  Kaupunki: Yup.string().optional(),
  Stad: Yup.string()
    .optional()
    .test(
      'city-match',
      'The Swedish city name must match the Finnish city name',
      function (value) {
        const { Kaupunki } = this.parent
        if (!Kaupunki && !value) return true
        return getSwedishCityName(Kaupunki) === value
      }
    ),
  Kapasiteet: Yup.number()
    .integer()
    .min(0, 'Cannot be negative')
    .required('Required'),
  x: Yup.number()
    .min(-90, 'Min longitude is -90')
    .max(90, 'Max longitude is 90')
    .required('Required'),
  y: Yup.number()
    .min(-180, 'Min latitude is -180')
    .max(180, 'Max latitude is 180')
    .required('Required'),
})

export const StationForm = (props: StationFormProps) => {
  const { onCancel, onSubmit, nextAvailableID } = props

  return (
    <Formik
      initialValues={{
        ID: 0,
        Nimi: '',
        Name: '',
        Namn: '',
        Osoite: '',
        Adress: '',
        Kaupunki: '',
        Stad: '',
        Operaattor: '',
        Kapasiteet: 0,
        x: 0,
        y: 0,
      }}
      validationSchema={StationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form className="bg-neutral-200 p-12 rounded-md">
          <div className="space-y-12 mt-16">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Create a new station
              </h2>

              <div className="md:mt-10 grid grid-cols-1 gap-x-6 md:gap-y-8 sm:grid-cols-6">
                {/* ID*/}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="ID"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ID
                  </label>
                  <div className="mt-2">
                    <Field
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      id="ID"
                      name="ID"
                      placeholder="ID"
                      type="number"
                    />
                    {nextAvailableID && (
                      <div className="text-red-900">
                        Next available ID : {nextAvailableID}
                      </div>
                    )}
                    <ErrorMessage className="text-red-900" name="ID">
                      {(msg) => <div className="text-red-900">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>

                {/* Operaattor*/}
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
                </div>

                {/*Nimi*/}
                <div className="sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="Nimi"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nimi
                  </label>
                  <div className="mt-2">
                    <Field
                      id="Nimi"
                      name="Nimi"
                      placeholder="Nimi"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage className="text-red-900" name="Nimi">
                      {(msg) => <div className="text-red-900">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>

                {/*Namn*/}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="Namn"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Namn
                  </label>
                  <div className="mt-2">
                    <Field
                      id="Namn"
                      name="Namn"
                      placeholder="Namn"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage className="text-red-900" name="Namn">
                      {(msg) => <div className="text-red-900">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>

                {/*Name*/}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="Name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <Field
                      id="Name"
                      name="Name"
                      placeholder="Name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage className="text-red-900" name="Name">
                      {(msg) => <div className="text-red-900">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>

                {/* Osoite*/}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="Osoite"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Osoite
                  </label>
                  <div className="mt-2">
                    <Field
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      id="Osoite"
                      name="Osoite"
                      placeholder="Osoite"
                      type="text"
                    />
                    <ErrorMessage className="text-red-900" name="Osoite">
                      {(msg) => <div className="text-red-900">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>

                {/* Adress*/}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="Adress"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Adress
                  </label>
                  <div className="mt-2">
                    <Field
                      id="Adress"
                      name="Adress"
                      placeholder="Adress"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage className="text-red-900" name="Adress">
                      {(msg) => <div className="text-red-900">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>

                {/* Kaupunki*/}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="Kaupunki"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Kaupunki
                  </label>
                  <div className="mt-2">
                    <Field
                      as="select"
                      id="Kaupunki"
                      name="Kaupunki"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="">Select a city</option>
                      <option value="Helsinki">Helsinki</option>
                      <option value="Espoo">Espoo</option>
                      <option value="Vantaa">Vantaa</option>
                    </Field>
                    <ErrorMessage className="text-red-900" name="Kaupunki">
                      {(msg) => <div className="text-red-900">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>

                {/* Stad*/}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="Stad"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Stad
                  </label>
                  <div className="mt-2">
                    <Field
                      as="select"
                      id="Stad"
                      name="Stad"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                    >
                      <option value="">Select a city</option>
                      <option value="Helsingfors">Helsingfors</option>
                      <option value="Esbo">Esbo</option>
                      <option value="Vanda">Vanda</option>
                    </Field>
                    <ErrorMessage className="text-red-900" name="Stad">
                      {(msg) => <div className="text-red-900">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>

                {/* Kapasiteet*/}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="Kapasiteet"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Kapasiteet
                  </label>
                  <div className="mt-2">
                    <Field
                      id="Kapasiteet"
                      name="Kapasiteet"
                      min={0}
                      placeholder="Kapasiteet"
                      type="number"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <ErrorMessage className="text-red-900" name="Kapasiteet">
                      {(msg) => <div className="text-red-900">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>

                {/* X and Y*/}
                <div className="sm:col-span-3 flex flex-row">
                  <div>
                    <label
                      htmlFor="x"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Longitude(x)
                    </label>
                    <div className="mt-2">
                      <Field
                        id="x"
                        name="x"
                        placeholder="x"
                        type="number"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <ErrorMessage className="text-red-900" name="x">
                        {(msg) => <div className="text-red-900">{msg}</div>}
                      </ErrorMessage>
                    </div>
                  </div>
                  <div className="ml-1">
                    <label
                      htmlFor="y"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Latitude(y)
                    </label>
                    <div className="mt-2">
                      <Field
                        id="y"
                        name="y"
                        placeholder="y"
                        type="number"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <ErrorMessage className="text-red-900" name="y">
                        {(msg) => <div className="text-red-900">{msg}</div>}
                      </ErrorMessage>
                    </div>
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
