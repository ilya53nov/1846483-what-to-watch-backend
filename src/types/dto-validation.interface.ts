type ValidateValue = {
  value: number;
  message: string;
}

type ValidateLenght = {
  min: number;
  max: number;
  message: string;
}

export interface DtoValidation {
  Message?: string;
  Lenght?: ValidateLenght;
  Min?: ValidateValue;
  Max?: ValidateValue;
}
