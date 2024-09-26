import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function ModelsLayout({children}) {
    return (
        <>
            <SignedOut>
                <Link href='/sign-in'>Sign in</Link>
            </SignedOut>
            <SignedIn>
                {children}
            </SignedIn>
        </>
    )
}