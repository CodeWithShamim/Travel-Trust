"use client";

import React, { useEffect, useState } from "react";
import { Form, Button, message } from "antd";

import { useRouter } from "next/navigation";
import GeneralField from "./GeneralField";

const ADD = "ADD";
const EDIT = "EDIT";

const ServiceForm = ({ mode = ADD }: { mode: string }) => {
  const router = useRouter();

  const [form] = Form.useForm();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  // useEffect(() => {
  //   if (mode === EDIT) {
  //     const { id } = param;
  //     const getData = hazardPerceptions?.filter(
  //       (perception) => perception.id === id
  //     );
  //     if (getData?.length === undefined) return;
  //     const Perception = getData[0];
  //     form.setFieldsValue({
  //       description: Perception.description,
  //       category: Perception.category,
  //       title: Perception.title,
  //     });
  //     setUploadFile(Perception?.video[0]);
  //   }
  // }, [form, hazardPerceptions, mode, param, props]);

  const onFinish = () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then(async (values) => {
        if (!imageUrl) {
          message.error("Image is required!");
          setSubmitLoading(false);
          return;
        }

        const filterData = Object.fromEntries(
          Object.entries(values)?.filter(([key, value]) => value !== undefined)
        );

        if (mode === ADD) {
        }

        if (mode === EDIT) {
        }
      })
      .catch((info) => {
        setSubmitLoading(false);
        // message.error("Please enter all required field ");
      });
  };

  return (
    <>
      <Form layout="vertical" form={form} name="Services">
        <div className="container">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold p-2">
              {mode === "ADD" ? "Add New Service" : `Edit Service`}{" "}
            </h2>
            <div className="mb-3">
              <Button
                className="mr-2"
                onClick={() => {
                  router.back();
                }}
              >
                Discard
              </Button>
              <Button
                type="primary"
                onClick={() => onFinish()}
                htmlType="submit"
                loading={submitLoading}
              >
                {mode === "ADD" ? "Add" : `Save`}
              </Button>
            </div>
          </div>
        </div>

        <div className="container">
          <GeneralField setImageUrl={setImageUrl} />
        </div>
      </Form>
    </>
  );
};

export default ServiceForm;
