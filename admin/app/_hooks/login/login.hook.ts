import { useLoginService } from "@/app/_service/login/login";
import { useMutation } from "@tanstack/react-query";

export const useLoginHook = () => {
  return useMutation({
    mutationFn: useLoginService,
  });
};
