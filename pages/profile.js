import { Auth, Typography, Button } from "@supabase/ui";
const { Text } = Typography
import Account from '../components/account'

import { supabase } from '../api'

function Profile(props) {
  const { user } = Auth.useUser();
  const session = supabase.auth.session()
  if (user)
    return (
      <>
        <Account key={session.user.id} session={session} />
        <Text>Signed in: {user.email}</Text>
        <Button block onClick={() => props.supabaseClient.auth.signOut()}>
          Sign out
        </Button>
      </>
    );
  return props.children
}

export default function AuthProfile() {
  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <Profile supabaseClient={supabase}>
        <Auth supabaseClient={supabase} />
      </Profile>
    </Auth.UserContextProvider>
  )
}