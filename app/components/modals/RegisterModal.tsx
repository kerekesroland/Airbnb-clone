"use client";

import useRegisterModal, {
  IRegisterModalStore,
} from "@/hooks/useRegisterModal";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import PopupModal from "./PopupModal";
import { Box, Flex } from "@chakra-ui/react";
import RegisterModalHeader from "../RegisterModalHeader/RegisterModalHeader";
import { InputController } from "../InputController/InputController";
import { useAuthSchemas } from "@/hooks/useAuthSchemas";
export interface IRegisterFormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterModal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onClose, onOpen }: IRegisterModalStore = useRegisterModal();
  const { registerSchema } = useAuthSchemas();
  const {
    register,
    handleSubmit,
    reset,

    formState: { errors, touchedFields },
  } = useForm<IRegisterFormInputs>({
    resolver: yupResolver(registerSchema),
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<IRegisterFormInputs> = async (data) => {
    try {
      setLoading(true);
      await axios.post("/api/register", data);
      onClose();
      reset();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    console.log(data);
    setLoading(false);
  };

  const modalBody = (
    <Flex flexDirection="column" gap="1.5rem" justifyContent="center">
      <RegisterModalHeader
        title="Welcome to Airbnb!"
        subTitle="Create your account"
      />
      <form>
        <InputController
          register={register("username")}
          isTouched={touchedFields["username"]}
          error={errors["username"]?.message}
          placeholder="Username"
        />
        <InputController
          register={register("email")}
          isTouched={touchedFields["email"]}
          error={errors["email"]?.message}
          placeholder="Email"
        />
        <InputController
          register={register("password")}
          isTouched={touchedFields["password"]}
          error={errors["password"]?.message}
          placeholder="Password"
        />
        <InputController
          register={register("confirmPassword")}
          isTouched={touchedFields["confirmPassword"]}
          error={errors["confirmPassword"]?.message}
          placeholder="Confirm Password"
        />
      </form>
    </Flex>
  );

  return (
    <PopupModal
      title="Register"
      body={modalBody}
      actionLabel="Continue"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      disabled={loading}
      isOpen={isOpen}
      reset={reset}
    />
  );
};

export default RegisterModal;
