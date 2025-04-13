import BrandLogo from "../components/atoms/BrandLogo";
import Header from "../components/organisms/Header";
import LoginForm from "../components/organisms/LoginForm";

const Login = () => {
  return (
    <div className="size-full grid grid-cols-2">
      <img
        className="object-cover size-full"
        src="src/assets/images/login-bg.png"
        alt="login background"
      />
      <div className="relative flex justify-center items-center">
        <div className="absolute top-6 left-8">
          <BrandLogo />
        </div>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
