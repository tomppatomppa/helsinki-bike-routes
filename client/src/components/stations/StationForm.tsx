import { Field, Form, Formik, FormikHelpers } from 'formik'
import { StationFormFields } from '../../types/station'

interface StationFormProps {
  onCancel: () => void
  onSubmit: (value: StationFormFields) => void
}

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
      onSubmit={onSubmit}
    >
      <Form>
        <label htmlFor="ID">ID</label>
        <Field id="ID" name="ID" placeholder="ID" type="number" />
        <label htmlFor="Nimi">Nimi</label>
        <Field id="Nimi" name="Nimi" placeholder="Nimi" />
        <label htmlFor="Name">Name</label>
        <Field id="Name" name="Name" placeholder="Name" />
        <label htmlFor="Namn">Namn</label>
        <Field id="Namn" name="Namn" placeholder="Namn" />
        <label htmlFor="Osoite">Osoite</label>
        <Field id="Osoite" name="Osoite" placeholder="Osoite" />
        <label htmlFor="Adress">Adress</label>
        <Field id="Adress" name="Adress" placeholder="Adress" />
        <label htmlFor="Kaupunki">Kaupunki</label>
        <Field id="Kaupunki" name="Kaupunki" placeholder="Kaupunki" />
        <label htmlFor="Stad">Stad</label>
        <Field id="Stad" name="Stad" placeholder="Stad" />
        <label htmlFor="Operaattor">Operaattor</label>
        <Field id="Operaattor" name="Operaattor" placeholder="Operaattor" />
        <label htmlFor="Kapasiteet">Kapasiteet</label>
        <Field
          id="Kapasiteet"
          name="Kapasiteet"
          placeholder="Kapasiteet"
          type="number"
        />
        <label htmlFor="x">x</label>
        <Field id="x" name="x" placeholder="x" type="number" />
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
    </Formik>
  )
}
