import LoginForm from './LoginForm';

function LoginPage() {

  return (
    <div className="w-full flex justify-center">
      <div>

        <h1 className='text-center'>Sign in</h1>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;