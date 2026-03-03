"use client";

import { useEffect } from "react";
import app from "../lib/firebase";

export default function FirebaseInit() {
  useEffect(() => {
    // `app` import initializes Firebase; keeping this hook ensures
    // the code runs only on the client during hydration.
    // No-op here — import side-effects are the point.
  }, []);

  return null;
}
