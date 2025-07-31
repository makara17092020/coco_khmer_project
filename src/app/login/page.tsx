'use client';

import { signIn } from "next-auth/react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormInputs = z.infer<typeof loginSchema>;

export default function AdminLoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/admin",
    });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side with image and overlay */}
      <div className="relative md:w-1/2 h-96 md:h-[40rem]">
        <img
          src="/images/artistic-photo.jpg"
          alt="Artistic background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/70 flex flex-col justify-center p-8">
          <h1 className="text-white text-4xl font-bold leading-tight">
            Welcome Back
          </h1>
          <p className="text-white text-base mt-2">Please login to continue</p>
        </div>
      </div>

      {/* Right side with form */}
      <div className="md:w-1/2 flex items-center justify-center p-10 bg-white">
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-semibold mb-4 text-green-700 flex justify-center">Admin Login</h2>

          {/* Email Input */}
          <Input
            type="email"
            placeholder="Email"
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
            className={`border ${
              errors.email ? "border-red-500" : "border-green-400"
            } focus:outline-none focus:ring-2 focus:ring-green-500`}
          />
          {errors.email && (
            <p className="text-red-600 text-sm mt-1">{errors.email.message}</p>
          )}

          {/* Password Input */}
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
            aria-invalid={errors.password ? "true" : "false"}
            className={`border ${
              errors.password ? "border-red-500" : "border-green-400"
            } focus:outline-none focus:ring-2 focus:ring-green-500`}
          />
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
          )}

          <div className="flex justify-center text-sm text-gray-500">
            <button
              type="button"
              className="underline hover:text-black"
              onClick={() => alert("Redirect to forgot password")}
            >
              Forgot password?
            </button>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </motion.form>
      </div>
    </div>
  );
}
