import crypto from "crypto";
import { config } from "../config/config";

export const encryptData = password => {
  const hash = crypto.createHash("md5");
  hash.update(password + config.cryptoKey);
  const data = hash.digest("hex");
  return data;
};

export const validateData = ({ cryptoData, value }) => {
  return cryptoData === encryptData(value);
};
