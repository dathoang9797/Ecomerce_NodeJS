import { IncomingHttpHeaders } from 'http';

declare module 'http' {
    interface IncomingHttpHeaders {
        "x_authorization"?: string
    }
}
