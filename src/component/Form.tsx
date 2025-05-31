"use client";
import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Button from "./Button";
import { isValidEmail, isValidPhone } from "@/constants/validation";
import { SHOP_CONTENT_HER, SHOP_CONTENT_HIM } from "@/constants/content";

type FormData = {
    name: string;
    email: string;
    mobile: string;
    size: string;
};

const sendToGoogleSheets = async (formData: unknown) => {
    try {
        const response = await fetch('https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error('Failed to submit form data');
        return await response.json();
    } catch (error) {
        console.error('Error submitting to Google Sheets:', error);
        throw error;
    }
};

const InterestForm: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formError, setFormError] = useState("");
    const [form, setForm] = useState<FormData>({
        name: "",
        email: "",
        mobile: "",
        size: "",
    });

    // Get product info based on current page
    const isHerPage = pathname === '/shop/her';
    const productInfo = isHerPage ? SHOP_CONTENT_HER.product : SHOP_CONTENT_HIM.product;

    const formFields = [
        { name: "name", placeholder: "Name", type: "text" },
        { name: "email", placeholder: "Email", type: "email" },
        { name: "mobile", placeholder: "Mobile", type: "text" },
    ];

    const inputClass = (hasError: boolean) =>
        `w-full border p-2 rounded font-maven text-[14px] font-normal text-foreground dark:text-foreground placeholder:text-foreground/64 dark:placeholder:text-foreground/64 bg-background dark:bg-background-dark ${hasError ? "border-red-500" : "border-foreground/20 dark:border-foreground/20"
        }`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "mobile" && !/^[\d\s\-+()]*$/.test(value)) return;

        setForm({ ...form, [name]: value });
        setFormError("");
    };

    const handleSize = (size: string) => {
        setForm({ ...form, size });
        setFormError("");
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const isEmpty = !form.name.trim() && !form.email.trim() && !form.mobile.trim() && !form.size;

        if (isEmpty) {
            setFormError("All fields are required");
            return;
        }

        if (!form.name.trim()) {
            setFormError("Please enter your name");
            return;
        }

        if (!form.email.trim()) {
            setFormError("Please enter your email");
            return;
        }

        if (!isValidEmail(form.email)) {
            setFormError("Please enter a valid email");
            return;
        }

        if (!form.mobile.trim()) {
            setFormError("Please enter your mobile number");
            return;
        }

        if (!isValidPhone(form.mobile)) {
            setFormError("Please enter a valid phone number");
            return;
        }

        if (!form.size) {
            setFormError("Please select a size");
            return;
        }

        try {
            setIsSubmitting(true);
            setFormError("");
            await sendToGoogleSheets({
                ...form,
                timestamp: new Date().toISOString(),
            });
            router.push("/thank-you");
        } catch {
            setFormError("Failed to submit form. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="">
            <div className="flex justify-between pt-4 pb-2 rounded-tl-[24px] rounded-tr-[24px] px-6 items-center border-foreground/20 dark:border-foreground/20">
                <div className="font-normal font-metrophobic text-[18px] text-foreground dark:text-foreground">
                    {productInfo.title}
                </div>
                <div className="font-normal font-metrophobic text-[18px] text-foreground dark:text-foreground">
                    {productInfo.price}
                </div>
            </div>

            <div className="py-2 px-6 border-b border-var(--foreground)/20 dark:border-var(--foreground)/20">
                <div className="font-normal font-metrophobic text-[18px] mb-2 text-foreground dark:text-foreground">
                    Register your interest below
                </div>
                <ol className="font-normal font-metrophobic text-[18px] list-decimal pl-4 py-0 text-foreground/64 dark:text-foreground/64">
                    <li className="py-0">
                        Your intent will help us guide you through our FIT consultation service
                    </li>
                    <li className="py-2">
                        After that, select 50 will get a special invite to make a purchase of the Tee.
                    </li>
                </ol>
            </div>

            <form className="pt-4 flex flex-col gap-3" onSubmit={handleSubmit}>
                <div className="font-normal font-metrophobic text-[18px] px-6 text-foreground dark:text-foreground">
                    Please fill this form for us
                </div>

                {/* Input Fields */}
                {formFields.map(({ name, placeholder, type }) => (
                    <div className="px-6" key={name}>
                        <input
                            className={inputClass(!!(formError && formError.toLowerCase().includes(name)))}
                            placeholder={placeholder}
                            name={name}
                            type={type}
                            value={form[name as keyof FormData]}
                            onChange={handleChange}
                        />
                    </div>
                ))}

                {/* Size Buttons */}
                <div className="px-6 flex gap-6 items-center">
                    <div className="text-foreground dark:text-foreground font-maven text-[14px] font-normal">Size</div>
                    <div className="flex gap-2">
                        {["S", "M", "L"].map((size) => (
                            <button
                                type="button"
                                key={size}
                                className={`w-8 h-8 border rounded-[4px] cursor-pointer transition-all duration-200 ${form.size === size
                                        ? "bg-foreground dark:bg-foreground text-background dark:text-background border-foreground dark:border-foreground"
                                        : "bg-background dark:bg-background-dark text-foreground dark:text-foreground border-foreground/20 dark:border-foreground/20"
                                    } font-maven text-[14px] font-normal`}
                                onClick={() => handleSize(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Error Message */}
                {formError && (
                    <div className="px-6">
                        <p className="text-red-500 text-sm text-center m-0 p-0 font-maven">{formError}</p>
                    </div>
                )}

                {/* Submit */}
                <div className="p-6 pt-0 w-full">
                    <Button className="w-full rounded-[8px]" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? "SUBMITTING..." : "SUBMIT"}
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default InterestForm;
