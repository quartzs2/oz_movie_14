import { Avatar } from "@components";
import { useAuth } from "@hooks";

function MyPage() {
  const { user } = useAuth();
  const userName =
    user?.user_metadata?.name ||
    user?.email?.split("@")[0] ||
    "닉네임을 불러올 수 없습니다.";

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-gray-950">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-white">
            마이페이지
          </h1>

          <div className="flex flex-col items-start gap-8 md:flex-row">
            <div className="flex w-full flex-col items-center md:w-auto">
              <div className="mb-2 block w-full text-center text-sm font-medium text-gray-700 dark:text-gray-300">
                프로필 이미지
              </div>
              <Avatar size={120} user={user} />
            </div>

            <div className="w-full flex-1 space-y-4">
              <div>
                <div className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  닉네임
                </div>
                <p className="rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                  {userName}
                </p>
              </div>

              <div>
                <div className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  이메일
                </div>
                <p className="rounded-md border border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white">
                  {user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyPage;
