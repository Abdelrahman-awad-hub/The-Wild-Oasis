import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import { useSetting } from './useSetting';
import Spinner from '../../ui/Spinner';
import { useUpdateSetting } from './useUpdateSetting';

function UpdateSettingsForm() {

  const {
    setting: { minBookingLenth, maxBookingLenth, maxGuestsPerBooking, breakfastPrice } = {},
    isLoading,
  } = useSetting()

  const { updateSetting, isUpdating } = useUpdateSetting()


  function handelUpdate(e, field) {
    const { value } = e.target
    updateSetting({ [field]: value })
  }


  if (isLoading) return <Spinner />

  return (
    <Form>
      <FormRow label='Minimum nights/booking'>
        <Input type='number' id='min-nights' defaultValue={minBookingLenth} disabled={isUpdating} onBlur={(e) => {
          handelUpdate(e, 'minBookingLenth')
        }} />
      </FormRow>
      <FormRow label='Maximum nights/booking'>
        <Input type='number' id='max-nights' defaultValue={maxBookingLenth} disabled={isUpdating} onBlur={(e) => {
          handelUpdate(e, 'maxBookingLenth')
        }} />
      </FormRow>
      <FormRow label='Maximum guests/booking'>
        <Input type='number' id='max-guests' defaultValue={maxGuestsPerBooking} disabled={isUpdating} onBlur={(e) => {
          handelUpdate(e, 'maxGuestsPerBooking')
        }} />
      </FormRow>
      <FormRow label='Breakfast price'>
        <Input type='number' id='breakfast-price' defaultValue={breakfastPrice} disabled={isUpdating} onBlur={(e) => {
          handelUpdate(e, 'breakfastPrice')
        }} />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
