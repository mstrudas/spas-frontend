const filters = {
    phoneNumber(number) {
        const regex = /(\d{3})(\d{3})(\d{4})/
        let m

        if ((m = regex.exec(number)) !== null) {
            return "(" + m[1] + ") " + m[2] + "-" + m[3]
        }
    }    
}

export default {
    filters
}