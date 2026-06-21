"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";
import { hasSupabaseConfig, supabaseAnonKey, supabaseUrl } from "./config";

let browserClient: SupabaseClient | null = null;

export const createSupabaseBrowserClient = () => {
  if (!hasSupabaseConfig) return null;

  browserClient ??= createBrowserClient(supabaseUrl, supabaseAnonKey);
  return browserClient;
};
