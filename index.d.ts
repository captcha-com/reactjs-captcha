import * as React from 'react';
import { ReactNode } from 'react';

interface CaptchaSettingArgs {
    captchaEndpoint: string;
    captchaEnabled?: boolean;
}

interface CaptchaProps {
    captchaStyleName?: string;
    styleName?: string;
    ref(captcha: Captcha): void;
}

interface CaptchaSetting {
    set(setting: CaptchaSettingArgs): void;
    get(): CaptchaSettingArgs;
}

export class Captcha extends React.Component<CaptchaProps> {
    constructor(props: CaptchaProps);

    componentWillMount(): void;

    componentDidMount(): void;

    getCaptchaStyleName(): string;

    getInstance(): any;

    getCaptchaId(): string;

    getUserEnteredCaptchaCode(): string;

    displayHtml(captchaStyleName: string): void;

    reloadImage(): void;

    validateUnsafe(callback: (isHuman: boolean) => void): void;

    generateCaptchaMarkup(captchaStyleName: string): void;

    loadScriptIncludes(captchaStyleName: string): void;

    render(): ReactNode;
}

export const captchaSettings: CaptchaSetting;
