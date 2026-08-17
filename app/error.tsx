"use client";
import { AlertCircle } from "lucide-react";
export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) { return <div className="empty-state page-state"><AlertCircle /><h1>Something went wrong.</h1><p>The error was contained. Try the request again without losing your local cart.</p><button className="button button--primary" onClick={reset}>Try again</button></div>; }
