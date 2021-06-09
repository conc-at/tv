import styled from 'styled-components';

import { Input, InputGroup, Label } from './components';

const FormComponent = styled.form`
  display: flex;
  flex-direction: column;
`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormType = typeof FormComponent & {
  Input: typeof Input;
  InputGroup: typeof InputGroup;
  Label: typeof Label;
};

export const Form = FormComponent as FormType;

Form.Input = Input;
Form.InputGroup = InputGroup;
Form.Label = Label;
