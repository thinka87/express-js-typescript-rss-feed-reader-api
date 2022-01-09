import validUrl from "valid-url";

export const isValidURI = (uri: string) => {
  return validUrl.isUri(uri);
};
