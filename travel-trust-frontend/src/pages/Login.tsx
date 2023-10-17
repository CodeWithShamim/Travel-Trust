"use client";

import { Button, Col, Row, message } from "antd";
import loginImage from "@/assets/login.png";
import Image from "next/image";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { setTokenToLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constants/storageKey";
import Link from "next/link";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [userLogin, { isLoading }] = useLoginMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data: any, reset: any) => {
    try {
      const res = await userLogin(data).unwrap();
      if (res?.accessToken) {
        reset();
        message.success("User successfully login");
        router.push("/");
      }

      setTokenToLocalStorage(authKey, res?.accessToken);
    } catch (err: any) {
      message.error(err?.data?.message);
      console.log({ err });
    }
  };

  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={20} md={8} lg={8}>
        <h1
          style={{
            margin: "15px 0px",
          }}
        >
          Login your account
        </h1>
        <div>
          <Form submitHandler={onSubmit}>
            <div>
              <FormInput name="email" type="email" size="large" label="Email" />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="password"
                type="password"
                size="large"
                label="Password"
              />
            </div>
            <Button
              type="primary"
              htmlType="submit"
              loading={isLoading}
              disabled={isLoading}
              className="mt-4 w-full"
            >
              Login
            </Button>
          </Form>

          <div className="text-xs mt-3">
            Dont have an account? <Link href={"/register"}>Sign up</Link>
          </div>
        </div>
      </Col>
      <Col sm={20} md={16} lg={10}>
        <Image src={loginImage} width={500} alt="login image" />
      </Col>
    </Row>
  );
};

export default Login;
