"use server";

import { auth } from "@clerk/nextjs/server";
import { createSupabaseClient } from "./suapbase";

export const createCompanion = async (formData: CreateCompanion) => {
  const { userId: author } = await auth();
  const supabase = createSupabaseClient();

  const { data, error } = await supabase
    .from("companions")
    .insert({ ...formData, author })
    .select();

  if (error || !data) {
    throw new Error(error?.message || "Failed to create companion");
  }

  console.log(data);

  return data[0];
};

export const getAllCompanions = async ({
  limit = 10,
  page = 1,
  subject,
  topic,
}: GetAllCompanions) => {
  const supabase = createSupabaseClient();

  // Querying companions with optional filters for subject and topic
  let query = supabase.from("companions").select();

  if (subject && topic) {
    query = query
      .ilike("subject", `%${subject}%`)
      .or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  } else if (subject) {
    query = query.ilike("subject", `%${subject}%`);
  } else if (topic) {
    query = query.or(`topic.ilike.%${topic}%,name.ilike.%${topic}%`);
  }

  // Pagination
  query = query.range((page - 1) * limit, page * limit - 1);

  const { data: companions, error } = await query;
  if (error) {
    throw new Error(error.message || "Failed to fetch companions");
  }

  return companions;
};

export const getCompanion = async (id: string) => {
  const supabase = createSupabaseClient();

  // Fetching a single companion by ID
  const { data, error } = await supabase
    .from("companions")
    .select()
    .eq("id", id);

  if (error) return console.log(error);

  return data[0];
};

export const addToSessionHistory = async (companionId: string) => {
  const { userId } = await auth();
  const supabase = createSupabaseClient();

  // Fetching data from the current database history
  const { data, error } = await supabase
    .from("session_history")
    .insert({ companion_id: companionId, user_id: userId });

  if (error)
    throw new Error(error.message || "Failed to add to session history");

  return data;
};

export const getRecentSessions = async (limit = 10) => {
  const supabase = createSupabaseClient();

  // Fetching data from the current database history
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id(*)`)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error)
    throw new Error(error.message || "Failed to fetch session history");

  return data.map(({ companions }) => companions);
};

export const getUserSessions = async (userId: string, limit = 10) => {
  const supabase = createSupabaseClient();

  // Fetching data from the current database history
  const { data, error } = await supabase
    .from("session_history")
    .select(`companions:companion_id(*)`)
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error)
    throw new Error(error.message || "Failed to fetch session history");

  return data.map(({ companions }) => companions);
};
