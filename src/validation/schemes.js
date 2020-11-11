import {
    isCyrillic,
    isCyrillicOrLateinschrift,
    isEmail,
    isNubmer,
    isPhoneNubmer,
    isPresentInObject
} from "@validation/validator"

export const userSchemaValidation = {
    signup: {
        email: {
            callback: [isPresentInObject, isEmail],
            errorMessage: ["Email адрес должен быть указан.", "Недопустимый email адрес."]
        },
        password: {
            callback: [isPresentInObject],
            errorMessage: ["Должен быть указан пароль."]
        },
        firstName: {
            callback: [isPresentInObject, isCyrillic],
            errorMessage: ["Укажите имя.", "Недопустимое имя (должно быть написано кириллицей)."]
        },
        secondName: {
            callback: [isPresentInObject, isCyrillic],
            errorMessage: ["Укажите фамилию.", "Недопустимая фамилия (должно быть написано кириллицей)."]
        },
        patronymicName: {
            callback: [isPresentInObject, isCyrillic],
            errorMessage: ["Укажите отчество.", "Недопустимое отчество (должно быть написано кириллицей)."]
        },
        phoneNumber: {
            callback: [isPresentInObject, isPhoneNubmer],
            errorMessage: ["Телефонный номер должен быть указан", "Недопустимый телефонный номер."]
        },
    },
    accountPost: {
        email: {
            callback: [isPresentInObject, isEmail],
            errorMessage: ["Email адрес должен быть указан.", "Недопустимый email адрес."]
        },
        firstName: {
            callback: [isPresentInObject, isCyrillic],
            errorMessage: ["Укажите имя.", "Недопустимое имя (должно быть написано кириллицей)."]
        },
        secondName: {
            callback: [isPresentInObject, isCyrillic],
            errorMessage: ["Укажите фамилию.", "Недопустимая фамилия (должно быть написано кириллицей)."]
        },
        patronymicName: {
            callback: [isPresentInObject, isCyrillic],
            errorMessage: ["Укажите отчество.", "Недопустимое отчество (должно быть написано кириллицей)."]
        },
        phoneNumber: {
            callback: [isPresentInObject, isPhoneNubmer],
            errorMessage: ["Телефонный номер должен быть указан", "Недопустимый телефонный номер."]
        },
    }
}

export const orderSchemaValidation = {
    orderCreate: {
        title: {
            callback: [isPresentInObject],
            errorMessage: ["Укажите тему заказа."]
        },
        description: {
            callback: [isPresentInObject],
            errorMessage: ["Укажите описание заказа."]
        }
    },
    orderPut: {
        price: {
            callback: [isNubmer],
            errorMessage: ["Поле должно быть целым числом."]
        }
    }

}
