"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { useAuthSchemas } from "@/hooks/useAuthSchemas";
import useLoginModal, { ILoginModalStore } from "@/hooks/useLoginModal";
import { Box, Flex, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";

import CustomButton from "../Button/Button";
import { InputController } from "../InputController/InputController";
import LoginModalHeader from "../LoginModalHeader/LoginModalHeader";
import { PasswordController } from "../PasswordController/PasswordController";
import PopupModal from "./PopupModal";
import styles from "./RegisterModal.module.scss";
import { useRouter } from "next/navigation";

export interface ILoginFormInputs {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const LoginModal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onClose }: ILoginModalStore = useLoginModal();
  const { loginSchema } = useAuthSchemas();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, touchedFields },
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(loginSchema),
    reValidateMode: "onChange",
    mode: "onChange",
  });

  const emailValue = watch("email");
  const passwordValue = watch("password");

  const router = useRouter();

  const onSubmit: SubmitHandler<ILoginFormInputs> = (data) => {
    setLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setLoading(false);

      if (callback?.ok) {
        toast.success("Logged in");
        router.refresh();
        onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };

  const modalBody = (
    <Flex flexDirection="column" gap="1.5rem" justifyContent="center">
      <LoginModalHeader
        title="Welcome Back!"
        subTitle="Login to your account"
      />
      <form>
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
      </form>
    </Flex>
  );

  const modalFooter = (
    <Flex className={styles.footer__buttons}>
      <CustomButton
        onClick={() => {
          signIn("google");
        }}
        iconShow
        outline
        label="Sign in with Google"
        secondaryLabel="Google"
        icon={FcGoogle}
      />
      <CustomButton
        onClick={() => {
          signIn("github");
        }}
        iconShow
        outline
        label="Sign in with Github"
        secondaryLabel="Github"
        icon={AiFillGithub}
      />
      <Box mt="1rem" color="#B2BDCC" fontWeight="600">
        <Flex flexDirection="row" alignItems="center" gap="0.5rem">
          <Box>Don`t have an account?</Box>
          <Box>
            <Text cursor="pointer" color="#606060">
              Sign up
            </Text>
          </Box>
        </Flex>
      </Box>
    </Flex>
  );

  return (
    <PopupModal
      title="Login"
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

export default LoginModal;
