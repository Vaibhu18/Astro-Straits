"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Sparkles, Star, Calendar, Clock, MapPin, User } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { performOnbording } from "@/utils/apiServices";

const OnboardingPage = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        gender: "",
        dob: "",
        time: "",
        village: "",
        taluka: "",
        district: "",
        state: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        const { name, gender, dob, time, village, taluka, district, state } = form;
        if (!name || !gender || !dob || !time || !village || !taluka || !district || !state) {
            toast.error("Please fill all fields before continuing.");
            return;
        }
        try {
            setLoading(true);

            const res = await performOnbording(user._id, { name, gender, dob, birthTime: time, birthPlace: { village, taluka, district, state } })
            console.log(res)
            if (!res.success) {
                toast.error(<h1 className="text-red-500 font-semibold">{res.errorType}</h1>, {
                    description: <span className="font-medium text-black">{res.message || "Something went wrong. Please try again."}</span>,
                    duration: 3000,
                });
                return;
            }

            toast.success(<h1 className="text-green-500 font-semibold">Onboarding completed successfully 🚀</h1>, {
                description: <span className="font-medium text-black">Welcome to Astro Straits</span>,
                duration: 3000,
            })

            router.replace(`/`);
        } catch (err) {
            toast.error("Failed to save details", {
                description: err.message,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="md:h-[90vh] flex items-center justify-center px-3 py-15">
            <Card className="w-full max-w-2xl bg-white/10 backdrop-blur-2xl border border-white/10 shadow-2xl rounded-xl">
                <CardHeader className="text-center space-y-3">
                    <div className="flex justify-center">
                        <img src="/logo.png" alt="Astrona Logo" className="w-16 h-16 drop-shadow-2xl transform transition-transform duration-300 hover:scale-110" />
                    </div>
                    <CardTitle className="text-2xl md:text-3xl font-bold text-gray-700">Complete Your Cosmic Profile</CardTitle>
                    <CardDescription className="text-gray-500 text-sm">
                        We’ll use this information to personalize your astrological readings.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Name */}
                        <div className=" space-y-2">
                            <Label className="text-gray-600 flex items-center gap-2">
                                <User size={16} /> Full Name
                            </Label>
                            <Input
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="John Doe"
                                className="h-10 bg-white/10 transition-all duration-300 rounded-md pl-4 pr-4 outline-none"
                            />
                        </div>

                        {/* Gender */}
                        <div>
                            <Label className="text-gray-600 flex items-center gap-2">
                                <Star size={16} /> Gender
                            </Label>
                            <select
                                name="gender"
                                value={form.gender}
                                onChange={handleChange}
                                className="w-full h-10 bg-white/50 border border-gray-200 text-gray-600 rounded-md mt-1 px-3 outline-none backdrop-blur-md text-sm"
                            >
                                <option value="" className="bg-gray-200 text-black">Select Gender</option>
                                <option value="Male" className="bg-gray-200 text-black">Male</option>
                                <option value="Female" className="bg-gray-200 text-black">Female</option>
                                <option value="Other" className="bg-gray-200 text-black">Other</option>
                            </select>
                        </div>

                        {/* Date of Birth */}
                        <div className="flex justify-between md:justify-start gap-0 md:gap-5">
                            <div>
                                <Label className="text-gray-600 flex items-center gap-2">
                                    <Calendar size={16} /> Date of Birth
                                </Label>
                                <Input
                                    type="date"
                                    name="dob"
                                    value={form.dob}
                                    onChange={handleChange}
                                    className=" border-gray-200 text-gray-600 rounded-md mt-1"
                                />
                            </div>

                            {/* Time of Birth */}
                            <div>
                                <Label className="text-gray-600 flex items-center gap-2">
                                    <Clock size={16} /> Time of Birth
                                </Label>
                                <Input
                                    type="time"
                                    name="time"
                                    value={form.time}
                                    onChange={handleChange}
                                    className="bg-white/10 border-gray-200 text-gray-600 rounded-md mt-1"
                                />
                            </div>
                        </div>

                        {/* Birthplace */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <Label className="text-gray-600 flex items-center gap-2">
                                    <MapPin size={16} /> Village
                                </Label>
                                <Input
                                    name="village"
                                    value={form.village}
                                    onChange={handleChange}
                                    placeholder="e.g., Wagholi"
                                    className="bg-white/10 border-gray-200 text-gray-600 rounded-md mt-1"
                                />
                            </div>
                            <div>
                                <Label className="text-gray-600">Taluka</Label>
                                <Input
                                    name="taluka"
                                    value={form.taluka}
                                    onChange={handleChange}
                                    placeholder="e.g., Haveli"
                                    className="bg-white/10 border-gray-200 text-gray-600 rounded-md mt-1"
                                />
                            </div>
                            <div>
                                <Label className="text-gray-600">District</Label>
                                <Input
                                    name="district"
                                    value={form.district}
                                    onChange={handleChange}
                                    placeholder="e.g., Pune"
                                    className="bg-white/10 border-gray-200 text-gray-600 rounded-md mt-1"
                                />
                            </div>
                            <div>
                                <Label className="text-gray-600">State</Label>
                                <Input
                                    name="state"
                                    value={form.state}
                                    onChange={handleChange}
                                    placeholder="e.g., Maharashtra"
                                    className="bg-white/10 border-gray-200 text-gray-600 rounded-md mt-1"
                                />
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 mt-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:from-indigo-400 hover:to-pink-400 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-lg hover:shadow-purple-500/30"
                        >
                            {loading ? "Saving your details..." : "Continue to Dashboard"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default OnboardingPage;
