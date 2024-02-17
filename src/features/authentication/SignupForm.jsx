import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useSignup } from "./useSignup";
import SpinnerMini from './../../ui/SpinnerMini';

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {

  const { register, formState, getValues, handleSubmit, reset } = useForm()
  const { signup, isLoading } = useSignup()

  const { errors } = formState

  function onSubmit({ fullName, email, password }) {
    signup({ fullName, email, password }, { onSettled: () => reset() })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>

      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input type="text" id="fullName" disabled={isLoading} {...register('fullName', {
          required: 'This is required field'
        })} />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input type="email" id="email" disabled={isLoading} {...register('email', {
          required: 'This is required field', pattern: {
            value: /\S+@\S+\.\S+/,
            message: 'Please provide a valid email address'
          }
        })} />
      </FormRow>

      <FormRow label="Password (min 8 characters)" error={errors?.password?.message}>
        <Input type="password" id="password" disabled={isLoading} {...register('password', {
          required: 'This is required field', minLength: {
            value: 8,
            message: 'Password needs a minimum of 8 characters'
          }
        })} />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input type="password" id="passwordConfirm" disabled={isLoading} {...register('passwordConfirm', {
          required: 'This is required field', validate: (value) => value === getValues().password || 'passwords need to match'
        })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" disabled={isLoading} type="reset">
          Cancel
        </Button>
        <Button disabled={isLoading}> {!isLoading ? 'Create new user' : <SpinnerMini />}</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
