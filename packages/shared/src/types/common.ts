// Common types and interfaces
export interface User {
  id: string
  name: string
  email: string
  createdAt: Date
  updatedAt: Date
}

export interface ApiResponse<T = unknown> {
  data: T
  message: string
  success: boolean
  timestamp: string
}

export interface PaginationParams {
  page: number
  limit: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export type Theme = 'light' | 'dark' | 'system'

export type Status = 'idle' | 'loading' | 'success' | 'error'

export interface ErrorDetails {
  code: string
  message: string
  field?: string
}
