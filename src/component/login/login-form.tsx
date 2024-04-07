import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Box, Button, FormHelperText, Typography } from "@mui/material";
import { useState } from "react";

interface LoginFormProps {
  onSubmit: any;
  errors: any;
  register: any;
  isDataSubmitted: boolean;
}

const LoginForm = ({
  onSubmit,
  errors,
  register,
  isDataSubmitted,
}: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Box className="sign">
        <Box className="sign_min">
          <Typography component={"h2"} className="def_h2_hd">
            LOGO HERE
          </Typography>
          <Typography className="def_p_titl">Login</Typography>

          <Box className="flx_log_input">
            <form onSubmit={onSubmit}>
              <Box className="input-box">
                <input
                  type="text"
                  id="username"
                  autoComplete="username"
                  placeholder="Username"
                  autoFocus
                  className="user-input"
                  {...register("username")}
                />
                <FormHelperText
                  sx={{
                    color: "error.main",
                  }}
                >
                  {errors?.email?.message ?? ""}
                </FormHelperText>
              </Box>

              <Box className="input-box">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="user-input"
                  autoComplete="current-password"
                  placeholder="Password"
                  {...register("password")}
                />
                <Box
                  className="toggleButtonv2"
                  onClick={handleClickShowPassword}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </Box>
                <FormHelperText
                  sx={{
                    color: "error.main",
                  }}
                >
                  {errors?.password?.message ?? ""}
                </FormHelperText>
              </Box>

              <Button
                disabled={isDataSubmitted}
                type="submit"
                className="def_btn"
              >
                {isDataSubmitted ? "Logining..." : "Login"}
              </Button>
            </form>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default LoginForm;
