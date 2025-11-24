


export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: "USER";
    post_id?: string;
    comment_id?: string;
    reply_id: string;
};