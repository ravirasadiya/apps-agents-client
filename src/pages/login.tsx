"use clients";

import AuthLayout from "@/component/layouts/AuthLayout";
import LoginForm from "@/component/login/login-form";
import { LoginFormFields, loginFormSchema } from "@/schemas/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { forwardRef, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { getRecords, LocalStorageKeys, setLocalStorage } from "./helper";
import { saveRecord } from "./helper/_api_wrapper";
import { EndpointUrl, endpointUrls } from "./helper/endpoint";
import { useToken } from "./hooks/get-user-login-status";
import { LoginResponse } from "../types/login";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { Button } from "@mui/material";
import SnackbarUI, { SnackbarRef } from "@/component/ui/snackbar/snackbar";

function Alert(props: AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Login() {
  const [isLoading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [token, setToken] = useToken();
  const _router = useRouter();
  const snackBarRef = useRef<SnackbarRef>(null);

  useEffect(() => {
    if (token) {
      _router.push("/");
    }
  }, [token]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    try {
      const validatedData = loginFormSchema.parse(data);
      console.log("Form data is valid:", validatedData);
      setLoading(true);
      saveRecord(endpointUrls[EndpointUrl.LOGIN], validatedData)
        .then(async (response: LoginResponse) => {
          // [TODO] mock response override to the api response.
          // const { refresh } = mockLoginResponse;
          const { refresh, access } = response ?? { refresh: "", access: "" };
          if (refresh) {
            setLocalStorage(LocalStorageKeys.ACCESS_TOKEN, access);
            setLocalStorage(LocalStorageKeys.REFRESH_TOKEN, refresh);
            await getRecords(endpointUrls[EndpointUrl.ME])
              .then((profile) => {
                setLocalStorage(LocalStorageKeys.PROFILE, profile);
              })
              .catch((error) => {
                // console.log("error", error);
                snackBarRef.current?.displaySnackbar(
                  "Error: There was some error while fetching the profile records",
                  "error"
                );
              });
            snackBarRef.current?.displaySnackbar(
              "Login successfully",
              "success"
            );
            _router.push("/");
          }
        })
        .catch((e) => console.error("getting errors while saving records", e))
        .finally(() => setLoading(false));
    } catch (error) {
      setLoading(false);
      console.error("Form validation failed:", error);
    }
  };

  return (
    <AuthLayout>
      <LoginForm
        onSubmit={handleSubmit(onSubmit)}
        errors={errors}
        register={register}
        isDataSubmitted={isLoading}
      />
      <div>
        <SnackbarUI ref={snackBarRef} />
      </div>
    </AuthLayout>
  );
}
