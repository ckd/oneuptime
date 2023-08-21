import { faker } from '@faker-js/faker';
import Email from '../Types/Email';
import Name from '../Types/Name';
import Phone from '../Types/Phone';

export default class Faker {
    public static generateName(): string {
        return faker.person.fullName();
    }

    public static generateCompanyName(): string {
        return faker.company.name();
    }

    public static random16Numbers(): string {
        const count: number = 16;
        const randomNumbers: Array<number> = [];
        for (let i: number = 0; i < count; i++) {
            randomNumbers.push(Math.floor(Math.random() * 100)); // You can adjust the range as needed
        }
        return randomNumbers.join('');
    }

    public static generateUserFullName(): Name {
        return new Name(faker.person.fullName());
    }

    public static generateEmail(): Email {
        return new Email(faker.internet.email());
    }

    public static generatePhone(): Phone {
        return new Phone(faker.phone.number());
    }
}
