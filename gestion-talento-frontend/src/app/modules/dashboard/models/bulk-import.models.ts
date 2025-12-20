export interface BulkErrorDetail {
    identifier: string;
    error: string;
}

export interface BulkImportResponse {
    total: number;
    success: number;
    errors: number;
    details: BulkErrorDetail[];
}