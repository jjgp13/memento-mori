import type { Session } from '@supabase/supabase-js';
import * as Linking from 'expo-linking';
import { createContext, useContext, useEffect, useState, type PropsWithChildren } from 'react';
import { Platform } from 'react-native';

import { createSessionFromUrl } from '@/lib/auth';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

type AuthState = {
  session: Session | null;
  /** True until the stored session has been read. */
  isLoading: boolean;
};

const AuthContext = createContext<AuthState>({ session: null, isLoading: true });

export function AuthProvider({ children }: PropsWithChildren) {
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(isSupabaseConfigured);

  useEffect(() => {
    if (!isSupabaseConfigured) return;

    // Fires INITIAL_SESSION once storage is read, then on every sign-in, refresh, and sign-out.
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, next) => {
      setSession(next);
      setIsLoading(false);
    });

    // On native, a magic link (or an OAuth redirect the OS hands to the app) arrives as a deep link.
    let linkSubscription: { remove(): void } | undefined;
    if (Platform.OS !== 'web') {
      const handle = (url: string | null) => {
        if (url) createSessionFromUrl(url).catch((e) => console.warn('Sign-in link failed', e));
      };
      Linking.getInitialURL().then(handle);
      linkSubscription = Linking.addEventListener('url', ({ url }) => handle(url));
    }

    return () => {
      subscription.unsubscribe();
      linkSubscription?.remove();
    };
  }, []);

  return <AuthContext.Provider value={{ session, isLoading }}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
