import { Loader2 } from "lucide-react";
import Image from "next/image";
import { SignIn, ClerkLoaded, ClerkLoading, SignUp } from "@clerk/nextjs";

export default function Page() {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
            <div className="h-full lg:flex flex-col items-center justify-center">
                <div className="text-center sppace-y-4 pt-16">
                    <h1 className="font-bold text-3xl text-[#2E2A47]">Welcome back!</h1>
                    <p className="text-base text-[#7E8CA0]">Login or Create account to get back to your dashboard</p>
                </div>

                <div className="flex items-center justify-center mt-8">
                    <ClerkLoaded>
                        <SignUp path="/sign-up" />
                    </ClerkLoaded>
                    <ClerkLoading>
                        <Loader2 className="animate-spin text-muted-foreground"/>
                    </ClerkLoading>
                </div>
            </div>
            <div className="h-full bg-blue-500 hidden lg:flex items-center justify-center">
                <Image src="/logo.svg" alt="Logo" width={100} height={100}/>
            </div>
        </div>
    ) ;
}