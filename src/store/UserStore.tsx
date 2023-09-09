import { createSignal, createContext, useContext, Accessor } from "solid-js";

type NullableSession = Session | null;

interface IUserStore {
  session: Accessor<NullableSession>;
  setSession: (session: Session) => void;
  clearSession: () => void;
}

const UserContext = createContext<IUserStore>();
import type { Session } from "@supabase/supabase-js";

export function UserProvider(props: any) {
  const [session, setSession] = createSignal<NullableSession>(null);
  const currentSession = {
    session,
    setSession(session: Session) {
      setSession(session);
    },
    clearSession() {
      setSession(null);
    },
  };

  return (
    <UserContext.Provider value={currentSession}>
      {props.children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext)!;
}
