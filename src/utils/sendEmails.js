import sendgrid from '@sendgrid/mail';



sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = ({ //these are the props we re expecting
    to,
    from,
    subject,
    text,
    html
}) => {
    const msg = {
        to,
        from,
        subject,
        text,
        html
    }
    return sendgrid.send(msg); //because this returns a promise
};