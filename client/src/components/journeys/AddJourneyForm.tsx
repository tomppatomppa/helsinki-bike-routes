import { Field, Form, Formik, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { JourneyFormFields } from '../../types/journey'
import DateTimePicker from '../common/DateTimePicker'
import { getDateDifferenceInSeconds } from '../../utils/getDateDifferenceInSeconds'
import { StationNameAndID } from '../../types/station'
import JourneysFormInput from './JourneyFormInput'

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
  Duration_sec: Yup.number()
    .required('Required')
    .min(600, 'Minimum duration is 600'),
  Return: Yup.date()
    .required('Required')
    .min(Yup.ref('Departure'), 'Must be after Departure date')
    .test(
      'time-difference',
      'Time difference must be at least 10 minutes',
      function (value: Date) {
        const departure = this.resolve(Yup.ref<Date>('Departure'))
        return getDateDifferenceInSeconds(value, departure) >= 600
      }
    ),
  Covered_distance_m: Yup.number()
    .required('Required')
    .min(10, 'Minimum 10 meters'),
})

export const AddJourneyForm = (props: JourneyFormProps) => {
  const { onCancel, onSubmit, stations } = props

  return (
    <Formik
      validationSchema={JourneySchema}
      initialValues={{
        Departure_station_name: '',
        Departure_station_id: 0,
        Return_station_name: '',
        Return_station_id: 0,
        Departure: new Date(),
        Return: '' as Date | any,
        Duration_sec: 0,
        Covered_distance_m: 0,
      }}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue }) => (
        <Form className="bg-neutral-200 p-12">
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
                      id="Departure_station_name"
                      data-testid="departure-input"
                      placeholder="Departure station name"
                      type="input"
                      className="block w-full rounded-md p-1.5  border border-neutral-300 text-gray-900"
                      component={JourneysFormInput}
                      value={values.Departure_station_name}
                      options={stations}
                      onClick={(station: StationNameAndID) => {
                        setFieldValue('Departure_station_name', station.Name)
                        setFieldValue('Departure_station_id', station.ID)
                      }}
                    />
                    <ErrorMessage
                      className="text-red-900"
                      name="Departure_station_name"
                    >
                      {(msg) => <div className="text-red-900">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>

                {/*Return_station_name*/}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="Return_station_name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Return station
                  </label>
                  <div className="mt-2 relative">
                    <Field
                      id="Return_station_name"
                      data-testid="return-input"
                      placeholder="Return station name"
                      type="input"
                      className="block w-full rounded-md p-1.5 border border-neutral-300 text-gray-900"
                      component={JourneysFormInput}
                      value={values.Return_station_name}
                      options={stations}
                      onClick={(station: StationNameAndID) => {
                        setFieldValue('Return_station_name', station.Name)
                        setFieldValue('Return_station_id', station.ID)
                      }}
                    />
                    <ErrorMessage
                      className="text-red-900"
                      name="Return_station_name"
                    >
                      {(msg) => <div className="text-red-900">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>

                {/*Departure Date*/}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="Departure"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Departure Date
                  </label>
                  <div className="mt-2 border border-neutral-300">
                    <DateTimePicker
                      selectedDate={values.Departure}
                      id="Departure"
                      onSelect={(value: Date) =>
                        setFieldValue('Departure', value)
                      }
                    />
                    <ErrorMessage className="text-red-900" name="Departure">
                      {(msg) => <div className="text-red-900">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>

                {/*Return Date*/}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="Return"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Return Date
                  </label>
                  <div className="mt-2  border border-neutral-300">
                    <DateTimePicker
                      selectedDate={values.Return}
                      id="Return"
                      onSelect={(value: Date) => {
                        setFieldValue('Return', value)
                        setFieldValue(
                          'Duration_sec',
                          getDateDifferenceInSeconds(
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

                {/* Duration (sec.)*/}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="Duration_sec"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Duration (sec.)
                  </label>
                  <div className="mt-2 ">
                    <Field
                      disabled={true}
                      className="block w-full rounded-md p-1.5  border border-neutral-300 text-gray-900"
                      id="Duration_sec"
                      name="Duration_sec"
                      placeholder="Duration_sec"
                      type="number"
                    />
                    <ErrorMessage className="text-red-900" name="Duration_sec">
                      {(msg) => <div className="text-red-900">{msg}</div>}
                    </ErrorMessage>
                  </div>
                </div>

                {/*  Covered distance (m)*/}
                <div className="sm:col-span-3">
                  <label
                    htmlFor="Covered_distance_m"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Covered distance (m)
                  </label>
                  <div className="mt-2">
                    <Field
                      className="block w-full rounded-md p-1.5  border border-neutral-300 text-gray-900"
                      id="Covered_distance_m"
                      name="Covered_distance_m"
                      placeholder="Covered_distance_m"
                      type="number"
                    />
                    <ErrorMessage
                      className="text-red-900"
                      name="Covered_distance_m"
                    >
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
                className=" bg-neutral-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-neutral-500 "
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
