import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user:"mssahuhuh@gmail.com",
        pass:"rscmrfonyumshuli"
    }
})