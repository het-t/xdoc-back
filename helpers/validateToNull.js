export default function (value, checkEmptystring = true, checkUndefined = true) {
    if (checkEmptystring == true) {
        value == '' ? value = null : value = value
    }
    if (checkUndefined == true) {
        value == undefined ? value = null : value = value
    }
    return value
}