import { bookmarkApi, bookmarkKeys } from "@api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { useAuth } from "./useAuth";

export function useBookmarkCheck({ movieId }) {
  const { user } = useAuth();

  return useQuery({
    enabled: Boolean(user) && Boolean(movieId),
    queryFn: () => bookmarkApi.checkBookmark({ movieId, userId: user.id }),
    queryKey: bookmarkKeys.check(user?.id, movieId),
  });
}

export function useBookmarks() {
  const { user } = useAuth();

  return useQuery({
    enabled: Boolean(user),
    queryFn: () => bookmarkApi.getBookmarks({ userId: user.id }),
    queryKey: bookmarkKeys.list(user?.id),
  });
}

export function useBookmarkToggle() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const addMutation = useMutation({
    mutationFn: (movie) => bookmarkApi.addBookmark({ movie, userId: user.id }),
    onError: (_, __, context) => {
      toast.error("북마크 추가에 실패했습니다.");
      if (context?.previousCheck !== undefined) {
        queryClient.setQueryData(context.checkKey, context.previousCheck);
      }
    },
    onMutate: async (movie) => {
      const checkKey = bookmarkKeys.check(user.id, movie.id);

      await queryClient.cancelQueries({ queryKey: checkKey });

      const previousCheck = queryClient.getQueryData(checkKey);

      queryClient.setQueryData(checkKey, true);

      return { checkKey, previousCheck };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: bookmarkKeys.all });
    },
    onSuccess: () => {
      toast.success("북마크에 추가되었습니다.");
    },
  });

  const removeMutation = useMutation({
    mutationFn: (movieId) =>
      bookmarkApi.removeBookmark({ movieId, userId: user.id }),
    onError: (_, __, context) => {
      toast.error("북마크 취소에 실패했습니다.");
      if (context?.previousCheck !== undefined) {
        queryClient.setQueryData(context.checkKey, context.previousCheck);
      }
    },
    onMutate: async (movieId) => {
      const checkKey = bookmarkKeys.check(user.id, movieId);

      await queryClient.cancelQueries({ queryKey: checkKey });

      const previousCheck = queryClient.getQueryData(checkKey);

      queryClient.setQueryData(checkKey, false);

      return { checkKey, previousCheck };
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: bookmarkKeys.all });
    },
    onSuccess: () => {
      toast.success("북마크가 취소되었습니다.");
    },
  });

  return {
    addBookmark: addMutation.mutate,
    isLoading: addMutation.isPending || removeMutation.isPending,
    removeBookmark: removeMutation.mutate,
  };
}
