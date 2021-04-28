import React from "react";
import { Button, Card, Form } from "react-bootstrap";
import { FieldError, useForm } from "react-hook-form";
import { useAuth } from "../../context/context.auth";
import { Link, useHistory } from "react-router-dom";

export interface RegisterProps {}

export const ERR = {
  required: "Field is required",
  email: "Please provide a valid email",
  pwLength: "Password should have 8 characters",
  match: "Password does not match",
};

export type UserForm = {
  email: string | null;
  password: string | null;
  confirmPassword: string | null;
};

export interface IUserFormData {
  email: string;
  password: string;
}

const Register: React.FC<RegisterProps> = () => {
  const {
    register,
    formState: { isValid, errors },
    handleSubmit,
    getValues,
  } = useForm<UserForm>({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const { createUser, currentUser } = useAuth();
  const history = useHistory();

  /**
   * Registers a new user using AuthContext via Firebase.
   * @param data Valid form data from submit event
   */
  const handleRegister = (data: IUserFormData) => {
    const { email, password } = data;
    createUser(email, password)
      .then(() => history.push("/login"))
      .catch((err) => console.error(err));
  };

  return (
    <main className="app-thumbnail-container container-fluid container-xl">
      <div className="register h-100 d-flex align-items-center">
        <div className="col col-md-6 col-lg-4 mx-auto mt-n4">
          <Card className="mb-4">
            <Card.Body>
              <h3 className="mb-4 text-primary">Create Account</h3>

              <Form onSubmit={handleSubmit(handleRegister)} autoComplete="off">
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

                <Form.Group>
                  <Form.Label>Confirm password</Form.Label>
                  <Form.Control
                    type="password"
                    {...register("confirmPassword", {
                      required: ERR.required,
                      validate: {
                        matchesPreviousPassword: (value) => {
                          const { password } = getValues();
                          return password === value || ERR.match;
                        },
                      },
                    })}
                  />
                  <ErrorMessage error={errors?.confirmPassword} />
                </Form.Group>

                <Button
                  block
                  variant="primary"
                  disabled={!isValid}
                  type="submit"
                >
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
          <div className="text-center text-small">
            Do you have an account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </main>
  );
};

interface IFormErrorProps {
  error: FieldError | undefined;
}

export const ErrorMessage: React.FC<IFormErrorProps> = ({ error }) => {
  return error ? (
    <Form.Text className="text-danger">{error.message}</Form.Text>
  ) : null;
};

export default Register;
