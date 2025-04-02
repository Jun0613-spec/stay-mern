import { ChangeEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import { useUpdateUser } from "@/hooks/users/use-update-user";
import { useDeleteUser } from "@/hooks/users/use-delete-user";
import { useConfirmModal } from "@/hooks/use-confirm";

import { UserFormData } from "@/types";

import UserAvatar from "@/components/user-avatar";
import Button from "@/components/button";
import Spinner from "@/components/spinner";

import { cn } from "@/lib/utils";

import { useAuth } from "@/contexts/auth-context";

const MyAccount = () => {
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { currentUser } = useAuth();
  const { mutate: updateUser, isPending } = useUpdateUser();
  const { mutate: deleteUser, isPending: isDeletePending } = useDeleteUser();

  const [ConfirmModal, confirm] = useConfirmModal(
    "Delete Account",
    "This will permanently delete the account. Are you sure you want to proceed?"
  );

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<UserFormData>({
    defaultValues: {
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      avatarUrl: undefined
    },
    mode: "onChange"
  });

  const avatar = watch("avatarUrl");

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      setValue("avatarUrl", file);

      const previewUrl = URL.createObjectURL(file);

      setAvatarPreview(previewUrl);
    }
  };

  const handleRemoveImage = () => {
    setValue("avatarUrl", undefined);
    setAvatarPreview(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const onSubmit = async (values: UserFormData) => {
    const formData = new FormData();

    formData.append("firstName", values.firstName);
    formData.append("lastName", values.lastName);

    if (values.avatarUrl) formData.append("avatarUrl", values.avatarUrl);

    await updateUser(formData);
  };

  const handleDelete = async () => {
    const confirmed = await confirm();

    if (confirmed) {
      deleteUser();
    }
  };

  return (
    <>
      <ConfirmModal />
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold mb-6">My Account</h2>

        <div className="flex items-center gap-2">
          <p className="text-2xl font-bold">Hi, {currentUser?.firstName}</p>
          <p
            className={cn(
              "ml-2 text-sm font-semibold rounded-full px-3 py-1",
              currentUser?.role === "BUSINESS"
                ? "bg-indigo-600 dark:bg-indigo-800 text-white"
                : "bg-lime-600 dark:bg-lime-800 text-white"
            )}
          >
            {currentUser?.role}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center gap-5">
              <UserAvatar
                avatarUrl={avatarPreview || currentUser?.avatarUrl || ""}
                firstName={currentUser?.firstName}
                className="w-20 h-20 text-5xl"
              />
              <div className="flex flex-col">
                <p className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Profile Image
                </p>
                <p className="text-sm text-neutral-500">
                  Update your profile picture
                </p>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  ref={inputRef}
                  onChange={handleImageChange}
                />

                {avatar || avatarPreview ? (
                  <Button
                    type="button"
                    disabled={isPending}
                    variant="danger"
                    className="mt-2 px-4 py-1 text-sm"
                    onClick={handleRemoveImage}
                  >
                    Remove Image
                  </Button>
                ) : (
                  <Button
                    type="button"
                    className="mt-2 px-4 py-1 text-sm"
                    disabled={isPending}
                    onClick={() => inputRef.current?.click()}
                  >
                    Upload Image
                  </Button>
                )}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              First Name
            </label>
            <input
              {...register("firstName", {
                required: "First name is required"
              })}
              type="text"
              placeholder="Enter your first name"
              className="mt-1 p-1.5 w-full border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white"
            />
            {errors.firstName && (
              <p className="text-sm text-red-500 dark:text-red-600 mt-2">
                {errors.firstName?.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Last Name
            </label>
            <input
              {...register("lastName", { required: "Last name is required" })}
              type="text"
              placeholder="Enter your last name"
              className="mt-1 p-1.5 w-full border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-neutral-500 dark:bg-neutral-800 dark:border-neutral-600 dark:text-white"
            />
            {errors.lastName && (
              <p className="text-sm text-red-500 dark:text-red-600 mt-2">
                {errors.lastName?.message}
              </p>
            )}
          </div>

          <div className="flex items-center justify-end mt-4">
            <Button
              type="submit"
              variant="primary"
              size="md"
              disabled={isPending}
            >
              {isPending ? (
                <Spinner className="size-6" iconClassName="text-white" />
              ) : (
                "Update"
              )}
            </Button>
          </div>
        </form>

        <div className="p-7 mt-8 border border-neutral-300 rounded-lg bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex flex-col space-y-4">
            <h3 className="font-bold text-lg text-red-500 dark:text-red-400">
              Danger Zone
            </h3>
            <p className="text-sm text-neutral-700 dark:text-neutral-400">
              Once you delete an account, it cannot be recovered. Please be
              certain.
            </p>
            <div className="border-t border-neutral-300 dark:border-neutral-600 mt-4" />
            <div className="flex items-center justify-end mt-4">
              <Button
                type="button"
                variant="danger"
                size="sm"
                disabled={isDeletePending}
                onClick={handleDelete}
              >
                {isDeletePending ? (
                  <Spinner className="size-5 text-white" />
                ) : (
                  "Delete Account"
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAccount;
