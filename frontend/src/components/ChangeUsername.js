import { useMoralis } from "react-moralis";

function ChangeUsername() {
  const { setUserData, isUserUpdating, user } = useMoralis();

  const setUsername = () => {
    const username = prompt(
      `Enter your new username (current: ${user.getUsername()})`
    );
    if (!username) return;
    setUserData({
      username,
    });
  };

  return (
    <div className="text-sm absolute top-5 right-5">
      <div
        disabled={isUserUpdating}
        onClick={setUsername}
        style={{ color: "white" }}
      >
        Change Username
      </div>
    </div>
  );
}

export default ChangeUsername;
