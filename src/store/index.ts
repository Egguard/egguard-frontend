// notificationsAtom
import { atom } from 'jotai';
import type { UserNotification } from '@/lib/types/apiTypes';

export const notificationsAtom = atom<UserNotification[]>([]);