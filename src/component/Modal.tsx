"use client";
import { useModal } from "@/context/ModalContext";
import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Header from "@/component/Header";
import Footer from "@/component/Footer";
import { useRouter } from "next/navigation";
import Button from "./Button";

const BottomSheetModal: React.FC = () => {
    const { isOpen, close } = useModal();
    const modalRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const [form, setForm] = useState({
        name: "",
        email: "",
        mobile: "",
        size: "",
    });

    const [errors, setErrors] = useState({
        name: "",
        email: "",
        mobile: "",
        size: "",
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    // Close on outside click
    useEffect(() => {
        function handleClick(e: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                close();
            }
        }
        if (isOpen) document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, [isOpen, close]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });

        // Clear error when user types
        if (errors[e.target.name as keyof typeof errors]) {
            setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
        }
    };

    const handleSize = (size: string) => {
        setForm({ ...form, size });
        if (errors.size) {
            setErrors((prev) => ({ ...prev, size: "" }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = {
            name: form.name ? "" : "Name is required",
            email: form.email ? "" : "Email is required",
            mobile: form.mobile ? "" : "Mobile is required",
            size: form.size ? "" : "Size is required",
        };

        setErrors(newErrors);

        const hasError = Object.values(newErrors).some((err) => err !== "");
        if (hasError) return;

        setIsSubmitted(true);
        close();
        router.push("/thank-you");
    };

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                close();
            }
        }

        function handleEscapeKey(e: KeyboardEvent) {
            if (e.key === "Escape") {
                close();
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            document.addEventListener("keydown", handleEscapeKey);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscapeKey);
        };
    }, [isOpen, close]);


    return (
        <div
            className={`
        fixed inset-0 z-[100] bg-black/40 flex items-end md:items-center justify-center
        transition-all duration-500
        ${isOpen ? "visible opacity-100" : "invisible opacity-0 pointer-events-none"}
      `}
            style={{ transitionProperty: "opacity, visibility" }}
        >
            <div
                ref={modalRef}
                className={`
          w-full md:w-[600px] bg-white rounded-t-2xl md:rounded-2xl shadow-xl
          transition-transform duration-500
          ${isOpen ? "translate-y-0 md:translate-y-0" : "translate-y-full md:translate-y-32"}
        `}
                style={{ maxWidth: 600, margin: "0 auto" }}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center border-b pb-2">
                        <div className="font-semibold text-lg text-black">Black Crew Tee | Him</div>
                        <div className="font-semibold text-lg text-black">₹ 1999</div>
                    </div>

                    <div className="py-4 border-b">
                        <div className="font-medium mb-2 text-black">Register your interest below</div>
                        <ol className="text-sm text-gray-600 list-decimal pl-4 text-black">
                            <li>Your intent will help us guide you through our FIT consultation service</li>
                            <li>After that select 50 will get a special invite to make a purchase of the Tee.</li>
                        </ol>
                    </div>

                    <form className="pt-4 flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div className="font-medium mb-2 text-black">Please fill this form for us</div>

                        {/* Name */}
                        <div>
                            <input
                                className={`w-full border p-2 rounded text-black placeholder:text-black ${errors.name ? "border-red-500" : "border-[#868686]"
                                    }`}
                                placeholder="Name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <input
                                className={`w-full border p-2 rounded text-black placeholder:text-black ${errors.email ? "border-red-500" : "border-[#868686]"
                                    }`}
                                placeholder="Email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                        </div>

                        {/* Mobile */}
                        <div>
                            <input
                                className={`w-full border p-2 rounded text-black placeholder:text-black ${errors.mobile ? "border-red-500" : "border-[#868686]"
                                    }`}
                                placeholder="Mobile"
                                name="mobile"
                                value={form.mobile}
                                onChange={handleChange}
                            />
                            {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                        </div>

                        {/* Size */}
                        <div>
                            <div className="mb-1 text-black">Size</div>
                            <div className="flex gap-2">
                                {["S", "M", "L"].map((size) => (
                                    <button
                                        type="button"
                                        key={size}
                                        className={`w-10 h-10 border rounded cursor-pointer transition-all duration-200
                        ${form.size === size
                                                ? "bg-black text-white border-black"
                                                : "bg-white text-black border-[#868686]"
                                            }
                      `}
                                        onClick={() => handleSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                            {errors.size && <p className="text-red-500 text-sm mt-1">{errors.size}</p>}
                        </div>

                        {/* Submit Button */}
                        <Button type="submit">
                            SUBMIT
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BottomSheetModal;
