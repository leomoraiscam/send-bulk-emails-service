import Email from '../email';
import Name from '../name';

export interface ISenderProps {
  name: Name;
  email: Email;
  isValidated?: boolean;
  isDefault?: boolean;
}
