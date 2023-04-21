"use client";

import useRegisterModal, {
  IRegisterModalStore,
} from "@/hooks/useRegisterModal";
import axios from "axios";
import { useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

const RegisterModal = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { isOpen, onClose, onOpen }: IRegisterModalStore = useRegisterModal();

  return <div></div>;
};

export default RegisterModal;
