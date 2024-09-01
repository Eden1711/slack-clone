import { useCallback, useMemo, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

type RequestType = { id: Id<"chanels"> };
type ResponseType = Id<"chanels"> | null;

type Option = {
  onSuccess?: (data: ResponseType) => void;
  onError?: (error: Error) => void;
  onSettled?: () => void;
  throwError?: boolean;
};

export const useRemoveChannel = () => {
  const [data, setData] = useState<ResponseType>(null);
  const [error, setError] = useState<Error | null>(null);

  const [status, setStatus] = useState<
    "success" | "pending" | "settled" | "error" | null
  >(null);

  const isPending = useMemo(() => status === "pending", [status]);
  const isError = useMemo(() => status === "error", [status]);
  const isSettled = useMemo(() => status === "settled", [status]);
  const isSuccess = useMemo(() => status === "success", [status]);

  const mutation = useMutation(api.channels.remove);

  const mutate = useCallback(
    async (values: RequestType, option?: Option) => {
      try {
        setData(null);
        setError(null);
        setStatus("pending");
        const response = await mutation(values);

        option?.onSuccess?.(response);
        return response;
      } catch (error) {
        setStatus("error");
        option?.onError?.(error as Error);

        if (option?.throwError) {
          throw error;
        }
      } finally {
        setStatus("settled");

        option?.onSettled?.();
      }
    },
    [mutation]
  );

  return { mutate, data, error, isPending, isError, isSettled, isSuccess };
};
