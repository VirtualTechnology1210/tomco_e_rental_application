export interface OwnerProfile {
    id: string;
    user_id: string;
    business_name: string | null;
    id_proof_url: string;
    business_doc_url: string | null;
    address: string | null;
    city: string | null;
    verified_at: string | null;
    admin_note: string | null;
    created_at: string;
    user?: {
        id: string;
        full_name: string;
        email: string | null;
        phone: string;
        status: string;
        profile_image: string | null;
    };
}

export interface SubmitOwnerProfilePayload {
    business_name?: string;
    id_proof_url: string;
    business_doc_url?: string;
    address?: string;
    city?: string;
}
