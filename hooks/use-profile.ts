"use client";
import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import axios from "axios";

interface UserProfile {
  email: string;
  name: string;
  role: "ADMIN" | "USER";
}

function useProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await api.get("/api/get-profile");
        setProfile(res.data.data);
      } catch (err) {
        if (axios.isAxiosError(err)) {
          console.error(err.response?.data?.message || "Terjadi kesalahan, silakan coba lagi.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, []);

  return { profile, loading };
}

export { useProfile };
