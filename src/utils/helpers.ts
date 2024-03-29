export const validateName = (argument: string): boolean => {
  const result = !!argument.length;

  return result;
};

export const validateEmail = (argument: string): boolean => {
  const result = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(argument);

  return result;
};

export const validatePassword = (argument: string): boolean => {
  const result = argument.length >= 6;

  return result;
};

export const checkResponse = (argument: Response): boolean => {
  let result = false;

  if (argument["ok"]) {
    result = true;
  } else {
    throw new Error(`HTTP status code: ${argument.status}`);
  }

  return result;
};

export const getEventError = (argument: Event): Error => {
  if (argument instanceof ErrorEvent) {
    return new Error(argument.message);
  } else if (argument instanceof CloseEvent) {
    return new Error(`WS Error (${argument.code}): ${argument.reason}`);
  }

  return new Error(
    `Error (${argument.type}): ${JSON.stringify(
      argument,
      Object.getOwnPropertyNames(argument)
    )}`
  );
};

export function getCookie(name: string): string | undefined {
  const matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );

  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(
  name: string,
  value: string | false,
  props?: Record<string, any>
) {
  props = props || {};
  let exp = props.expires;

  if (typeof exp == "number" && exp) {
    const d = new Date();

    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }

  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }

  value = encodeURIComponent(value);

  let updatedCookie = name + "=" + value;

  for (const propName in props) {
    updatedCookie += "; " + propName;

    const propValue = props[propName];

    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

export function deleteCookie(name: string): void {
  setCookie(name, false, { expires: -1 });
}

export const getMenuCategoryTitle = (argument: string): string => {
  let result = "";

  switch (argument) {
    case "bun":
      result = "Булки";
      break;
    case "main":
      result = "Начинки";
      break;
    case "sauce":
      result = "Соусы";
      break;
    default:
      result = argument;
      break;
  }

  return result;
};
