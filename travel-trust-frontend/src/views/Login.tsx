"use client";

import { Button, Col, Row, message } from "antd";
import loginImage from "@/assets/login.webp";
import Image from "next/image";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "@/redux/api/authApi";
import { setValueToLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constants/storageKey";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [userLogin, { isLoading }] = useLoginMutation();
  const router = useRouter();
  const userData = useAppSelector((state) => state.user?.data) as any;
  const defaultEmail = "dummyuser@gmail.com";
  const defaultPass = "Test12345";

  useEffect(() => {
    if (userData?.id) {
      router.push("/");
    }
  }, [userData, router]);

  const onSubmit: SubmitHandler<FormValues> = async (data: any, reset: any) => {
    const newData = {
      email: data?.email || defaultEmail,
      password: data?.password || defaultPass,
    };

    try {
      const res = await userLogin(newData).unwrap();
      if (res?.accessToken) {
        reset();
        message.success("User successfully login");
        router.replace("/");
      }

      setValueToLocalStorage(authKey, res?.accessToken);
    } catch (err: any) {
      message.error(err?.data?.message);
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto py-4">
      <Row
        justify="center"
        align="middle"
        style={{
          minHeight: "100vh",
        }}
        className="flex flex-col-reverse md:flex-row"
      >
        <Col sm={20} md={8} lg={8}>
          <h1
            style={{
              margin: "15px 0px",
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            Login your account
          </h1>
          <div>
            <Form submitHandler={onSubmit}>
              <div className="gap-1 flex flex-col">
                <div>
                  <FormInput
                    name="email"
                    type="email"
                    size="large"
                    label="Email"
                    defaultValue={defaultEmail}
                  />
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
                    defaultValue={defaultPass}
                  />
                </div>
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
          <Image
            src={loginImage}
            width={500}
            layout="responsive"
            loading="lazy"
            objectFit="cover"
            alt="login image"
          />
        </Col>
      </Row>
    </div>
  );
};

export default Login;
