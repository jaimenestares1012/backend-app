import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import * as dayjs from 'dayjs';

export function IsWithinSixMonths(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      name: 'IsWithinSixMonths',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: {
        validate(value: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const relatedValue = (args.object as any)[relatedPropertyName];
          const startDate = dayjs(relatedValue, 'YYYY-MM');
          const endDate = dayjs(value, 'YYYY-MM');
          console.log('startDate', startDate);
          console.log('endDate', endDate);

          const monthDifference = endDate.diff(startDate, 'month');
          console.log('monthDifference', monthDifference);

          return monthDifference >= 0 && monthDifference <= 6;
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} debe estar dentro de un rango máximo de 6 meses desde ${args.constraints[0]}`;
        },
      },
    });
  };
}
