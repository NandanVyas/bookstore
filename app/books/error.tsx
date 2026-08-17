"use client";

import { AlertCircle } from "lucide-react";

export default function BooksError({ reset }: { reset: () => void }) {
  return <div className="empty-state page-state"><AlertCircle /><h1>The catalogue hit a snag.</h1><p>Nothing was changed. Please try loading the shelves again.</p><button className="button button--primary" onClick={reset}>Try again</button></div>;
}
