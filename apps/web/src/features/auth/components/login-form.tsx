import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { ControlledInput } from '@/components/form'
import { type LoginData, loginSchema } from '@packages/auth/schema'
import { useLogin } from '@/features/auth/api/login'

export function LoginForm() {
  const form = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const { control, handleSubmit } = form
  const loginMutation = useLogin(form)

  async function onSubmit(data: LoginData) {
    loginMutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-8'>
        <ControlledInput
          control={control}
          name='email'
          label='Correo electrónico'
          placeholder='ejemplo@mail.com'
          required
        />

        <ControlledInput
          control={control}
          name='password'
          label='Contraseña'
          placeholder='Escribe aquí tu contraseña'
          type='password'
          required
        />

        <Button
          type='submit'
          className='w-full'
          isLoading={loginMutation.isPending}
        >
          Iniciar Sesión
        </Button>
      </form>
    </Form>
  )
}
