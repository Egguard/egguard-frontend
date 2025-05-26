// notificationsAtom
import { atom } from 'jotai';
import type { UserNotification, UserStats } from '@/lib/types/apiTypes';

export const notificationsAtom = atom<UserNotification[]>([]);

export const statsAtom = atom<UserStats>();