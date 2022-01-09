import validUrl from "valid-url";

export const isValidURI = (uri: string) => {
  console.log("----", uri, validUrl);

  return validUrl.isUri(uri);
};
