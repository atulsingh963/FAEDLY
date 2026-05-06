"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Link from "next/link";
import { Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";

import { resetPassword } from "@/lib/firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const resetSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

type ResetFormValues = z.infer<typeof resetSchema>;

export default function ForgotPasswordPage() {
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormValues>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (data: ResetFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      await resetPassword(data.email);
      setIsSuccess(true);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to send reset email.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-emerald-500/10 p-3">
            <CheckCircle2 className="h-10 w-10 text-emerald-500" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Check your email</h1>
          <p className="text-sm text-muted-foreground">
            We&apos;ve sent a password reset link to your email address.
          </p>
        </div>
        <Link href="/login" className="block mt-8">
          <Button className="w-full">Return to login</Button>
        </Link>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8">
        <Link href="/login" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to login
        </Link>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Reset password</h1>
        <p className="text-sm text-muted-foreground">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            {...register("email")}
            className={errors.email ? "border-destructive focus-visible:ring-destructive" : ""}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Send Reset Link
        </Button>
      </form>
    </>
  );
}
