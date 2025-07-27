import { type AuthResponse } from '@/shared/types/Response/Auth';
import { type RegisterAccountResponse } from '@/shared/types/Response/Guest/RegisterAccount';
import { type RequestAccountResponse } from '@/shared/types/Response/Guest/RequestAccount';
import { type ResetPasswordResponse } from '@/shared/types/Response/Guest/ResetPassword';

export type NullableEmailVerifyLoaderReturn = {
    expires: number;
    signature: string;
} | null;

/*
 * ---- Guest ----
 */

export type ProvidedLoaderReturn = AuthResponse | null;

export type RegisterAccountLoaderReturn = RegisterAccountResponse | null;

export type RequestAccountLoaderReturn = RequestAccountResponse | null;

export type ResetPasswordLoaderReturn = ResetPasswordResponse | null;
