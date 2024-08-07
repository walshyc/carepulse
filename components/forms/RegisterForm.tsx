'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { optional, z } from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl } from '@/components/ui/form';
import CustomFormField from '../CustomFormField';
import SubmitButton from '../SubmitButton';
import { useState } from 'react';
import { UserFormValidation } from '@/lib/validation';
import { useRouter } from 'next/navigation';
import { createUser } from '@/lib/actions/patient.actions';
import { FormFieldType } from './PatientForm';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { GenderOptions } from '@/constants';
import { Label } from '../ui/label';

const RegisterForm = ({ user }: { user: User }) => {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
        <section className="space-y-4">
          <h1 className="header">Welcome</h1>
          <p className="text-dark-700">Let us know more about yourself.</p>
        </section>
        <section className="space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
          </div>
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

        <div className="flex flex-col gap-6 xl:flex-row">
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
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField
            fieldType={FormFieldType.DATEPICKER}
            name="birthDate"
            label="Date of Birth"
            control={form.control}
          />
          <CustomFormField
            fieldType={FormFieldType.SKELETON}
            name="gender"
            label="Gender"
            control={form.control}
            renderSkeleton={(field) => (
              <FormControl>
                <RadioGroup
                  className="flex h-11 gap-6 xl:justify-between"
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  {GenderOptions.map((option) => (
                    <div className="radio-group" key={option}>
                      <RadioGroupItem
                        value={option}
                        id={option}
                      ></RadioGroupItem>
                      <Label htmlFor={option} className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
          />
        </div>
        <div className="flex flex-col gap-6 xl:flex-row"></div>
        <div className="flex flex-col gap-6 xl:flex-row"></div>
        <div className="flex flex-col gap-6 xl:flex-row"></div>
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  );
};

export default RegisterForm;
