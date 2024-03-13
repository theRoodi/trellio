export type FieldError = {
  error: string;
  field: string;
};

export type BaseResponseType<D = {}> = {
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldError[];
  data: D;
};
