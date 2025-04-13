import OnboardingForm from '@/components/forms/OnboardingForm';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import React from 'react'

export default async function Onboarding() {
    const user = await currentUser();
    if (!user) {
      redirect("/sign-in");
    }

    
  return (
    <section className='text-white'>
        <OnboardingForm
        userId={user.id}
        username={user.username!}
        email={user.emailAddresses[0]?.emailAddress!}
        />
    </section>
  )
}

