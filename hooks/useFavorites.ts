import { useRouter } from "next/navigation";
import useLoginModal from "./useLoginModal";
import { useCallback, useMemo } from "react";
import { IUser } from "@/app/models";
import axios from "axios";
import { toast } from "react-hot-toast";

interface IProps {
  user: IUser;
  id: string;
}

export const useFavorites = ({ user, id }: IProps) => {
  const { onOpen } = useLoginModal();
  const router = useRouter();
  const hasFavorites = useMemo(() => {
    const favorites = user?.favourites || [];

    return favorites.includes(id);
  }, [id, user?.favourites]);

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      if (!user) {
        onOpen?.();
      }

      try {
        let call;
        if (hasFavorites) {
          call = () => axios.delete(`/api/addToFavorites/${id}`);
        } else {
          call = () => axios.post(`/api/addToFavorites/${id}`);
        }

        await call();
        toast?.success("Successfully modified favorites!");
        router.refresh();
      } catch (error) {
        toast.error("Something went wrong!");
      }
    },
    [hasFavorites, id, onOpen, router, user]
  );

  return {
    hasFavorites,
    toggleFavorite,
  };
};

export default useFavorites;
