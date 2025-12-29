"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import { useLogin } from "@/Context/LoginContext";
import { verify } from "crypto";




const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);

  const { login, loading, error: ctxError, isAuthenticated, user } = useLogin();

  const router = useRouter();
  React.useEffect(() => {
  
    if(!user) return;

    if(typeof window !== 'undefined') {
      router.push('/home');
    }

    
  }, [user, router]);
  

  const validate = () => {
    if (!email) return "Email is required";
    // simple email check
    const emailRe = /^\S+@\S+\.\S+$/;
    if (!emailRe.test(email)) return "Please enter a valid email address";
    if (!password) return "Password is required";
    if (password.length < 6) return "Password must be at least 6 characters";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError(null);
    const v = validate();
    if (v) {
      setValidationError(v);
      return;
    }
    try {
      await login({ email, password });
      // on success, isAuthenticated from context will update
    } catch (err) {
      // login throws and context sets error; nothing else to do here
    }
  };

  return (
    <div className="min-h-screen  text-black flex items-center justify-center p-6 bg-slate-50">
      <form
        onSubmit={handleSubmit}
        aria-labelledby="login-heading"
        className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg"
      >
        <h1 id="login-heading" className="m-0 mb-3 text-lg font-medium">
          Sign in to Meet
        </h1>

        {isAuthenticated ? (
          <div role="status" className="text-green-600 mb-3">
            Signed in successfully.
          </div>
        ) : null}

        {(validationError || ctxError) ? (
          <div role="alert" className="text-red-700 mb-3">
            {validationError ?? ctxError}
          </div>
        ) : null}

        {/* Email using MUI Autocomplete (freeSolo) to provide suggestions but allow free input */}
        <div className="mb-3">
          <Autocomplete
            freeSolo
            className="w-full"
            options={["example@domain.com", "user@gmail.com", "me@outlook.com"]}
            inputValue={email}
            onInputChange={(_event, newInputValue) => setEmail(newInputValue)}
            renderInput={(params) => (
              <TextField {...params} label="Email" required autoComplete="email" variant="outlined" fullWidth />
            )}
          />
        </div>

        <label htmlFor="password" className="block mb-1 text-black text-sm">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2.5 mb-3 rounded-md  border border-gray-300"
          autoComplete="current-password"
        />

        <button
        onClick={() => {
          login({email, password})
        }}
          type="submit"
          disabled={loading}
          className={`w-full py-2.5 rounded-md text-white ${loading ? "bg-slate-400 cursor-default" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>

        <p className="mt-3 text-sm text-gray-600">
          This is a mock login page. Hook up your authentication API where indicated.
        </p>
      </form>
    </div>
  );
};

export default Login;
