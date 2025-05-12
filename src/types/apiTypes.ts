export interface PaginatedResponse<T> {
  totalElements: number;
  totalPages: number;
  pageable: {
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
    offset: number;
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean;
    }
  };
  size: number;
  content: T[];
  number: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  numberOfElements: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface UserNotification {
    id: number,
    farmId: number,
    severity: NotificationSeverity;
    message: string;
    photoUrl: string;
    timestamp: string;
}

export enum NotificationSeverity {
    CRITICAL = "CRITICAL",
    WARNING = "WARNING",
    INFO = "INFO"
}