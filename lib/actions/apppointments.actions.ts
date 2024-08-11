'use server';
import { ID } from 'node-appwrite';
import {
  BUCKET_ID,
  DATABASE_ID,
  databases,
  ENDPOINT,
  APPOINTMENT_COLLECTION_ID,
  PROJECT_ID,
} from '../appwrite.config';
import { parseStringify } from '../utils';

export const createAppointment = async (
  appointment: CreateAppointmentParams
) => {
  try {
    const newAppointment = await databases.createDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      ID.unique(),
      appointment
    );

    return parseStringify(newAppointment);
  } catch (error) {
    console.error('An error occurred while creating a new appointment:', error);
  }
};

export const getAppointment = async (appointmentId: string) => {
  try {
    const appointment = await databases.getDocument(
      DATABASE_ID!,
      APPOINTMENT_COLLECTION_ID!,
      appointmentId
    );

    return parseStringify(appointment);
  } catch (error) {
    console.error('An error occurred while fetching appointment:', error);
  }
};
