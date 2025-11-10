"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, MessageSquare, Bot, Eye, EyeOff } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { toast } from "sonner";
import { signinUser } from "@/utils/apiServices";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const SignIn = () => {
    const router = useRouter();
    const [userInfo, setUserInfo] = useState({ email: "user1@gmail.com", password: "Vaibhu@123" });
    const [signInLoading, setSignInLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isFocused, setIsFocused] = useState({ email: false, password: false });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSignInLoading(true);

        const email = userInfo?.email?.trim();
        const password = userInfo?.password?.trim();

        if (!email || !password) {
            toast.error(<h1 className="text-red-500 font-semibold">Email & Password are required</h1>, {
                description: <span className="font-medium text-black">Please enter both your email and password to continue.</span>,
                duration: 3000,
            });
            setSignInLoading(false);
            return;
        }

        try {
            // 🔐 Step 1: Check credentials in DB
            const preResp = await signinUser(email, password);
            if (!preResp.success) {
                toast.error(<h1 className="text-red-500 font-semibold">{preResp.errorType}</h1>, {
                    description: <span className="font-medium text-black">{preResp.message || "Something went wrong. Please try again."}</span>,
                    duration: 3000,
                });
                return;
            }

            // 🪄 Step 2: Authenticate via Authjs
            const res = await signIn("credentials", { redirect: false, email, password });
            console.log(preResp)
            if (res?.error) {
                toast.error(<h1 className="text-red-500 font-semibold">Authentication Error</h1>, {
                    description: <span className="font-medium text-black">{res.error || "Unable to sign you in. Please try again."}</span>,
                    duration: 3000,
                });
                return;
            }

            // 🎉 Success
            toast.success(<h1 className="text-green-500 font-semibold">Login Successful ✅</h1>, {
                description: <span className="font-medium text-black">{"Welcome back to nexora.ai 🚀"}</span>,
                duration: 3000,
            })
            console.log(preResp.user.isOnborded)
            if (!preResp.user.isOnborded) {
                return router.replace("/onbording");
            }
            router.replace("/");

        } catch (error) {
            toast.error(<h1 className="text-red-500 font-semibold">Server Error</h1>, {
                description: <span className="font-medium text-black">{"Something went wrong. Please try again."}</span>,
                duration: 3000,
            });
        } finally {
            setSignInLoading(false);
        }
    };

    return (
        <div className=" h-[90vh] flex items-center px-3 justify-center transition-all duration-500">
            <div className="relative w-full max-w-md">
                <Card className="w-full max-w-md shadow-2xl rounded-3xl transition-all duration-500 hover:shadow-3xl hover:scale-[1.02]">
                    <CardHeader className="space-y-2 text-center">
                        {/* Logo with glow effect */}
                        <div className="flex items-center justify-center mb-2">
                            <div className="relative">
                                <div className="relative flex items-center justify-center">
                                    <img
                                        src="/logo.png"
                                        alt="Astrona Logo"
                                        className="w-16 h-16 drop-shadow-2xl transform transition-transform duration-300 hover:scale-110"
                                    />

                                </div>
                            </div>
                        </div>

                        <CardTitle className="text-3xl font-bold text-gray-700">
                            Welcome Back
                        </CardTitle>

                        <CardDescription className="text-[15px] text-gray-500">
                            Continue your journey with Astro Straits
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="pt-4">
                        <form onSubmit={handleSubmit} className="space-y-3">
                            {/* Email Field */}
                            <div className="space-y-1">
                                <Label htmlFor="email" className="text-sm font-medium text-gray-600">
                                    Email Address
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="email"
                                        type="email"
                                        value={userInfo.email}
                                        onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                                        onFocus={() => setIsFocused({ ...isFocused, email: true })}
                                        onBlur={() => setIsFocused({ ...isFocused, email: false })}
                                        placeholder="john@example.com"
                                        required
                                        className={`h-10 bg-white/10 transition-all duration-300 rounded-md pl-4 pr-4 outline-none`}
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-1">
                                <Label htmlFor="password" className="text-sm font-semibold text-gray-600">
                                    Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        value={userInfo.password}
                                        onChange={(e) => setUserInfo({ ...userInfo, password: e.target.value })}
                                        onFocus={() => setIsFocused({ ...isFocused, password: true })}
                                        onBlur={() => setIsFocused({ ...isFocused, password: false })}
                                        placeholder="••••••••"
                                        required
                                        className={`h-10 bg-white/10 transition-all duration-300 rounded-md pl-4 pr-4 outline-none`}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-600 transition-colors duration-200"
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                disabled={signInLoading}
                                className="w-full h-12 mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {signInLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <Spinner className="h-5 w-5" />
                                        <span>Signing In...</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center justify-center gap-2">
                                        <Sparkles className="h-5 w-5" />
                                        <span>Sign In to Astro Straits</span>
                                    </div>
                                )}
                            </Button>
                        </form>
                    </CardContent>

                    <CardFooter className="flex-col gap-2 text-center pb-3">
                        <p className="text-sm text-gray-600">
                            Don't have an account?{" "}
                            <Link
                                href="/signup"
                                className="font-semibold text-blue-600 hover:text-blue-700 dark:hover:text-blue-300 underline-offset-4 hover:underline transition-all duration-200"
                            >
                                Create account
                            </Link>
                        </p>

                        {/* Feature Highlights */}
                        <div className="flex items-center justify-center gap-6 text-gray-600 text-sm mt-2">
                            <div className="flex items-center gap-1 bg-white/10 dark:bg-gray-800/50 px-3 py-2 rounded-lg">
                                <MessageSquare className="h-4 w-4 text-blue-500" />
                                <span className="">Chat Freely</span>
                            </div>
                            <div className="flex items-center gap-1 bg-white/10 dark:bg-gray-800/50 px-3 py-2 rounded-lg">
                                <Bot className="h-4 w-4 text-purple-500" />
                                <span className="">Talk Smartly</span>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
};

export default SignIn;