import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types';
import { mockUsers } from '../data/mockData';
import { supabase } from '../utils/supabaseClient';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role: 'student' | 'institution' | 'verifier') => Promise<boolean>;
  logout: () => void;
  updateUserWallet: (walletAddress: string) => void;
  signInWithGoogle: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setAuthState({
          user: parsedUser,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('user');
        setAuthState({
          user: null,
          isAuthenticated: false,
          isLoading: false,
          error: null,
        });
      }
    } else {
      setAuthState(prev => ({ ...prev, isLoading: false }));
    }

    // Set up Supabase auth listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session) {
          // Get user profile from Supabase
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();

          if (error || !data) {
            // If no profile exists, create one
            const newUser: User = {
              id: session.user.id,
              name: session.user.user_metadata.full_name || session.user.email?.split('@')[0] || 'User',
              email: session.user.email || '',
              role: 'student', // Default role
              credentials: [],
              avatarUrl: session.user.user_metadata.avatar_url,
            };

            // Save to Supabase
            await supabase.from('profiles').upsert({
              id: newUser.id,
              name: newUser.name,
              email: newUser.email,
              role: newUser.role,
              avatar_url: newUser.avatarUrl,
            });

            localStorage.setItem('user', JSON.stringify(newUser));
            setAuthState({
              user: newUser,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          } else {
            // Map Supabase profile to our User type
            const user: User = {
              id: data.id,
              name: data.name,
              email: data.email,
              role: data.role,
              credentials: [],
              walletAddress: data.wallet_address,
              avatarUrl: data.avatar_url,
            };

            localStorage.setItem('user', JSON.stringify(user));
            setAuthState({
              user,
              isAuthenticated: true,
              isLoading: false,
              error: null,
            });
          }
        } else if (event === 'SIGNED_OUT') {
          localStorage.removeItem('user');
          setAuthState({
            user: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
          });
        }
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signInWithGoogle = async (): Promise<boolean> => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        setAuthState(prev => ({
          ...prev,
          error: error.message,
        }));
        return false;
      }

      return true;
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        error: error.message || 'An error occurred during Google sign in',
      }));
      return false;
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Try to sign in with Supabase
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Fall back to mock data for demo purposes
        const user = mockUsers.find(u => u.email === email);
        
        if (!user) {
          setAuthState(prev => ({
            ...prev,
            isLoading: false,
            error: 'Invalid email or password',
          }));
          return false;
        }
        
        // Save user to localStorage
        localStorage.setItem('user', JSON.stringify(user));
        
        setAuthState({
          user,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        
        return true;
      }

      // If Supabase login successful, user will be set by the auth listener
      return true;
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'An error occurred during login',
      }));
      return false;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
    role: 'student' | 'institution' | 'verifier'
  ): Promise<boolean> => {
    setAuthState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      // Register with Supabase
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role,
          },
        },
      });

      if (error) {
        // Fall back to mock registration for demo
        const existingUser = mockUsers.find(u => u.email === email);
        if (existingUser) {
          setAuthState(prev => ({
            ...prev,
            isLoading: false,
            error: 'Email already in use',
          }));
          return false;
        }
        
        // Create new user
        const newUser: User = {
          id: `user-${Date.now()}`,
          name,
          email,
          role,
          credentials: [],
        };
        
        // Save user to localStorage
        localStorage.setItem('user', JSON.stringify(newUser));
        
        setAuthState({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
          error: null,
        });
        
        return true;
      }

      // Create profile in Supabase
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user?.id,
          name,
          email,
          role,
        });

      if (profileError) {
        setAuthState(prev => ({
          ...prev,
          isLoading: false,
          error: profileError.message,
        }));
        return false;
      }

      // User will be set by the auth listener
      return true;
    } catch (error: any) {
      setAuthState(prev => ({
        ...prev,
        isLoading: false,
        error: error.message || 'An error occurred during registration',
      }));
      return false;
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('user');
    setAuthState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
    });
  };

  const updateUserWallet = async (walletAddress: string) => {
    if (authState.user) {
      const updatedUser = {
        ...authState.user,
        walletAddress,
      };
      
      // Update in Supabase if we have a real user
      if (updatedUser.id.startsWith('user-') === false) {
        await supabase
          .from('profiles')
          .update({ wallet_address: walletAddress })
          .eq('id', updatedUser.id);
      }
      
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      setAuthState(prev => ({
        ...prev,
        user: updatedUser,
      }));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        register,
        logout,
        updateUserWallet,
        signInWithGoogle,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};