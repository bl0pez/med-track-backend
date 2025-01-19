import * as bcryptjs from 'bcryptjs';
import { Hasher } from 'src/interfaces';

export class BcryptPlugin implements Hasher {
    hash(data: string, saltRounds: number = 10): string {
        return bcryptjs.hashSync(data, saltRounds);
    }

    async compare(data: string, encrypted: string): Promise<boolean> {
        return bcryptjs.compare(data, encrypted);
    }
}