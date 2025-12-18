import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import { ModeToggle } from "./ModeToggle";

export default function Nav() {
    return (
        <nav className="flex justify-between items-center px-8  py-4">
            <div className="flex items-center gap-6">
                <span className="font-bold">Todo App</span>
                <ModeToggle />
            </div>
            <div className="flex items-center">
                <SignedIn>
                    <UserButton />
                </SignedIn>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
            </div>
        </nav>
    );
}
