import { useMutation } from "@tanstack/react-query";
import type { InsertAssessment } from "../types";

const API_URL = import.meta.env.VITE_API_URL;

const WEBHOOK_URL = import.meta.env.VITE_MAKE_WEBHOOK_URL; 
// optional — better to keep webhook in backend ideally


export function useCreateAssessment() {
  return useMutation({
    mutationFn: async (data: InsertAssessment) => {
      // 1️⃣ Save to database via API
      const res = await fetch(`${API_URL}/api/assessments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to save assessment");
      }

      const savedAssessment = await res.json();

      // 2️⃣ Send to Make webhook (optional — see note below)
      if (WEBHOOK_URL) {
        try {
          await fetch(WEBHOOK_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(savedAssessment),
          });
        } catch (e) {
          console.error("Webhook submission failed:", e);
        }
      }

      return savedAssessment;
    },
  });
}