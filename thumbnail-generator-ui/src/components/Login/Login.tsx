import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { FieldError, useForm } from "react-hook-form";
import { useAuth } from "../../context/context.auth";
import { ERR, ErrorMessage } from "../Register/Register";
import { Link, useHistory } from "react-router-dom";

export interface LoginProps {}

export type LoginForm = {
  email: string | null;
  password: string | null;
};

export interface ILoginFormData {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = () => {
  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
    getValues,
  } = useForm<LoginForm>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const history = useHistory();

  const { loginUser } = useAuth();

  /**
   * Login user using AuthContext
   * @param data field values from submit event
   */
  const handleLogin = (data: ILoginFormData) => {
    const { email, password } = data;

    loginUser(email, password)
      .then(() => history.push("/"))
      .catch((err) => console.log(err));
  };

  return (
    <main className="app-thumbnail-container container-fluid container-xl">
      <div className="register h-100 d-flex align-items-center">
        <div className="col col-md-6 col-lg-4 mx-auto mt-n4">
          <Card className="mb-4">
            <Card.Body>
              <h3 className="mb-4 text-primary">Login</h3>

              <Form onSubmit={handleSubmit(handleLogin)} autoComplete="off">
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    {...register("email", {
                      required: ERR.required,
                      pattern: {
                        value: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
                        message: ERR.email,
                      },
                    })}
                  />
                  <ErrorMessage error={errors?.email} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    {...register("password", {
                      required: ERR.required,
                      minLength: { value: 8, message: ERR.pwLength },
                      maxLength: { value: 8, message: ERR.pwLength },
                    })}
                  />
                  <ErrorMessage error={errors?.password} />
                </Form.Group>

                <Button
                  block
                  variant="primary"
                  disabled={!isValid}
                  type="submit"
                >
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="text-center text-small">
            Do you need an account? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
