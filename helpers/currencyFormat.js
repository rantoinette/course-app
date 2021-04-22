function currencyFormat(price) {
    return `$ ${new Intl.NumberFormat().format(price)}`
}

module.exports = currencyFormat;