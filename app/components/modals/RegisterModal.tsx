"use client";

import useRegisterModal, {
  IRegisterModalStore,
} from "@/hooks/useRegisterModal";
import styles from "./RegisterModal.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import PopupModal from "./PopupModal";
import { Box, Flex, Text } from "@chakra-ui/react";
import RegisterModalHeader from "../RegisterModalHeader/RegisterModalHeader";
import { InputController } from "../InputController/InputController";
import { useAuthSchemas } from "@/hooks/useAuthSchemas";
import { PasswordController } from "../PasswordController/PasswordController";
import { toast } from "react-hot-toast";
import CustomButton from "../Button/Button";
export interface IRegisterFormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterModal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onClose }: IRegisterModalStore = useRegisterModal();
  const { registerSchema } = useAuthSchemas();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, touchedFields },
  } = useForm<IRegisterFormInputs>({
    resolver: yupResolver(registerSchema),
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const usernameValue = watch("username");
  const emailValue = watch("email");
  const passwordValue = watch("password");
  const confirmPasswordValue = watch("confirmPassword");

  const onSubmit: SubmitHandler<IRegisterFormInputs> = async (data) => {
    try {
      setLoading(true);
      await axios.post("/api/register", data);
      toast.success("Registration success!");
      onClose();
      reset();
    } catch (error) {
      toast.error("Invalid credentials");
      console.log(error);
    } finally {
      setLoading(false);
    }
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
          label="Username"
          value={usernameValue}
        />
        <InputController
          register={register("email")}
          isTouched={touchedFields["email"]}
          error={errors["email"]?.message}
          label="Email"
          value={emailValue}
        />
        <PasswordController
          register={register("password")}
          isTouched={touchedFields["password"]}
          error={errors["password"]?.message}
          label="Password"
          value={passwordValue}
        />
        <PasswordController
          register={register("confirmPassword")}
          isTouched={touchedFields["confirmPassword"]}
          error={errors["confirmPassword"]?.message}
          label="Confirm Password"
          value={confirmPasswordValue}
        />
      </form>
    </Flex>
  );

  const modalFooter = (
    <Flex className={styles.footer__buttons}>
      <CustomButton
        onClick={() => {}}
        iconShow
        outline
        label="Sign in with Google"
        secondaryLabel="Google"
        icon={FcGoogle}
      />
      <CustomButton
        onClick={() => {}}
        iconShow
        outline
        label="Sign in with Github"
        secondaryLabel="Github"
        icon={AiFillGithub}
      />
      <Box mt="1rem" color="#B2BDCC" fontWeight="600">
        <Flex flexDirection="row" alignItems="center" gap="0.5rem">
          <Box>Already have an account?</Box>
          <Box>
            <Text cursor="pointer" color="#606060">
              Log in
            </Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );

  return (
    <PopupModal
      title="Register"
      body={modalBody}
      footer={modalFooter}
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
