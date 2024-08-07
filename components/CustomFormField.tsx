'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Control } from 'react-hook-form';
import { z } from 'zod';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FormFieldType } from './forms/PatientForm';
import Image from 'next/image';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

interface CustomProps {
  control: Control<any>;
  fieldType: FormFieldType;
  name: string;
  placeholder?: string;
  label?: string;
  iconSrc?: string;
  iconAlt?: string;
  disabled?: boolean;
  dateFormat?: string;
  showTimeSelect?: boolean;
  children?: React.ReactNode;
  renderSkeleton?: (field: any) => React.ReactNode;
}

const RenderField = ({ field, props }: { field: any; props: CustomProps }) => {
  const {
    iconSrc,
    fieldType,
    iconAlt,
    placeholder,
    name,
    showTimeSelect,
    dateFormat,
    renderSkeleton,
  } = props;
  switch (props.fieldType) {
    case FormFieldType.INPUT:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          {props.iconSrc && (
            <Image
              src={iconSrc}
              alt={iconAlt || 'icon'}
              width={24}
              height={24}
              className="ml-2"
            />
          )}
          <FormControl>
            <Input
              type="text"
              placeholder={placeholder}
              {...field}
              className="shad-input border-0"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.PHONE:
      return (
        <FormControl>
          <PhoneInput
            placeholder="087 123 4567"
            defaultCountry="IE"
            international
            withCountryCallingCode
            value={field.value as E164Number | undefined}
            onChange={field.onChange}
            className="input-phone"
          />
        </FormControl>
      );
    case FormFieldType.DATEPICKER:
      return (
        <div className="flex rounded-md border border-dark-500 bg-dark-400">
          <Image
            src="/assets/icons/calendar.svg"
            width={24}
            height={24}
            alt="calendar"
            className="ml-2"
          ></Image>
          <FormControl>
            <DatePicker
              selected={field.value}
              onChange={(date) => field.onChange(date)}
              dateFormat={dateFormat ?? 'MM/dd/yyy'}
              showTimeSelect={showTimeSelect ?? false}
              timeInputLabel="Time:"
              wrapperClassName="date-picker"
            />
          </FormControl>
        </div>
      );
    case FormFieldType.SKELETON:
      return renderSkeleton ? renderSkeleton(field) : null;
  }
};

const CustomFormField = (props: CustomProps) => {
  const { control, fieldType, name, label } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex-1">
          {fieldType !== FormFieldType.CHECKBOX && label && (
            <FormLabel htmlFor={name}>{label}</FormLabel>
          )}

          <RenderField field={field} props={props} />
          <FormMessage className="shad-error" />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
