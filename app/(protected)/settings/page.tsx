"use client";

import { logout } from "@/actions/logout";
import { useCurrentUser } from "@/hooks/use-current-user";

const SettingsPage = () => {
  const user = useCurrentUser();

  const onClick = () => {
    logout();
  };
  return (
    <div>
      <div className="bg-white p-10 rounded-xl">
        <button type="submit" onClick={onClick}>
          Sign out
        </button>
      </div>
    </div>
  );
};

export default SettingsPage;
