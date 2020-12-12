const Telegram = require('telegraf/telegram')


const bot = new Telegram(process.env.TELEGRAM_BOT_TOKEN)

export const sendOrderToChat = async ({user, businessStatus, messageTitle, messageContent}) => {
    await bot.sendMessage(process.env.TELEGRAM_CHAT_ID,
        `
<b>Заказчик:</b> ${user.secondName} ${user.firstName} ${user.patronymicName}

<b>ИНН:</b> <i>${user.ITN}</i>
<b>Статус заказчика:</b> ${businessStatus.title}

<b>Контактные данные</b> 
<b>Телефон:</b> ${user.phoneNumber}
<b>Email:</b> ${user.email}

<b>Тема заказа:</b> ${messageTitle}
<b>Описание заказа:</b> ${messageContent}`
        ,
        {parse_mode: "html"}
    )
}

export default bot