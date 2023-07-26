type FilterObj = Pick<any & any, 'full_name' | 'phone' | 'user_name' | 'street' | 'city' | 'state' | 'avatar'>;
export declare const filterObj: (obj: any & any, ...allowedFields: string[]) => FilterObj;
export declare const isImage: (url: string) => boolean;
export {};
