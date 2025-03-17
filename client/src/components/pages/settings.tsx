import Appearance from "../settings/appearance";

const Settings = () => {
  return (
    <div className="h-full w-full p-6 lg:p-12 ">
      <div className="mb-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
      </div>

      <div className=" p-6 lg:py-12 lg:px-16 space-y-8">
        <Appearance />
      </div>
    </div>
  );
};

export default Settings;
