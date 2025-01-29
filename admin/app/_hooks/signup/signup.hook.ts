import { useSignUpSerivce } from "@/app/_service/signup/signup";
import { useMutation } from "@tanstack/react-query";

export const useSignUpHook = () => {
  return useMutation({
    mutationFn: useSignUpSerivce,
  });
};
