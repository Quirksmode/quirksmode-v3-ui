export interface PageContactFormState {
  formSending: boolean;
  formError: boolean;
  formSuccess: boolean;
  formResponse: any;
}

export interface PageContactFormProps {
  formSending: boolean;
  submitting: boolean;
  handleSubmit: any;
}

export interface PageContactFormSendMailData {
  email: string;
  message?: string;
  name: string;
  subject: string;
}
