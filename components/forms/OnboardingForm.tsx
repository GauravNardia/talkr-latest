'use client';
import Link from "next/link";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { OnboardUser } from "@/lib/actions/auth.actions";
import { onboardingSchema } from "@/lib/validations/auth";

interface Props {
  username: string;
  email: string;
  userId: string
}

const OnboardingForm = ({ username, email, userId }: Props) => {
  const form = useForm<z.infer<typeof onboardingSchema>>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      email: email || "",
      username: username || "",
      native: "",
      target: "",
    },
  });

  async function onSubmit(values: z.infer<typeof onboardingSchema>) {
    const user = await OnboardUser(values, userId);
    if (user) {
      redirect("/app/home");
    } else {
      throw new Error("Something went wrong");
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center bg-neutral-950 px-4">
      <div className="w-full max-w-lg space-y-16">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-neutral-300 to-neutral-400 bg-clip-text text-transparent">
            Let's get to know you
          </h1>
          <p className="text-neutral-400 text-sm font-light mt-4">
            Just a few details to get started
          </p>
        </div>

        <div className="w-full space-y-6 p-6 sm:p-8 rounded-2xl backdrop-blur-md bg-neutral-900/30 border border-neutral-800/50 shadow-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              {[
                { name: "email", label: "Email", placeholder: "you@example.com" },
                { name: "username", label: "Username", placeholder: "john_doe" },
                { name: "native", label: "Native Language", placeholder: "English" },
                { name: "target", label: "Target Language", placeholder: "French" },
              ].map(({ name, label, placeholder }) => (
                <FormField
                  key={name}
                  control={form.control}
                  name={name as keyof z.infer<typeof onboardingSchema>}
                  render={({ field }) => (
                    <FormItem className="space-y-1.5">
                      <FormLabel className="text-sm font-medium text-neutral-200 tracking-wide mt-5">
                        {label}
                      </FormLabel>
                      <FormControl>
                        <Input
                          className="h-10 bg-neutral-800/40 border border-neutral-700/50 text-white placeholder-neutral-500 focus:border-neutral-600 focus:ring-2 focus:ring-neutral-600/50 transition-all duration-200 rounded-lg hover:border-neutral-600/50"
                          placeholder={placeholder}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs text-red-400/90" />
                    </FormItem>
                  )}
                />
              ))}

              <Button
                type="submit"
                className="w-full h-10 rounded-lg bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
              >
                Continue
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingForm;
