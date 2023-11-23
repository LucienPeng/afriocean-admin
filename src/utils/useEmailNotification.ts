import emailJs from '@emailjs/browser';
import { Applications } from '../model/application.model';

export interface EmailTemplate {
  readonly firstName?: string;
  readonly lastName?: string;
  readonly submitTime: string;
  readonly applicationType: Applications;
}

const SERVICE_ID = 'service_dk6ck98';
const TEMPLATE_ID = 'template_i4dhipi';
const PUBLIC_KEY = '170om8O1uaNBGnBei';

export const useEmailNotification = () => {
  const sendEmailNotification = (data: EmailTemplate) => {
    const mapEmailRequest = (data: EmailTemplate) => {
      return {
        from_firstName: data.firstName,
        from_lastName: data.lastName,
        application: data.applicationType,
        submit_time: data.submitTime,
      };
    };
    emailJs.send(SERVICE_ID, TEMPLATE_ID, mapEmailRequest(data), PUBLIC_KEY);
  };

  return { sendEmailNotification };
};
