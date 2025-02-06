import { getAllAdminsListService } from "@/app/_service/admins/admins";
import { useQuery } from "@tanstack/react-query";

export const useAdminHook = () => {
  return useQuery({
    queryKey: ["all-admin"],
    queryFn: getAllAdminsListService,
  });
};
