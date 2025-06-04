import RegistrationForm from './RegistrationForm';

function RegistrationPage() {

  return (
    <div className="w-full flex justify-center">
      <div>
        <h1 className='text-center'>Sign up</h1>
        <RegistrationForm />
      </div>
    </div>
  );
}

export default RegistrationPage;