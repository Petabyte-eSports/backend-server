import axios, { AxiosRequestConfig } from 'axios';
import { GetBanksResponse } from './lotus.interface';
import { Config } from '../config';
import * as crypto from 'crypto';

export class LotusService {
  public async getBanks(): Promise<GetBanksResponse | null> {
    try {
      const url = 'https://sandbox.lotusbank.com/api/Account/GetBanks';
      const headers = {
        'Content-Type': 'application/json',
        agentID: Config.BANK_AGENT_ID,
      };

      const requestConfig: AxiosRequestConfig = {
        method: 'GET',
        url,
        headers,
        maxBodyLength: Infinity,
      };

      const response = await axios(requestConfig);

      // Check if the response data needs decryption or is already an object
      if (typeof response.data === 'object') {
        return response.data;
      } else {
        const decryptedData = await this.decryptCipher(
          response.data,
          Config.BANK_AES_KEY,
          Config.BANK_IV_KEY,
        );
        return JSON.parse(decryptedData);
      }
    } catch (error) {
      console.error('Error fetching banks:', error);
      return null;
    }
  }

  private async encryptText(
    data: any,
    key: string,
    iv: string,
  ): Promise<string> {
    const cipher = crypto.createCipheriv(
      'aes-256-cbc',
      Buffer.from(key, 'hex'),
      Buffer.from(iv, 'hex'),
    );
    let encrypted = cipher.update(JSON.stringify(data), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  private async decryptCipher(
    cipherText: string,
    key: string,
    iv: string,
  ): Promise<string> {
    const decipher = crypto.createDecipheriv(
      'aes-256-cbc',
      Buffer.from(key, 'hex'),
      Buffer.from(iv, 'hex'),
    );
    let decrypted = decipher.update(cipherText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
