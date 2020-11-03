const nodemailer = require("nodemailer")


export const sendMailFunc = async (mailOption) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })
        await transporter.sendMail(mailOption, (err, data) => {
            if (err) {
                res.send("error" + JSON.stringify(err))
            } else {
                res.send("success")
            }
        })
    } catch (e) {
        console.log(e.message)
    }

}

export const sendNewAccountPasswordToUser = async (email, password) => {
    const mailOption = {
        from: `${process.env.EMAIL}`,
        to: `${email}`,
        subject: `ООО Ависта 1С Регистрация`,
        html: `Здравствуйте! Пароль от вашего созданного аккаунта: <h3>${password}</h3>
            Никому не сообщайте его`
    }

    await sendMailFunc(mailOption)
}

export const sendResetPasswordMailToUser = async (email, hash) => {
    const mailOption = {
        from: `${process.env.EMAIL}`,
        to: `${email}`,
        subject: `ООО Ависта 1С Регистрация`,
        html: `Здравствуйте, вот <a href=${process.env.HOST_URL}:${process.env.HOST_PORT}/password-reset/${hash}>ссылка для сброса пароля</a> на вашем аккаунте.
            Если это были не вы, то просто проигнорируйте это письмо`
    }

    await sendMailFunc(mailOption)
}

