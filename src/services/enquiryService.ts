import { siteConfig } from '../config/siteConfig';

export interface ContactEnquiryPayload {
  fullName: string;
  mobileNumber: string;
  email: string;
  subject: string;
  message: string;
  productName?: string;
}

export interface ProductQuotationPayload {
  categoryName: string;
  productType: string;
  wireSize: string;
  colour?: string;
  quantity: string;
  name: string;
  mobileNumber: string;
  message: string;
}

export interface DealershipApplicationPayload {
  fullName: string;
  businessName: string;
  mobileNumber: string;
  whatsappNumber: string;
  email: string;
  city: string;
  state: string;
  pinCode: string;
  businessType: string;
  interestedCategory: string;
  quantityRequirement: string;
  message: string;
}

export interface SubmissionResult {
  success: boolean;
  referenceId: string;
  deliveryMode: 'backend_delivered' | 'validated_pending_backend';
  title: string;
  detail: string;
  formattedSummary: string;
}

export function validatePhoneNumber(value: string): boolean {
  const digits = value.replace(/\D/g, '');
  return digits.length >= 10 && digits.length <= 13;
}

export function validateEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function validatePinCode(value: string): boolean {
  return /^\d{6}$/.test(value.trim());
}

function generateReferenceId(prefix: string): string {
  const now = new Date();
  const y = now.getFullYear().toString().slice(-2);
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const d = String(now.getDate()).padStart(2, '0');
  const rand = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${y}${m}${d}-${rand}`;
}

export async function submitContactEnquiry(
  payload: ContactEnquiryPayload
): Promise<SubmissionResult> {
  const referenceId = generateReferenceId('RP-ENQ');
  const formattedSummary = [
    `RAILPOWER WIRE & CABLE – Enquiry (${referenceId})`,
    `Full Name: ${payload.fullName}`,
    `Mobile Number: ${payload.mobileNumber}`,
    `Email: ${payload.email}`,
    payload.productName ? `Product Interest: ${payload.productName}` : null,
    `Subject: ${payload.subject}`,
    `Message: ${payload.message}`,
  ]
    .filter(Boolean)
    .join('\n');

  if (siteConfig.backendIntegration.isConfigured) {
    const response = await fetch(siteConfig.backendIntegration.enquiryEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, referenceId }),
    });
    if (!response.ok) {
      throw new Error('Unable to send enquiry to the configured server endpoint.');
    }
    return {
      success: true,
      referenceId,
      deliveryMode: 'backend_delivered',
      title: 'Enquiry Submitted Successfully',
      detail: 'Your enquiry has been transmitted to the RAILPOWER WIRE & CABLE sales team.',
      formattedSummary,
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 400));

  return {
    success: true,
    referenceId,
    deliveryMode: 'validated_pending_backend',
    title: 'Enquiry Validated & Prepared',
    detail:
      'Your enquiry details have been validated locally. Because live server email integration is not yet connected, please send this enquiry directly via WhatsApp (+91 96306 83505) or call us below.',
    formattedSummary,
  };
}

export async function submitProductQuotation(
  payload: ProductQuotationPayload
): Promise<SubmissionResult> {
  const referenceId = generateReferenceId('RP-QT');
  const formattedSummary = [
    `RAILPOWER WIRE & CABLE – Product Quotation Request (${referenceId})`,
    `Category: ${payload.categoryName}`,
    `Product Type: ${payload.productType}`,
    `Selected Size: ${payload.wireSize}`,
    payload.colour ? `Selected Colour: ${payload.colour}` : null,
    `Quantity: ${payload.quantity}`,
    `Customer Name: ${payload.name}`,
    `Mobile Number: ${payload.mobileNumber}`,
    payload.message ? `Message: ${payload.message}` : null,
  ]
    .filter(Boolean)
    .join('\n');

  if (siteConfig.backendIntegration.isConfigured) {
    const response = await fetch(siteConfig.backendIntegration.enquiryEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, referenceId, type: 'product_quotation' }),
    });
    if (!response.ok) {
      throw new Error('Unable to submit quotation request to the configured server.');
    }
    return {
      success: true,
      referenceId,
      deliveryMode: 'backend_delivered',
      title: 'Quotation Request Submitted',
      detail: 'Your product quotation request has been submitted to our sales team.',
      formattedSummary,
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 400));

  return {
    success: true,
    referenceId,
    deliveryMode: 'validated_pending_backend',
    title: 'Quotation Request Ready for Dispatch',
    detail:
      'Your product selection and contact details are validated. Send this formatted quotation request directly to our official WhatsApp (+91 96306 83505) for fast pricing and availability confirmation.',
    formattedSummary,
  };
}

export async function submitDealershipApplication(
  payload: DealershipApplicationPayload
): Promise<SubmissionResult> {
  const referenceId = generateReferenceId('RP-DLR');
  const formattedSummary = [
    `RAILPOWER WIRE & CABLE – Dealership Application (${referenceId})`,
    `Full Name: ${payload.fullName}`,
    `Business Name: ${payload.businessName}`,
    `Mobile Number: ${payload.mobileNumber}`,
    `WhatsApp Number: ${payload.whatsappNumber}`,
    `Email: ${payload.email}`,
    `Location: ${payload.city}, ${payload.state} – ${payload.pinCode}`,
    `Business Type: ${payload.businessType}`,
    `Interested Product Category: ${payload.interestedCategory}`,
    `Quantity Requirement: ${payload.quantityRequirement}`,
    `Message: ${payload.message || 'N/A'}`,
  ].join('\n');

  if (siteConfig.backendIntegration.isConfigured) {
    const response = await fetch(siteConfig.backendIntegration.dealershipEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...payload, referenceId }),
    });
    if (!response.ok) {
      throw new Error('Unable to submit dealership application to the configured server endpoint.');
    }
    return {
      success: true,
      referenceId,
      deliveryMode: 'backend_delivered',
      title: 'Dealership Application Submitted',
      detail:
        'Thank you for applying to partner with RAILPOWER WIRE & CABLE. Our team will review your business application.',
      formattedSummary,
    };
  }

  await new Promise((resolve) => setTimeout(resolve, 450));

  return {
    success: true,
    referenceId,
    deliveryMode: 'validated_pending_backend',
    title: 'Application Validated – Ready for WhatsApp / Backend Dispatch',
    detail:
      'Your dealership application passed all validation checks. Server email credentials are not configured yet, so please send this validated application directly to our official WhatsApp (+91 96306 83505) or call us directly.',
    formattedSummary,
  };
}
