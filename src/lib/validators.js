/**
 * Input validation and sanitising for public form endpoints.
 * Every validator returns { valid, errors, data } and never throws.
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const LIMITS = {
  name: 100,
  email: 254,
  subject: 150,
  message: 2000,
};

// Strip control characters (except tab/newline) that have no business in form input
const CONTROL_CHARS = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

/** Trim a value and remove control characters. Non-strings become "". */
export function cleanText(value) {
  if (typeof value !== "string") return "";
  return value.replace(CONTROL_CHARS, "").trim();
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}

export function isValidEmail(email) {
  return email.length <= LIMITS.email && EMAIL_PATTERN.test(email);
}

/**
 * Validate the contact form payload.
 * `website` is a honeypot field: real users never see or fill it.
 */
export function validateContact(input, { planIds = [] } = {}) {
  if (!isPlainObject(input)) {
    return { valid: false, errors: { body: "Invalid request body" }, data: null };
  }

  const data = {
    name: cleanText(input.name),
    email: cleanText(input.email).toLowerCase(),
    subject: cleanText(input.subject),
    message: cleanText(input.message),
    plan: cleanText(input.plan),
  };
  const errors = {};

  if (!data.name) errors.name = "Name is required";
  else if (data.name.length > LIMITS.name) errors.name = `Name must be at most ${LIMITS.name} characters`;

  if (!data.email) errors.email = "Email is required";
  else if (!isValidEmail(data.email)) errors.email = "Please enter a valid email address";

  if (!data.subject) errors.subject = "Subject is required";
  else if (data.subject.length > LIMITS.subject) errors.subject = `Subject must be at most ${LIMITS.subject} characters`;

  if (!data.message) errors.message = "Message is required";
  else if (data.message.length < 10) errors.message = "Message must be at least 10 characters";
  else if (data.message.length > LIMITS.message) errors.message = `Message must be at most ${LIMITS.message} characters`;

  // The plan is optional, but if present it has to be a known plan
  if (data.plan && !planIds.includes(data.plan)) errors.plan = "Unknown plan";
  if (!data.plan) delete data.plan;

  const spam = cleanText(input.website) !== "";
  return { valid: Object.keys(errors).length === 0, errors, data, spam };
}

/** Validate the newsletter subscription payload. */
export function validateSubscribe(input) {
  if (!isPlainObject(input)) {
    return { valid: false, errors: { body: "Invalid request body" }, data: null };
  }
  const data = { email: cleanText(input.email).toLowerCase() };
  const errors = {};

  if (!data.email) errors.email = "Email is required";
  else if (!isValidEmail(data.email)) errors.email = "Please enter a valid email address";

  const spam = cleanText(input.website) !== "";
  return { valid: Object.keys(errors).length === 0, errors, data, spam };
}

/** Parse ?limit=&offset= query values into safe integers. */
export function parsePagination(searchParams, { defaultLimit = 20, maxLimit = 100 } = {}) {
  const limit = Number.parseInt(searchParams.get("limit") ?? "", 10);
  const offset = Number.parseInt(searchParams.get("offset") ?? "", 10);
  return {
    limit: Number.isFinite(limit) && limit > 0 ? Math.min(limit, maxLimit) : defaultLimit,
    offset: Number.isFinite(offset) && offset > 0 ? offset : 0,
  };
}
