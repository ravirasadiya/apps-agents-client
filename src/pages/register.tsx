import AuthLayout from "@/component/layouts/AuthLayout";
import RegisterForm from "@/component/register/register-form";
import SnackbarUI, {
  AlertPropsSeverity,
  SnackbarRef,
} from "@/component/ui/snackbar/snackbar";
import { RegisterFormFields, registerFormSchema } from "@/schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { SyntheticEvent, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { EndpointUrl, endpointUrls, saveRecord } from "./helper";
import { defaultErrorMessageForSystem } from "./helper/_api_wrapper";
import { useToken } from "./hooks/get-user-login-status";

export default function Register() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [token, setToken] = useToken();
  const snackBarRef = useRef<SnackbarRef>(null);
  const _router = useRouter();

  useEffect(() => {
    if (token) {
      _router.push("/");
    }
  }, [token]);

  const handleClose = (event?: SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSnackbar = (
    description?: string,
    severity?: AlertPropsSeverity
  ) => {
    snackBarRef.current?.displaySnackbar(description || "", severity);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormFields>({
    mode: "onBlur",
    reValidateMode: "onBlur",
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: any) => {
    try {
      const validatedData = registerFormSchema.parse(data);
      console.log("Form data is valid:", validatedData);
      setLoading(true);
      saveRecord(endpointUrls[EndpointUrl.CREATE_USER], validatedData)
        .then((response) => {
          const { pkid } = response ?? { pkid: 0, username: "" };
          console.log("pkid", pkid);
          if (pkid) {
            _router.push("/login");
          }
        })
        .catch((e) => {
          console.error("getting errors while saving records", e);
          snackBarRef.current?.displaySnackbar(
            e?.toString() ?? defaultErrorMessageForSystem,
            "error"
          );
        })
        .finally(() => setLoading(false));
    } catch (error) {
      setLoading(false);
      console.error("Form validation failed:", error);
    }
  };

  return (
    <AuthLayout>
      <RegisterForm
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
