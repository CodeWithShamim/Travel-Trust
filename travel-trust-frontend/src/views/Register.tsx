"use client";

import { Button, Col, Row, Upload, message } from "antd";
import loginImage from "@/assets/login.png";
import Image from "next/image";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useRegisterMutation } from "@/redux/api/authApi";
import { useRouter } from "next/navigation";
import { setValueToLocalStorage } from "@/utils/local-storage";
import { authKey } from "@/constants/storageKey";
import { UploadOutlined } from "@ant-design/icons";
import { useUploadImage } from "@/utils/upload";
import Link from "next/link";
import { useAppSelector } from "@/redux/hooks";
import { useEffect } from "react";

type FormValues = {
  username: string;
  email: string;
  contactNo: string;
  password: string;
  profileImage: string;
};

const Register = () => {
  const [userRegistration, { isLoading }] = useRegisterMutation();
  const { handleUpload, imageUrl, uploadLoading } = useUploadImage();
  const router = useRouter();

  const userData = useAppSelector((state) => state.user?.data) as any;

  useEffect(() => {
    if (userData?.id) {
      router.push("/");
    }
  }, [userData, router]);

  const onSubmit: SubmitHandler<FormValues> = async (data: any, reset: any) => {
    if (!imageUrl) {
      message.error("Upload profile image.");
      return;
    }

    try {
      const res = await userRegistration({
        ...data,
        profileImage: imageUrl,
      }).unwrap();
      if (res?.accessToken) {
        reset();
        message.success("Registartion successfully complete!");
        router.push("/");
      }

      setValueToLocalStorage(authKey, res?.accessToken);
    } catch (err: any) {
      message.error(err?.data?.message);
      console.log({ err });
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
        className="flex flex-col-reverse lg:flex-row"
      >
        <Col sm={20} md={8} lg={8}>
          <h1
            style={{
              margin: "15px 0px",
              fontSize: "20px",
              fontWeight: "700",
            }}
          >
            Register your account
          </h1>
          <div>
            <Form submitHandler={onSubmit}>
              <div className="gap-1 flex flex-col">
                <FormInput
                  name="username"
                  type="text"
                  size="large"
                  label="Username"
                />
                <FormInput
                  name="email"
                  type="email"
                  size="large"
                  label="Email"
                />
                <FormInput
                  name="contactNo"
                  type="number"
                  size="large"
                  label="contactNo"
                />
                <FormInput
                  name="password"
                  type="password"
                  size="large"
                  label="Password"
                />

                <Upload
                  customRequest={(e: any) =>
                    handleUpload(e.file, e.onSuccess, e.onError)
                  }
                  listType="picture"
                  maxCount={1}
                  disabled={uploadLoading}
                  showUploadList={{
                    showRemoveIcon: true,
                  }}
                >
                  <Button icon={<UploadOutlined />}>
                    Select profile image (Max: 1)
                  </Button>
                </Upload>
              </div>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={isLoading}
                disabled={isLoading}
                className="w-[100%] mt-4"
              >
                Sign up
              </Button>
            </Form>

            <div className="text-xs mt-3">
              Already have an account? <Link href={"/login"}>Login</Link>
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

export default Register;
