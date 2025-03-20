import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";

export default function Nav() {
    return (
        <nav className="flex justify-between items-center px-4 sm:px-10 md:px-20 lg:px-40 py-4">
            <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold">Todo App</h1>
                <ModeToggle />
            </div>
            <SignedIn>
                <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <SignedOut>
                <SignInButton />
            </SignedOut>
        </nav>
    );
}
