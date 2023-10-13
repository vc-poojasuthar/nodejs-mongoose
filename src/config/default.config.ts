import * as dotenv from "dotenv";
dotenv.config();

export const Defaults = {
  START_PAGE: 1,
  PAGE_LIMIT: 5,
  SORT_ORDER: -1,
  SORT_FIELD: 'createdAt',
  ACTIVATE_LINK: process.env.ACTIVATE_LINK,
  RESET_PASSWORD_LINK: process.env.RESET_PASSWORD_LINK,
  INVITE_USER_KEY: 'invitation-user',
  FORGOT_PASSWORD_KEY: 'forgot-password'
}