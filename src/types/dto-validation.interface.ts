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
  Length?: ValidateLenght;
  Min?: ValidateValue;
  Max?: ValidateValue;
}
