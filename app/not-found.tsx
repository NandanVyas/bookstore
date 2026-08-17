import Link from "next/link";
import { Compass } from "lucide-react";
export default function NotFound() { return <div className="empty-state page-state"><Compass /><h1>This page slipped off the shelf.</h1><p>The route may have moved during the V2 modernization.</p><Link href="/" className="button button--primary">Return home</Link></div>; }
