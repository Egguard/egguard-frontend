// notificationsAtom
import { atom } from 'jotai';
import type { UserNotification } from '@/types/apiTypes';

export const notificationsAtom = atom<UserNotification[]>([]);