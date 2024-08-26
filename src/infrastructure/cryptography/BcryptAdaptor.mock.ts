import env from "@config/env";
import { BcryptAdaptor } from "./BcryptAdaptor";

export function MockBcryptAdaptor(): jest.Mocked<BcryptAdaptor> {
    const bcryptAdaptor = new BcryptAdaptor(
        env.bcryptSalt
    ) as jest.Mocked<BcryptAdaptor>;

    bcryptAdaptor.compare = jest.fn();
    bcryptAdaptor.hash = jest.fn();

    return bcryptAdaptor;
}