import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUser } from '../account/useUser';
import { UpdateAttendance } from '../../api/activity';

export default function useUpdateAttendance(id: string) {
  const queryClient = useQueryClient();
  const { currentUser } = useUser();
  const {
    mutate: attendanceAction,
    isPending,
    error,
  } = useMutation({
    mutationFn: async () => await UpdateAttendance(id),
    // onMutate: async () => {
    //   console.log('(onMutate) Current Activity ID: ', id);
    //   await queryClient.cancelQueries({
    //     queryKey: ['activities', id],
    //   });
    //   const prevActivity = await queryClient.getQueryData<Activity>([
    //     'activities',
    //     id,
    //   ]);
    //   await queryClient.setQueryData<Activity>(
    //     ['activities', id],
    //     (oldActivity) => {
    //       if (!oldActivity || !currentUser) return oldActivity;
    //       const isHost = oldActivity.hostUserId === currentUser.id;
    //       const isAttending = oldActivity.attendees?.some(
    //         (x) => x.id == currentUser.id
    //       );
    //       return {
    //         ...oldActivity,
    //         isCancelled: isHost
    //           ? !oldActivity.isCancelled
    //           : oldActivity.isCancelled,
    //         attendees: isAttending
    //           ? isHost
    //             ? oldActivity.attendees
    //             : oldActivity.attendees?.filter((x) => x.id !== currentUser.id)
    //           : [
    //               ...oldActivity.attendees!,
    //               {
    //                 id: currentUser.id,
    //                 displayName: currentUser.displayName,
    //                 imageUrl: currentUser.imageUrl,
    //                 bio: currentUser.bio,
    //               } as User,
    //             ],
    //       };
    //     }
    //   );
    //   return { prevActivity };
    // },
    // onError: async (
    //   error,
    //   context: { prevActivity: Activity | undefined } | undefined
    // ) => {
    //   console.error('Error updating attendance: ', error);
    //   if (context?.prevActivity) {
    //     await queryClient.setQueryData(
    //       ['activities', id],
    //       context?.prevActivity
    //     );
    //   }
    // },
  });
  return { attendanceAction, isPending, error };
}
