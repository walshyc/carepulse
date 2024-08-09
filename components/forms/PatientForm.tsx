'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import CustomFormField from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { useState } from 'react';
import { UserFormValidation } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import { createUser } from '@/lib/actions/patient.actions';

export enum FormFieldType {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  SELECT = 'select',
  CHECKBOX = 'checkbox',
  PHONE = 'phoneInput',
  DATEPICKER = 'datePicker',
  SKELETON = 'skeleton',
}

const PatientForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
    setIsLoading(true);

    try {
      const user = {
        name: values.name,
        email: values.email,
        phone: values.phone,
      };
      const newUser = await createUser(user);
      console.log(newUser);

      if (newUser) {
        router.push(`/patients/${newUser.$id}/register`);
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <section className="mb-12 space-y-4">
          <h1 className="header">Hi there 👋</h1>
          <p className="text-dark-700">Schedule your first appointment.</p>
        </section>
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="name"
          label="Full Name"
          placeholder="John Doe"
          control={form.control}
          iconSrc="/assets/icons/user.svg"
          iconAlt="user"
        />
        <CustomFormField
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="johndoe@email.com"
          control={form.control}
          iconSrc="/assets/icons/email.svg"
          iconAlt="email"
        />
        <CustomFormField
          fieldType={FormFieldType.PHONE}
          name="phone"
          label="Phone Number"
          placeholder="087 123 4567"
          control={form.control}
        />
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default PatientForm;
