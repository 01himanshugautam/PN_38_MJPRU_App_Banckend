/* eslint-disable @typescript-eslint/no-explicit-any */
import ejs from 'ejs';

export const TEMPLATE_ONBOARDING_SUCCESS = 'onboarding-success';

async function defaultTemplate(data: any): Promise<string> {
  return await ejs.renderFile(__dirname + '/mail/index.ejs', data);
}

async function onBoardingSuccess(data: any): Promise<string> {
  return await ejs.renderFile(__dirname + '/mail/bdo/onboarding-success.ejs', data);
}

export async function getViewByTemplate(data: any, template = 'default'): Promise<string> {
  switch (template) {
    case TEMPLATE_ONBOARDING_SUCCESS: {
      return await onBoardingSuccess(data);
    }
    default: {
      return await defaultTemplate(data);
    }
  }
}
