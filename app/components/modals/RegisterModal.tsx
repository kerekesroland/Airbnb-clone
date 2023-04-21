"use client";

import useRegisterModal, {
  IRegisterModalStore,
} from "@/hooks/useRegisterModal";
import axios from "axios";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import PopupModal from "./PopupModal";

const RegisterModal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onClose, onOpen }: IRegisterModalStore = useRegisterModal();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    try {
      setLoading(true);
      await axios.post("/api/register", data);
      onClose();
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    console.log(data);
    setLoading(false);
  };
  return (
    <PopupModal
      title="Register"
      actionLabel="Continue"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      disabled={loading}
      isOpen={isOpen}
    />
  );
};

export default RegisterModal;
