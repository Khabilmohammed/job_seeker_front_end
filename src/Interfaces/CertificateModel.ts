export interface CertificateModel {
  certificateId: number; // Unique identifier for the certificate
  name: string; // Name of the certificate
  imageUrl: string; // URL to the certificate image
  issueDate?: string;
  expirationDate?:string;
  issuer?: string; // Optional: The issuer of the certificate
}
  
 