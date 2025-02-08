import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
//import { loginSchema } from "../features/auth/schema";
// import { login } from "../features/auth/api";
//import { LoginForm } from "@/features/auth/login-form";
import { z } from "zod";
import { loginSchema } from "../schemas/loginSchema";
import { LoginForm } from "../components/login-form";
import { login } from "../API/Auth";

const Login = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });
  // const navigate = useNavigate();

  // const onSubmit = async (data: z.infer<typeof loginSchema>) => {
  //   setLoading(true);
  //   try {
  //     const response = await login(data);
  //     const { token, role, name, email, image } = response.data;

  //     setToken(token);
  //     setRole(role);
  //     setName(name);
  //     setEmail(email);
  //     setImage(image);

  //     if (role !== "Admin" && role !== "Sub Admin") {
  //       toast.error("Only admins can access the dashboard");

  //       setLoading(false);
  //     } else {
  //       toast.success("You are logged in!");
  //       if(role === "Admin"){
  //         navigate("/");
  //       }
  //       else{
  //         navigate("/orders");
  //       }
  //     }
  //   } catch (error: any) {
  //     console.error("Login failed", error.response?.data || error.message);
  //     toast.error("Login failed. Please try again.");
  //     setLoading(false);
  //   }
  // };
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    console.log(data);

    login(data)
      .then((data: any) => {
        localStorage.setItem("id", data._id);
        localStorage.setItem("name", data.name);
        toast.success("you have logged");
        navigate("/");
      })
      .catch((error: any) => {
        toast.error(error.response.data.error);
      });
  };

  return (
    <main className="relative px-4 flex justify-center items-center h-screen">
      <img
        src="bg.webp"
        alt="bg"
        className="absolute object-cover w-full h-full"
      />
      <LoginForm
        onSubmit={form.handleSubmit(onSubmit)}
        register={form.register}
        errors={form.formState.errors}
      />
    </main>
  );
};

export default Login;
