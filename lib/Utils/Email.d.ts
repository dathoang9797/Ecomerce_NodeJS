interface Options {
    email: string;
    subject: string;
    message: string;
}
export declare const sendEmail: (options: Options) => Promise<void>;
export {};
