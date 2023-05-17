import { Field, Form, Formik, ErrorMessage } from 'formik'
import { StationFormFields } from '../../types/station'
import * as Yup from 'yup'

interface StationFormProps {
  onCancel: () => void
  onSubmit: (value: StationFormFields) => void
}

const StationSchema = Yup.object().shape({
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
  Kaupunki: Yup.string().optional().max(50, 'Too Long!'),
  Stad: Yup.string().optional().max(50, 'Too Long!'),
  Operaattor: Yup.string().optional().max(50, 'Too Long!'),
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
  const { onCancel, onSubmit } = props

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
        <Form className="flex flex-col">
          <label htmlFor="ID">ID</label>
          <Field id="ID" name="ID" placeholder="ID" type="number" />

          <label htmlFor="Nimi">Nimi</label>
          <Field id="Nimi" name="Nimi" placeholder="Nimi" />
          <ErrorMessage className="text-red-900" name="Nimi">
            {(msg) => <div className="text-red-900">{msg}</div>}
          </ErrorMessage>

          <label htmlFor="Name">Name</label>
          <Field id="Name" name="Name" placeholder="Name" />
          <ErrorMessage className="text-red-900" name="Name">
            {(msg) => <div className="text-red-900">{msg}</div>}
          </ErrorMessage>

          <label htmlFor="Namn">Namn</label>
          <Field id="Namn" name="Namn" placeholder="Namn" />
          <ErrorMessage className="text-red-900" name="Namn">
            {(msg) => <div className="text-red-900">{msg}</div>}
          </ErrorMessage>

          <label htmlFor="Osoite">Osoite</label>
          <Field id="Osoite" name="Osoite" placeholder="Osoite" />
          <ErrorMessage className="text-red-900" name="Osoite">
            {(msg) => <div className="text-red-900">{msg}</div>}
          </ErrorMessage>

          <label htmlFor="Adress">Adress</label>
          <Field id="Adress" name="Adress" placeholder="Adress" />
          <ErrorMessage className="text-red-900" name="Adress">
            {(msg) => <div className="text-red-900">{msg}</div>}
          </ErrorMessage>

          <label htmlFor="Kaupunki">Kaupunki</label>
          <Field id="Kaupunki" name="Kaupunki" placeholder="Kaupunki" />
          <ErrorMessage className="text-red-900" name="Kaupunki">
            {(msg) => <div className="text-red-900">{msg}</div>}
          </ErrorMessage>

          <label htmlFor="Stad">Stad</label>
          <Field id="Stad" name="Stad" placeholder="Stad" />
          <ErrorMessage className="text-red-900" name="Stad">
            {(msg) => <div className="text-red-900">{msg}</div>}
          </ErrorMessage>

          <label htmlFor="Operaattor">Operaattor</label>
          <Field id="Operaattor" name="Operaattor" placeholder="Operaattor" />
          <ErrorMessage className="text-red-900" name="Operaattor">
            {(msg) => <div className="text-red-900">{msg}</div>}
          </ErrorMessage>

          <label htmlFor="Kapasiteet">Kapasiteet</label>
          <Field
            id="Kapasiteet"
            name="Kapasiteet"
            min={0}
            placeholder="Kapasiteet"
            type="number"
          />
          <ErrorMessage className="text-red-900" name="Kapasiteet">
            {(msg) => <div className="text-red-900">{msg}</div>}
          </ErrorMessage>

          <label htmlFor="x">x</label>
          <Field id="x" name="x" placeholder="x" type="number" />
          <ErrorMessage className="text-red-900" name="x">
            {(msg) => <div className="text-red-900">{msg}</div>}
          </ErrorMessage>

          <label htmlFor="y">y</label>
          <Field id="y" name="y" placeholder="y" type="number" />
          <div className="flex justify-evenly mt-12">
            <button className="p-2 bg-green-200" type="submit">
              Submit
            </button>
            <button className="p-2 bg-red-200" type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
